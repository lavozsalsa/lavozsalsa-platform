const fs = require('node:fs');
const path = require('node:path');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const INDEX_PATH = path.join(DIST_DIR, 'index.html');
const SITE_URL = 'https://lavozsalsa.com';
const GA_MEASUREMENT_ID = process.env.LVS_GA4_ID || 'G-8C6LP4VJSY';
const GOOGLE_SITE_VERIFICATION =
  process.env.LVS_GOOGLE_SITE_VERIFICATION || '7NUCpvU-WDIRYQyVyzvAMvwKhhfC21DgyCuXbuY3dIY';
const ASSETS_DIR = path.join(__dirname, '..', 'assets');
const FONTS_DIR = path.join(ASSETS_DIR, 'fonts');
const FAVICON_SOURCE = path.join(ASSETS_DIR, 'logo-isotipo-lavozsalsa.png');
const HEADER_LOGO_SOURCE = path.join(ASSETS_DIR, 'logo-lavozsalsa-header-red.png');
const FOOTER_LOGO_SOURCE = path.join(ASSETS_DIR, 'logo-lavozsalsa-dotcom-white.png');
const HERO_BG_SOURCE = path.join(ASSETS_DIR, 'lavozsalsa-home-hero.jpeg');
const COMMUNITY_BLOCK_SOURCE = path.join(ASSETS_DIR, 'community-block.jpeg');
const BRAND_DIST_DIR = path.join(DIST_DIR, 'brand');
const MEDIA_DIST_DIR = path.join(DIST_DIR, 'media');
const FONTS_DIST_DIR = path.join(DIST_DIR, 'fonts');
const ARTISTS_ROUTE_DIR = path.join(DIST_DIR, 'artistas');

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
      '@type': 'Organization',
      name: 'La Voz Salsa',
      url: SITE_URL,
      logo: `${SITE_URL}/brand/logo-lavozsalsa-header-red.png`,
      description: 'Ecosistema digital de salsa con música, radio en vivo, live streaming y app.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'La Voz Salsa',
      url: `${SITE_URL}/`,
      description: 'Música, radio en vivo, live streaming y app para la comunidad salsera.',
      publisher: {
        '@type': 'Organization',
        name: 'La Voz Salsa',
      },
    },
  ];

  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

const META_BLOCK = [
  '<meta name="description" content="La Voz Salsa: música, radio en vivo, app, live streaming y comunidad salsera." />',
  '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />',
  '<meta name="theme-color" content="#ff101f" />',
  `<link rel="canonical" href="${SITE_URL}/" />`,
  GOOGLE_SITE_VERIFICATION
    ? `<meta name="google-site-verification" content="${GOOGLE_SITE_VERIFICATION}" />`
    : '',
  '<meta property="og:title" content="La Voz Salsa" />',
  '<meta property="og:site_name" content="La Voz Salsa" />',
  '<meta property="og:description" content="Música, radio en vivo, app, live streaming y comunidad salsera." />',
  '<meta property="og:type" content="website" />',
  `<meta property="og:url" content="${SITE_URL}/" />`,
  `<meta property="og:image" content="${SITE_URL}/media/lavozsalsa-home-hero.jpeg" />`,
  '<meta property="og:image:alt" content="La Voz Salsa: música, radio en vivo, live streaming y app." />',
  '<meta name="twitter:card" content="summary_large_image" />',
  '<meta name="twitter:title" content="La Voz Salsa" />',
  '<meta name="twitter:description" content="Música, radio en vivo, app, live streaming y comunidad salsera." />',
  `<meta name="twitter:image" content="${SITE_URL}/media/lavozsalsa-home-hero.jpeg" />`,
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
      <stop offset="0%" stop-color="#180D11"/>
      <stop offset="45%" stop-color="#09070A"/>
      <stop offset="100%" stop-color="#060507"/>
    </linearGradient>
    <radialGradient id="glowA" cx="0" cy="0" r="1" gradientTransform="translate(220 110) scale(300)">
      <stop offset="0%" stop-color="#FF6A2B" stop-opacity="0.38"/>
      <stop offset="100%" stop-color="#FF6A2B" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="0" cy="0" r="1" gradientTransform="translate(980 540) scale(340)">
      <stop offset="0%" stop-color="#7F1018" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="#7F1018" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glowA)"/>
  <rect width="1200" height="630" fill="url(#glowB)"/>
  <g transform="translate(120 120)">
    <circle cx="88" cy="88" r="88" fill="#FF6A2B"/>
    <circle cx="88" cy="63" r="13" fill="#F6F0E9"/>
    <path d="M54 110c0-18.8 15.2-34 34-34" stroke="#F6F0E9" stroke-width="10" stroke-linecap="round" fill="none"/>
    <path d="M122 110c0-18.8-15.2-34-34-34" stroke="#F6F0E9" stroke-width="10" stroke-linecap="round" fill="none"/>
    <path d="M32 124c0-30.9 25.1-56 56-56" stroke="#F6F0E9" stroke-width="10" stroke-linecap="round" fill="none"/>
    <path d="M144 124c0-30.9-25.1-56-56-56" stroke="#F6F0E9" stroke-width="10" stroke-linecap="round" fill="none"/>
  </g>
  <text x="120" y="380" fill="#F6F0E9" font-family="Arial, Helvetica, sans-serif" font-size="96" font-weight="700">
    La Voz Salsa
  </text>
  <text x="120" y="460" fill="#FF9C66" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="700">
    Música, radio en vivo, app, playlists y comunidad salsera
  </text>
  <text x="120" y="532" fill="#CDBFAF" font-family="Arial, Helvetica, sans-serif" font-size="28">
    Escucha, descubre canciones, sigue artistas y descarga la app gratis.
  </text>
