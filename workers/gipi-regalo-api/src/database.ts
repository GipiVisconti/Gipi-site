import { isLocale, type Locale } from "./config";
import type {
  AdminNotificationRow,
  DownloadRow,
  Env,
  GiftMailPayload,
  OutboxRow,
} from "./types";

export interface NewGiftRequest {
  requestId: string;
  emailHash: string;
  ipHash: string;
  locale: Locale;
  assetKey: string;
  downloadTokenHash: string;
  downloadExpiresAt: string;
  encryptedPayload: string;
  payloadIv: string;
  encryptedProfile: string;
  profileIv: string;
  newsletterConsent: {
    encryptedEmail: string;
    emailIv: string;
    encryptedProfile: string;
    profileIv: string;
    consentTextVersion: string;
  } | null;
  createdAt: string;
}

export async function isRateLimited(
  env: Env,
  emailHash: string,
  ipHash: string,
  now: Date,
): Promise<boolean> {
  const emailSince = new Date(now.getTime() - 24 * 60 * 60 * 1_000).toISOString();
  const ipSince = new Date(now.getTime() - 60 * 60 * 1_000).toISOString();
  const [emailCount, ipCount] = await Promise.all([
    env.DB.prepare(
      "SELECT COUNT(*) AS total FROM gift_requests WHERE email_hash = ? AND created_at >= ?",
    )
      .bind(emailHash, emailSince)
      .first<{ total: number }>(),
    env.DB.prepare(
      "SELECT COUNT(*) AS total FROM gift_requests WHERE ip_hash = ? AND created_at >= ?",
    )
      .bind(ipHash, ipSince)
      .first<{ total: number }>(),
  ]);

  return Number(emailCount?.total ?? 0) >= 3 || Number(ipCount?.total ?? 0) >= 10;
}

export async function hasRecentRequest(
  env: Env,
  emailHash: string,
  locale: Locale,
  now: Date,
): Promise<boolean> {
  const since = new Date(now.getTime() - 10 * 60 * 1_000).toISOString();
  const row = await env.DB.prepare(
    `SELECT request_id
       FROM gift_requests
      WHERE email_hash = ? AND locale = ? AND created_at >= ?
        AND status IN ('accepted', 'queued', 'sending', 'sent', 'unknown')
      LIMIT 1`,
  )
    .bind(emailHash, locale, since)
    .first<{ request_id: string }>();
  return Boolean(row);
}

export async function insertGiftRequest(env: Env, input: NewGiftRequest): Promise<void> {
  const statements = [
    env.DB.prepare(
      `INSERT INTO gift_requests (
        request_id, email_hash, ip_hash, locale, asset_key, status,
        created_at, updated_at, download_token_hash, download_expires_at, download_count
      ) VALUES (?, ?, ?, ?, ?, 'accepted', ?, ?, ?, ?, 0)`,
    ).bind(
      input.requestId,
      input.emailHash,
      input.ipHash,
      input.locale,
      input.assetKey,
      input.createdAt,
      input.createdAt,
      input.downloadTokenHash,
      input.downloadExpiresAt,
    ),
    env.DB.prepare(
      `INSERT INTO mail_outbox (
        request_id, encrypted_payload, payload_iv, status, attempts,
        created_at, updated_at, next_attempt_at
      ) VALUES (?, ?, ?, 'pending', 0, ?, ?, ?)`,
    ).bind(
      input.requestId,
      input.encryptedPayload,
      input.payloadIv,
      input.createdAt,
      input.createdAt,
      input.createdAt,
    ),
    env.DB.prepare(
      `INSERT INTO gift_request_profiles (
        request_id, encrypted_profile, profile_iv, newsletter_consent, created_at
      ) VALUES (?, ?, ?, ?, ?)`,
    ).bind(
      input.requestId,
      input.encryptedProfile,
      input.profileIv,
      input.newsletterConsent ? 1 : 0,
      input.createdAt,
    ),
    env.DB.prepare(
      `INSERT INTO admin_notifications (
        request_id, status, attempts, created_at, updated_at, next_attempt_at
      ) VALUES (?, 'pending', 0, ?, ?, ?)`,
    ).bind(
      input.requestId,
      input.createdAt,
      input.createdAt,
      input.createdAt,
    ),
  ];

  if (input.newsletterConsent) {
    statements.push(
      env.DB.prepare(
        `INSERT INTO newsletter_consents (
          email_hash, encrypted_email, email_iv, locale, consent_text_version,
          consented_at, updated_at, status, source_request_id,
          encrypted_profile, profile_iv
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'subscribed', ?, ?, ?)
        ON CONFLICT(email_hash) DO UPDATE SET
          encrypted_email = excluded.encrypted_email,
          email_iv = excluded.email_iv,
          locale = excluded.locale,
          consent_text_version = excluded.consent_text_version,
          consented_at = excluded.consented_at,
          updated_at = excluded.updated_at,
          status = 'subscribed',
          source_request_id = excluded.source_request_id,
          encrypted_profile = excluded.encrypted_profile,
          profile_iv = excluded.profile_iv`,
      ).bind(
        input.emailHash,
        input.newsletterConsent.encryptedEmail,
        input.newsletterConsent.emailIv,
        input.locale,
        input.newsletterConsent.consentTextVersion,
        input.createdAt,
        input.createdAt,
        input.requestId,
        input.newsletterConsent.encryptedProfile,
        input.newsletterConsent.profileIv,
      ),
    );
  }

  await env.DB.batch(statements);
}

