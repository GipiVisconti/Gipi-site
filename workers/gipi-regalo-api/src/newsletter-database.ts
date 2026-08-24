import type {
  Env,
  NewsletterCampaignPayload,
  NewsletterDeliveryRow,
} from "./types";

export interface CampaignSummary {
  campaignId: string;
  slug: string;
  status: string;
  recipientCount: number;
  completed: number;
  skipped: number;
  failed: number;
  unknown: number;
  pending: number;
}

export async function createNewsletterCampaign(
  env: Env,
  campaignId: string,
  contentHash: string,
  payload: NewsletterCampaignPayload,
  now: string,
): Promise<{ created: boolean; summary: CampaignSummary }> {
  const existing = await env.DB.prepare(
    `SELECT campaign_id, publication_commit, content_hash
       FROM newsletter_campaigns WHERE slug = ?`,
  )
    .bind(payload.slug)
    .first<{ campaign_id: string; publication_commit: string; content_hash: string }>();

  if (existing) {
    if (
      existing.publication_commit !== payload.commit
      || existing.content_hash !== contentHash
    ) {
      throw new Error("campaign-slug-conflict");
    }
    return {
      created: false,
      summary: await getNewsletterCampaignSummary(env, existing.campaign_id),
    };
  }

  const contentJson = JSON.stringify(payload.content);
  await env.DB.batch([
    env.DB.prepare(
      `INSERT INTO newsletter_campaigns (
        campaign_id, slug, publication_commit, content_hash, content_json,
        published_at, status, recipient_count, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, 'pending', 0, ?, ?)`,
    ).bind(
      campaignId,
      payload.slug,
      payload.commit,
      contentHash,
      contentJson,
      payload.publishedAt,
      now,
      now,
    ),
    env.DB.prepare(
      `INSERT INTO newsletter_deliveries (
        campaign_id, email_hash, locale, status, attempts, created_at, updated_at
      )
      SELECT ?, email_hash, locale, 'pending', 0, ?, ?
        FROM newsletter_consents
       WHERE status = 'subscribed'`,
    ).bind(campaignId, now, now),
  ]);
  const count = await env.DB.prepare(
    "SELECT COUNT(*) AS total FROM newsletter_deliveries WHERE campaign_id = ?",
  )
    .bind(campaignId)
    .first<{ total: number }>();
  const recipientCount = Number(count?.total ?? 0);
  await env.DB.prepare(
    `UPDATE newsletter_campaigns
        SET recipient_count = ?, status = ?, updated_at = ?, completed_at = ?
      WHERE campaign_id = ?`,
  )
    .bind(
      recipientCount,
      recipientCount === 0 ? "completed" : "sending",
      now,
      recipientCount === 0 ? now : null,
      campaignId,
    )
    .run();
  return {
    created: true,
    summary: await getNewsletterCampaignSummary(env, campaignId),
  };
}

export async function getNewsletterCampaignSummary(
  env: Env,
  campaignId: string,
): Promise<CampaignSummary> {
  const campaign = await env.DB.prepare(
    `SELECT campaign_id, slug, status, recipient_count
       FROM newsletter_campaigns WHERE campaign_id = ?`,
  )
    .bind(campaignId)
    .first<{
      campaign_id: string;
      slug: string;
      status: string;
      recipient_count: number;
    }>();
  if (!campaign) throw new Error("campaign-not-found");
  const counts = await env.DB.prepare(
    `SELECT
       SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed,
       SUM(CASE WHEN status = 'skipped' THEN 1 ELSE 0 END) AS skipped,
       SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) AS failed,
       SUM(CASE WHEN status = 'unknown' THEN 1 ELSE 0 END) AS unknown,
       SUM(CASE WHEN status IN ('pending','queued','sending','retry') THEN 1 ELSE 0 END) AS pending
     FROM newsletter_deliveries WHERE campaign_id = ?`,
  )
    .bind(campaignId)
    .first<Record<string, number | null>>();
  return {
    campaignId: campaign.campaign_id,
    slug: campaign.slug,
    status: campaign.status,
    recipientCount: Number(campaign.recipient_count),
    completed: Number(counts?.completed ?? 0),
    skipped: Number(counts?.skipped ?? 0),
    failed: Number(counts?.failed ?? 0),
    unknown: Number(counts?.unknown ?? 0),
    pending: Number(counts?.pending ?? 0),
  };
}

export async function pendingNewsletterDeliveries(
  env: Env,
  now: string,
): Promise<Array<{ campaignId: string; emailHash: string }>> {
  const staleQueued = new Date(Date.parse(now) - 15 * 60 * 1_000).toISOString();
  const result = await env.DB.prepare(
    `SELECT campaign_id, email_hash
       FROM newsletter_deliveries
      WHERE (
        (status IN ('pending', 'retry') AND (next_attempt_at IS NULL OR next_attempt_at <= ?))
        OR (status = 'queued' AND last_enqueued_at < ?)
      )
      ORDER BY created_at ASC
      LIMIT 50`,
  )
    .bind(now, staleQueued)
    .all<{ campaign_id: string; email_hash: string }>();
  return result.results.map((row) => ({
    campaignId: row.campaign_id,
    emailHash: row.email_hash,
  }));
}

