import { describe, expect, it } from "vitest";

import {
  buildNewsletterPreviews,
  parseNewsletterCampaignPayload,
} from "../src/newsletter";

const payload = {
  slug: "articolo-di-prova",
  commit: "0123456789abcdef0123456789abcdef01234567",
  publishedAt: "2026-08-22T12:00:00.000Z",
  content: {
    it: {
      title: "Articolo di prova",
      excerpt: "Questo è l’estratto italiano dell’articolo di prova.",
      url: "https://www.gipivisconti.com/it/blog/articolo-di-prova",
    },
    en: {
      title: "Test article",
      excerpt: "This is the English excerpt for the test article.",
      url: "https://www.gipivisconti.com/en/blog/articolo-di-prova",
    },
    es: {
      title: "Artículo de prueba",
      excerpt: "Este es el extracto en español del artículo de prueba.",
      url: "https://www.gipivisconti.com/es/blog/articolo-di-prova",
    },
  },
};

describe("newsletter campaign", () => {
  it("accepts a complete multilingual campaign", () => {
    expect(parseNewsletterCampaignPayload(payload)).toEqual(payload);
  });

  it("rejects an article URL whose language does not match", () => {
    expect(() => parseNewsletterCampaignPayload({
      ...payload,
      content: {
        ...payload.content,
        en: { ...payload.content.en, url: payload.content.it.url },
      },
    })).toThrow("invalid-article-url");
  });

  it("renders all three previews without sending", () => {
    const previews = buildNewsletterPreviews(
      parseNewsletterCampaignPayload(payload),
      "http://localhost:8787",
    );
    expect(Object.keys(previews)).toEqual(["it", "en", "es"]);
    expect(previews.it.subject).toContain("Articolo di prova");
    expect(previews.en.htmlBody).toContain("Read the article");
    expect(previews.es.htmlBody).toContain("Darme de baja");
  });
});
