import { decryptJson } from "./crypto";
import { allowedOrigins, BASE_SECURITY_HEADERS, corsHeaders, jsonResponse } from "./http";
import { prepareOrSendNewsletterCampaign } from "./newsletter";
import { getNewsletterCampaignSummary } from "./newsletter-database";
import type { Env, StoredContactProfile } from "./types";

const MAX_EXPORT_ROWS = 10_000;

interface RequestExportRow {
  request_id: string;
  locale: string;
  status: string;
  created_at: string;
  sent_at: string | null;
  download_count: number;
  newsletter_consent: number;
  encrypted_profile: string;
  profile_iv: string;
}

interface NewsletterExportRow {
  locale: string;
  consent_text_version: string;
  consented_at: string;
  updated_at: string;
  status: string;
  encrypted_profile: string | null;
  profile_iv: string | null;
  encrypted_email: string;
  email_iv: string;
}

function constantTimeEqual(left: string, right: string): boolean {
  const length = Math.max(left.length, right.length);
  let difference = left.length ^ right.length;
  for (let index = 0; index < length; index += 1) {
    difference |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  }
  return difference === 0;
}

function isAuthorised(request: Request, env: Env): boolean {
  if (!env.ADMIN_API_TOKEN || env.ADMIN_API_TOKEN.length < 32) return false;
  const expected = `Bearer ${env.ADMIN_API_TOKEN}`;
  return constantTimeEqual(request.headers.get("Authorization") ?? "", expected);
}

