import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  connect: vi.fn(),
  runSmtpMessageSession: vi.fn(),
  runSmtpSession: vi.fn(),
}));

vi.mock("cloudflare:sockets", () => ({ connect: mocks.connect }));
vi.mock("../src/smtp-session", () => ({
  runSmtpMessageSession: mocks.runSmtpMessageSession,
  runSmtpSession: mocks.runSmtpSession,
}));

import { sendProtonNewsletterEmail } from "../src/smtp";

describe("Proton newsletter delivery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.connect.mockReturnValue({});
    mocks.runSmtpMessageSession.mockResolvedValue({
      messageId: "newsletter@gipivisconti.com",
    });
  });

  it("uses the subscriber as the SMTP envelope recipient", async () => {
    await sendProtonNewsletterEmail(
      {
        recipient: "persona@example.com",
        name: "Luca",
        locale: "it",
        article: {
          title: "Un nuovo articolo",
          excerpt: "Una breve introduzione al nuovo articolo.",
          url: "https://www.gipivisconti.com/it/blog/un-nuovo-articolo",
        },
        unsubscribeUrl: `https://worker.example/newsletter/unsubscribe/${"a".repeat(64)}/${"b".repeat(64)}`,
      },
      "smtp-token-test",
    );

    expect(mocks.runSmtpMessageSession).toHaveBeenCalledWith(
      expect.anything(),
      "persona@example.com",
      expect.objectContaining({
        source: expect.stringContaining("To: <persona@example.com>"),
      }),
      "smtp-token-test",
    );
  });
});
