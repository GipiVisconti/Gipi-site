import { LOCALES, type Locale } from "./config";
import type { NewsletterArticleContent } from "./types";

const CRLF = "\r\n";
export const SMTP_USERNAME = "info@gipivisconti.com";

export function isSafeAsciiEmail(value: string): boolean {
  if (value.length < 3 || value.length > 254 || /[\r\n]/.test(value)) return false;
  return /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i.test(value);
}

export function utf8ToBase64(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  const chunkSize = 0x8000;

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }

  return btoa(binary);
}

export function wrapBase64(value: string): string {
  return value.match(/.{1,76}/g)?.join(CRLF) ?? "";
}

export function encodeHeader(value: string): string {
  return `=?UTF-8?B?${utf8ToBase64(value)}?=`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export interface GiftMessageInput {
  recipient: string;
  name: string;
  locale: Locale;
  downloadUrl: string;
  now?: Date;
}

export interface GiftMessage {
  messageId: string;
  source: string;
}

export interface GiftEmailContent {
  textBody: string;
  htmlBody: string;
}

export interface AdminNotificationMessageInput {
  name: string;
  email: string;
  birthday: string;
  locale: Locale;
  newsletterConsent: boolean;
  createdAt: string;
  now?: Date;
}

export interface NewsletterMessageInput {
  recipient: string;
  name: string;
  locale: Locale;
  article: NewsletterArticleContent;
  unsubscribeUrl: string;
  now?: Date;
}

const LINKEDIN_URL = "https://www.linkedin.com/in/gipi-visconti";
const INSTAGRAM_URL = "https://www.instagram.com/gipi_visconti";

function emphasiseBookTitle(value: string): string {
  return escapeHtml(value).replace("Lionel Messi", "<strong>Lionel Messi</strong>");
}

export function buildGiftEmailContent(input: GiftMessageInput): GiftEmailContent {
  const copy = LOCALES[input.locale];
  const baseUrl = new URL(input.downloadUrl).origin;
  const coverUrl = `${baseUrl}/email-assets/cover-${input.locale}.jpg`;
  const signatureUrl = `${baseUrl}/email-assets/signature.png`;
  const instagramIconUrl = `${baseUrl}/email-assets/instagram.png`;
  const greeting = copy.emailGreeting(input.name);
  const textBody = [
    greeting,
    "",
    copy.emailThanks,
    "",
    copy.emailBody,
    "",
    `${copy.emailButton}: ${input.downloadUrl}`,
    "",
    copy.emailExpiry,
    "",
    copy.emailFeedback,
    "",
    copy.emailReply,
    "",
    copy.emailSignoff,
    "Gipi Visconti",
    "",
    copy.emailIgnore,
  ].join("\n");
  const htmlBody = `<!doctype html>
<html lang="${input.locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    @media only screen and (max-width:680px){.email-shell{width:100%!important}.email-pad{padding-left:20px!important;padding-right:20px!important}.email-title{font-size:27px!important}.email-copy{font-size:16px!important}.email-button{display:block!important;text-align:center!important}}
  </style>
</head>
<body style="margin:0;padding:0;background:#ffffff;color:#2c2a29;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#ffffff;">
    <tr>
      <td align="center" class="email-pad" style="padding:38px 24px 44px;">
        <table role="presentation" width="640" cellspacing="0" cellpadding="0" border="0" class="email-shell" style="width:640px;max-width:640px;">
          <tr>
            <td align="center">
              <h1 class="email-title" style="margin:0 0 8px;font-size:30px;line-height:1.25;color:#2c2a29;font-weight:700;">${escapeHtml(greeting)}</h1>
              <p style="margin:0 0 28px;font-size:18px;line-height:1.5;color:#2c2a29;">${emphasiseBookTitle(copy.emailThanks)}</p>
              <img src="${escapeHtml(coverUrl)}" width="600" alt="${escapeHtml(copy.emailCoverAlt)}" style="display:block;width:100%;max-width:600px;height:auto;border:0;border-radius:10px;">
            </td>
          </tr>
          <tr>
            <td class="email-copy" style="padding:34px 20px 0;font-size:17px;line-height:1.65;color:#3f3d3a;">
              <p style="margin:0 0 28px;">${escapeHtml(copy.emailBody)}</p>
              <p style="margin:0 0 18px;text-align:center;">
                <a href="${escapeHtml(input.downloadUrl)}" class="email-button" style="display:inline-block;background:#222222;color:#ffffff;text-decoration:none;padding:14px 24px;border-radius:4px;font-weight:700;">${escapeHtml(copy.emailButton)}</a>
              </p>
              <p style="margin:0 0 34px;text-align:center;font-size:13px;line-height:1.55;color:#75736e;">${escapeHtml(copy.emailExpiry)}</p>
              <div style="height:1px;background:#c8c5c0;margin:0 0 34px;font-size:1px;line-height:1px;">&nbsp;</div>
              <p style="margin:0 0 22px;">${escapeHtml(copy.emailFeedback)}</p>
              <p style="margin:0 0 38px;">${escapeHtml(copy.emailReply)}</p>
              <p style="margin:0 0 10px;">${escapeHtml(copy.emailSignoff)}</p>
              <p style="margin:0;text-align:center;">
                <img src="${escapeHtml(signatureUrl)}" width="240" alt="Gipi Visconti" style="display:inline-block;width:240px;max-width:70%;height:auto;border:0;">
              </p>
              <p style="margin:20px 0 34px;text-align:center;">
                <a href="${LINKEDIN_URL}" aria-label="LinkedIn" style="display:inline-block;width:34px;height:34px;line-height:34px;margin:0 5px;background:#0a66c2;color:#ffffff;text-decoration:none;border-radius:4px;font-size:20px;font-weight:700;text-align:center;">in</a>
                <a href="${INSTAGRAM_URL}" aria-label="Instagram" style="display:inline-block;width:34px;height:34px;margin:0 5px;text-decoration:none;vertical-align:top;">
                  <img src="${escapeHtml(instagramIconUrl)}" width="34" height="34" alt="Instagram" style="display:block;width:34px;height:34px;border:0;border-radius:8px;">
                </a>
              </p>
              <p style="margin:0;text-align:center;font-size:12px;line-height:1.55;color:#8a8781;">${escapeHtml(copy.emailIgnore)}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { textBody, htmlBody };
}

export function buildGiftMessage(input: GiftMessageInput): GiftMessage {
  if (!isSafeAsciiEmail(input.recipient)) throw new Error("invalid-recipient");

  const copy = LOCALES[input.locale];
  const now = input.now ?? new Date();
  const messageId = `${crypto.randomUUID()}@gipivisconti.com`;
  const boundary = `gipi-${crypto.randomUUID()}`;
  const { textBody, htmlBody } = buildGiftEmailContent(input);

  const headers = [
    `From: Gipi Visconti <${SMTP_USERNAME}>`,
    `To: <${input.recipient}>`,
    `Date: ${now.toUTCString()}`,
    `Message-ID: <${messageId}>`,
    `Subject: ${encodeHeader(copy.emailSubject)}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "Auto-Submitted: auto-generated",
    "X-Auto-Response-Suppress: All",
  ];
  const body = [
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    wrapBase64(utf8ToBase64(textBody)),
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    wrapBase64(utf8ToBase64(htmlBody)),
    `--${boundary}--`,
  ];

  return {
    messageId,
    source: `${headers.join(CRLF)}${CRLF}${CRLF}${body.join(CRLF)}`,
  };
}