</svg>
`.trimStart();

const WEB_MANIFEST = JSON.stringify(
  {
    name: 'La Voz Salsa',
    short_name: 'La Voz Salsa',
    description: 'Música, radio en vivo, app, playlists, artistas y comunidad salsera.',
    background_color: '#0a0a0a',
    theme_color: '#ff101f',
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
  nextHtml = nextHtml.replace('<title>La Voz Salsa Web</title>', '<title>La Voz Salsa</title>');
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
        background: #050505;
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
  const copiedPngTargets = [
    path.join(BRAND_DIST_DIR, 'logo-lavozsalsa-header-red.png'),
    path.join(BRAND_DIST_DIR, 'logo-lavozsalsa-dotcom-white.png'),
    path.join(BRAND_DIST_DIR, 'logo-isotipo-lavozsalsa.png'),
    path.join(DIST_DIR, 'favicon.png'),
    path.join(DIST_DIR, 'apple-touch-icon.png'),
  ];
  const copiedMediaTargets = [
    path.join(MEDIA_DIST_DIR, 'lavozsalsa-home-hero.jpeg'),
    path.join(MEDIA_DIST_DIR, 'community-block.jpeg'),
  ];
  const copiedFontTargets = [
    path.join(FONTS_DIST_DIR, 'GothamBook.ttf'),
    path.join(FONTS_DIST_DIR, 'GothamMedium.ttf'),
    path.join(FONTS_DIST_DIR, 'GothamBold.ttf'),
    path.join(FONTS_DIST_DIR, 'GothamBlack.otf'),
  ];

  fs.mkdirSync(BRAND_DIST_DIR, { recursive: true });
  fs.mkdirSync(MEDIA_DIST_DIR, { recursive: true });
  fs.mkdirSync(FONTS_DIST_DIR, { recursive: true });
  fs.copyFileSync(HEADER_LOGO_SOURCE, copiedPngTargets[0]);
  fs.copyFileSync(FOOTER_LOGO_SOURCE, copiedPngTargets[1]);
  fs.copyFileSync(FAVICON_SOURCE, copiedPngTargets[2]);
  fs.copyFileSync(FAVICON_SOURCE, copiedPngTargets[3]);
  fs.copyFileSync(FAVICON_SOURCE, copiedPngTargets[4]);
  fs.copyFileSync(HERO_BG_SOURCE, copiedMediaTargets[0]);
  fs.copyFileSync(COMMUNITY_BLOCK_SOURCE, copiedMediaTargets[1]);
  fs.copyFileSync(path.join(FONTS_DIR, 'GothamBook.ttf'), copiedFontTargets[0]);
  fs.copyFileSync(path.join(FONTS_DIR, 'GothamMedium.ttf'), copiedFontTargets[1]);
  fs.copyFileSync(path.join(FONTS_DIR, 'GothamBold.ttf'), copiedFontTargets[2]);
  fs.copyFileSync(path.join(FONTS_DIR, 'GothamBlack.otf'), copiedFontTargets[3]);
  copiedPngTargets.forEach((target) => fs.chmodSync(target, 0o644));
  copiedMediaTargets.forEach((target) => fs.chmodSync(target, 0o644));
  copiedFontTargets.forEach((target) => fs.chmodSync(target, 0o644));
  fs.writeFileSync(path.join(DIST_DIR, 'social-preview.svg'), SOCIAL_PREVIEW_SVG);
  fs.writeFileSync(path.join(DIST_DIR, 'site.webmanifest'), WEB_MANIFEST);
  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), ROBOTS);
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), SITEMAP_XML);
  fs.copyFileSync(INDEX_PATH, path.join(DIST_DIR, '404.html'));
}

function writeArtistsRoute() {
  const indexHtml = fs.readFileSync(INDEX_PATH, 'utf8');
  const artistsHtml = indexHtml
    .replace('<title>La Voz Salsa</title>', '<title>La Voz Salsa para Artistas</title>')
    .replaceAll('<meta property="og:title" content="La Voz Salsa" />', '<meta property="og:title" content="La Voz Salsa para Artistas" />')
    .replaceAll('<meta name="twitter:title" content="La Voz Salsa" />', '<meta name="twitter:title" content="La Voz Salsa para Artistas" />')
    .replaceAll(
      'La Voz Salsa: música, radio en vivo, app, playlists, artistas y comunidad salsera.',
      'La Voz Salsa para Artistas: una plataforma para artistas independientes de la salsa.'
    )
    .replaceAll(
      'Música, radio en vivo, app, playlists, artistas y comunidad salsera.',
      'Una plataforma para artistas independientes de la salsa.'
    );

  fs.mkdirSync(ARTISTS_ROUTE_DIR, { recursive: true });
  fs.writeFileSync(path.join(ARTISTS_ROUTE_DIR, 'index.html'), artistsHtml);
}

ensureDistExists();
patchIndexHtml();
writeStaticFiles();
writeArtistsRoute();

console.log('Postbuild web listo: metadatos, favicon, preview social, ruta /artistas y robots generados.');
