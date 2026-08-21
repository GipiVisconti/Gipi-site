import { LOCALES, type Locale } from "./config";
import { findDownload, consumeDownload } from "./database";
import { sha256Hex } from "./crypto";
import { htmlResponse } from "./http";
import type { Env } from "./types";

function pageShell(locale: Locale, content: string): string {
  return `<!doctype html>
<html lang="${locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Gipi Visconti</title>
  <style>
    body{margin:0;background:#faf9f6;color:#2c2a29;font:17px/1.6 system-ui,sans-serif}
    main{box-sizing:border-box;width:min(680px,calc(100% - 32px));margin:64px auto;padding:36px;background:#fff;border:1px solid #e8e4db;border-radius:18px;text-align:center}
    h1{font-family:Georgia,serif;font-size:34px;font-weight:500;margin:0 0 16px}
    p{color:#67645f;margin:0 0 26px}
    button,a{display:inline-block;border:0;border-radius:999px;background:#c18c5d;color:#fff;padding:14px 24px;font:inherit;font-weight:700;text-decoration:none;cursor:pointer}
  </style>
</head>
<body><main>${content}</main></body>
</html>`;
}

function expiredPage(locale: Locale): Response {
  const copy = LOCALES[locale];
  return htmlResponse(
    pageShell(
      locale,
      `<h1>${copy.downloadExpiredTitle}</h1><p>${copy.downloadExpiredBody}</p><a href="https://www.gipivisconti.com${copy.landingPath}">${copy.downloadBack}</a>`,
    ),
    410,
  );
}

export async function showDownload(token: string, env: Env): Promise<Response> {
  if (!/^[A-Za-z0-9_-]{40,80}$/.test(token)) return new Response("Not found", { status: 404 });
  const row = await findDownload(env, await sha256Hex(token));
  if (!row) return new Response("Not found", { status: 404 });
  const locale = row.locale;
  if (row.download_expires_at <= new Date().toISOString() || row.download_count >= 5) {
    return expiredPage(locale);
  }

  const copy = LOCALES[locale];
  return htmlResponse(
    pageShell(
      locale,
      `<h1>${copy.downloadTitle}</h1><p>${copy.downloadBody}</p><form method="post" action="/d/${encodeURIComponent(token)}/download"><button type="submit">${copy.downloadButton}</button></form>`,
    ),
  );
}

export async function downloadBook(token: string, env: Env): Promise<Response> {
  if (!/^[A-Za-z0-9_-]{40,80}$/.test(token)) return new Response("Not found", { status: 404 });
  const tokenHash = await sha256Hex(token);
  const row = await findDownload(env, tokenHash);
  if (!row) return new Response("Not found", { status: 404 });
  if (row.download_expires_at <= new Date().toISOString() || row.download_count >= 5) {
    return expiredPage(row.locale);
  }

  const assetUrl = new URL(`/${row.asset_key}`, env.PUBLIC_BASE_URL);
  const assetResponse = await env.ASSETS.fetch(assetUrl);
  if (!assetResponse.ok || !assetResponse.body) {
    return new Response("File temporarily unavailable", { status: 503 });
  }
  if (!(await consumeDownload(env, tokenHash, new Date().toISOString()))) {
    return expiredPage(row.locale);
  }

  return new Response(assetResponse.body, {
    headers: {
      "Cache-Control": "private, no-store",
      "Content-Disposition": `attachment; filename="${LOCALES[row.locale].downloadFilename}"`,
      ...(assetResponse.headers.get("Content-Length")
        ? { "Content-Length": assetResponse.headers.get("Content-Length") as string }
        : {}),
      "Content-Type": assetResponse.headers.get("Content-Type") || "application/pdf",
      "Referrer-Policy": "no-referrer",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
