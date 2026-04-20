const { existsSync } = require('fs');
const fsp = require('fs/promises');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { app, BrowserWindow, ipcMain, Menu, nativeTheme, shell } = require('electron');

const INDEX_PAGE_PATH = path.join(__dirname, 'index.html');
const PRELOAD_PATH = path.join(__dirname, 'preload.js');
const LOCAL_ICON_PATH = path.join(__dirname, '..', 'assets', 'icon.png');
const PRODUCT_NAME = 'La Voz Salsa';
const INSTALLER_NAME = 'Instala La Voz Salsa';
const APPLICATIONS_TARGET_PATH = `/Applications/${PRODUCT_NAME}.app`;

let mainWindow = null;
let currentInstalledAppPath = null;
let isInstallingApp = false;

function getPayloadRoot() {
  return app.isPackaged
    ? path.join(process.resourcesPath, 'installer-payloads')
    : path.join(__dirname, 'payloads');
}

async function readPayloadManifest() {
  const manifestPath = path.join(getPayloadRoot(), 'manifest.json');
  const raw = await fsp.readFile(manifestPath, 'utf8');
  return JSON.parse(raw);
}

function detectMacArchitecture() {
  try {
    const result = execFileSync('sysctl', ['-in', 'hw.optional.arm64'], { encoding: 'utf8' }).trim();
    if (result === '1') {
      return 'arm64';
    }
  } catch {}

  return 'x64';
}

function getArchitectureLabel(arch) {
  return arch === 'arm64' ? 'Mac con chip Apple' : 'Mac Intel';
}

function formatBytes(value) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = value;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  const digits = size >= 100 ? 0 : size >= 10 ? 1 : 2;
  return `${size.toFixed(digits)} ${units[unitIndex]}`;
}

function findPayloadForArchitecture(manifest, arch) {
  const match = manifest.artifacts.find((artifact) => artifact.arch === arch);

  if (match) {
    return match;
  }

  return manifest.artifacts[0] || null;
}

function sendProgress(progress) {
  if (!mainWindow || mainWindow.isDestroyed()) {
    return;
  }

  mainWindow.webContents.send('installer:progress', progress);
}

