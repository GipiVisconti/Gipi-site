const fs = require('fs');
const fsPromises = require('fs/promises');
const http = require('http');
const path = require('path');
const serverlessChromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer');

const PROJECT_DIR = path.resolve(__dirname, '..');
const BUILD_DIR = path.join(PROJECT_DIR, 'build');
const INDEX_PATH = path.join(BUILD_DIR, 'index.html');
const SITEMAP_PATH = path.join(PROJECT_DIR, 'public', 'sitemap.xml');
const SITE_ORIGIN = 'https://www.gipivisconti.com';
const EXTRA_ROUTES = [
  '/it/privacy-policy',
  '/en/privacy-policy',
  '/es/privacy-policy',
];

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
};

const getRoutes = async () => {
  const sitemap = await fsPromises.readFile(SITEMAP_PATH, 'utf8');
  const routes = [...sitemap.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)]
    .map((match) => new URL(match[1].trim()))
    .map((url) => {
      if (url.origin !== SITE_ORIGIN) {
        throw new Error(`URL esterno non previsto nella sitemap: ${url.href}`);
      }

      return url.pathname === '/' ? '/' : url.pathname.replace(/\/+$/, '');
    });

  return [...new Set([...routes, ...EXTRA_ROUTES])];
};

const getStaticFilePath = (pathname) => {
  const decodedPathname = decodeURIComponent(pathname);

  if (!path.extname(decodedPathname)) {
    return INDEX_PATH;
  }

  const requestedPath = path.resolve(
    BUILD_DIR,
    decodedPathname.replace(/^\/+/, '')
  );

  if (
    requestedPath !== BUILD_DIR &&
    !requestedPath.startsWith(`${BUILD_DIR}${path.sep}`)
  ) {
    return null;
  }

  return requestedPath;
};

const sendFile = async (filePath, response, method) => {
  try {
    const stats = await fsPromises.stat(filePath);

    if (!stats.isFile()) {
      response.writeHead(404);
      response.end('Not found');
      return;
    }

    response.writeHead(200, {
      'Cache-Control': 'no-store',
      'Content-Length': stats.size,
      'Content-Type':
        MIME_TYPES[path.extname(filePath).toLowerCase()] ||
        'application/octet-stream',
    });

    if (method === 'HEAD') {
      response.end();
      return;
    }

    fs.createReadStream(filePath).pipe(response);
  } catch (error) {
    if (error.code === 'ENOENT') {
      response.writeHead(404);
      response.end('Not found');
      return;
    }

    response.writeHead(500);
    response.end('Internal server error');
  }
};

const startStaticServer = async () => {
  const server = http.createServer(async (request, response) => {
    const requestUrl = new URL(request.url, 'http://127.0.0.1');
    const filePath = getStaticFilePath(requestUrl.pathname);

    if (!filePath) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }

    await sendFile(filePath, response, request.method);
  });

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });

  const address = server.address();

  return {
    origin: `http://127.0.0.1:${address.port}`,
    stop: () => new Promise((resolve) => server.close(resolve)),
  };
};

const getExpectedSchema = (route) => {
  if (route.endsWith('/faq')) return 'faq';
  if (/\/(libri|books|libros)\/[^/]+$/.test(route)) return 'book';
  return null;
};

const getExpectedLanguage = (route) => {
  const language = route.split('/').filter(Boolean)[0];
  return ['it', 'en', 'es'].includes(language) ? language : 'it';
};

