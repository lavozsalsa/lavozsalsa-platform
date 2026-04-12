const fs = require('node:fs');
const path = require('node:path');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const INDEX_PATH = path.join(DIST_DIR, 'index.html');
const SITE_URL = 'https://artistas.lavozsalsa.com';
const GA_MEASUREMENT_ID = process.env.LVS_ARTISTS_GA4_ID || process.env.LVS_GA4_ID || 'G-8C6LP4VJSY';
const GOOGLE_SITE_VERIFICATION =
  process.env.LVS_ARTISTS_GOOGLE_SITE_VERIFICATION || process.env.LVS_GOOGLE_SITE_VERIFICATION || '';
const ASSETS_DIR = path.join(__dirname, '..', 'assets');
const FONTS_DIR = path.join(ASSETS_DIR, 'fonts');
const FAVICON_SOURCE = path.join(ASSETS_DIR, 'logo-isotipo-lavozsalsa.png');
const ARTISTS_LOGO_SOURCE = path.join(ASSETS_DIR, 'logo-lavozsalsa-artistas.png');
const PROPOSAL_LOGO_SOURCE = path.join(ASSETS_DIR, 'propuesta-logo-lavozsalsa.png');
const BRAND_DIST_DIR = path.join(DIST_DIR, 'brand');
const MEDIA_DIST_DIR = path.join(DIST_DIR, 'media');
const FONTS_DIST_DIR = path.join(DIST_DIR, 'fonts');
const IMPULSO_ROUTE_DIR = path.join(DIST_DIR, 'impulso');
const POLICY_ROUTE_DIR = path.join(DIST_DIR, 'politica-para-artistas');
const PROPOSAL_ROUTE_DIR = path.join(DIST_DIR, 'propuesta-comercial');
const HERO_IMAGE_SOURCE = path.join(ASSETS_DIR, 'artist-home-hero-optimized.jpg');
const PROPOSAL_PORTADA_SOURCE = path.join(ASSETS_DIR, 'propuesta-portada.jpg');
const IMPULSO_HOME_BG_SOURCE = path.join(ASSETS_DIR, 'impulso-home-bg.jpg');
const IMPULSO_PROPOSAL_COVER_SOURCE = path.join(ASSETS_DIR, 'impulso-proposal-cover.png');
const IMPULSO_ECOSYSTEM_PREVIEW_SOURCE = path.join(ASSETS_DIR, 'impulso-ecosystem-preview.jpg');
const IMPULSO_STUDIO_SHOT_SOURCE = path.join(ASSETS_DIR, 'impulso-studio-shot.jpeg');
const IMPULSO_PROPOSAL_BG_SOURCE = path.join(ASSETS_DIR, 'impulso-proposal-bg.webp');
const IMPULSO_LOGO_SOURCES = [
  ['impulso-logo-christian-alicea.png', path.join(ASSETS_DIR, 'impulso-logo-christian-alicea.png')],
  ['impulso-logo-david-zahan.png', path.join(ASSETS_DIR, 'impulso-logo-david-zahan.png')],
  ['impulso-logo-frankie-ruiz.png', path.join(ASSETS_DIR, 'impulso-logo-frankie-ruiz.png')],
  ['impulso-logo-grupo-gale.png', path.join(ASSETS_DIR, 'impulso-logo-grupo-gale.png')],
  ['impulso-logo-miles-pena.png', path.join(ASSETS_DIR, 'impulso-logo-miles-pena.png')],
  ['impulso-logo-mimi-ibarra.png', path.join(ASSETS_DIR, 'impulso-logo-mimi-ibarra.png')],
  ['impulso-logo-rey-ruiz.png', path.join(ASSETS_DIR, 'impulso-logo-rey-ruiz.png')],
  ['impulso-logo-willie-gonzalez.png', path.join(ASSETS_DIR, 'impulso-logo-willie-gonzalez.png')],
];

const ROOT_META = {
  title: 'La Voz Salsa para Artistas',
  description:
    'Haz parte de una plataforma curada para artistas independientes de la salsa.',
  image: `${SITE_URL}/media/artist-home-hero-optimized.jpg`,
  url: `${SITE_URL}/`,
};

const IMPULSO_META = {
  title: 'Impulso La Voz Salsa para Artistas',
  description:
    'Lleva tu proyecto a otro nivel con una propuesta promocional personalizada dentro del ecosistema La Voz Salsa.',
  image: `${SITE_URL}/media/impulso-home-bg.jpg`,
  url: `${SITE_URL}/impulso/`,
};