export async function markQueued(env: Env, requestId: string, now: string): Promise<void> {
  await env.DB.batch([
    env.DB.prepare(
      "UPDATE gift_requests SET status = 'queued', updated_at = ? WHERE request_id = ? AND status = 'accepted'",
    ).bind(now, requestId),
    env.DB.prepare(
      `UPDATE mail_outbox
          SET status = 'queued', last_enqueued_at = ?, updated_at = ?
        WHERE request_id = ? AND status IN ('pending', 'retry')`,
    ).bind(now, now, requestId),
  ]);
}

export async function markEnqueueFailed(env: Env, requestId: string, now: string): Promise<void> {
  await env.DB.prepare(
    `UPDATE mail_outbox
        SET status = 'retry', next_attempt_at = ?, updated_at = ?
      WHERE request_id = ? AND status = 'pending'`,
  )
    .bind(now, now, requestId)
    .run();
}

export async function markAdminNotificationQueued(
  env: Env,
  requestId: string,
  now: string,
): Promise<void> {
  await env.DB.prepare(
    `UPDATE admin_notifications
        SET status = 'queued', last_enqueued_at = ?, updated_at = ?
      WHERE request_id = ? AND status IN ('pending', 'retry')`,
  )
    .bind(now, now, requestId)
    .run();
}

export async function markAdminNotificationEnqueueFailed(
  env: Env,
  requestId: string,
  now: string,
): Promise<void> {
  await env.DB.prepare(
    `UPDATE admin_notifications
        SET status = 'retry', next_attempt_at = ?, updated_at = ?
      WHERE request_id = ? AND status = 'pending'`,
  )
    .bind(now, now, requestId)
    .run();
}

export async function claimAdminNotification(
  env: Env,
  requestId: string,
  now: string,
): Promise<boolean> {
  const result = await env.DB.prepare(
    `UPDATE admin_notifications
        SET status = 'sending', attempts = attempts + 1, updated_at = ?
      WHERE request_id = ? AND status IN ('pending', 'queued', 'retry')`,
  )
    .bind(now, requestId)
    .run();
  return Number(result.meta.changes ?? 0) === 1;
}

export async function getAdminNotification(
  env: Env,
  requestId: string,
): Promise<AdminNotificationRow | null> {
  return env.DB.prepare(
    `SELECT n.request_id, p.encrypted_profile, p.profile_iv,
            p.newsletter_consent, r.locale, r.created_at, n.attempts
       FROM admin_notifications n
       JOIN gift_request_profiles p ON p.request_id = n.request_id
       JOIN gift_requests r ON r.request_id = n.request_id
      WHERE n.request_id = ?`,
  )
    .bind(requestId)
    .first<AdminNotificationRow>();
}

export async function markAdminNotificationSent(
  env: Env,
  requestId: string,
  messageId: string,
  now: string,
): Promise<void> {
  await env.DB.prepare(
    `UPDATE admin_notifications
        SET status = 'completed', message_id = ?, updated_at = ?,
            next_attempt_at = NULL, failure_stage = NULL, smtp_code = NULL
      WHERE request_id = ?`,
  )
    .bind(messageId, now, requestId)
    .run();
}

