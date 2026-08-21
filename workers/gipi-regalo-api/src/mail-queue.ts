import { decryptJson } from "./crypto";
import {
  assertMailPayload,
  claimOutbox,
  cleanExpiredData,
  getOutbox,
  markFailed,
  markQueued,
  markRetry,
  markSent,
  markUnknown,
  pendingOutboxIds,
} from "./database";
import { sendProtonGiftEmail } from "./smtp";
import { SmtpFailure } from "./smtp-protocol";
import type { Env, GiftMailPayload, MailQueueMessage } from "./types";

const MAX_ATTEMPTS = 5;

function retryDelay(attempts: number): number {
  return [60, 300, 900, 3_600][Math.min(Math.max(attempts - 1, 0), 3)];
}

function isUnknownDelivery(error: SmtpFailure): boolean {
  return error.stage === "message-body" || error.stage.startsWith("smtp-message-accepted");
}

function isRetryable(error: SmtpFailure): boolean {
  if (error.smtpCode) return error.smtpCode >= 400 && error.smtpCode < 500;
  return [
    "tcp-connect",
    "smtp-greeting",
    "smtp-ehlo",
    "smtp-starttls",
    "tls-connect",
    "smtp-secure-ehlo",
  ].some((stage) => error.stage.startsWith(stage));
}

async function processMessage(env: Env, message: Message<MailQueueMessage>): Promise<void> {
  const now = new Date();
  const nowIso = now.toISOString();
  const claimed = await claimOutbox(env, message.body.requestId, nowIso);
  if (!claimed) {
    message.ack();
    return;
  }

  const outbox = await getOutbox(env, message.body.requestId);
  if (!outbox?.encrypted_payload || !outbox.payload_iv) {
    await markFailed(env, message.body.requestId, "outbox-payload-missing", null, nowIso);
    message.ack();
    return;
  }

  let payload: GiftMailPayload;
  try {
    payload = await decryptJson<GiftMailPayload>(
      env.OUTBOX_ENCRYPTION_KEY,
      outbox.encrypted_payload,
      outbox.payload_iv,
    );
    assertMailPayload(payload);
  } catch {
    await markFailed(env, message.body.requestId, "outbox-decryption", null, nowIso);
    message.ack();
    return;
  }

  const baseUrl = env.PUBLIC_BASE_URL.replace(/\/+$/, "");
  const downloadUrl = `${baseUrl}/d/${encodeURIComponent(payload.downloadToken)}`;

  try {
    const result = await sendProtonGiftEmail(
      payload.email,
      payload.name,
      payload.locale,
      downloadUrl,
      env.PROTON_SMTP_TOKEN,
    );
    await markSent(env, payload.requestId, result.messageId, new Date().toISOString());
    message.ack();
  } catch (error) {
    const failure = error instanceof SmtpFailure ? error : new SmtpFailure("unexpected-mail-error");
    const failureTime = new Date().toISOString();

    if (isUnknownDelivery(failure)) {
      await markUnknown(env, payload.requestId, failure.stage, failure.smtpCode ?? null, failureTime);
      message.ack();
      return;
    }

    if (outbox.attempts < MAX_ATTEMPTS && isRetryable(failure)) {
      const delaySeconds = retryDelay(outbox.attempts);
      const nextAttemptAt = new Date(Date.now() + delaySeconds * 1_000).toISOString();
      await markRetry(
        env,
        payload.requestId,
        failure.stage,
        failure.smtpCode ?? null,
        nextAttemptAt,
        failureTime,
      );
      message.retry({ delaySeconds });
      return;
    }

    await markFailed(env, payload.requestId, failure.stage, failure.smtpCode ?? null, failureTime);
    message.ack();
  }
}

export async function consumeMailQueue(
  batch: MessageBatch<MailQueueMessage>,
  env: Env,
): Promise<void> {
  for (const message of batch.messages) {
    try {
      await processMessage(env, message);
    } catch {
      message.retry({ delaySeconds: 300 });
    }
  }
}

export async function maintainOutbox(env: Env): Promise<void> {
  const now = new Date().toISOString();
  await cleanExpiredData(env, now);
  const requestIds = await pendingOutboxIds(env, now);

  for (const requestId of requestIds) {
    try {
      await env.MAIL_QUEUE.send({ requestId });
      await markQueued(env, requestId, new Date().toISOString());
    } catch {
      // Il record rimane pendente e verrà ripreso dal trigger successivo.
    }
  }
}
