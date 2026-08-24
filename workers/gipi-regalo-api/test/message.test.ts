import { describe, expect, it } from "vitest";

import {
  buildAdminNotificationMessage,
  buildGiftEmailContent,
  buildGiftMessage,
  buildNewsletterEmailContent,
  buildNewsletterMessage,
  encodeHeader,
  isSafeAsciiEmail,
  utf8ToBase64,
  wrapBase64,
} from "../src/message";

describe("email validation", () => {
  it("accepts a normal recipient", () => {
    expect(isSafeAsciiEmail("persona@example.com")).toBe(true);
  });

  it("rejects header injection", () => {
    expect(isSafeAsciiEmail("persona@example.com\r\nBcc: attacker@example.com")).toBe(false);
  });
});

describe("MIME message", () => {
  it("encodes Unicode text as UTF-8 base64", () => {
    expect(utf8ToBase64("perché")).toBe("cGVyY2jDqQ==");
    expect(encodeHeader("Prova perché")).toMatch(/^=\?UTF-8\?B\?.+\?=$/);
  });

  it("wraps base64 at no more than 76 characters", () => {
    const wrapped = wrapBase64("a".repeat(200));
    expect(wrapped.split("\r\n").every((line) => line.length <= 76)).toBe(true);
  });

  it("creates an RFC-style message without bare line feeds", () => {
    const message = buildGiftMessage({
      recipient: "persona@example.com",
      name: "Luca",
      locale: "it",
      downloadUrl: "https://example.com/d/token",
      now: new Date("2026-08-16T12:00:00Z"),
    });
    expect(message.source).toContain("From: Gipi Visconti <info@gipivisconti.com>");
    expect(message.source).toContain("To: <persona@example.com>");
    expect(message.source).not.toMatch(/(^|[^\r])\n/);
  });

  it("uses the copy for the selected language", () => {
    const message = buildGiftMessage({
      recipient: "persona@example.com",
      name: "Ana",
      locale: "es",
      downloadUrl: "https://example.com/d/token",
    });
    expect(message.source).toContain(`Subject: ${encodeHeader("Tu copia digital de Lionel Messi ya está lista")}`);
  });

  it("builds the illustrated transactional email without newsletter branding", () => {
    const content = buildGiftEmailContent({
      recipient: "persona@example.com",
      name: "Luca",
      locale: "it",
      downloadUrl: "https://example.com/d/token",
    });
    expect(content.htmlBody).toContain("https://example.com/email-assets/cover-it.jpg");
    expect(content.htmlBody).toContain("https://example.com/email-assets/signature.png");
    expect(content.htmlBody).toContain("https://example.com/email-assets/instagram.png");
    expect(content.htmlBody).toContain("Clicca qui per scaricare il libro");
    expect(content.htmlBody).not.toMatch(/brevo|newsletter|unsubscribe/i);
    expect(content.textBody).toContain("Il link resterà valido per 72 ore");
  });

  it("creates the private notification for the site owner", () => {
    const message = buildAdminNotificationMessage({
      name: "Luca",
      email: "persona@example.com",
      birthday: "2000-08-10",
      locale: "it",
      newsletterConsent: true,
      createdAt: "2026-08-22T10:00:00.000Z",
      now: new Date("2026-08-22T10:01:00.000Z"),
    });

    expect(message.source).toContain("To: Gipi Visconti <info@gipivisconti.com>");
    expect(message.source).toContain("Reply-To: <persona@example.com>");
    expect(message.source).toContain(
      `Subject: ${encodeHeader("Nuova richiesta del libro regalo | IT")}`,
    );
    expect(message.source).not.toMatch(/(^|[^\r])\n/);
  });

  it("builds a localised newsletter with a signed unsubscribe link", () => {
    const input = {
      recipient: "persona@example.com",
      name: "Luca",
      locale: "en" as const,
      article: {
        title: "A new story",
        excerpt: "A short introduction to the newly published article.",
        url: "https://www.gipivisconti.com/en/blog/a-new-story",
      },
      unsubscribeUrl: `https://worker.example/newsletter/unsubscribe/${"a".repeat(64)}/${"b".repeat(64)}`,
      now: new Date("2026-08-22T10:01:00.000Z"),
    };
    const content = buildNewsletterEmailContent(input);
    const message = buildNewsletterMessage(input);

    expect(content.subject).toBe("From Gipi’s blog: A new story");
    expect(content.htmlBody).toContain("https://worker.example/email-assets/mother-child-reading-solid.png");
    expect(content.htmlBody).toContain('href="https://www.gipivisconti.com/en"');
    expect(content.htmlBody).toContain('width="800" alt="Gipi Visconti"');
    expect(content.htmlBody).toContain('align="center" bgcolor="#F6F2EC"');
    expect(content.htmlBody).toContain('<meta name="color-scheme" content="light only">');
    expect(content.htmlBody).toContain('background-image:linear-gradient(#F6F2EC,#F6F2EC)');
    expect(content.htmlBody).toContain('-webkit-text-fill-color:#2c2a29');
    expect(content.htmlBody).toContain('background-image:linear-gradient(#222222,#222222)');
    expect(content.htmlBody).toContain('width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#FAF9F6" class="email-copy-shell email-light"');
    expect(content.htmlBody).toContain("here is my new article, now published on the blog:");
    expect(content.htmlBody).toContain("Read the article");
    expect(content.htmlBody).toContain("Unsubscribe");
    expect(content.htmlBody).toContain('width="240" alt="Gipi Visconti"');
    expect(content.htmlBody).toContain("font-size:30px");
    expect(content.htmlBody).toContain("font-size:17px");
    expect(message.source).toContain("List-Unsubscribe:");
    expect(message.source).toContain("List-Unsubscribe-Post: List-Unsubscribe=One-Click");
    expect(message.source).not.toMatch(/(^|[^\r])\n/);

    const italianContent = buildNewsletterEmailContent({
      ...input,
      locale: "it",
      article: {
        title: "Una nuova storia",
        excerpt: "Una breve introduzione al nuovo articolo.",
        url: "https://www.gipivisconti.com/it/blog/una-nuova-storia",
      },
    });
    expect(italianContent.htmlBody).toContain("ecco il mio nuovo articolo pubblicato sul blog:");
  });
});
