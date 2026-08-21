CREATE TABLE IF NOT EXISTS newsletter_consents (
  email_hash TEXT PRIMARY KEY,
  encrypted_email TEXT NOT NULL,
  email_iv TEXT NOT NULL,
  locale TEXT NOT NULL CHECK (locale IN ('it', 'en', 'es')),
  consent_text_version TEXT NOT NULL,
  consented_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'subscribed' CHECK (status IN ('subscribed', 'withdrawn')),
  source_request_id TEXT REFERENCES gift_requests(request_id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_newsletter_consents_status
  ON newsletter_consents(status, consented_at);
