import { isLocale, LOCALES } from "./config";
import { encryptJson, hmacHex, randomToken, sha256Hex } from "./crypto";
import {
  hasRecentRequest,
  insertGiftRequest,
  isRateLimited,
  markEnqueueFailed,
  markQueued,
} from "./database";
import { downloadBook, showDownload } from "./downloads";
import { allowedOrigins, corsHeaders, jsonResponse } from "./http";
import { consumeMailQueue, maintainOutbox } from "./mail-queue";
import { handleAdminRequest } from "./admin";
import { verifyTurnstile } from "./turnstile";
import type { Env, GiftMailPayload, MailQueueMessage } from "./types";
import { parseGiftRequest, ValidationFailure } from "./validation";

const MAX_REQUEST_BYTES = 12_000;
const NEWSLETTER_CONSENT_VERSION = "2026-08-16-v1";

function apiOrigin(request: Request): string {
  return request.headers.get("Origin") ?? "";
}

async function createGiftRequest(
  request: Request,
  env: Env,
  localeValue: string,
): Promise<Response> {
  const origin = apiOrigin(request);
  if (!allowedOrigins(env.ALLOWED_ORIGINS).has(origin)) {
    return jsonResponse({ success: false }, 403, origin, env.ALLOWED_ORIGINS);
  }
  if (!isLocale(localeValue)) {
    return jsonResponse({ success: false }, 404, origin, env.ALLOWED_ORIGINS);
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_REQUEST_BYTES) {
    return jsonResponse({ success: false }, 413, origin, env.ALLOWED_ORIGINS);
  }

  let input;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
      return jsonResponse({ success: false }, 413, origin, env.ALLOWED_ORIGINS);
    }
    input = parseGiftRequest(JSON.parse(rawBody));
  } catch (error) {
    const field = error instanceof ValidationFailure ? error.field : "body";
    return jsonResponse({ success: false, field }, 400, origin, env.ALLOWED_ORIGINS);
  }

  const remoteIp = request.headers.get("CF-Connecting-IP") ?? "";
  const hostnames = env.TURNSTILE_ALLOWED_HOSTNAMES.split(",")
    .map((hostname) => hostname.trim().toLowerCase())
    .filter(Boolean);
  const turnstileValid = await verifyTurnstile(
    env.TURNSTILE_SECRET,
    input.turnstileToken,
    remoteIp,
    hostnames,
  );
  if (!turnstileValid) {
    return jsonResponse({ success: false, field: "turnstile" }, 400, origin, env.ALLOWED_ORIGINS);
  }

  const now = new Date();
  const nowIso = now.toISOString();
  const emailHash = await hmacHex(env.DATA_HASH_KEY, input.email);
  const ipHash = await hmacHex(env.DATA_HASH_KEY, remoteIp || "unknown");

  if (await isRateLimited(env, emailHash, ipHash, now)) {
    return jsonResponse({ success: false }, 429, origin, env.ALLOWED_ORIGINS);
  }
  if (await hasRecentRequest(env, emailHash, localeValue, now)) {
    return jsonResponse({ success: true }, 202, origin, env.ALLOWED_ORIGINS);
  }

  const requestId = crypto.randomUUID();
  const downloadToken = randomToken();
  const downloadTokenHash = await sha256Hex(downloadToken);
  const downloadExpiresAt = new Date(now.getTime() + 72 * 60 * 60 * 1_000).toISOString();
  const mailPayload: GiftMailPayload = {
    requestId,
    name: input.name,
    email: input.email,
    birthday: input.birthday,
    locale: localeValue,
    downloadToken,
  };
  const encrypted = await encryptJson(env.OUTBOX_ENCRYPTION_KEY, mailPayload);
  const contactProfile = {
    name: input.name,
    email: input.email,
    birthday: input.birthday,
  };
  const encryptedProfile = await encryptJson(env.OUTBOX_ENCRYPTION_KEY, contactProfile);
  const newsletterData = input.newsletterConsent
    ? {
        email: await encryptJson(env.OUTBOX_ENCRYPTION_KEY, { email: input.email }),
        profile: await encryptJson(env.OUTBOX_ENCRYPTION_KEY, contactProfile),
      }
    : null;

  await insertGiftRequest(env, {
    requestId,
    emailHash,
    ipHash,
    locale: localeValue,
    assetKey: LOCALES[localeValue].assetKey,
    downloadTokenHash,
    downloadExpiresAt,
    encryptedPayload: encrypted.encryptedPayload,
    payloadIv: encrypted.payloadIv,
    encryptedProfile: encryptedProfile.encryptedPayload,
    profileIv: encryptedProfile.payloadIv,
    newsletterConsent: newsletterData
      ? {
          encryptedEmail: newsletterData.email.encryptedPayload,
          emailIv: newsletterData.email.payloadIv,
          encryptedProfile: newsletterData.profile.encryptedPayload,
          profileIv: newsletterData.profile.payloadIv,
          consentTextVersion: NEWSLETTER_CONSENT_VERSION,
        }
      : null,
    createdAt: nowIso,
  });

  try {
    await env.MAIL_QUEUE.send({ requestId });
    await markQueued(env, requestId, new Date().toISOString());
  } catch {
    await markEnqueueFailed(env, requestId, new Date().toISOString());
  }

  return jsonResponse({ success: true }, 202, origin, env.ALLOWED_ORIGINS);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/v1/admin/")) {
      return handleAdminRequest(request, env);
    }
    const giftMatch = /^\/v1\/gift-requests\/(it|en|es)$/.exec(url.pathname);
    const downloadMatch = /^\/d\/([A-Za-z0-9_-]{40,80})$/.exec(url.pathname);
    const fileMatch = /^\/d\/([A-Za-z0-9_-]{40,80})\/download$/.exec(url.pathname);
    const emailAssetMatch = /^\/email-assets\/(cover-(?:it|en|es)\.jpg|signature\.png|instagram\.png)$/.exec(url.pathname);

    if (request.method === "GET" && emailAssetMatch) {
      const assetResponse = await env.ASSETS.fetch(
        new URL(`/email/${emailAssetMatch[1]}`, env.PUBLIC_BASE_URL),
      );
      if (!assetResponse.ok || !assetResponse.body) return new Response("Not found", { status: 404 });
      return new Response(assetResponse.body, {
        headers: {
          "Cache-Control": "public, max-age=604800, immutable",
          "Content-Type": assetResponse.headers.get("Content-Type") || "application/octet-stream",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }

    if (request.method === "OPTIONS" && giftMatch) {
      const origin = apiOrigin(request);
      if (!allowedOrigins(env.ALLOWED_ORIGINS).has(origin)) {
        return new Response(null, { status: 403 });
      }
      return new Response(null, { status: 204, headers: corsHeaders(origin, env.ALLOWED_ORIGINS) });
    }
    if (request.method === "POST" && giftMatch) {
      return createGiftRequest(request, env, giftMatch[1]);
    }
    if (request.method === "GET" && downloadMatch) {
      return showDownload(downloadMatch[1], env);
    }
    if (request.method === "POST" && fileMatch) {
      return downloadBook(fileMatch[1], env);
    }
    if (request.method === "GET" && url.pathname === "/health") {
      return Response.json({ status: "ok" }, { headers: { "Cache-Control": "no-store" } });
    }

    return new Response("Not found", { status: 404 });
  },

  async queue(batch: MessageBatch<MailQueueMessage>, env: Env): Promise<void> {
    await consumeMailQueue(batch, env);
  },

  async scheduled(_controller: ScheduledController, env: Env): Promise<void> {
    await maintainOutbox(env);
  },
} satisfies ExportedHandler<Env, MailQueueMessage>;
