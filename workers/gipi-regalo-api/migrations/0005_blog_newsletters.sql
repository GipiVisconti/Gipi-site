PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS newsletter_campaigns (
  campaign_id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  publication_commit TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  content_json TEXT NOT NULL,
  published_at TEXT NOT NULL,
  status TEXT NOT NULL CHECK (
    status IN ('pending', 'sending', 'completed', 'completed_with_errors')
  ),
  recipient_count INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  completed_at TEXT
);

CREATE TABLE IF NOT EXISTS newsletter_deliveries (
  campaign_id TEXT NOT NULL REFERENCES newsletter_campaigns(campaign_id) ON DELETE CASCADE,
  email_hash TEXT NOT NULL REFERENCES newsletter_consents(email_hash) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('it', 'en', 'es')),
  status TEXT NOT NULL CHECK (
    status IN ('pending', 'queued', 'sending', 'retry', 'completed', 'unknown', 'failed', 'skipped')
  ),
  attempts INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  next_attempt_at TEXT,
  last_enqueued_at TEXT,
  sent_at TEXT,
  message_id TEXT,
  failure_stage TEXT,
  smtp_code INTEGER,
  PRIMARY KEY (campaign_id, email_hash)
);

CREATE INDEX IF NOT EXISTS idx_newsletter_deliveries_pending
  ON newsletter_deliveries(status, next_attempt_at, last_enqueued_at);
