PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS gift_requests (
  request_id TEXT PRIMARY KEY,
  email_hash TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  locale TEXT NOT NULL CHECK (locale IN ('it', 'en', 'es')),
  asset_key TEXT NOT NULL,
  status TEXT NOT NULL CHECK (
    status IN ('accepted', 'queued', 'sending', 'sent', 'unknown', 'failed')
  ),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  sent_at TEXT,
  message_id TEXT,
  failure_stage TEXT,
  smtp_code INTEGER,
  download_token_hash TEXT NOT NULL UNIQUE,
  download_expires_at TEXT NOT NULL,
  download_count INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_gift_requests_email_created
  ON gift_requests(email_hash, created_at);
CREATE INDEX IF NOT EXISTS idx_gift_requests_ip_created
  ON gift_requests(ip_hash, created_at);
CREATE INDEX IF NOT EXISTS idx_gift_requests_created
  ON gift_requests(created_at);

CREATE TABLE IF NOT EXISTS mail_outbox (
  request_id TEXT PRIMARY KEY REFERENCES gift_requests(request_id) ON DELETE CASCADE,
  encrypted_payload TEXT,
  payload_iv TEXT,
  status TEXT NOT NULL CHECK (
    status IN ('pending', 'queued', 'sending', 'retry', 'completed', 'unknown', 'failed')
  ),
  attempts INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  next_attempt_at TEXT,
  last_enqueued_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_mail_outbox_pending
  ON mail_outbox(status, next_attempt_at, last_enqueued_at);