const renderRoute = async (page, localOrigin, route) => {
  const response = await page.goto(`${localOrigin}${route}`, {
    timeout: 45000,
    waitUntil: 'domcontentloaded',
  });

  if (!response || response.status() !== 200) {
    throw new Error(
      `La rotta ${route} ha risposto con stato ${response?.status() || 'N/D'}`
    );
  }

  const expected = {
    canonical: `${SITE_ORIGIN}${route}`,
    language: getExpectedLanguage(route),
    schema: getExpectedSchema(route),
  };

  await page.waitForFunction(
    ({ canonical, language, schema }) => {
      const canonicalLinks = document.querySelectorAll(
        'link[rel="canonical"]'
      );
      const canonicalLink = canonicalLinks[0];
      const description = document.querySelector('meta[name="description"]');
      const root = document.getElementById('root');
      const hreflangs = new Set(
        [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map(
          (link) => link.getAttribute('hreflang')
        )
      );
      const schemaReady =
        !schema ||
        document.querySelector(`script[data-schema="${schema}"]`);

      return (
        document.documentElement.lang === language &&
        canonicalLinks.length === 1 &&
        canonicalLink?.getAttribute('href') === canonical &&
        ['it', 'en', 'es', 'x-default'].every((hreflang) =>
          hreflangs.has(hreflang)
        ) &&
        description?.getAttribute('content')?.trim().length > 0 &&
        document.title.trim().length > 0 &&
        root?.textContent?.trim().length > 80 &&
        schemaReady
      );
    },
    { timeout: 30000 },
    expected
  );

  await page.evaluate(
    () =>
      new Promise((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(resolve));
      })
  );

  await page.evaluate(() => {
    document
      .querySelectorAll(
        'script[src^="https://www.googletagmanager.com/gtm.js"]'
      )
      .forEach((script) => script.remove());
  });

  const html = await page.content();

  if (html.includes(localOrigin)) {
    throw new Error(`La rotta ${route} contiene riferimenti al server locale`);
  }

  const outputPath = path.join(
    BUILD_DIR,
    route.replace(/^\/+/, ''),
    'index.html'
  );

  await fsPromises.mkdir(path.dirname(outputPath), { recursive: true });
  await fsPromises.writeFile(outputPath, html, 'utf8');
};

const getBrowserLaunchOptions = async () => {
  if (process.env.VERCEL) {
    serverlessChromium.setGraphicsMode = false;

    return {
      args: serverlessChromium.args,
      executablePath: await serverlessChromium.executablePath(),
      headless: true,
    };
  }

  return {
    args: [
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-sandbox',
    ],
    headless: true,
  };
};

const main = async () => {
  await fsPromises.access(INDEX_PATH);

  const routes = await getRoutes();
  const staticServer = await startStaticServer();
  let browser;

  try {
    browser = await puppeteer.launch(await getBrowserLaunchOptions());

    const page = await browser.newPage();
    const browserErrors = [];

    page.on('pageerror', (error) => {
      browserErrors.push(error.message);
    });

    await page.setCacheEnabled(true);
    await page.setRequestInterception(true);

    page.on('request', (request) => {
      const resourceType = request.resourceType();
      const isLocalRequest = request.url().startsWith(staticServer.origin);

      if (
        !isLocalRequest ||
        ['font', 'image', 'media'].includes(resourceType)
      ) {
        request.abort();
        return;
      }

      request.continue();
    });

    for (const [index, route] of routes.entries()) {
      await renderRoute(page, staticServer.origin, route);

      if ((index + 1) % 10 === 0 || index === routes.length - 1) {
        console.log(
          `Prerendering: ${index + 1}/${routes.length} pagine completate`
        );
      }
    }

    const adminOutputPath = path.join(BUILD_DIR, 'admin', 'index.html');
    await fsPromises.mkdir(path.dirname(adminOutputPath), { recursive: true });
    await fsPromises.copyFile(INDEX_PATH, adminOutputPath);

    if (browserErrors.length > 0) {
      throw new Error(
        `Errori JavaScript durante il prerendering:\n${[
          ...new Set(browserErrors),
        ].join('\n')}`
      );
    }

    console.log(
      `Prerendering completato: ${routes.length} pagine HTML generate.`
    );
  } finally {
    if (browser) await browser.close();
    await staticServer.stop();
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
