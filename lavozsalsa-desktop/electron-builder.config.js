const fs = require('fs');
const path = require('path');

const localElectronRoot = path.join(__dirname, 'electron-dist');
const localCodeApp = path.join(localElectronRoot, 'Code.app');
const useLocalCodeElectron =
  process.env.LVS_DESKTOP_LOCAL_ELECTRON === '1' && fs.existsSync(localCodeApp);
const hasMacSigningIdentity = Boolean(process.env.CSC_LINK || process.env.CSC_NAME);
const shouldSkipMacSigning =
  useLocalCodeElectron || process.env.LVS_DESKTOP_SKIP_SIGN === '1' || !hasMacSigningIdentity;
const outputDirectory = process.env.LVS_DESKTOP_OUTPUT_DIR || 'release';

const config = {
  appId: 'com.lavozsalsa.desktop',
  productName: 'La Voz Salsa',
  asar: true,
  afterSign: 'scripts/notarize-macos.js',
  directories: {
    output: outputDirectory,
  },
  files: [
    'main.js',
    'preload.js',
    'renderer.js',
    'index.html',
    'styles.css',
    'offline.html',
    'assets/**/*',
  ],
  icon: 'assets/icon.png',
  electronDownload: {
    mirror: 'https://npmmirror.com/mirrors/electron/',
  },
  mac: {
    notarize: false,
    target: [
      {
        target: 'dmg',
        arch: ['arm64', 'x64'],
      },
    ],
    category: 'public.app-category.music',
    hardenedRuntime: true,
    gatekeeperAssess: false,
    entitlements: 'build/entitlements.mac.plist',
    entitlementsInherit: 'build/entitlements.mac.inherit.plist',
  },
  win: {
    target: [
      {
        target: 'nsis',
        arch: ['x64'],
      },
    ],
    publisherName: process.env.WIN_PUBLISHER_NAME ? [process.env.WIN_PUBLISHER_NAME] : undefined,
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
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
