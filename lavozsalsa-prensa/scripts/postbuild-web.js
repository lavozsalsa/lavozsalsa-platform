const fs = require('node:fs');
const path = require('node:path');

const { pressArticles } = require('../content/articles');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const INDEX_PATH = path.join(DIST_DIR, 'index.html');
const SITE_URL = 'https://prensa.lavozsalsa.com';
const SITE_NAME = 'Pulso Salsero';
const SITE_SUBTITLE = 'Sala de prensa de La Voz Salsa';
const GA_MEASUREMENT_ID = process.env.LVS_PRESS_GA4_ID || process.env.LVS_GA4_ID || 'G-8C6LP4VJSY';
const GOOGLE_SITE_VERIFICATION =
  process.env.LVS_PRESS_GOOGLE_SITE_VERIFICATION || process.env.LVS_GOOGLE_SITE_VERIFICATION || '';

const ASSETS_DIR = path.join(__dirname, '..', 'assets');
const FONTS_DIR = path.join(ASSETS_DIR, 'fonts');
const COVERS_DIR = path.join(ASSETS_DIR, 'covers');
const AUDIO_DIR = path.join(ASSETS_DIR, 'audio');
const BRAND_DIST_DIR = path.join(DIST_DIR, 'brand');
const MEDIA_DIST_DIR = path.join(DIST_DIR, 'media');
const MEDIA_COVERS_DIST_DIR = path.join(MEDIA_DIST_DIR, 'covers');
const MEDIA_AUDIO_DIST_DIR = path.join(MEDIA_DIST_DIR, 'audio');
const FONTS_DIST_DIR = path.join(DIST_DIR, 'fonts');

const FAVICON_SOURCE = path.join(ASSETS_DIR, 'logo-isotipo-lavozsalsa.png');
const HEADER_LOGO_SOURCE = path.join(ASSETS_DIR, 'logo-pulso-salsero-black.png');
const FOOTER_LOGO_SOURCE = path.join(ASSETS_DIR, 'logo-pulso-salsero-footer-isotipo.png');
const SHARE_IMAGE_SOURCE = path.join(ASSETS_DIR, 'lavozsalsa-home-hero.jpeg');

const ROOT_META = {
  title: `${SITE_NAME} | ${SITE_SUBTITLE}`,
  description:
    'Noticias, archivo, perfiles y guías para seguir la salsa con contexto, criterio editorial y mirada de marca desde La Voz Salsa.',
  image: `${SITE_URL}/media/pulso-social.jpg`,
  url: `${SITE_URL}/`,
};
const BUILD_VERSION = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);

function resolveImageUrl(imagePath) {
  if (!imagePath) return `${SITE_URL}/media/pulso-social.jpg`;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
  return `${SITE_URL}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
}

const ARTICLE_METAS = pressArticles.map((article) => ({
  slug: article.slug,
  title: `${article.title} | ${SITE_NAME}`,
  description: article.description,
  image: resolveImageUrl(article.shareImage || article.coverImage),
  url: `${SITE_URL}/${article.slug}/`,
  category: article.category,
}));

function buildAnalyticsBlock() {
  if (!GA_MEASUREMENT_ID) return '';

  return [
    `<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"></script>`,
    '<script>',
    '  window.dataLayer = window.dataLayer || [];',
    '  function gtag(){dataLayer.push(arguments);}',
    "  gtag('js', new Date());",
    `  gtag('config', '${GA_MEASUREMENT_ID}');`,
    '</script>',
  ].join('\n    ');
}

function buildStructuredData(meta) {
  const article = pressArticles.find((item) => meta.url.endsWith(`/${item.slug}/`));

  const base = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'La Voz Salsa',
      url: SITE_URL,
      logo: `${SITE_URL}/brand/logo-pulso-salsero-black.png`,
      description: ROOT_META.description,
    },
    {
      '@context': 'https://schema.org',
      '@type': article ? 'Article' : 'CollectionPage',
      headline: meta.title,
      name: meta.title,
      url: meta.url,
      description: meta.description,
      image: meta.image,
      publisher: {
        '@type': 'Organization',
        name: 'La Voz Salsa',
      },
    },
  ];

  if (article) {
    base[1].articleSection = article.category;
    base[1].dateModified = '2026-04-11';
  }

  return `<script type="application/ld+json">${JSON.stringify(base)}</script>`;
}

function buildMetaBlock(meta) {
  return [
    `<meta name="description" content="${meta.description}" />`,
    '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />',
    '<meta name="theme-color" content="#ff2026" />',
    `<link rel="canonical" href="${meta.url}" />`,
    `<link rel="preload" as="image" href="${meta.image}" />`,
    GOOGLE_SITE_VERIFICATION
      ? `<meta name="google-site-verification" content="${GOOGLE_SITE_VERIFICATION}" />`
      : '',
    `<meta property="og:title" content="${meta.title}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:description" content="${meta.description}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:url" content="${meta.url}" />`,
    `<meta property="og:image" content="${meta.image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${meta.title}" />`,
    `<meta name="twitter:description" content="${meta.description}" />`,
    `<meta name="twitter:image" content="${meta.image}" />`,
    '<link rel="icon" type="image/png" href="/favicon.png" />',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png" />',
    '<link rel="manifest" href="/site.webmanifest" />',
    buildStructuredData(meta),
    buildAnalyticsBlock(),
  ]
    .filter(Boolean)
    .join('\n    ');
}

