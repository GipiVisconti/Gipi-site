import type { Locale } from "./config";

export interface Env {
  DB: D1Database;
  MAIL_QUEUE: Queue<MailQueueMessage>;
  ASSETS: Fetcher;
  PROTON_SMTP_TOKEN: string;
  TURNSTILE_SECRET: string;
  DATA_HASH_KEY: string;
  OUTBOX_ENCRYPTION_KEY: string;
  ADMIN_API_TOKEN: string;
  PUBLIC_BASE_URL: string;
  ALLOWED_ORIGINS: string;
  TURNSTILE_ALLOWED_HOSTNAMES: string;
}

export interface StoredContactProfile {
  name: string;
  email: string;
  birthday: string;
}

export interface GiftRequestInput {
  name: string;
  email: string;
  birthday: string;
  newsletterConsent: boolean;
  turnstileToken: string;
}

export interface GiftMailPayload {
  requestId: string;
  name: string;
  email: string;
  birthday: string;
  locale: Locale;
  downloadToken: string;
}

export interface MailQueueMessage {
  requestId: string;
  kind?: "gift" | "admin-notification";
}

export interface AdminNotificationRow {
  request_id: string;
  encrypted_profile: string;
  profile_iv: string;
  newsletter_consent: number;
  locale: Locale;
  created_at: string;
  attempts: number;
}

export interface OutboxRow {
  request_id: string;
  encrypted_payload: string | null;
  payload_iv: string | null;
  status: string;
  attempts: number;
}

export interface DownloadRow {
  request_id: string;
  locale: Locale;
  asset_key: string;
  download_expires_at: string;
  download_count: number;
}
