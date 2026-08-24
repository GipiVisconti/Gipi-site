import { isLocale, type Locale } from "./config";
import { hmacHex, sha256Hex } from "./crypto";
import { htmlResponse } from "./http";
import { buildNewsletterEmailContent } from "./message";
import {
  createNewsletterCampaign,
  getNewsletterCampaignSummary,
  markNewsletterQueued,
  pendingNewsletterDeliveries,
  withdrawNewsletterConsent,
} from "./newsletter-database";
import type {
  Env,
  NewsletterArticleContent,
  NewsletterCampaignPayload,
} from "./types";

const LOCALE_KEYS: Locale[] = ["it", "en", "es"];
const MAX_CAMPAIGN_BYTES = 30_000;

function constantTimeEqual(left: string, right: string): boolean {
  const length = Math.max(left.length, right.length);
  let difference = left.length ^ right.length;
  for (let index = 0; index < length; index += 1) {
    difference |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  }
  return difference === 0;
}

function validateArticleContent(
  value: unknown,
  locale: Locale,
  slug: string,
): NewsletterArticleContent {
  if (!value || typeof value !== "object") throw new Error("invalid-content");
  const candidate = value as Partial<NewsletterArticleContent>;
  if (
    typeof candidate.title !== "string"
    || candidate.title.trim().length < 3
    || candidate.title.length > 220
    || typeof candidate.excerpt !== "string"
    || candidate.excerpt.trim().length < 10
    || candidate.excerpt.length > 1_200
    || typeof candidate.url !== "string"
  ) {
    throw new Error("invalid-content");
  }
  const url = new URL(candidate.url);
  if (
    url.protocol !== "https:"
    || !["gipivisconti.com", "www.gipivisconti.com"].includes(url.hostname)
    || url.pathname !== `/${locale}/blog/${slug}`
  ) {
    throw new Error("invalid-article-url");
  }
  return {
    title: candidate.title.trim(),
    excerpt: candidate.excerpt.trim(),
    url: url.toString(),
  };
}

export function parseNewsletterCampaignPayload(
  value: unknown,
): NewsletterCampaignPayload {
  if (!value || typeof value !== "object") throw new Error("invalid-campaign");
  const candidate = value as Partial<NewsletterCampaignPayload>;
  if (
    typeof candidate.slug !== "string"
    || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(candidate.slug)
    || typeof candidate.commit !== "string"
    || !/^[a-f0-9]{7,64}$/i.test(candidate.commit)
    || typeof candidate.publishedAt !== "string"
    || Number.isNaN(Date.parse(candidate.publishedAt))
    || !candidate.content
  ) {
    throw new Error("invalid-campaign");
  }
  const content = Object.fromEntries(
    LOCALE_KEYS.map((locale) => [
      locale,
      validateArticleContent(candidate.content?.[locale], locale, candidate.slug as string),
    ]),
  ) as Record<Locale, NewsletterArticleContent>;
  return {
    slug: candidate.slug,
    commit: candidate.commit.toLowerCase(),
    publishedAt: new Date(candidate.publishedAt).toISOString(),
    content,
  };
}

export function buildNewsletterPreviews(
  payload: NewsletterCampaignPayload,
  publicBaseUrl: string,
): Record<Locale, ReturnType<typeof buildNewsletterEmailContent>> {
  const unsubscribeUrl = `${publicBaseUrl.replace(/\/+$/, "")}/newsletter/unsubscribe/${"0".repeat(64)}/${"0".repeat(64)}`;
  return Object.fromEntries(
    LOCALE_KEYS.map((locale) => [
      locale,
      buildNewsletterEmailContent({
        recipient: "anteprima@example.com",
        name: "Luca",
        locale,
        article: payload.content[locale],
        unsubscribeUrl,
      }),
    ]),
  ) as Record<Locale, ReturnType<typeof buildNewsletterEmailContent>>;
}

export async function enqueuePendingNewsletters(env: Env): Promise<number> {
  const now = new Date().toISOString();
  const pending = await pendingNewsletterDeliveries(env, now);
  let queued = 0;
  for (const delivery of pending) {
    try {
      await env.NEWSLETTER_QUEUE.send({
        kind: "newsletter",
        campaignId: delivery.campaignId,
        emailHash: delivery.emailHash,
      });
      await markNewsletterQueued(
        env,
        delivery.campaignId,
        delivery.emailHash,
        new Date().toISOString(),
      );
      queued += 1;
    } catch {
      // Il trigger programmato riprenderà le consegne rimaste pendenti.
    }
  }
  return queued;
}

