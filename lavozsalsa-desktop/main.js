const fs = require('fs/promises');
const path = require('path');
const { app, BrowserWindow, ipcMain, Menu, nativeTheme, safeStorage, shell } = require('electron');

const APP_ORIGIN = 'https://app.lavozsalsa.com';
const APP_RADIO_URL = `${APP_ORIGIN}/`;
const APP_TV_URL = `${APP_ORIGIN}/tv`;
const APP_USER_MODEL_ID = 'com.lavozsalsa.desktop';

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyAjP8JqfpktolIhUoocDnLYAm7W9FHgZfs',
  projectId: 'la-voz-salsa-7166b',
};

const FIREBASE_AUTH_BASE = 'https://identitytoolkit.googleapis.com/v1';
const FIREBASE_TOKEN_BASE = 'https://securetoken.googleapis.com/v1';
const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${FIREBASE_CONFIG.projectId}/databases/(default)/documents`;

const AUTH_SESSION_FILE = 'desktop-auth-session.json';
const AUTH_REFRESH_BUFFER_MS = 60 * 1000;
const LOCAL_ICON_PATH = path.join(__dirname, 'assets', 'icon.png');
const INDEX_PAGE_PATH = path.join(__dirname, 'index.html');
const PRELOAD_PATH = path.join(__dirname, 'preload.js');

const startSection = process.argv.includes('--tv')
  ? 'tv'
  : process.argv.includes('--radio')
    ? 'radio'
    : 'home';

const AUTH_ERROR_MESSAGES = {
  EMAIL_EXISTS: 'Ese correo ya está registrado en La Voz Salsa.',
  EMAIL_NOT_FOUND: 'No encontramos una cuenta con ese correo.',
  INVALID_EMAIL: 'El correo electrónico no es válido.',
  INVALID_PASSWORD: 'La contraseña no es correcta.',
  INVALID_LOGIN_CREDENTIALS: 'Correo o contraseña incorrectos.',
  MISSING_PASSWORD: 'Debes escribir una contraseña.',
  OPERATION_NOT_ALLOWED: 'Ese método de acceso todavía no está habilitado.',
  TOO_MANY_ATTEMPTS_TRY_LATER: 'Hay demasiados intentos. Espera un momento e inténtalo otra vez.',
  USER_DISABLED: 'Esta cuenta fue deshabilitada.',
  WEAK_PASSWORD: 'La contraseña debe tener al menos 6 caracteres.',
};

let mainWindow = null;
let sessionState = null;

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

if (process.platform === 'win32') {
  app.setAppUserModelId(APP_USER_MODEL_ID);
}

function getSessionFilePath() {
  return path.join(app.getPath('userData'), AUTH_SESSION_FILE);
}

async function readStoredSession() {
  try {
    const raw = await fs.readFile(getSessionFilePath(), 'utf8');
    const stored = JSON.parse(raw);

    if (stored?.mode === 'safe-storage' && typeof stored.payload === 'string') {
      const decrypted = safeStorage.decryptString(Buffer.from(stored.payload, 'base64'));
      return JSON.parse(decrypted);
    }

    return stored;
  } catch {
    return null;
  }
}

async function writeStoredSession(session) {
  await fs.mkdir(path.dirname(getSessionFilePath()), { recursive: true });

  if (safeStorage.isEncryptionAvailable()) {
    const encrypted = safeStorage.encryptString(JSON.stringify(session));
    const payload = {
      mode: 'safe-storage',
      payload: encrypted.toString('base64'),
    };

    await fs.writeFile(getSessionFilePath(), JSON.stringify(payload, null, 2), 'utf8');
    return;
  }

  await fs.writeFile(getSessionFilePath(), JSON.stringify(session, null, 2), 'utf8');
}

async function clearStoredSession() {
  try {
    await fs.rm(getSessionFilePath(), { force: true });
  } catch {}
}

function sanitizeSession(session) {
  if (!session) {
    return null;
  }

  const displayName = session.displayName || session.email?.split('@')[0] || 'Salsero';

  return {
    uid: session.localId,
    email: session.email,
    displayName,
    photoUrl: session.photoUrl || '',
    expiresAt: session.expiresAt,
    lastLoginAt: session.lastLoginAt || null,
  };
}

function normalizeErrorMessage(code) {
  if (!code) {
    return 'No pudimos completar la operación. Inténtalo de nuevo.';
  }

  return AUTH_ERROR_MESSAGES[code] || `No pudimos completar la operación (${code}).`;
}

async function parseJsonResponse(response) {
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const code = payload?.error?.message;
    const error = new Error(normalizeErrorMessage(code));
    error.code = code;
    throw error;
  }

  return payload;
}

async function postJson(url, body, extra = {}) {
  const response = await fetch(url, {
    method: extra.method || 'POST',
    headers: {
      'content-type': 'application/json',
      ...(extra.headers || {}),
    },
    body: JSON.stringify(body),
  });

  return parseJsonResponse(response);
}

async function fetchAuthProfile(idToken) {
  const payload = await postJson(
    `${FIREBASE_AUTH_BASE}/accounts:lookup?key=${FIREBASE_CONFIG.apiKey}`,
    { idToken },
  );

  return payload?.users?.[0] || null;
}

function buildSessionFromAuthPayload(payload, profile = null) {
  const expiresInMs = Number(payload.expiresIn || payload.expires_in || 0) * 1000;
  const expiresAt = Date.now() + expiresInMs;

  return {
    idToken: payload.idToken || payload.id_token,
    refreshToken: payload.refreshToken || payload.refresh_token,
    localId: payload.localId || payload.user_id,
    email: profile?.email || payload.email || '',
    displayName: profile?.displayName || payload.displayName || '',
    photoUrl: profile?.photoUrl || payload.photoUrl || '',
    expiresAt,
    lastLoginAt: new Date().toISOString(),
  };
}

async function getExistingUserDocument(uid, idToken) {
  const response = await fetch(`${FIRESTORE_BASE}/users/${uid}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${idToken}`,
    },
  });

  if (response.status === 404) {
    return null;
  }

  return parseJsonResponse(response);
}

function buildUserDocumentFields(session, existingDocument, isNewUser) {
  const nowIso = new Date().toISOString();
  const displayName = session.displayName || session.email?.split('@')[0] || 'Salsero';
  const fields = {
    displayName: { stringValue: displayName },
    email: { stringValue: session.email || '' },
    isSubscriber: { booleanValue: false },
    photoURL: { stringValue: session.photoUrl || '' },
    updatedAt: { timestampValue: nowIso },
    playlists: {
      mapValue: {
        fields: {
          uid: { stringValue: session.localId },
          updatedAt: { timestampValue: nowIso },
        },
      },
    },
  };

  const existingCreatedAt = existingDocument?.fields?.createdAt?.timestampValue;
  if (isNewUser || !existingCreatedAt) {
    fields.createdAt = { timestampValue: nowIso };
  }

  return fields;
}

async function upsertUserDocument(session, { isNewUser = false } = {}) {
  if (!session?.localId || !session?.idToken) {
    return;
  }

  try {
    const existingDocument = await getExistingUserDocument(session.localId, session.idToken);
    const fields = buildUserDocumentFields(session, existingDocument, isNewUser);

    const patchUrl = new URL(`${FIRESTORE_BASE}/users/${session.localId}`);

    if (existingDocument) {
      Object.keys(fields).forEach((fieldName) => {
        patchUrl.searchParams.append('updateMask.fieldPaths', fieldName);
      });
    }

    const response = await fetch(patchUrl.toString(), {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${session.idToken}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ fields }),
    });

    await parseJsonResponse(response);
  } catch (error) {
    console.error('No se pudo sincronizar el documento del usuario en Firestore:', error);
  }
}

async function saveSession(payload, { isNewUser = false } = {}) {
  let profile = null;

  try {
    profile = await fetchAuthProfile(payload.idToken || payload.id_token);
  } catch (error) {
    console.error('No se pudo consultar el perfil actualizado en Firebase Auth:', error);
  }

  const nextSession = buildSessionFromAuthPayload(payload, profile);
  await upsertUserDocument(nextSession, { isNewUser });
  sessionState = nextSession;
  await writeStoredSession(nextSession);
  return sanitizeSession(nextSession);
}

async function refreshStoredSession(session) {
  const response = await fetch(`${FIREBASE_TOKEN_BASE}/token?key=${FIREBASE_CONFIG.apiKey}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: session.refreshToken,
    }),
  });

  const payload = await parseJsonResponse(response);
  return saveSession(payload);
}