const POLICY_META = {
  title: 'Política para Artistas y Subida de Música | La Voz Salsa',
  description:
    'Condiciones aplicables al registro de artistas, titularidad de masters, carga de música y revisión editorial dentro de La Voz Salsa.',
  image: `${SITE_URL}/media/artist-home-hero-optimized.jpg`,
  url: `${SITE_URL}/politica-para-artistas/`,
  noindex: true,
};

const PROPOSAL_META = {
  title: 'Propuesta Comercial para Artistas | La Voz Salsa',
  description:
    'Promoción y difusión para artistas dentro del ecosistema La Voz Salsa: alcance, beneficios, plan promocional y precios.',
  image: `${SITE_URL}/media/propuesta-portada.jpg`,
  url: `${SITE_URL}/propuesta-comercial/`,
  noindex: true,
};

function buildMetaBlock(meta) {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'La Voz Salsa para Artistas',
      url: SITE_URL,
      logo: `${SITE_URL}/brand/logo-lavozsalsa-artistas-v2.png`,
      description: ROOT_META.description,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: meta.title,
      url: meta.url,
      description: meta.description,
      isPartOf: {
        '@type': 'WebSite',
        name: 'La Voz Salsa para Artistas',
        url: SITE_URL,
      },
    },
  ];

  const analyticsBlock = GA_MEASUREMENT_ID
    ? [
        `<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"></script>`,
        '<script>',
        '  window.dataLayer = window.dataLayer || [];',
        '  function gtag(){dataLayer.push(arguments);}',
        "  gtag('js', new Date());",
        `  gtag('config', '${GA_MEASUREMENT_ID}');`,
        '</script>',
      ].join('\n    ')
    : '';

  return [
    `<meta name="description" content="${meta.description}" />`,
    meta.noindex
      ? '<meta name="robots" content="noindex,nofollow,noarchive" />'
      : '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />',
    '<meta name="theme-color" content="#ff101f" />',
    `<link rel="canonical" href="${meta.url}" />`,
    `<link rel="preload" as="image" href="${meta.image}" />`,
    GOOGLE_SITE_VERIFICATION
      ? `<meta name="google-site-verification" content="${GOOGLE_SITE_VERIFICATION}" />`
      : '',
    `<meta property="og:title" content="${meta.title}" />`,
    '<meta property="og:site_name" content="La Voz Salsa para Artistas" />',
    `<meta property="og:description" content="${meta.description}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:url" content="${meta.url}" />`,
    `<meta property="og:image" content="${meta.image}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${meta.title}" />`,
    `<meta name="twitter:description" content="${meta.description}" />`,
    `<meta name="twitter:image" content="${meta.image}" />`,
    '<link rel="icon" type="image/png" href="/favicon.png" />',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png" />',
    '<link rel="manifest" href="/site.webmanifest" />',
    `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`,
    analyticsBlock,
  ]
    .filter(Boolean)
    .join('\n    ');
}

function buildSocialPreviewSvg({ heading, subheading, accent }) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#120608"/>
      <stop offset="55%" stop-color="#050505"/>
      <stop offset="100%" stop-color="#09090A"/>
    </linearGradient>
    <radialGradient id="glowA" cx="0" cy="0" r="1" gradientTransform="translate(210 120) scale(280)">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.36"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="0" cy="0" r="1" gradientTransform="translate(940 510) scale(340)">
      <stop offset="0%" stop-color="#7E0D18" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="#7E0D18" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glowA)"/>
  <rect width="1200" height="630" fill="url(#glowB)"/>
  <circle cx="170" cy="132" r="78" fill="${accent}"/>
  <circle cx="170" cy="110" r="12" fill="#ffffff"/>
  <path d="M140 150c0-16.6 13.4-30 30-30" stroke="#ffffff" stroke-width="9" stroke-linecap="round" fill="none"/>
  <path d="M200 150c0-16.6-13.4-30-30-30" stroke="#ffffff" stroke-width="9" stroke-linecap="round" fill="none"/>
  <path d="M120 162c0-27.6 22.4-50 50-50" stroke="#ffffff" stroke-width="9" stroke-linecap="round" fill="none"/>
  <path d="M220 162c0-27.6-22.4-50-50-50" stroke="#ffffff" stroke-width="9" stroke-linecap="round" fill="none"/>
  <text x="90" y="315" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="82" font-weight="700">
    ${heading}
  </text>
  <text x="90" y="390" fill="#ffb4b9" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700">
    ${subheading}
  </text>
  <text x="90" y="468" fill="#d6c7bf" font-family="Arial, Helvetica, sans-serif" font-size="26">
    Salsa nueva, panel de artista, revisión editorial y visibilidad curada.
  </text>