export async function prepareOrSendNewsletterCampaign(
  request: Request,
  env: Env,
): Promise<{ status: number; payload: unknown }> {
  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > MAX_CAMPAIGN_BYTES) {
    return { status: 413, payload: { success: false } };
  }
  let campaign: NewsletterCampaignPayload;
  try {
    campaign = parseNewsletterCampaignPayload(JSON.parse(rawBody));
  } catch {
    return { status: 400, payload: { success: false } };
  }
  const previews = buildNewsletterPreviews(campaign, env.PUBLIC_BASE_URL);
  if (env.NEWSLETTER_AUTOMATION_MODE !== "live") {
    return {
      status: 200,
      payload: {
        success: true,
        mode: "preview",
        sent: false,
        previews,
      },
    };
  }

  const canonical = JSON.stringify(campaign.content);
  const contentHash = await sha256Hex(canonical);
  const campaignId = await sha256Hex(
    `newsletter:${campaign.slug}:${campaign.commit}:${contentHash}`,
  );
  try {
    const result = await createNewsletterCampaign(
      env,
      campaignId,
      contentHash,
      campaign,
      new Date().toISOString(),
    );
    const queued = await enqueuePendingNewsletters(env);
    return {
      status: result.created ? 201 : 200,
      payload: {
        success: true,
        mode: "live",
        created: result.created,
        queued,
        campaign: await getNewsletterCampaignSummary(env, campaignId),
      },
    };
  } catch (error) {
    if (error instanceof Error && error.message === "campaign-slug-conflict") {
      return { status: 409, payload: { success: false, error: "campaign-slug-conflict" } };
    }
    throw error;
  }
}

const UNSUBSCRIBE_COPY = {
  it: {
    title: "Annulla l’iscrizione",
    question: "Vuoi annullare l’iscrizione alla newsletter di Gipi Visconti?",
    button: "Conferma",
    done: "L’iscrizione alla newsletter è stata annullata.",
    invalid: "Questo collegamento non è valido.",
  },
  en: {
    title: "Unsubscribe",
    question: "Would you like to unsubscribe from the Gipi Visconti newsletter?",
    button: "Confirm",
    done: "You have been unsubscribed from the newsletter.",
    invalid: "This link is not valid.",
  },
  es: {
    title: "Darse de baja",
    question: "¿Quieres darte de baja de la newsletter de Gipi Visconti?",
    button: "Confirmar",
    done: "Tu suscripción a la newsletter ha sido cancelada.",
    invalid: "Este enlace no es válido.",
  },
} as const;

function unsubscribePage(locale: Locale, message: string, showButton: boolean): Response {
  const copy = UNSUBSCRIBE_COPY[locale];
  return htmlResponse(`<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${copy.title}</title></head><body style="margin:0;background:#faf9f6;color:#2c2a29;font-family:Arial,sans-serif"><main style="max-width:560px;margin:12vh auto;padding:34px;background:#fff;border:1px solid #e8e4db;border-radius:14px;text-align:center"><h1>${copy.title}</h1><p style="line-height:1.6">${message}</p>${showButton ? `<form method="post"><button style="border:0;border-radius:24px;background:#c9905e;color:#fff;padding:13px 24px;font-weight:700">${copy.button}</button></form>` : ""}</main></body></html>`);
}

export async function handleNewsletterUnsubscribe(
  request: Request,
  env: Env,
  emailHash: string,
  signature: string,
): Promise<Response> {
  const row = await env.DB.prepare(
    "SELECT locale FROM newsletter_consents WHERE email_hash = ?",
  )
    .bind(emailHash)
    .first<{ locale: string }>();
  const locale = row && isLocale(row.locale) ? row.locale : "it";
  const expected = await hmacHex(env.DATA_HASH_KEY, `newsletter-unsubscribe:${emailHash}`);
  if (!constantTimeEqual(signature, expected) || !row) {
    return unsubscribePage(locale, UNSUBSCRIBE_COPY[locale].invalid, false);
  }
  if (request.method === "GET") {
    return unsubscribePage(locale, UNSUBSCRIBE_COPY[locale].question, true);
  }
  if (request.method === "POST") {
    await withdrawNewsletterConsent(env, emailHash, new Date().toISOString());
    return unsubscribePage(locale, UNSUBSCRIBE_COPY[locale].done, false);
  }
  return new Response("Method not allowed", { status: 405 });
}