export async function markAdminNotificationUnknown(
  env: Env,
  requestId: string,
  stage: string,
  smtpCode: number | null,
  now: string,
): Promise<void> {
  await env.DB.prepare(
    `UPDATE admin_notifications
        SET status = 'unknown', failure_stage = ?, smtp_code = ?, updated_at = ?
      WHERE request_id = ?`,
  )
    .bind(stage, smtpCode, now, requestId)
    .run();
}

export async function markAdminNotificationRetry(
  env: Env,
  requestId: string,
  stage: string,
  smtpCode: number | null,
  nextAttemptAt: string,
  now: string,
): Promise<void> {
  await env.DB.prepare(
    `UPDATE admin_notifications
        SET status = 'retry', failure_stage = ?, smtp_code = ?,
            next_attempt_at = ?, updated_at = ?
      WHERE request_id = ?`,
  )
    .bind(stage, smtpCode, nextAttemptAt, now, requestId)
    .run();
}

export async function markAdminNotificationFailed(
  env: Env,
  requestId: string,
  stage: string,
  smtpCode: number | null,
  now: string,
): Promise<void> {
  await env.DB.prepare(
    `UPDATE admin_notifications
        SET status = 'failed', failure_stage = ?, smtp_code = ?, updated_at = ?
      WHERE request_id = ?`,
  )
    .bind(stage, smtpCode, now, requestId)
    .run();
}

export async function claimOutbox(env: Env, requestId: string, now: string): Promise<boolean> {
  const result = await env.DB.prepare(
    `UPDATE mail_outbox
        SET status = 'sending', attempts = attempts + 1, updated_at = ?
      WHERE request_id = ? AND status IN ('pending', 'queued', 'retry')`,
  )
    .bind(now, requestId)
    .run();
  const claimed = Number(result.meta.changes ?? 0) === 1;
  if (claimed) {
    await env.DB.prepare(
      "UPDATE gift_requests SET status = 'sending', updated_at = ? WHERE request_id = ?",
    )
      .bind(now, requestId)
      .run();
  }
  return claimed;
}

export async function getOutbox(env: Env, requestId: string): Promise<OutboxRow | null> {
  return env.DB.prepare(
    `SELECT request_id, encrypted_payload, payload_iv, status, attempts
       FROM mail_outbox WHERE request_id = ?`,
  )
    .bind(requestId)
    .first<OutboxRow>();
}

export async function markSent(
  env: Env,
  requestId: string,
  messageId: string,
  now: string,
): Promise<void> {
  await env.DB.batch([
    env.DB.prepare(
      `UPDATE gift_requests
          SET status = 'sent', sent_at = ?, updated_at = ?, message_id = ?,
              failure_stage = NULL, smtp_code = NULL
        WHERE request_id = ?`,
    ).bind(now, now, messageId, requestId),
    env.DB.prepare(
      `UPDATE mail_outbox
          SET status = 'completed', encrypted_payload = NULL, payload_iv = NULL,
              updated_at = ?, next_attempt_at = NULL
        WHERE request_id = ?`,
    ).bind(now, requestId),
  ]);
}

export async function markUnknown(
  env: Env,
  requestId: string,
  stage: string,
  smtpCode: number | null,
  now: string,
): Promise<void> {
  await env.DB.batch([
    env.DB.prepare(
      `UPDATE gift_requests
          SET status = 'unknown', updated_at = ?, failure_stage = ?, smtp_code = ?
        WHERE request_id = ?`,
    ).bind(now, stage, smtpCode, requestId),
    env.DB.prepare(
      `UPDATE mail_outbox
          SET status = 'unknown', encrypted_payload = NULL, payload_iv = NULL, updated_at = ?
        WHERE request_id = ?`,
    ).bind(now, requestId),
  ]);
}

export async function markRetry(
  env: Env,
  requestId: string,
  stage: string,
  smtpCode: number | null,
  nextAttemptAt: string,
  now: string,
): Promise<void> {
  await env.DB.batch([
    env.DB.prepare(
      `UPDATE gift_requests
          SET status = 'queued', updated_at = ?, failure_stage = ?, smtp_code = ?
        WHERE request_id = ?`,
    ).bind(now, stage, smtpCode, requestId),
    env.DB.prepare(
      `UPDATE mail_outbox
          SET status = 'retry', next_attempt_at = ?, updated_at = ?
        WHERE request_id = ?`,
    ).bind(nextAttemptAt, now, requestId),
  ]);
}

