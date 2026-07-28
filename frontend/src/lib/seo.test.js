import {
  applyRouteSeoLinks,
  buildRouteSeoLinks,
} from './seo';

describe('route SEO links', () => {
  test('builds self-referencing canonical and localized home links', () => {
    expect(buildRouteSeoLinks('/en')).toEqual({
      canonical: 'https://www.gipivisconti.com/en',
      alternatives: [
        { hreflang: 'it', href: 'https://www.gipivisconti.com/it' },
        { hreflang: 'en', href: 'https://www.gipivisconti.com/en' },
        { hreflang: 'es', href: 'https://www.gipivisconti.com/es' },
        { hreflang: 'x-default', href: 'https://www.gipivisconti.com/it' },
      ],
    });
  });

  test('keeps equivalent FAQ routes together', () => {
    const seoLinks = buildRouteSeoLinks('/es/faq/');

    expect(seoLinks.canonical).toBe('https://www.gipivisconti.com/es/faq');
    expect(seoLinks.alternatives).toContainEqual({
      hreflang: 'en',
      href: 'https://www.gipivisconti.com/en/faq',
    });
  });

  test('localizes the book section while preserving the slug', () => {
    const seoLinks = buildRouteSeoLinks('/it/libri/coco-chanel');

    expect(seoLinks.alternatives).toEqual([
      {
        hreflang: 'it',
        href: 'https://www.gipivisconti.com/it/libri/coco-chanel',
      },
      {
        hreflang: 'en',
        href: 'https://www.gipivisconti.com/en/books/coco-chanel',
      },
      {
        hreflang: 'es',
        href: 'https://www.gipivisconti.com/es/libros/coco-chanel',
      },
      {
        hreflang: 'x-default',
        href: 'https://www.gipivisconti.com/it/libri/coco-chanel',
      },
    ]);
  });

  test('replaces stale links with one canonical and four alternates', () => {
    document.head.innerHTML = `
      <link rel="canonical" href="https://www.gipivisconti.com/it">
      <link rel="alternate" hreflang="en" href="https://www.gipivisconti.com/it">
    `;

    applyRouteSeoLinks(document, buildRouteSeoLinks('/en/blog'));

    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.querySelector('link[rel="canonical"]').href).toBe(
      'https://www.gipivisconti.com/en/blog'
    );
    expect(
      document.querySelectorAll('link[rel="alternate"][hreflang]')
    ).toHaveLength(4);
  });
});
