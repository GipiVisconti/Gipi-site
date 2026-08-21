PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS gift_request_profiles (
  request_id TEXT PRIMARY KEY REFERENCES gift_requests(request_id) ON DELETE CASCADE,
  encrypted_profile TEXT NOT NULL,
  profile_iv TEXT NOT NULL,
  newsletter_consent INTEGER NOT NULL CHECK (newsletter_consent IN (0, 1)),
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_gift_request_profiles_created
  ON gift_request_profiles(created_at);

ALTER TABLE newsletter_consents ADD COLUMN encrypted_profile TEXT;
ALTER TABLE newsletter_consents ADD COLUMN profile_iv TEXT;