function safeCsvValue(value: unknown): string {
  let text = value == null ? "" : String(value);
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

export function buildCsv(headers: string[], rows: unknown[][]): string {
  return `\uFEFF${[headers, ...rows]
    .map((row) => row.map(safeCsvValue).join(";"))
    .join("\r\n")}\r\n`;
}

async function loadSummary(env: Env): Promise<Record<string, number>> {
  const [requests, subscribed, consentedRequests] = await Promise.all([
    env.DB.prepare("SELECT COUNT(*) AS total FROM gift_request_profiles")
      .first<{ total: number }>(),
    env.DB.prepare(
      "SELECT COUNT(*) AS total FROM newsletter_consents WHERE status = 'subscribed'",
    ).first<{ total: number }>(),
    env.DB.prepare(
      "SELECT COUNT(*) AS total FROM gift_request_profiles WHERE newsletter_consent = 1",
    ).first<{ total: number }>(),
  ]);
  return {
    requestsLast30Days: Number(requests?.total ?? 0),
    activeNewsletterSubscribers: Number(subscribed?.total ?? 0),
    newsletterConsentsLast30Days: Number(consentedRequests?.total ?? 0),
  };
}

async function buildRequestsExport(env: Env): Promise<string> {
  const result = await env.DB.prepare(
    `SELECT r.request_id, r.locale, r.status, r.created_at, r.sent_at,
            r.download_count, p.newsletter_consent, p.encrypted_profile, p.profile_iv
       FROM gift_request_profiles p
       JOIN gift_requests r ON r.request_id = p.request_id
      ORDER BY r.created_at DESC
      LIMIT ?`,
  )
    .bind(MAX_EXPORT_ROWS)
    .all<RequestExportRow>();

  const rows = await Promise.all(
    result.results.map(async (row) => {
      const profile = await decryptJson<StoredContactProfile>(
        env.OUTBOX_ENCRYPTION_KEY,
        row.encrypted_profile,
        row.profile_iv,
      );
      return [
        profile.name,
        profile.email,
        profile.birthday,
        row.locale.toUpperCase(),
        row.newsletter_consent ? "Sì" : "No",
        row.created_at,
        row.status,
        row.sent_at ?? "",
        row.download_count,
      ];
    }),
  );

  return buildCsv(
    [
      "Nome",
      "Email",
      "Data compleanno",
      "Lingua",
      "Newsletter",
      "Data richiesta",
      "Stato invio",
      "Data invio",
      "Download",
    ],
    rows,
  );
}

async function buildNewsletterExport(env: Env): Promise<string> {
  const result = await env.DB.prepare(
    `SELECT locale, consent_text_version, consented_at, updated_at, status,
            encrypted_profile, profile_iv, encrypted_email, email_iv
       FROM newsletter_consents
      ORDER BY consented_at DESC
      LIMIT ?`,
  )
    .bind(MAX_EXPORT_ROWS)
    .all<NewsletterExportRow>();

  const rows = await Promise.all(
    result.results.map(async (row) => {
      let profile: StoredContactProfile;
      if (row.encrypted_profile && row.profile_iv) {
        profile = await decryptJson<StoredContactProfile>(
          env.OUTBOX_ENCRYPTION_KEY,
          row.encrypted_profile,
          row.profile_iv,
        );
      } else {
        const legacy = await decryptJson<{ email: string }>(
          env.OUTBOX_ENCRYPTION_KEY,
          row.encrypted_email,
          row.email_iv,
        );
        profile = { name: "", email: legacy.email, birthday: "" };
      }
      return [
        profile.name,
        profile.email,
        profile.birthday,
        row.locale.toUpperCase(),
        row.status === "subscribed" ? "Iscritto" : "Revocato",
        row.consented_at,
        row.updated_at,
        row.consent_text_version,
      ];
    }),
  );

  return buildCsv(
    [
      "Nome",
      "Email",
      "Data compleanno",
      "Lingua",
      "Stato newsletter",
      "Data consenso",
      "Ultimo aggiornamento",
      "Versione consenso",
    ],
    rows,
  );
}

function csvResponse(body: string, filename: string, origin: string, env: Env): Response {
  return new Response(body, {
    status: 200,
    headers: {
      ...BASE_SECURITY_HEADERS,
      ...corsHeaders(origin, env.ALLOWED_ORIGINS),
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Type": "text/csv; charset=UTF-8",
    },
  });
}

export async function handleAdminRequest(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get("Origin") ?? "";
  if (origin && !allowedOrigins(env.ALLOWED_ORIGINS).has(origin)) {
    return jsonResponse({ success: false }, 403, origin, env.ALLOWED_ORIGINS);
  }
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(origin, env.ALLOWED_ORIGINS),
    });
  }
  if (!isAuthorised(request, env)) {
    return jsonResponse({ success: false }, 401, origin, env.ALLOWED_ORIGINS);
  }

  const pathname = new URL(request.url).pathname;
  try {
    if (request.method === "POST" && pathname === "/v1/admin/newsletter/campaigns") {
      const result = await prepareOrSendNewsletterCampaign(request, env);
      return jsonResponse(result.payload, result.status, origin, env.ALLOWED_ORIGINS);
    }
    const campaignMatch = /^\/v1\/admin\/newsletter\/campaigns\/([a-f0-9]{64})$/.exec(pathname);
    if (request.method === "GET" && campaignMatch) {
      return jsonResponse(
        {
          success: true,
          campaign: await getNewsletterCampaignSummary(env, campaignMatch[1]),
        },
        200,
        origin,
        env.ALLOWED_ORIGINS,
      );
    }
    if (request.method !== "GET") {
      return jsonResponse({ success: false }, 405, origin, env.ALLOWED_ORIGINS);
    }
    if (pathname === "/v1/admin/summary") {
      return jsonResponse(
        { success: true, ...(await loadSummary(env)) },
        200,
        origin,
        env.ALLOWED_ORIGINS,
      );
    }
    if (pathname === "/v1/admin/export/requests") {
      return csvResponse(
        await buildRequestsExport(env),
        "richieste-libro.csv",
        origin,
        env,
      );
    }
    if (pathname === "/v1/admin/export/newsletter") {
      return csvResponse(
        await buildNewsletterExport(env),
        "iscritti-newsletter.csv",
        origin,
        env,
      );
    }
  } catch {
    return jsonResponse({ success: false }, 500, origin, env.ALLOWED_ORIGINS);
  }
  return jsonResponse({ success: false }, 404, origin, env.ALLOWED_ORIGINS);
}