const NEWSLETTER_COPY = {
  it: {
    subject: (title: string) => `Dal blog di Gipi: ${title}`,
    greeting: (name: string) => `Ciao${name ? ` ${name}` : ""},`,
    intro: "ecco il mio nuovo articolo pubblicato sul blog:",
    button: "Leggi l’articolo",
    reply: "Se ti va, puoi rispondere a questa email e raccontarmi cosa ne pensi.",
    signoff: "Un caro saluto,",
    reason: "Ricevi questa email perché hai scelto di iscriverti alla newsletter su gipivisconti.com.",
    unsubscribe: "Annulla l’iscrizione",
  },
  en: {
    subject: (title: string) => `From Gipi’s blog: ${title}`,
    greeting: (name: string) => `Hello${name ? ` ${name}` : ""},`,
    intro: "here is my new article, now published on the blog:",
    button: "Read the article",
    reply: "If you would like to, you can reply to this email and tell me what you think.",
    signoff: "Warm regards,",
    reason: "You are receiving this email because you chose to subscribe to the newsletter on gipivisconti.com.",
    unsubscribe: "Unsubscribe",
  },
  es: {
    subject: (title: string) => `Desde el blog de Gipi: ${title}`,
    greeting: (name: string) => `Hola${name ? ` ${name}` : ""},`,
    intro: "aquí tienes mi nuevo artículo, publicado en el blog:",
    button: "Leer el artículo",
    reply: "Si te apetece, puedes responder a este email y contarme qué te ha parecido.",
    signoff: "Un cordial saludo,",
    reason: "Recibes este email porque elegiste suscribirte a la newsletter en gipivisconti.com.",
    unsubscribe: "Darme de baja",
  },
} as const;