async function ensureSessionReady() {
  if (!sessionState) {
    sessionState = await readStoredSession();
  }

  if (!sessionState) {
    return null;
  }

  if ((sessionState.expiresAt || 0) - Date.now() > AUTH_REFRESH_BUFFER_MS) {
    return sessionState;
  }

  try {
    return await refreshStoredSession(sessionState);
  } catch {
    sessionState = null;
    await clearStoredSession();
    return null;
  }
}

async function signInWithEmail(email, password) {
  return postJson(`${FIREBASE_AUTH_BASE}/accounts:signInWithPassword?key=${FIREBASE_CONFIG.apiKey}`, {
    email,
    password,
    returnSecureToken: true,
  });
}

async function signUpWithEmail(email, password) {
  return postJson(`${FIREBASE_AUTH_BASE}/accounts:signUp?key=${FIREBASE_CONFIG.apiKey}`, {
    email,
    password,
    returnSecureToken: true,
  });
}

async function updateAccountProfile(idToken, displayName) {
  return postJson(`${FIREBASE_AUTH_BASE}/accounts:update?key=${FIREBASE_CONFIG.apiKey}`, {
    idToken,
    displayName,
    returnSecureToken: true,
  });
}

async function sendPasswordReset(email) {
  return postJson(`${FIREBASE_AUTH_BASE}/accounts:sendOobCode?key=${FIREBASE_CONFIG.apiKey}`, {
    requestType: 'PASSWORD_RESET',
    email,
  });
}

function validateEmailPayload(email) {
  return typeof email === 'string' && email.trim().length > 4;
}

