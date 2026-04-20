const fs = require('node:fs');
const path = require('node:path');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const INDEX_PATH = path.join(DIST_DIR, 'index.html');
const SITE_URL = process.env.LVS_PUBLIC_SITE_URL || process.env.LVS_SITE_URL || 'https://comercial.lavozsalsa.com';
const GA_MEASUREMENT_ID = process.env.LVS_PREMIUM_GA4_ID || process.env.LVS_GA4_ID || 'G-8C6LP4VJSY';
const GOOGLE_SITE_VERIFICATION =
  process.env.LVS_PREMIUM_GOOGLE_SITE_VERIFICATION || process.env.LVS_GOOGLE_SITE_VERIFICATION || '';
const ASSETS_DIR = path.join(__dirname, '..', 'assets');
const FONTS_DIR = path.join(ASSETS_DIR, 'fonts');
const PLATFORM_LOGOS_DIR = path.join(ASSETS_DIR, 'platform-logos');
const BRAND_DIST_DIR = path.join(DIST_DIR, 'brand');
const MEDIA_DIST_DIR = path.join(DIST_DIR, 'media');
const FONTS_DIST_DIR = path.join(DIST_DIR, 'fonts');
const PLATFORM_LOGOS_DIST_DIR = path.join(MEDIA_DIST_DIR, 'platform-logos');

const FAVICON_SOURCE = path.join(ASSETS_DIR, 'logo-isotipo-lavozsalsa.png');
const HUB_LOGO_SOURCE = path.join(ASSETS_DIR, 'logo-hub-salsa.png');
const HEADER_LOGO_SOURCE = path.join(ASSETS_DIR, 'logo-lavozsalsa-header-red.png');
const FINAL_COVER_LOGO_SOURCE = path.join(ASSETS_DIR, 'logo-lavozsalsa-cover-black-horizontal.png');
const FOOTER_LOGO_SOURCE = path.join(ASSETS_DIR, 'logo-lavozsalsa-dotcom-white.png');
const WORDMARK_WHITE_SOURCE = path.join(ASSETS_DIR, 'logo-wordmark-lavozsalsa-white.png');
const HERO_SOURCE = path.join(ASSETS_DIR, 'hero-portada-lavozsalsa.jpg');
const ECOSYSTEM_BG_SOURCE = path.join(ASSETS_DIR, 'fondo-ecosistema-digital.jpg');
const METRICS_BG_SOURCE = path.join(ASSETS_DIR, 'metrics-audience-bg.jpeg');
const BRANDS_BG_SOURCE = path.join(ASSETS_DIR, 'integrations-bg.jpg');
const BENEFITS_SOURCE = path.join(ASSETS_DIR, 'premium-benefits.jpg');
const COMMUNITY_SOURCE = path.join(ASSETS_DIR, 'premium-community.jpg');
const COMMUNITY_BLOCK_SOURCE = path.join(ASSETS_DIR, 'community-block.jpeg');
const ARTWORK_SOURCE = path.join(ASSETS_DIR, 'home-hero-salsa.jpeg');
const STUDIO_SOURCE = path.join(ASSETS_DIR, 'studio-lavozsalsa.jpeg');
const SOCIAL_PREVIEW_IMAGE_SOURCE = path.join(ASSETS_DIR, 'social-preview-whatsapp.png');

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
      description:
        'La Voz Salsa es una plataforma de música, radio y comunidad salsera con propuesta comercial para marcas.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Comercial | La Voz Salsa',
      url: `${SITE_URL}/`,
      description:
        'Landing comercial de La Voz Salsa para presentar su ecosistema de radio, streaming, app, web y programas en vivo.',
      publisher: {
        '@type': 'Organization',
        name: 'La Voz Salsa',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Comercial | La Voz Salsa',
      url: `${SITE_URL}/`,
      description:
        'Propuesta multiplataforma para conectar marcas con una comunidad real de oyentes de salsa.',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Comercial | La Voz Salsa',
        url: `${SITE_URL}/`,
      },
    },
  ];

  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

