import { describe, expect, it } from "vitest";

import {
  buildGiftEmailContent,
  buildGiftMessage,
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
});