</svg>
`.trimStart();
}

function buildProposalPreviewSvg({ portadaBase64 }) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="proposalShade" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="rgba(20,6,7,0.92)"/>
      <stop offset="50%" stop-color="rgba(20,6,7,0.58)"/>
      <stop offset="100%" stop-color="rgba(20,6,7,0.18)"/>
    </linearGradient>
  </defs>
  <image href="data:image/jpeg;base64,${portadaBase64}" x="0" y="0" width="1200" height="630" preserveAspectRatio="xMidYMid slice"/>
  <rect width="1200" height="630" fill="url(#proposalShade)"/>
  <rect x="70" y="78" width="224" height="60" rx="16" fill="rgba(255,255,255,0.12)"/>
  <text x="102" y="116" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700">La Voz Salsa</text>
  <text x="80" y="250" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="80" font-weight="800">Propuesta Comercial</text>
  <text x="80" y="334" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="80" font-weight="800">para Artistas</text>
  <text x="82" y="408" fill="#ffd8db" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700">Promoción y difusión dentro del ecosistema La Voz Salsa</text>
</svg>
`.trimStart();
}

const WEB_MANIFEST = JSON.stringify(
  {
    name: ROOT_META.title,
    short_name: 'LVS Artistas',
    description: ROOT_META.description,
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
  <url>
    <loc>${SITE_URL}/impulso/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
`.trimStart();

function ensureDistExists() {
  if (!fs.existsSync(DIST_DIR)) {
    throw new Error(`No existe dist: ${DIST_DIR}`);
  }
}

function patchHtml(html, meta) {
  let nextHtml = html.replace('<html lang="en">', '<html lang="es">');

  nextHtml = nextHtml.replace(
    /<title>.*?<\/title>/,
    `<title>${meta.title}</title>`
  );

  nextHtml = nextHtml.replace(
    '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />',
    `<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />\n    ${buildMetaBlock(meta)}`
  );

  nextHtml = nextHtml.replace(
    'You need to enable JavaScript to run this app.',
    'Necesitas habilitar JavaScript para ver La Voz Salsa para Artistas.'
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

  return nextHtml;
}

function writeStaticFiles() {
  const copiedPngTargets = [
    path.join(BRAND_DIST_DIR, 'logo-lavozsalsa-artistas-v2.png'),
    path.join(BRAND_DIST_DIR, 'propuesta-logo-lavozsalsa.png'),
    path.join(BRAND_DIST_DIR, 'logo-isotipo-lavozsalsa.png'),
    path.join(DIST_DIR, 'favicon.png'),
    path.join(DIST_DIR, 'apple-touch-icon.png'),
  ];
  const copiedFontTargets = [
    path.join(FONTS_DIST_DIR, 'GothamBook.ttf'),
    path.join(FONTS_DIST_DIR, 'GothamMedium.ttf'),
    path.join(FONTS_DIST_DIR, 'GothamBold.ttf'),
    path.join(FONTS_DIST_DIR, 'GothamBlack.otf'),
  ];
  const copiedMediaTargets = [
    path.join(MEDIA_DIST_DIR, 'artist-home-hero-optimized.jpg'),
    path.join(MEDIA_DIST_DIR, 'propuesta-portada.jpg'),
    path.join(MEDIA_DIST_DIR, 'impulso-home-bg.jpg'),
    path.join(MEDIA_DIST_DIR, 'impulso-proposal-cover.png'),
    path.join(MEDIA_DIST_DIR, 'impulso-ecosystem-preview.jpg'),
    path.join(MEDIA_DIST_DIR, 'impulso-studio-shot.jpeg'),
    path.join(MEDIA_DIST_DIR, 'impulso-proposal-bg.webp'),
    ...IMPULSO_LOGO_SOURCES.map(([name]) => path.join(MEDIA_DIST_DIR, name)),
  ];

  fs.mkdirSync(BRAND_DIST_DIR, { recursive: true });
  fs.mkdirSync(MEDIA_DIST_DIR, { recursive: true });
  fs.mkdirSync(FONTS_DIST_DIR, { recursive: true });

  fs.copyFileSync(ARTISTS_LOGO_SOURCE, copiedPngTargets[0]);
  fs.copyFileSync(PROPOSAL_LOGO_SOURCE, copiedPngTargets[1]);
  fs.copyFileSync(FAVICON_SOURCE, copiedPngTargets[2]);
  fs.copyFileSync(FAVICON_SOURCE, copiedPngTargets[3]);
  fs.copyFileSync(FAVICON_SOURCE, copiedPngTargets[4]);
  fs.copyFileSync(path.join(FONTS_DIR, 'GothamBook.ttf'), copiedFontTargets[0]);
  fs.copyFileSync(path.join(FONTS_DIR, 'GothamMedium.ttf'), copiedFontTargets[1]);
  fs.copyFileSync(path.join(FONTS_DIR, 'GothamBold.ttf'), copiedFontTargets[2]);
  fs.copyFileSync(path.join(FONTS_DIR, 'GothamBlack.otf'), copiedFontTargets[3]);
  fs.copyFileSync(HERO_IMAGE_SOURCE, copiedMediaTargets[0]);
  fs.copyFileSync(PROPOSAL_PORTADA_SOURCE, copiedMediaTargets[1]);
  fs.copyFileSync(IMPULSO_HOME_BG_SOURCE, copiedMediaTargets[2]);
  fs.copyFileSync(IMPULSO_PROPOSAL_COVER_SOURCE, copiedMediaTargets[3]);
  fs.copyFileSync(IMPULSO_ECOSYSTEM_PREVIEW_SOURCE, copiedMediaTargets[4]);
  fs.copyFileSync(IMPULSO_STUDIO_SHOT_SOURCE, copiedMediaTargets[5]);
  fs.copyFileSync(IMPULSO_PROPOSAL_BG_SOURCE, copiedMediaTargets[6]);
  IMPULSO_LOGO_SOURCES.forEach(([name, sourcePath], index) => {
    fs.copyFileSync(sourcePath, copiedMediaTargets[index + 7]);
  });

  copiedPngTargets.forEach((target) => fs.chmodSync(target, 0o644));
  copiedFontTargets.forEach((target) => fs.chmodSync(target, 0o644));
  copiedMediaTargets.forEach((target) => fs.chmodSync(target, 0o644));

  fs.writeFileSync(
    path.join(DIST_DIR, 'social-preview-artistas.svg'),
    buildSocialPreviewSvg({
      heading: 'La Voz Salsa para Artistas',
      subheading: 'Panel, perfil verificado y música bajo revisión editorial',
      accent: '#ff101f',
    })
  );

  fs.writeFileSync(
    path.join(DIST_DIR, 'social-preview-impulso.svg'),
    buildSocialPreviewSvg({
      heading: 'Impulso La Voz Salsa',
      subheading: 'Propuesta personalizada para dar más visibilidad a tu proyecto',
      accent: '#ff5a34',
    })
  );

  fs.writeFileSync(
    path.join(DIST_DIR, 'social-preview-propuesta.svg'),
    buildProposalPreviewSvg({
      portadaBase64: fs.readFileSync(PROPOSAL_PORTADA_SOURCE).toString('base64'),
    })
  );

  fs.writeFileSync(path.join(DIST_DIR, 'site.webmanifest'), WEB_MANIFEST);
  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), ROBOTS);
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), SITEMAP_XML);
}

function writeRoutes() {
  const baseHtml = fs.readFileSync(INDEX_PATH, 'utf8');
  const rootHtml = patchHtml(baseHtml, ROOT_META);
  const impulsoHtml = patchHtml(baseHtml, IMPULSO_META);
  const policyHtml = patchHtml(baseHtml, POLICY_META);
  const proposalHtml = patchHtml(baseHtml, PROPOSAL_META);

  fs.writeFileSync(INDEX_PATH, rootHtml);
  fs.writeFileSync(path.join(DIST_DIR, '404.html'), rootHtml);

  fs.mkdirSync(IMPULSO_ROUTE_DIR, { recursive: true });
  fs.writeFileSync(path.join(IMPULSO_ROUTE_DIR, 'index.html'), impulsoHtml);

  fs.mkdirSync(POLICY_ROUTE_DIR, { recursive: true });
  fs.writeFileSync(path.join(POLICY_ROUTE_DIR, 'index.html'), policyHtml);

  fs.mkdirSync(PROPOSAL_ROUTE_DIR, { recursive: true });
  fs.writeFileSync(path.join(PROPOSAL_ROUTE_DIR, 'index.html'), proposalHtml);
}

ensureDistExists();
writeStaticFiles();
writeRoutes();

console.log('Postbuild web listo: metadatos, favicon, fuentes, logos y ruta /impulso generados.');
