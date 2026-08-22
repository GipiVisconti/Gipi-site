import { decryptJson } from "./crypto";
import {
  claimAdminNotification,
  assertMailPayload,
  claimOutbox,
  cleanExpiredData,
  getAdminNotification,
  getOutbox,
  markAdminNotificationFailed,
  markAdminNotificationQueued,
  markAdminNotificationRetry,
  markAdminNotificationSent,
  markAdminNotificationUnknown,
  markFailed,
  markQueued,
  markRetry,
  markSent,
  markUnknown,
  pendingAdminNotificationIds,
  pendingOutboxIds,
} from "./database";
import {
  sendProtonAdminNotificationEmail,
  sendProtonGiftEmail,
} from "./smtp";
import { SmtpFailure } from "./smtp-protocol";
import type {
  Env,
  GiftMailPayload,
  MailQueueMessage,
  StoredContactProfile,
} from "./types";

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

async function processGiftMessage(
  env: Env,
  message: Message<MailQueueMessage>,
): Promise<void> {
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

async function processAdminNotification(
  env: Env,
  message: Message<MailQueueMessage>,
): Promise<void> {
  const nowIso = new Date().toISOString();
  const claimed = await claimAdminNotification(env, message.body.requestId, nowIso);
  if (!claimed) {
    message.ack();
    return;
  }

  const notification = await getAdminNotification(env, message.body.requestId);
  if (!notification) {
    await markAdminNotificationFailed(
      env,
      message.body.requestId,
      "notification-data-missing",
      null,
      nowIso,
    );
    message.ack();
    return;
  }

  let profile: StoredContactProfile;
  try {
    profile = await decryptJson<StoredContactProfile>(
      env.OUTBOX_ENCRYPTION_KEY,
      notification.encrypted_profile,
      notification.profile_iv,
    );
  } catch {
    await markAdminNotificationFailed(
      env,
      notification.request_id,
      "notification-decryption",
      null,
      nowIso,
    );
    message.ack();
    return;
  }

  try {
    const result = await sendProtonAdminNotificationEmail(
      {
        name: profile.name,
        email: profile.email,
        birthday: profile.birthday,
        locale: notification.locale,
        newsletterConsent: notification.newsletter_consent === 1,
        createdAt: notification.created_at,
      },
      env.PROTON_SMTP_TOKEN,
    );
    await markAdminNotificationSent(
      env,
      notification.request_id,
      result.messageId,
      new Date().toISOString(),
    );
    message.ack();
  } catch (error) {
    const failure = error instanceof SmtpFailure
      ? error
      : new SmtpFailure("unexpected-admin-notification-error");
    const failureTime = new Date().toISOString();

    if (isUnknownDelivery(failure)) {
      await markAdminNotificationUnknown(
        env,
        notification.request_id,
        failure.stage,
        failure.smtpCode ?? null,
        failureTime,
      );
      message.ack();
      return;
    }

    if (notification.attempts < MAX_ATTEMPTS && isRetryable(failure)) {
      const delaySeconds = retryDelay(notification.attempts);
      const nextAttemptAt = new Date(Date.now() + delaySeconds * 1_000).toISOString();
      await markAdminNotificationRetry(
        env,
        notification.request_id,
        failure.stage,
        failure.smtpCode ?? null,
        nextAttemptAt,
        failureTime,
      );
      message.retry({ delaySeconds });
      return;
    }

    await markAdminNotificationFailed(
      env,
      notification.request_id,
      failure.stage,
      failure.smtpCode ?? null,
      failureTime,
    );
    message.ack();
  }
}

export async function consumeMailQueue(
  batch: MessageBatch<MailQueueMessage>,
  env: Env,
): Promise<void> {
  for (const message of batch.messages) {
    try {
      if (message.body.kind === "admin-notification") {
        await processAdminNotification(env, message);
      } else {
        await processGiftMessage(env, message);
      }
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
      await env.MAIL_QUEUE.send({ requestId, kind: "gift" });
      await markQueued(env, requestId, new Date().toISOString());
    } catch {
      // Il record rimane pendente e verrà ripreso dal trigger successivo.
    }
  }

  const adminRequestIds = await pendingAdminNotificationIds(env, now);
  for (const requestId of adminRequestIds) {
    try {
      await env.MAIL_QUEUE.send({ requestId, kind: "admin-notification" });
      await markAdminNotificationQueued(env, requestId, new Date().toISOString());
    } catch {
      // Il record rimane pendente e verrà ripreso dal trigger successivo.
    }
  }
}