export async function markNewsletterQueued(
  env: Env,
  campaignId: string,
  emailHash: string,
  now: string,
): Promise<void> {
  await env.DB.prepare(
    `UPDATE newsletter_deliveries
        SET status = 'queued', last_enqueued_at = ?, updated_at = ?
      WHERE campaign_id = ? AND email_hash = ?
        AND status IN ('pending', 'retry')`,
  )
    .bind(now, now, campaignId, emailHash)
    .run();
}

export async function claimNewsletterDelivery(
  env: Env,
  campaignId: string,
  emailHash: string,
  now: string,
): Promise<boolean> {
  const result = await env.DB.prepare(
    `UPDATE newsletter_deliveries
        SET status = 'sending', attempts = attempts + 1, updated_at = ?
      WHERE campaign_id = ? AND email_hash = ?
        AND status IN ('pending', 'queued', 'retry')
        AND EXISTS (
          SELECT 1 FROM newsletter_consents c
           WHERE c.email_hash = newsletter_deliveries.email_hash
             AND c.status = 'subscribed'
        )`,
  )
    .bind(now, campaignId, emailHash)
    .run();
  return Number(result.meta.changes ?? 0) === 1;
}

export async function getNewsletterDelivery(
  env: Env,
  campaignId: string,
  emailHash: string,
): Promise<NewsletterDeliveryRow | null> {
  return env.DB.prepare(
    `SELECT d.campaign_id, d.email_hash, d.locale, d.attempts,
            p.content_json, c.encrypted_profile, c.profile_iv,
            c.encrypted_email, c.email_iv, c.status AS consent_status
       FROM newsletter_deliveries d
       JOIN newsletter_campaigns p ON p.campaign_id = d.campaign_id
       JOIN newsletter_consents c ON c.email_hash = d.email_hash
      WHERE d.campaign_id = ? AND d.email_hash = ?`,
  )
    .bind(campaignId, emailHash)
    .first<NewsletterDeliveryRow>();
}

export async function markNewsletterDelivery(
  env: Env,
  campaignId: string,
  emailHash: string,
  status: "completed" | "unknown" | "failed" | "skipped" | "retry",
  now: string,
  options: {
    messageId?: string;
    stage?: string;
    smtpCode?: number | null;
    nextAttemptAt?: string;
  } = {},
): Promise<void> {
  await env.DB.prepare(
    `UPDATE newsletter_deliveries SET
       status = ?, updated_at = ?, sent_at = ?, message_id = ?,
       failure_stage = ?, smtp_code = ?, next_attempt_at = ?
     WHERE campaign_id = ? AND email_hash = ?`,
  )
    .bind(
      status,
      now,
      status === "completed" ? now : null,
      options.messageId ?? null,
      options.stage ?? null,
      options.smtpCode ?? null,
      options.nextAttemptAt ?? null,
      campaignId,
      emailHash,
    )
    .run();
  await refreshNewsletterCampaignStatus(env, campaignId, now);
}

async function refreshNewsletterCampaignStatus(
  env: Env,
  campaignId: string,
  now: string,
): Promise<void> {
  const summary = await getNewsletterCampaignSummary(env, campaignId);
  if (summary.pending > 0) return;
  const hasErrors = summary.failed > 0 || summary.unknown > 0;
  await env.DB.prepare(
    `UPDATE newsletter_campaigns
        SET status = ?, updated_at = ?, completed_at = ?
      WHERE campaign_id = ?`,
  )
    .bind(hasErrors ? "completed_with_errors" : "completed", now, now, campaignId)
    .run();
}

export async function withdrawNewsletterConsent(
  env: Env,
  emailHash: string,
  now: string,
): Promise<boolean> {
  const affected = await env.DB.prepare(
    `SELECT DISTINCT campaign_id FROM newsletter_deliveries
      WHERE email_hash = ? AND status IN ('pending', 'queued', 'retry')`,
  )
    .bind(emailHash)
    .all<{ campaign_id: string }>();
  const result = await env.DB.prepare(
    `UPDATE newsletter_consents
        SET status = 'withdrawn', updated_at = ?
      WHERE email_hash = ?`,
  )
    .bind(now, emailHash)
    .run();
  await env.DB.prepare(
    `UPDATE newsletter_deliveries
        SET status = 'skipped', updated_at = ?, failure_stage = 'consent-withdrawn'
      WHERE email_hash = ? AND status IN ('pending', 'queued', 'retry')`,
  )
    .bind(now, emailHash)
    .run();
  for (const row of affected.results) {
    await refreshNewsletterCampaignStatus(env, row.campaign_id, now);
  }
  return Number(result.meta.changes ?? 0) === 1;
}