export async function markFailed(
  env: Env,
  requestId: string,
  stage: string,
  smtpCode: number | null,
  now: string,
): Promise<void> {
  await env.DB.batch([
    env.DB.prepare(
      `UPDATE gift_requests
          SET status = 'failed', updated_at = ?, failure_stage = ?, smtp_code = ?
        WHERE request_id = ?`,
    ).bind(now, stage, smtpCode, requestId),
    env.DB.prepare(
      `UPDATE mail_outbox
          SET status = 'failed', encrypted_payload = NULL, payload_iv = NULL, updated_at = ?
        WHERE request_id = ?`,
    ).bind(now, requestId),
  ]);
}

export async function findDownload(env: Env, tokenHash: string): Promise<DownloadRow | null> {
  return env.DB.prepare(
    `SELECT request_id, locale, asset_key, download_expires_at, download_count
       FROM gift_requests
      WHERE download_token_hash = ? AND status IN ('sent', 'unknown')`,
  )
    .bind(tokenHash)
    .first<DownloadRow>();
}

export async function consumeDownload(
  env: Env,
  tokenHash: string,
  now: string,
): Promise<boolean> {
  const result = await env.DB.prepare(
    `UPDATE gift_requests
        SET download_count = download_count + 1, updated_at = ?
      WHERE download_token_hash = ?
        AND download_expires_at > ?
        AND download_count < 5
        AND status IN ('sent', 'unknown')`,
  )
    .bind(now, tokenHash, now)
    .run();
  return Number(result.meta.changes ?? 0) === 1;
}

export async function pendingOutboxIds(env: Env, now: string): Promise<string[]> {
  const staleQueued = new Date(Date.parse(now) - 15 * 60 * 1_000).toISOString();
  const result = await env.DB.prepare(
    `SELECT request_id
       FROM mail_outbox
      WHERE encrypted_payload IS NOT NULL
        AND (
          (status IN ('pending', 'retry') AND (next_attempt_at IS NULL OR next_attempt_at <= ?))
          OR (status = 'queued' AND last_enqueued_at < ?)
        )
      ORDER BY created_at ASC
      LIMIT 50`,
  )
    .bind(now, staleQueued)
    .all<{ request_id: string }>();
  return result.results.map((row) => row.request_id);
}

export async function pendingAdminNotificationIds(
  env: Env,
  now: string,
): Promise<string[]> {
  const staleQueued = new Date(Date.parse(now) - 15 * 60 * 1_000).toISOString();
  const result = await env.DB.prepare(
    `SELECT request_id
       FROM admin_notifications
      WHERE (
          (status IN ('pending', 'retry') AND (next_attempt_at IS NULL OR next_attempt_at <= ?))
          OR (status = 'queued' AND last_enqueued_at < ?)
        )
      ORDER BY created_at ASC
      LIMIT 50`,
  )
    .bind(now, staleQueued)
    .all<{ request_id: string }>();
  return result.results.map((row) => row.request_id);
}

export async function cleanExpiredData(env: Env, now: string): Promise<void> {
  const staleSending = new Date(Date.parse(now) - 30 * 60 * 1_000).toISOString();
  const oldRequests = new Date(Date.parse(now) - 30 * 24 * 60 * 60 * 1_000).toISOString();
  await env.DB.batch([
    env.DB.prepare(
      `UPDATE gift_requests
          SET status = 'unknown', updated_at = ?, failure_stage = 'worker-interrupted'
        WHERE status = 'sending' AND updated_at < ?`,
    ).bind(now, staleSending),
    env.DB.prepare(
      `UPDATE mail_outbox
          SET status = 'unknown', encrypted_payload = NULL, payload_iv = NULL, updated_at = ?
        WHERE status = 'sending' AND updated_at < ?`,
    ).bind(now, staleSending),
    env.DB.prepare(
      `UPDATE admin_notifications
          SET status = 'unknown', updated_at = ?, failure_stage = 'worker-interrupted'
        WHERE status = 'sending' AND updated_at < ?`,
    ).bind(now, staleSending),
    env.DB.prepare("DELETE FROM gift_requests WHERE created_at < ?").bind(oldRequests),
  ]);
}

export function assertMailPayload(value: unknown): asserts value is GiftMailPayload {
  if (!value || typeof value !== "object") throw new Error("invalid-mail-payload");
  const payload = value as Partial<GiftMailPayload>;
  if (
    !payload.requestId ||
    !payload.email ||
    !payload.name ||
    !payload.locale ||
    !isLocale(payload.locale) ||
    !payload.downloadToken
  ) {
    throw new Error("invalid-mail-payload");
  }
}