const META_BLOCK = [
  '<meta name="description" content="Landing comercial de La Voz Salsa para marcas: radio online, live streaming, app, web y programas en vivo con una comunidad salsera real." />',
  '<meta name="robots" content="noindex,nofollow,noarchive" />',
  '<meta name="theme-color" content="#ff2026" />',
  `<link rel="canonical" href="${SITE_URL}/" />`,
  `<link rel="preload" as="image" href="${SITE_URL}/media/hero-portada-lavozsalsa.jpg" />`,
  GOOGLE_SITE_VERIFICATION
    ? `<meta name="google-site-verification" content="${GOOGLE_SITE_VERIFICATION}" />`
    : '',
  '<meta property="og:title" content="Comercial | La Voz Salsa" />',
  '<meta property="og:site_name" content="La Voz Salsa" />',
  '<meta property="og:description" content="Radio online, streaming, app, web y programas en vivo para marcas con afinidad real con la cultura salsa." />',
  '<meta property="og:type" content="website" />',
  `<meta property="og:url" content="${SITE_URL}/" />`,
  `<meta property="og:image" content="${SITE_URL}/social-preview.png" />`,
  '<meta property="og:image:type" content="image/png" />',
  '<meta property="og:image:width" content="1200" />',
  '<meta property="og:image:height" content="630" />',
  '<meta property="og:image:alt" content="La Voz Salsa para marcas" />',
  '<meta name="twitter:card" content="summary_large_image" />',
  '<meta name="twitter:title" content="Comercial | La Voz Salsa" />',
  '<meta name="twitter:description" content="Una propuesta 360 con radio online, live streaming, web, app y programas en vivo dentro del universo La Voz Salsa." />',
  `<meta name="twitter:image" content="${SITE_URL}/social-preview.png" />`,
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
      <stop offset="0%" stop-color="#150608"/>
      <stop offset="46%" stop-color="#09090a"/>
      <stop offset="100%" stop-color="#050506"/>
    </linearGradient>
    <radialGradient id="glowA" cx="0" cy="0" r="1" gradientTransform="translate(1010 150) scale(360)">
      <stop offset="0%" stop-color="#ff2b32" stop-opacity="0.38"/>
      <stop offset="100%" stop-color="#ff2b32" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="0" cy="0" r="1" gradientTransform="translate(820 420) scale(420)">
      <stop offset="0%" stop-color="#ff5a60" stop-opacity="0.26"/>
      <stop offset="100%" stop-color="#ff5a60" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glowA)"/>
  <rect width="1200" height="630" fill="url(#glowB)"/>
  <text x="90" y="182" fill="#ffb3b7" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700">
    APP SALSERA • RADIO • TV • WEB
  </text>
  <text x="90" y="290" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="88" font-weight="700">
    La Voz Salsa
  </text>
  <text x="90" y="376" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="88" font-weight="700">
    para marcas
  </text>
  <text x="90" y="454" fill="#e2d6ce" font-family="Arial, Helvetica, sans-serif" font-size="30">
    Radio online, live streaming, web, app y programas en vivo
  </text>
  <text x="90" y="500" fill="#e2d6ce" font-family="Arial, Helvetica, sans-serif" font-size="30">
    dentro de una comunidad real de oyentes de salsa.
  </text>