function shellEscape(value) {
  return `'${String(value).replace(/'/g, `'\\''`)}'`;
}

async function ensureDirectory(directoryPath) {
  await fsp.mkdir(directoryPath, { recursive: true });
}

async function extractArchive(sourcePath, destinationDirectory) {
  await fsp.rm(destinationDirectory, { recursive: true, force: true });
  await ensureDirectory(destinationDirectory);

  sendProgress({
    stage: 'extracting',
    percent: 38,
  });

  execFileSync('ditto', ['-x', '-k', sourcePath, destinationDirectory], {
    stdio: 'inherit',
  });
}

function installAppWithPrivileges(sourceAppPath) {
  sendProgress({
    stage: 'installing',
    percent: 82,
  });

  const command = [
    `rm -rf ${shellEscape(APPLICATIONS_TARGET_PATH)}`,
    `ditto ${shellEscape(sourceAppPath)} ${shellEscape(APPLICATIONS_TARGET_PATH)}`,
    `xattr -dr com.apple.quarantine ${shellEscape(APPLICATIONS_TARGET_PATH)} || true`,
  ].join(' && ');

  execFileSync('osascript', ['-e', `do shell script ${JSON.stringify(command)} with administrator privileges`], {
    stdio: 'inherit',
  });
}

async function installAppForArchitecture(arch) {
  const manifest = await readPayloadManifest();
  const payload = findPayloadForArchitecture(manifest, arch);

  if (!payload) {
    throw new Error('No encontramos la version interna de La Voz Salsa para este Mac.');
  }

  const sourcePath = path.join(getPayloadRoot(), payload.relativePath);
  const stagingRoot = path.join(app.getPath('userData'), 'installer-staging', arch);
  const extractedRoot = path.join(stagingRoot, 'extracted');
  const sourceStats = await fsp.stat(sourcePath);
  const appBundleName = manifest.appBundleName || `${PRODUCT_NAME}.app`;
  const extractedAppPath = path.join(extractedRoot, appBundleName);

  await fsp.rm(stagingRoot, { recursive: true, force: true });
  await ensureDirectory(stagingRoot);

  sendProgress({
    stage: 'preparing',
    copiedBytes: 0,
    totalBytes: sourceStats.size,
    percent: 10,
  });

  await extractArchive(sourcePath, extractedRoot);

  if (!existsSync(extractedAppPath)) {
    throw new Error('No pudimos preparar la app final para instalarla.');
  }

  installAppWithPrivileges(extractedAppPath);

  await fsp.rm(stagingRoot, { recursive: true, force: true });

  sendProgress({
    stage: 'ready',
    copiedBytes: sourceStats.size,
    totalBytes: sourceStats.size,
    percent: 100,
    destinationPath: APPLICATIONS_TARGET_PATH,
  });

  return { payload, installedAppPath: APPLICATIONS_TARGET_PATH, totalBytes: sourceStats.size };
}

function buildMenu() {
  return Menu.buildFromTemplate([
    {
      label: INSTALLER_NAME,
      submenu: [
        {
          label: 'Instalar ahora',
          accelerator: 'CmdOrCtrl+R',
          click: async () => {
            try {
              if (isInstallingApp) {
                return;
              }

              isInstallingApp = true;
              const arch = detectMacArchitecture();
              const result = await installAppForArchitecture(arch);
              currentInstalledAppPath = result.installedAppPath;
              await shell.openPath(result.installedAppPath);
            } catch (error) {
              sendProgress({
                stage: 'error',
                message: error.message || 'No pudimos preparar el instalador.',
              });
            } finally {
              isInstallingApp = false;
            }
          },
        },
        {
          label: 'Mostrar en Finder',
          click: () => {
            if (currentInstalledAppPath) {
              shell.showItemInFolder(currentInstalledAppPath);
            }
          },
        },
        { type: 'separator' },
        { role: 'quit', label: 'Salir' },
      ],
    },
  ]);
}

function createMainWindow() {
  nativeTheme.themeSource = 'dark';

  mainWindow = new BrowserWindow({
    width: 980,
    height: 720,
    minWidth: 900,
    minHeight: 640,
    title: INSTALLER_NAME,
    icon: LOCAL_ICON_PATH,
    backgroundColor: '#12080b',
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'darwin'
      ? {
          titleBarStyle: 'hiddenInset',
          trafficLightPosition: { x: 18, y: 18 },
        }
      : {}),
    webPreferences: {
      preload: PRELOAD_PATH,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  mainWindow.setMenu(buildMenu());
  mainWindow.setMenuBarVisibility(false);

  mainWindow.once('ready-to-show', () => {
    if (!mainWindow || mainWindow.isDestroyed()) {
      return;
    }

    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.loadFile(INDEX_PAGE_PATH).catch((error) => {
    console.error('No se pudo abrir la interfaz del instalador:', error);
  });
}

ipcMain.handle('installer:get-bootstrap', async () => {
  const arch = detectMacArchitecture();
  const manifest = await readPayloadManifest();
  const payload = findPayloadForArchitecture(manifest, arch);

  return {
    installerName: INSTALLER_NAME,
    productName: PRODUCT_NAME,
    installerVersion: app.getVersion(),
    targetArchitecture: arch,
    architectureLabel: getArchitectureLabel(arch),
    appVersion: manifest.appVersion,
    payloadFileName: payload?.fileName || '',
    payloadSizeLabel: payload?.size ? formatBytes(payload.size) : '',
    destinationLabel: 'Aplicaciones',
    note: 'Esta app detecta tu Mac e instala automaticamente la version correcta en Aplicaciones, sin abrir el instalador clasico de paquetes.',
  };
});

ipcMain.handle('installer:prepare-and-open', async () => {
  if (isInstallingApp) {
    throw new Error('Ya estamos instalando La Voz Salsa. Espera un momento.');
  }

  isInstallingApp = true;

  try {
    const arch = detectMacArchitecture();
    const result = await installAppForArchitecture(arch);
    currentInstalledAppPath = result.installedAppPath;

    const openError = await shell.openPath(result.installedAppPath);
    if (openError) {
      throw new Error('No pudimos abrir La Voz Salsa despues de instalarla.');
    }

    return {
      opened: true,
      destinationPath: result.installedAppPath,
      payloadFileName: result.payload.fileName,
      payloadSizeLabel: formatBytes(result.totalBytes),
    };
  } finally {
    isInstallingApp = false;
  }
});

ipcMain.handle('installer:show-in-finder', async () => {
  if (!currentInstalledAppPath) {
    throw new Error('Todavia no hemos instalado La Voz Salsa.');
  }

  shell.showItemInFolder(currentInstalledAppPath);
  return { ok: true };
});

app.whenReady().then(() => {
  app.setName(INSTALLER_NAME);
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