export function buildNewsletterEmailContent(
  input: NewsletterMessageInput,
): GiftEmailContent & { subject: string } {
  const copy = NEWSLETTER_COPY[input.locale];
  const subject = copy.subject(input.article.title);
  const greeting = copy.greeting(input.name.trim());
  const assetBaseUrl = new URL(input.unsubscribeUrl).origin;
  const homeUrl = `https://www.gipivisconti.com/${input.locale}`;
  const bannerUrl = `${assetBaseUrl}/email-assets/mother-child-reading-solid.png`;
  const signatureUrl = `${assetBaseUrl}/email-assets/signature.png`;
  const instagramIconUrl = `${assetBaseUrl}/email-assets/instagram.png`;
  const textBody = [
    greeting,
    "",
    copy.intro,
    "",
    input.article.title,
    input.article.excerpt,
    "",
    `${copy.button}: ${input.article.url}`,
    "",
    copy.reply,
    "",
    copy.signoff,
    "Gipi Visconti",
    "",
    copy.reason,
    `${copy.unsubscribe}: ${input.unsubscribeUrl}`,
  ].join("\n");
  const htmlBody = `<!doctype html>
<html lang="${input.locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <style>:root{color-scheme:light only;supported-color-schemes:light only}@media only screen and (max-width:680px){.email-copy-shell{width:100%!important}.email-pad{padding-left:20px!important;padding-right:20px!important}.email-title{font-size:27px!important}.email-copy{font-size:16px!important}.email-button{display:block!important;text-align:center!important}}@media (prefers-color-scheme:dark){.email-page,.email-light{background-color:#FAF9F6!important;background-image:linear-gradient(#FAF9F6,#FAF9F6)!important}.email-banner{background-color:#F6F2EC!important;background-image:linear-gradient(#F6F2EC,#F6F2EC)!important}.email-dark-text{color:#2c2a29!important;-webkit-text-fill-color:#2c2a29!important}.email-copy{color:#3f3d3a!important;-webkit-text-fill-color:#3f3d3a!important}.email-button{background-color:#222222!important;background-image:linear-gradient(#222222,#222222)!important;color:#ffffff!important;-webkit-text-fill-color:#ffffff!important}}</style>
</head>
<body class="email-page" bgcolor="#FAF9F6" style="margin:0;padding:0;background-color:#FAF9F6;background-image:linear-gradient(#FAF9F6,#FAF9F6);color:#2c2a29;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#FAF9F6" class="email-page" style="width:100%;background-color:#FAF9F6;background-image:linear-gradient(#FAF9F6,#FAF9F6);">
    <tr><td align="center" bgcolor="#F6F2EC" class="email-banner" style="padding:0;background-color:#F6F2EC;background-image:linear-gradient(#F6F2EC,#F6F2EC);">
      <a href="${escapeHtml(homeUrl)}" aria-label="Gipi Visconti" class="email-banner" style="display:block;width:100%;text-decoration:none;background-color:#F6F2EC;background-image:linear-gradient(#F6F2EC,#F6F2EC);">
        <img src="${escapeHtml(bannerUrl)}" width="800" alt="Gipi Visconti" style="display:block;width:800px;max-width:100%;height:auto;margin:0 auto;border:0;">
      </a>
    </td></tr>
    <tr><td align="center" bgcolor="#FAF9F6" class="email-pad email-light" style="padding:34px 24px 44px;background-color:#FAF9F6;background-image:linear-gradient(#FAF9F6,#FAF9F6);">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#FAF9F6" class="email-copy-shell email-light" style="width:600px;max-width:600px;background-color:#FAF9F6;background-image:linear-gradient(#FAF9F6,#FAF9F6);">
            <tr><td align="center">
              <h1 class="email-title email-dark-text" style="margin:0 0 8px;font-size:30px;line-height:1.25;color:#2c2a29;-webkit-text-fill-color:#2c2a29;font-weight:700;">${escapeHtml(greeting)}</h1>
              <p class="email-dark-text" style="margin:0 0 28px;font-size:18px;line-height:1.5;color:#2c2a29;-webkit-text-fill-color:#2c2a29;">${escapeHtml(copy.intro)}</p>
            </td></tr>
            <tr><td class="email-copy" style="padding:0;font-size:17px;line-height:1.65;color:#3f3d3a;-webkit-text-fill-color:#3f3d3a;">
          <h1 class="email-title email-dark-text" style="margin:0 0 14px;font-size:30px;line-height:1.25;color:#2c2a29;-webkit-text-fill-color:#2c2a29;font-family:Georgia,serif;">${escapeHtml(input.article.title)}</h1>
          <p style="margin:0 0 28px;">${escapeHtml(input.article.excerpt)}</p>
          <p style="margin:0 0 34px;text-align:center;"><a href="${escapeHtml(input.article.url)}" class="email-button" style="display:inline-block;background-color:#222222;background-image:linear-gradient(#222222,#222222);color:#ffffff;-webkit-text-fill-color:#ffffff;text-decoration:none;padding:14px 24px;border-radius:4px;font-weight:700;">${escapeHtml(copy.button)}</a></p>
          <div style="height:1px;background:#c8c5c0;margin:0 0 34px;font-size:1px;line-height:1px;">&nbsp;</div>
          <p style="margin:0 0 38px;">${escapeHtml(copy.reply)}</p>
          <p style="margin:0 0 10px;">${escapeHtml(copy.signoff)}</p>
          <p style="margin:0;text-align:center;"><img src="${escapeHtml(signatureUrl)}" width="240" alt="Gipi Visconti" style="display:inline-block;width:240px;max-width:70%;height:auto;border:0;"></p>
          <p style="margin:20px 0 34px;text-align:center;">
            <a href="${LINKEDIN_URL}" aria-label="LinkedIn" style="display:inline-block;width:34px;height:34px;line-height:34px;margin:0 5px;background:#0a66c2;color:#ffffff;text-decoration:none;border-radius:4px;font-size:20px;font-weight:700;text-align:center;">in</a>
            <a href="${INSTAGRAM_URL}" aria-label="Instagram" style="display:inline-block;width:34px;height:34px;margin:0 5px;text-decoration:none;vertical-align:top;"><img src="${escapeHtml(instagramIconUrl)}" width="34" height="34" alt="Instagram" style="display:block;width:34px;height:34px;border:0;border-radius:8px;"></a>
          </p>
          <div style="height:1px;background:#c8c5c0;margin:0 0 24px;font-size:1px;line-height:1px;">&nbsp;</div>
          <p style="margin:0 0 8px;text-align:center;font-size:12px;line-height:1.55;color:#8a8781;">${escapeHtml(copy.reason)}</p>
          <p style="margin:0;text-align:center;font-size:12px;line-height:1.55;"><a href="${escapeHtml(input.unsubscribeUrl)}" style="color:#5f5b55;-webkit-text-fill-color:#5f5b55;text-decoration:underline;">${escapeHtml(copy.unsubscribe)}</a></p>
            </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, textBody, htmlBody };
}

export function buildNewsletterMessage(input: NewsletterMessageInput): GiftMessage {
  if (!isSafeAsciiEmail(input.recipient)) throw new Error("invalid-recipient");
  const now = input.now ?? new Date();
  const messageId = `${crypto.randomUUID()}@gipivisconti.com`;
  const boundary = `gipi-newsletter-${crypto.randomUUID()}`;
  const { subject, textBody, htmlBody } = buildNewsletterEmailContent(input);
  const headers = [
    `From: Gipi Visconti <${SMTP_USERNAME}>`,
    `To: <${input.recipient}>`,
    `Date: ${now.toUTCString()}`,
    `Message-ID: <${messageId}>`,
    `Subject: ${encodeHeader(subject)}`,
    `List-Unsubscribe: <${input.unsubscribeUrl}>`,
    "List-Unsubscribe-Post: List-Unsubscribe=One-Click",
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ];
  const body = [
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    wrapBase64(utf8ToBase64(textBody)),
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    wrapBase64(utf8ToBase64(htmlBody)),
    `--${boundary}--`,
  ];
  return {
    messageId,
    source: `${headers.join(CRLF)}${CRLF}${CRLF}${body.join(CRLF)}`,
  };
}

function formatBirthday(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  return match ? `${match[3]}/${match[2]}/${match[1]}` : value;
}

function formatCreatedAt(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("it-IT", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Madrid",
  }).format(date);
}

export function buildAdminNotificationMessage(
  input: AdminNotificationMessageInput,
): GiftMessage {
  if (!isSafeAsciiEmail(input.email)) throw new Error("invalid-reply-to");

  const now = input.now ?? new Date();
  const messageId = `${crypto.randomUUID()}@gipivisconti.com`;
  const boundary = `gipi-admin-${crypto.randomUUID()}`;
  const localeLabel = { it: "Italiano", en: "Inglese", es: "Spagnolo" }[input.locale];
  const newsletterLabel = input.newsletterConsent ? "Sì" : "No";
  const birthday = formatBirthday(input.birthday);
  const createdAt = formatCreatedAt(input.createdAt);
  const subject = `Nuova richiesta del libro regalo | ${input.locale.toUpperCase()}`;
  const textBody = [
    "È stata ricevuta una nuova richiesta del libro regalo.",
    "",
    `Nome: ${input.name}`,
    `Email: ${input.email}`,
    `Compleanno: ${birthday}`,
    `Lingua: ${localeLabel}`,
    `Newsletter: ${newsletterLabel}`,
    `Data della richiesta: ${createdAt}`,
    "",
    "Area amministrativa: https://www.gipivisconti.com/admin",
  ].join("\n");
  const htmlBody = `<!doctype html>
<html lang="it">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#faf9f6;color:#2c2a29;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#faf9f6;">
    <tr><td align="center" style="padding:32px 18px;">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #e8e4db;border-radius:16px;">
        <tr><td style="padding:32px;">
          <p style="margin:0 0 8px;color:#c18c5d;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;">Libro regalo</p>
          <h1 style="margin:0 0 12px;font-size:26px;line-height:1.3;">Nuova richiesta ricevuta</h1>
          <p style="margin:0 0 26px;color:#75736e;line-height:1.6;">Una persona ha compilato il modulo sul sito.</p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
            <tr><td style="padding:9px 0;color:#75736e;width:38%;">Nome</td><td style="padding:9px 0;font-weight:700;">${escapeHtml(input.name)}</td></tr>
            <tr><td style="padding:9px 0;color:#75736e;">Email</td><td style="padding:9px 0;"><a href="mailto:${escapeHtml(input.email)}" style="color:#2c2a29;">${escapeHtml(input.email)}</a></td></tr>
            <tr><td style="padding:9px 0;color:#75736e;">Compleanno</td><td style="padding:9px 0;">${escapeHtml(birthday)}</td></tr>
            <tr><td style="padding:9px 0;color:#75736e;">Lingua</td><td style="padding:9px 0;">${escapeHtml(localeLabel)}</td></tr>
            <tr><td style="padding:9px 0;color:#75736e;">Newsletter</td><td style="padding:9px 0;">${newsletterLabel}</td></tr>
            <tr><td style="padding:9px 0;color:#75736e;">Ricevuta</td><td style="padding:9px 0;">${escapeHtml(createdAt)}</td></tr>
          </table>
          <p style="margin:28px 0 0;"><a href="https://www.gipivisconti.com/admin" style="display:inline-block;background:#c18c5d;color:#ffffff;text-decoration:none;padding:13px 20px;border-radius:8px;font-weight:700;">Apri l’area amministrativa</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
  const headers = [
    `From: Gipi Visconti <${SMTP_USERNAME}>`,
    `To: Gipi Visconti <${SMTP_USERNAME}>`,
    `Reply-To: <${input.email}>`,
    `Date: ${now.toUTCString()}`,
    `Message-ID: <${messageId}>`,
    `Subject: ${encodeHeader(subject)}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "Auto-Submitted: auto-generated",
    "X-Auto-Response-Suppress: All",
  ];
  const body = [
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    wrapBase64(utf8ToBase64(textBody)),
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    wrapBase64(utf8ToBase64(htmlBody)),
    `--${boundary}--`,
  ];

  return {
    messageId,
    source: `${headers.join(CRLF)}${CRLF}${CRLF}${body.join(CRLF)}`,
  };
}
