const fs = require('node:fs');
const path = require('node:path');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const INDEX_PATH = path.join(DIST_DIR, 'index.html');
const SITE_URL = 'https://premium.lavozsalsa.com';
const GA_MEASUREMENT_ID = process.env.LVS_PREMIUM_GA4_ID || process.env.LVS_GA4_ID || 'G-8C6LP4VJSY';
const GOOGLE_SITE_VERIFICATION =
  process.env.LVS_PREMIUM_GOOGLE_SITE_VERIFICATION || process.env.LVS_GOOGLE_SITE_VERIFICATION || '';
const ASSETS_DIR = path.join(__dirname, '..', 'assets');
const FONTS_DIR = path.join(ASSETS_DIR, 'fonts');
const BRAND_DIST_DIR = path.join(DIST_DIR, 'brand');
const MEDIA_DIST_DIR = path.join(DIST_DIR, 'media');
const FONTS_DIST_DIR = path.join(DIST_DIR, 'fonts');

const FAVICON_SOURCE = path.join(ASSETS_DIR, 'logo-isotipo-lavozsalsa.png');
const HEADER_LOGO_SOURCE = path.join(ASSETS_DIR, 'logo-lavozsalsa-header-red.png');
const FOOTER_LOGO_SOURCE = path.join(ASSETS_DIR, 'logo-lavozsalsa-dotcom-white.png');
const HERO_SOURCE = path.join(ASSETS_DIR, 'premium-hero.jpg');
const BENEFITS_SOURCE = path.join(ASSETS_DIR, 'premium-benefits.jpg');
const COMMUNITY_SOURCE = path.join(ASSETS_DIR, 'premium-community.jpg');

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

