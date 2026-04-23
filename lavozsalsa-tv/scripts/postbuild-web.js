const fs = require('node:fs');
const path = require('node:path');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const INDEX_PATH = path.join(DIST_DIR, 'index.html');
const SITE_URL = 'https://tv.lavozsalsa.com';
const GA_MEASUREMENT_ID = process.env.LVS_GA4_ID || 'G-8C6LP4VJSY';
const ASSETS_DIR = path.join(__dirname, '..', 'assets');
const FONTS_DIR = path.join(ASSETS_DIR, 'fonts');
const BRAND_DIST_DIR = path.join(DIST_DIR, 'brand');
const FONTS_DIST_DIR = path.join(DIST_DIR, 'fonts');
const BRAND_ICON_SOURCE = path.join(ASSETS_DIR, 'logo-isotipo-tab.png');
const TAB_ICON_SOURCE = path.join(ASSETS_DIR, 'isotipo-lavozsalsa-tv-rojo.png');
const TV_LOGO_SOURCE = path.join(ASSETS_DIR, 'logo-lavozsalsa-fondos-negros.png');
const STUDIO_BG_SOURCE = path.join(ASSETS_DIR, 'estudio-web.jpg');

function ensureDistExists() {
  if (!fs.existsSync(DIST_DIR)) {
    throw new Error(`No existe dist: ${DIST_DIR}`);
  }
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function buildAnalyticsBlock() {
  if (!GA_MEASUREMENT_ID) {
    return '';
  }

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

function buildStructuredData() {
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'VideoGallery',
      name: 'La Voz Salsa TV',
      url: SITE_URL,
      description: 'Señal de streaming y comunidad en vivo de La Voz Salsa.',
      publisher: {
        '@type': 'Organization',
        name: 'La Voz Salsa',
        url: 'https://lavozsalsa.com',
      },
    },
  ];

  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function patchIndexHtml() {
  const html = fs.readFileSync(INDEX_PATH, 'utf8');

  const metaBlock = [
    '<meta name="description" content="La Voz Salsa TV en vivo." />',
    '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />',
    '<meta name="theme-color" content="#ff5c3d" />',
    `<link rel="canonical" href="${SITE_URL}/" />`,
    '<meta property="og:title" content="La Voz Salsa TV" />',
    '<meta property="og:site_name" content="La Voz Salsa TV" />',
    '<meta property="og:description" content="La Voz Salsa TV en vivo." />',
    '<meta property="og:type" content="website" />',
    `<meta property="og:url" content="${SITE_URL}/" />`,
    `<meta property="og:image" content="${SITE_URL}/brand/logo-tv-clean.png" />`,
    '<meta property="og:image:alt" content="La Voz Salsa TV." />',
    '<meta name="twitter:card" content="summary_large_image" />',
    '<meta name="twitter:title" content="La Voz Salsa TV" />',
    '<meta name="twitter:description" content="La Voz Salsa TV en vivo." />',
    `<meta name="twitter:image" content="${SITE_URL}/brand/logo-tv-clean.png" />`,
    '<link rel="icon" type="image/png" href="/favicon.png" />',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png" />',
    '<link rel="manifest" href="/site.webmanifest" />',
    buildStructuredData(),
    buildAnalyticsBlock(),
  ]
    .filter(Boolean)
    .join('\n    ');

  let nextHtml = html.replace('<html lang="en">', '<html lang="es">');
  nextHtml = nextHtml.replace('<title>La Voz Salsa TV</title>', '<title>La Voz Salsa TV</title>');
  nextHtml = nextHtml.replace(
    '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />',
    `<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />\n    ${metaBlock}`
  );
  nextHtml = nextHtml.replace(
    'You need to enable JavaScript to run this app.',
    'Necesitas habilitar JavaScript para ver La Voz Salsa TV.'
  );

  fs.writeFileSync(INDEX_PATH, nextHtml, 'utf8');
}

function copyAssets() {
  ensureDir(BRAND_DIST_DIR);
  ensureDir(FONTS_DIST_DIR);

  const brandPairs = [
    [BRAND_ICON_SOURCE, path.join(BRAND_DIST_DIR, 'logo-isotipo-lavozsalsa.png')],
    [BRAND_ICON_SOURCE, path.join(BRAND_DIST_DIR, 'logo-tv-clean.png')],
    [TV_LOGO_SOURCE, path.join(BRAND_DIST_DIR, 'logo-lavozsalsa-fondo-negro-horizontal.png')],
    [STUDIO_BG_SOURCE, path.join(BRAND_DIST_DIR, 'estudio.jpg')],
  ];

  for (const [source, destination] of brandPairs) {
    fs.copyFileSync(source, destination);
  }

  for (const fontName of fs.readdirSync(FONTS_DIR)) {
    fs.copyFileSync(path.join(FONTS_DIR, fontName), path.join(FONTS_DIST_DIR, fontName));
  }

  fs.copyFileSync(TAB_ICON_SOURCE, path.join(DIST_DIR, 'favicon.png'));
  fs.copyFileSync(TAB_ICON_SOURCE, path.join(DIST_DIR, 'apple-touch-icon.png'));
}

function writeStaticFiles() {
  const manifest = JSON.stringify(
    {
      name: 'La Voz Salsa TV',
      short_name: 'LVS TV',
      description: 'Streaming y comunidad en vivo de La Voz Salsa.',
      background_color: '#070809',
      theme_color: '#ff5c3d',
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

  const robots = ['User-agent: *', 'Allow: /', `Sitemap: ${SITE_URL}/sitemap.xml`].join('\n');
  const sitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`.trimStart();

  fs.writeFileSync(path.join(DIST_DIR, 'site.webmanifest'), `${manifest}\n`, 'utf8');
  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), `${robots}\n`, 'utf8');
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), `${sitemap}\n`, 'utf8');
  fs.copyFileSync(INDEX_PATH, path.join(DIST_DIR, '404.html'));
}

function main() {
  ensureDistExists();
  patchIndexHtml();
  copyAssets();
  writeStaticFiles();
}

main();