const WEB_MANIFEST = JSON.stringify(
  {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: ROOT_META.description,
    background_color: '#f3eee7',
    theme_color: '#ff2026',
    display: 'standalone',
    icons: [
      {
        src: '/favicon.png',
        sizes: '1080x1080',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  },
  null,
  2
);

const ROBOTS = ['User-agent: *', 'Allow: /', `Sitemap: ${SITE_URL}/sitemap.xml`].join('\n');

const SITEMAP_XML = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${ARTICLE_METAS.map(
  (meta) => `  <url>
    <loc>${meta.url}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.82</priority>
  </url>`
).join('\n')}
</urlset>
`.trimStart();

function ensureDistExists() {
  if (!fs.existsSync(DIST_DIR)) {
    throw new Error(`No existe dist: ${DIST_DIR}`);
  }
}

function patchHtml(html, meta) {
  let nextHtml = html.replace('<html lang="en">', '<html lang="es">');

  nextHtml = nextHtml.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);

  nextHtml = nextHtml.replace(
    '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />',
    `<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />\n    ${buildMetaBlock(meta)}`
  );

  nextHtml = nextHtml.replace(
    'You need to enable JavaScript to run this app.',
    'Necesitas habilitar JavaScript para ver Pulso Salsero.'
  );

  nextHtml = nextHtml.replace(
    /<style id="expo-reset">[\s\S]*?<\/style>/,
    `<style id="expo-reset">
      html,
      body {
        min-height: 100%;
      }

      body {
        margin: 0;
        overflow-x: hidden;
        overflow-y: auto;
        background: #f3eee7;
      }

      #root {
        display: block;
        min-height: 100%;
      }
    </style>`
  );

  nextHtml = nextHtml.replace(
    /(<script[^>]+src="(?:[^"]*\/)?_expo\/static\/js\/web\/[^"]+\.js)(\")/g,
    `$1?v=${BUILD_VERSION}$2`
  );

  return nextHtml;
}

function writeIndexHtml(sourceHtml) {
  const nextHtml = patchHtml(sourceHtml, ROOT_META);
  fs.writeFileSync(INDEX_PATH, nextHtml);
}

function writeArticleRoutes(sourceHtml) {
  ARTICLE_METAS.forEach((meta) => {
    const routeDir = path.join(DIST_DIR, meta.slug);
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, 'index.html'), patchHtml(sourceHtml, meta));
  });
}

function writeStaticFiles() {
  fs.mkdirSync(BRAND_DIST_DIR, { recursive: true });
  fs.mkdirSync(MEDIA_DIST_DIR, { recursive: true });
  fs.mkdirSync(MEDIA_COVERS_DIST_DIR, { recursive: true });
  fs.mkdirSync(FONTS_DIST_DIR, { recursive: true });

  const assetCopies = [
    [HEADER_LOGO_SOURCE, path.join(BRAND_DIST_DIR, 'logo-pulso-salsero-black.png')],
    [FOOTER_LOGO_SOURCE, path.join(BRAND_DIST_DIR, 'logo-pulso-salsero-footer-isotipo.png')],
    [FAVICON_SOURCE, path.join(BRAND_DIST_DIR, 'logo-isotipo-lavozsalsa.png')],
    [FAVICON_SOURCE, path.join(DIST_DIR, 'favicon.png')],
    [FAVICON_SOURCE, path.join(DIST_DIR, 'apple-touch-icon.png')],
    [SHARE_IMAGE_SOURCE, path.join(MEDIA_DIST_DIR, 'pulso-social.jpg')],
    [path.join(FONTS_DIR, 'GothamBook.ttf'), path.join(FONTS_DIST_DIR, 'GothamBook.ttf')],
    [path.join(FONTS_DIR, 'GothamMedium.ttf'), path.join(FONTS_DIST_DIR, 'GothamMedium.ttf')],
    [path.join(FONTS_DIR, 'GothamBold.ttf'), path.join(FONTS_DIST_DIR, 'GothamBold.ttf')],
    [path.join(FONTS_DIR, 'GothamBlack.otf'), path.join(FONTS_DIST_DIR, 'GothamBlack.otf')],
  ];

  assetCopies.forEach(([from, to]) => {
    fs.copyFileSync(from, to);
    fs.chmodSync(to, 0o644);
  });

  if (fs.existsSync(COVERS_DIR)) {
    fs.readdirSync(COVERS_DIR, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .forEach((entry) => {
        const from = path.join(COVERS_DIR, entry.name);
        const to = path.join(MEDIA_COVERS_DIST_DIR, entry.name);
        fs.copyFileSync(from, to);
        fs.chmodSync(to, 0o644);
      });
  }

  if (fs.existsSync(AUDIO_DIR)) {
    fs.rmSync(MEDIA_AUDIO_DIST_DIR, { recursive: true, force: true });
    fs.cpSync(AUDIO_DIR, MEDIA_AUDIO_DIST_DIR, { recursive: true });
  }

  fs.writeFileSync(path.join(DIST_DIR, 'site.webmanifest'), WEB_MANIFEST);
  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), ROBOTS);
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), SITEMAP_XML);
  fs.copyFileSync(INDEX_PATH, path.join(DIST_DIR, '404.html'));
}

function main() {
  ensureDistExists();
  const sourceHtml = fs.readFileSync(INDEX_PATH, 'utf8');
  writeIndexHtml(sourceHtml);
  writeStaticFiles();
  writeArticleRoutes(sourceHtml);
  console.log('Postbuild web listo: Pulso Salsero con rutas editoriales, metadatos y sitemap.');
}

main();
