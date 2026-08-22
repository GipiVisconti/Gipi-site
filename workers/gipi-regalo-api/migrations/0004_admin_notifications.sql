PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS admin_notifications (
  request_id TEXT PRIMARY KEY REFERENCES gift_requests(request_id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (
    status IN ('pending', 'queued', 'sending', 'retry', 'completed', 'unknown', 'failed')
  ),
  attempts INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  next_attempt_at TEXT,
  last_enqueued_at TEXT,
  message_id TEXT,
  failure_stage TEXT,
  smtp_code INTEGER
);

CREATE INDEX IF NOT EXISTS idx_admin_notifications_pending
  ON admin_notifications(status, next_attempt_at, last_enqueued_at);