function validatePasswordPayload(password) {
  return typeof password === 'string' && password.length >= 6;
}

function createMainWindow() {
  nativeTheme.themeSource = 'dark';

  mainWindow = new BrowserWindow({
    width: 1440,
    height: 940,
    minWidth: 1120,
    minHeight: 760,
    title: 'La Voz Salsa',
    backgroundColor: '#09070a',
    icon: LOCAL_ICON_PATH,
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
      webviewTag: true,
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
    console.error('No se pudo abrir la interfaz principal de escritorio:', error);
  });
}

function sendRendererNavigation(section) {
  if (!mainWindow || mainWindow.isDestroyed()) {
    return;
  }

  mainWindow.webContents.send('desktop:navigate-request', section);
}

function openExternalUrl(target) {
  shell.openExternal(target).catch(() => {});
}

function openSectionExternal(section) {
  if (section === 'tv') {
    openExternalUrl(APP_TV_URL);
    return;
  }

  if (section === 'radio') {
    openExternalUrl(APP_RADIO_URL);
    return;
  }

  openExternalUrl(APP_ORIGIN);
}

function buildMenu() {
  return Menu.buildFromTemplate([
    {
      label: 'La Voz Salsa',
      submenu: [
        {
          label: 'Inicio',
          accelerator: 'CmdOrCtrl+1',
          click: () => sendRendererNavigation('home'),
        },
        {
          label: 'TV',
          accelerator: 'CmdOrCtrl+2',
          click: () => sendRendererNavigation('tv'),
        },
        {
          label: 'Radio',
          accelerator: 'CmdOrCtrl+3',
          click: () => sendRendererNavigation('radio'),
        },
        { type: 'separator' },
        {
          label: 'Recargar vista',
          accelerator: 'CmdOrCtrl+R',
          click: () => sendRendererNavigation('reload-webview'),
        },
        {
          label: 'Abrir en navegador',
          click: () => openSectionExternal('app'),
        },
        { type: 'separator' },
        { role: 'quit', label: 'Salir' },
      ],
    },
    {
      label: 'Ver',
      submenu: [
        { role: 'reload', label: 'Recargar' },
        { role: 'forceReload', label: 'Forzar recarga' },
        { type: 'separator' },
        { role: 'zoomIn', label: 'Aumentar zoom' },
        { role: 'zoomOut', label: 'Disminuir zoom' },
        { role: 'resetZoom', label: 'Zoom 100%' },
        { type: 'separator' },
        { role: 'toggleDevTools', label: 'Herramientas' },
      ],
    },
  ]);
}

ipcMain.handle('desktop:get-bootstrap', async () => {
  await ensureSessionReady();

  return {
    startSection,
    session: sanitizeSession(sessionState),
    urls: {
      app: APP_ORIGIN,
      radio: APP_RADIO_URL,
      tv: APP_TV_URL,
    },
    providers: {
      email: true,
      google: false,
      apple: false,
    },
  };
});

ipcMain.handle('desktop:login-email', async (_event, payload = {}) => {
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const password = typeof payload.password === 'string' ? payload.password : '';

  if (!validateEmailPayload(email)) {
    throw new Error('Escribe un correo electrónico válido.');
  }

  if (!validatePasswordPayload(password)) {
    throw new Error('La contraseña debe tener al menos 6 caracteres.');
  }

  const authPayload = await signInWithEmail(email, password);
  return saveSession(authPayload);
});

ipcMain.handle('desktop:register-email', async (_event, payload = {}) => {
  const displayName = typeof payload.displayName === 'string' ? payload.displayName.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const password = typeof payload.password === 'string' ? payload.password : '';

  if (displayName.length < 2) {
    throw new Error('Escribe tu nombre para completar el registro.');
  }

  if (!validateEmailPayload(email)) {
    throw new Error('Escribe un correo electrónico válido.');
  }

  if (!validatePasswordPayload(password)) {
    throw new Error('La contraseña debe tener al menos 6 caracteres.');
  }

  const registered = await signUpWithEmail(email, password);
  const updatedProfile = await updateAccountProfile(registered.idToken, displayName);
  return saveSession(updatedProfile, { isNewUser: true });
});

ipcMain.handle('desktop:send-password-reset', async (_event, payload = {}) => {
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';

  if (!validateEmailPayload(email)) {
    throw new Error('Escribe un correo electrónico válido.');
  }

  await sendPasswordReset(email);
  return {
    ok: true,
    message: 'Te enviamos un correo para restablecer la contraseña.',
  };
});

ipcMain.handle('desktop:logout', async () => {
  sessionState = null;
  await clearStoredSession();
  return { ok: true };
});

ipcMain.on('desktop:open-external', (_event, url) => {
  if (typeof url === 'string' && url.startsWith('http')) {
    openExternalUrl(url);
  }
});

ipcMain.on('desktop:open-section-external', (_event, section) => {
  openSectionExternal(section);
});

ipcMain.on('desktop:reload-webview', () => {
  sendRendererNavigation('reload-webview');
});

app.whenReady().then(async () => {
  app.setName('La Voz Salsa');
  await ensureSessionReady();
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
