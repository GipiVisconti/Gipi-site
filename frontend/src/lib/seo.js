const SITE_ORIGIN = 'https://www.gipivisconti.com';
const LANGUAGES = ['it', 'en', 'es'];
const BOOK_SECTION_BY_LANGUAGE = {
  it: 'libri',
  en: 'books',
  es: 'libros',
};
const SIMPLE_ROUTES = new Set(['faq', 'privacy-policy', 'blog']);
const GIFT_SEGMENT_BY_LANGUAGE = {
  it: 'libro-gratuito',
  en: 'free-book',
  es: 'libro-gratis',
};

const normalizePathname = (pathname) => {
  const path = typeof pathname === 'string' && pathname.startsWith('/')
    ? pathname
    : '/';

  if (path === '/') return path;
  return path.replace(/\/+$/, '');
};

const getLocalizedPath = (language, route) => {
  if (route.type === 'home') return `/${language}`;

  if (route.type === 'simple') {
    return `/${language}/${route.segment}`;
  }

  if (route.type === 'gift') {
    return `/${language}/${GIFT_SEGMENT_BY_LANGUAGE[language]}`;
  }

  if (route.type === 'blog-detail') {
    return `/${language}/blog/${route.slug}`;
  }

  return `/${language}/${BOOK_SECTION_BY_LANGUAGE[language]}/${route.slug}`;
};

const parseRoute = (pathname) => {
  const normalizedPathname = normalizePathname(pathname);
  const segments = normalizedPathname.split('/').filter(Boolean);
  const [language, ...routeSegments] = segments;

  if (!LANGUAGES.includes(language)) return null;

  if (routeSegments.length === 0) {
    return { language, normalizedPathname, type: 'home' };
  }

  if (routeSegments.length === 1 && SIMPLE_ROUTES.has(routeSegments[0])) {
    return {
      language,
      normalizedPathname,
      type: 'simple',
      segment: routeSegments[0],
    };
  }

  if (
    routeSegments.length === 1 &&
    routeSegments[0] === GIFT_SEGMENT_BY_LANGUAGE[language]
  ) {
    return {
      language,
      normalizedPathname,
      type: 'gift',
    };
  }

  if (
    routeSegments.length === 2 &&
    routeSegments[0] === 'blog' &&
    routeSegments[1]
  ) {
    return {
      language,
      normalizedPathname,
      type: 'blog-detail',
      slug: routeSegments[1],
    };
  }

  if (
    routeSegments.length === 2 &&
    routeSegments[0] === BOOK_SECTION_BY_LANGUAGE[language] &&
    routeSegments[1]
  ) {
    return {
      language,
      normalizedPathname,
      type: 'book-detail',
      slug: routeSegments[1],
    };
  }

  return null;
};

export const buildRouteSeoLinks = (pathname) => {
  const route = parseRoute(pathname);
  if (!route) return null;

  const alternatives = LANGUAGES.map((language) => ({
    hreflang: language,
    href: `${SITE_ORIGIN}${getLocalizedPath(language, route)}`,
  }));

  alternatives.push({
    hreflang: 'x-default',
    href: `${SITE_ORIGIN}${getLocalizedPath('it', route)}`,
  });

  return {
    canonical: `${SITE_ORIGIN}${route.normalizedPathname}`,
    alternatives,
  };
};

export const clearRouteSeoLinks = (documentRef) => {
  documentRef
    .querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang]')
    .forEach((link) => link.remove());
};

export const applyRouteSeoLinks = (documentRef, seoLinks) => {
  let canonical = documentRef.querySelector('link[rel="canonical"]');

  if (!canonical) {
    canonical = documentRef.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    documentRef.head.appendChild(canonical);
  }

  canonical.setAttribute('href', seoLinks.canonical);

  documentRef
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((link) => link.remove());

  seoLinks.alternatives.forEach(({ hreflang, href }) => {
    const alternate = documentRef.createElement('link');
    alternate.setAttribute('rel', 'alternate');
    alternate.setAttribute('hreflang', hreflang);
    alternate.setAttribute('href', href);
    documentRef.head.appendChild(alternate);
  });
};