function buildStructuredData() {
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'La Voz Salsa',
      url: SITE_URL,
      logo: `${SITE_URL}/brand/logo-lavozsalsa-header-red.png`,
      description: 'La Voz Salsa Premium: escucha sin anuncios, modo offline y playlists propias.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'La Voz Salsa Premium',
      url: `${SITE_URL}/`,
      description: 'Apoya la salsa nueva y disfruta una experiencia exclusiva dentro de La Voz Salsa.',
      publisher: {
        '@type': 'Organization',
        name: 'La Voz Salsa',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'La Voz Salsa Premium',
      description:
        'Suscripción anual para oyentes con escucha sin anuncios, modo offline, playlists exclusivas, playlists propias, favoritos y biblioteca personal.',
      brand: {
        '@type': 'Brand',
        name: 'La Voz Salsa',
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: '14.99',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/`,
      },
    },
  ];

  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

const META_BLOCK = [
  '<meta name="description" content="La Voz Salsa Premium: sin anuncios, modo offline, playlists exclusivas y playlists propias por USD$14.99 al año." />',
  '<meta name="robots" content="noindex,nofollow,noarchive" />',
  '<meta name="theme-color" content="#ff2026" />',
  `<link rel="canonical" href="${SITE_URL}/" />`,
  `<link rel="preload" as="image" href="${SITE_URL}/media/premium-hero.jpg" />`,
  GOOGLE_SITE_VERIFICATION
    ? `<meta name="google-site-verification" content="${GOOGLE_SITE_VERIFICATION}" />`
    : '',
  '<meta property="og:title" content="La Voz Salsa Premium" />',
  '<meta property="og:site_name" content="La Voz Salsa Premium" />',
  '<meta property="og:description" content="Apoya la salsa nueva y disfruta una experiencia exclusiva dentro de La Voz Salsa." />',
  '<meta property="og:type" content="website" />',
  `<meta property="og:url" content="${SITE_URL}/" />`,
  `<meta property="og:image" content="${SITE_URL}/media/premium-hero.jpg" />`,
  '<meta property="og:image:alt" content="La Voz Salsa Premium" />',
  '<meta name="twitter:card" content="summary_large_image" />',
  '<meta name="twitter:title" content="La Voz Salsa Premium" />',
  '<meta name="twitter:description" content="Sin anuncios, modo offline, playlists propias y una experiencia exclusiva dentro de La Voz Salsa." />',
  `<meta name="twitter:image" content="${SITE_URL}/media/premium-hero.jpg" />`,
  '<link rel="icon" type="image/png" href="/favicon.png" />',
  '<link rel="apple-touch-icon" href="/apple-touch-icon.png" />',
  '<link rel="manifest" href="/site.webmanifest" />',
  buildStructuredData(),
  buildAnalyticsBlock(),
]
  .filter(Boolean)
  .join('\n    ');

const SOCIAL_PREVIEW_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#14080a"/>
      <stop offset="42%" stop-color="#09090a"/>
      <stop offset="100%" stop-color="#060608"/>
    </linearGradient>
    <radialGradient id="glowA" cx="0" cy="0" r="1" gradientTransform="translate(980 180) scale(360)">
      <stop offset="0%" stop-color="#20c1ff" stop-opacity="0.34"/>
      <stop offset="100%" stop-color="#20c1ff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="0" cy="0" r="1" gradientTransform="translate(820 420) scale(420)">
      <stop offset="0%" stop-color="#ff2340" stop-opacity="0.36"/>
      <stop offset="100%" stop-color="#ff2340" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glowA)"/>
  <rect width="1200" height="630" fill="url(#glowB)"/>
  <text x="90" y="248" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="92" font-weight="700">
    La Voz Salsa Premium
  </text>
  <text x="90" y="334" fill="#ffb6bb" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700">
    Sin anuncios, modo offline y playlists propias
  </text>
  <text x="90" y="410" fill="#d9cdc4" font-family="Arial, Helvetica, sans-serif" font-size="28">
    Apoya la salsa nueva y disfruta una experiencia exclusiva por USD$14.99 al año.
  </text>
</svg>
`.trimStart();

const WEB_MANIFEST = JSON.stringify(
  {
    name: 'La Voz Salsa Premium',
    short_name: 'LVS Premium',
    description: 'Experiencia exclusiva para oyentes de La Voz Salsa.',
    background_color: '#070707',
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

const ROBOTS = ['User-agent: *', 'Allow: /'].join('\n');

const SITEMAP_XML = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`.trimStart();

function ensureDistExists() {
  if (!fs.existsSync(DIST_DIR)) {
    throw new Error(`No existe dist: ${DIST_DIR}`);
  }
}

function patchIndexHtml() {
  const indexHtml = fs.readFileSync(INDEX_PATH, 'utf8');

  let nextHtml = indexHtml.replace('<html lang="en">', '<html lang="es">');
  nextHtml = nextHtml.replace('<title>La Voz Salsa Web</title>', '<title>La Voz Salsa Premium</title>');
  nextHtml = nextHtml.replace(
    '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />',
    `<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />\n    ${META_BLOCK}`
  );
  nextHtml = nextHtml.replace(
    'You need to enable JavaScript to run this app.',
    'Necesitas habilitar JavaScript para ver La Voz Salsa Premium.'
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
        background: #070707;
      }

      #root {
        display: block;
        min-height: 100%;
      }
    </style>`
  );

  fs.writeFileSync(INDEX_PATH, nextHtml);
}

function writeStaticFiles() {
  fs.mkdirSync(BRAND_DIST_DIR, { recursive: true });
  fs.mkdirSync(MEDIA_DIST_DIR, { recursive: true });
  fs.mkdirSync(FONTS_DIST_DIR, { recursive: true });

  const assetCopies = [
    [HEADER_LOGO_SOURCE, path.join(BRAND_DIST_DIR, 'logo-lavozsalsa-header-red.png')],
    [FOOTER_LOGO_SOURCE, path.join(BRAND_DIST_DIR, 'logo-lavozsalsa-dotcom-white.png')],
    [FAVICON_SOURCE, path.join(BRAND_DIST_DIR, 'logo-isotipo-lavozsalsa.png')],
    [FAVICON_SOURCE, path.join(DIST_DIR, 'favicon.png')],
    [FAVICON_SOURCE, path.join(DIST_DIR, 'apple-touch-icon.png')],
    [HERO_SOURCE, path.join(MEDIA_DIST_DIR, 'premium-hero.jpg')],
    [BENEFITS_SOURCE, path.join(MEDIA_DIST_DIR, 'premium-benefits.jpg')],
    [COMMUNITY_SOURCE, path.join(MEDIA_DIST_DIR, 'premium-community.jpg')],
    [path.join(FONTS_DIR, 'GothamBook.ttf'), path.join(FONTS_DIST_DIR, 'GothamBook.ttf')],
    [path.join(FONTS_DIR, 'GothamMedium.ttf'), path.join(FONTS_DIST_DIR, 'GothamMedium.ttf')],
    [path.join(FONTS_DIR, 'GothamBold.ttf'), path.join(FONTS_DIST_DIR, 'GothamBold.ttf')],
    [path.join(FONTS_DIR, 'GothamBlack.otf'), path.join(FONTS_DIST_DIR, 'GothamBlack.otf')],
  ];

  assetCopies.forEach(([from, to]) => {
    fs.copyFileSync(from, to);
    fs.chmodSync(to, 0o644);
  });

  fs.writeFileSync(path.join(DIST_DIR, 'social-preview.svg'), SOCIAL_PREVIEW_SVG);
  fs.writeFileSync(path.join(DIST_DIR, 'site.webmanifest'), WEB_MANIFEST);
  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), ROBOTS);
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), SITEMAP_XML);
  fs.copyFileSync(INDEX_PATH, path.join(DIST_DIR, '404.html'));
}

function main() {
  ensureDistExists();
  patchIndexHtml();
  writeStaticFiles();
  console.log('Postbuild web listo: Premium con metadatos, sitemap y assets optimizados.');
}

main();