</svg>
`.trimStart();

const WEB_MANIFEST = JSON.stringify(
  {
    name: 'Comercial | La Voz Salsa',
    short_name: 'LVS Comercial',
    description: 'Landing comercial de La Voz Salsa para presentar su ecosistema publicitario.',
    background_color: '#050506',
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
  nextHtml = nextHtml.replace('<title>La Voz Salsa Web</title>', '<title>Comercial | La Voz Salsa</title>');
  nextHtml = nextHtml.replace(
    '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />',
    `<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />\n    ${META_BLOCK}`
  );
  nextHtml = nextHtml.replace(
    'You need to enable JavaScript to run this app.',
    'Necesitas habilitar JavaScript para ver La Voz Salsa.'
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
        background: #050506;
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
  fs.mkdirSync(PLATFORM_LOGOS_DIST_DIR, { recursive: true });

  const assetCopies = [
    [HEADER_LOGO_SOURCE, path.join(BRAND_DIST_DIR, 'logo-lavozsalsa-header-red.png')],
    [FINAL_COVER_LOGO_SOURCE, path.join(BRAND_DIST_DIR, 'logo-lavozsalsa-cover-black-horizontal.png')],
    [FOOTER_LOGO_SOURCE, path.join(BRAND_DIST_DIR, 'logo-lavozsalsa-dotcom-white.png')],
    [WORDMARK_WHITE_SOURCE, path.join(BRAND_DIST_DIR, 'logo-wordmark-lavozsalsa-white.png')],
    [FAVICON_SOURCE, path.join(BRAND_DIST_DIR, 'logo-isotipo-lavozsalsa.png')],
    [HUB_LOGO_SOURCE, path.join(BRAND_DIST_DIR, 'logo-hub-salsa.png')],
    [FAVICON_SOURCE, path.join(DIST_DIR, 'favicon.png')],
    [FAVICON_SOURCE, path.join(DIST_DIR, 'apple-touch-icon.png')],
    [HERO_SOURCE, path.join(MEDIA_DIST_DIR, 'hero-portada-lavozsalsa.jpg')],
    [ECOSYSTEM_BG_SOURCE, path.join(MEDIA_DIST_DIR, 'fondo-ecosistema-digital.jpg')],
    [METRICS_BG_SOURCE, path.join(MEDIA_DIST_DIR, 'metrics-audience-bg.jpeg')],
    [BRANDS_BG_SOURCE, path.join(MEDIA_DIST_DIR, 'integrations-bg.jpg')],
    [BENEFITS_SOURCE, path.join(MEDIA_DIST_DIR, 'premium-benefits.jpg')],
    [COMMUNITY_SOURCE, path.join(MEDIA_DIST_DIR, 'premium-community.jpg')],
    [COMMUNITY_BLOCK_SOURCE, path.join(MEDIA_DIST_DIR, 'community-block.jpeg')],
    [ARTWORK_SOURCE, path.join(MEDIA_DIST_DIR, 'home-hero-salsa.jpeg')],
    [STUDIO_SOURCE, path.join(MEDIA_DIST_DIR, 'studio-lavozsalsa.jpeg')],
    [SOCIAL_PREVIEW_IMAGE_SOURCE, path.join(DIST_DIR, 'social-preview.png')],
    [path.join(PLATFORM_LOGOS_DIR, 'instagram-wordmark.png'), path.join(PLATFORM_LOGOS_DIST_DIR, 'instagram-wordmark.png')],
    [path.join(PLATFORM_LOGOS_DIR, 'tiktok-wordmark.png'), path.join(PLATFORM_LOGOS_DIST_DIR, 'tiktok-wordmark.png')],
    [path.join(PLATFORM_LOGOS_DIR, 'facebook-wordmark.png'), path.join(PLATFORM_LOGOS_DIST_DIR, 'facebook-wordmark.png')],
    [path.join(PLATFORM_LOGOS_DIR, 'youtube-wordmark.png'), path.join(PLATFORM_LOGOS_DIST_DIR, 'youtube-wordmark.png')],
    [path.join(PLATFORM_LOGOS_DIR, 'x-wordmark.png'), path.join(PLATFORM_LOGOS_DIST_DIR, 'x-wordmark.png')],
    [path.join(PLATFORM_LOGOS_DIR, 'google-play-wordmark.png'), path.join(PLATFORM_LOGOS_DIST_DIR, 'google-play-wordmark.png')],
    [path.join(PLATFORM_LOGOS_DIR, 'app-store-wordmark.png'), path.join(PLATFORM_LOGOS_DIST_DIR, 'app-store-wordmark.png')],
    [path.join(PLATFORM_LOGOS_DIR, 'spotify-wordmark.png'), path.join(PLATFORM_LOGOS_DIST_DIR, 'spotify-wordmark.png')],
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
  console.log('Postbuild web listo: landing comercial con metadatos, sitemap y assets actualizados.');
}

main();
