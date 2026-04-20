const fs = require('fs');
const path = require('path');

const localElectronRoot = path.join(__dirname, 'electron-dist');
const localCodeApp = path.join(localElectronRoot, 'Code.app');
const useLocalCodeElectron =
  process.env.LVS_DESKTOP_LOCAL_ELECTRON === '1' && fs.existsSync(localCodeApp);
const hasMacSigningIdentity = Boolean(process.env.CSC_LINK || process.env.CSC_NAME);
const shouldSkipMacSigning =
  useLocalCodeElectron || process.env.LVS_DESKTOP_SKIP_SIGN === '1' || !hasMacSigningIdentity;
const outputDirectory = process.env.LVS_INSTALLER_OUTPUT_DIR || 'installer-release';

const config = {
  appId: 'com.lavozsalsa.installer',
  productName: 'Instala La Voz Salsa',
  artifactName: '${productName}-${version}.${ext}',
  asar: true,
  afterSign: 'scripts/notarize-macos.js',
  directories: {
    output: outputDirectory,
  },
  files: ['installer-app/**/*', '!installer-app/payloads{,/**/*}', 'assets/icon.png'],
  extraResources: [
    {
      from: 'installer-app/payloads',
      to: 'installer-payloads',
    },
  ],
  extraMetadata: {
    main: 'installer-app/main.js',
    name: 'instala-la-voz-salsa',
    description: 'Instalador de macOS para La Voz Salsa.',
  },
  icon: 'assets/icon.png',
  electronDownload: {
    mirror: 'https://npmmirror.com/mirrors/electron/',
  },
  mac: {
    notarize: false,
    target: [
      {
        target: 'dmg',
        arch: ['universal'],
      },
    ],
    category: 'public.app-category.music',
    hardenedRuntime: true,
    gatekeeperAssess: false,
    entitlements: 'build/entitlements.mac.plist',
    entitlementsInherit: 'build/entitlements.mac.inherit.plist',
  },
  dmg: {
    title: 'Instala La Voz Salsa',
    sign: false,
    window: {
      width: 680,
      height: 430,
    },
    iconSize: 150,
    contents: [
      {
        x: 340,
        y: 170,
        type: 'file',
      },
    ],
  },
};

if (shouldSkipMacSigning) {
  config.mac.identity = null;
}

if (useLocalCodeElectron) {
  config.electronVersion = '39.8.5';
  config.electronDist = 'electron-dist';
  config.electronBranding = {
    projectName: 'Code',
    productName: 'Code',
  };
}

module.exports = config;
