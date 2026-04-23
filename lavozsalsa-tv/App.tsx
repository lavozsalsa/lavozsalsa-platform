import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useRef, useState, type FormEvent, type PointerEvent as ReactPointerEvent } from 'react';
import Hls from 'hls.js';
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  updateProfile,
  type AuthProvider,
  type User,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

const PRIMARY_LIVE_URL = 'https://streaming.lavozsalsa.com/live-abr/master.m3u8';
const CHAT_AVATAR_FALLBACK = 'https://admin.lavozsalsa.com/icon.png';
const STARTUP_TIMEOUT_MS = 12000;
const PROBE_INTERVAL_MS = 15000;
const MANIFEST_PROBE_TIMEOUT_MS = 4000;
const RETRY_SOURCE_DELAY_MS = PROBE_INTERVAL_MS;
const CONNECT_RETRY_DELAY_MS = 4000;
const STARTUP_SPLASH_EXIT_MS = 2400;
const STARTUP_SPLASH_HIDE_MS = 3950;

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyAjP8JqfpktolIhUoocDnLYAm7W9FHgZfs',
  authDomain: 'tv.lavozsalsa.com',
  projectId: 'la-voz-salsa-7166b',
  storageBucket: 'la-voz-salsa-7166b.firebasestorage.app',
};

type AuthMode = 'sign-in' | 'sign-up';

type TvConfigDoc = {
  modo?: 'vivo' | 'video' | 'hibrido';
  urlLive?: string;
  urlVideo?: string;
  urlHibrido?: string;
};

type StreamSource = {
  key: 'live';
  url: string;
};

type PlayerStatusMode = 'loading' | 'offline';

type ChatRecord = {
  id: string;
  text: string;
  userName: string;
  userAvatar: string;
  isOwn: boolean;
  sentAtLabel: string;
};

const firebaseApp = getApps().length ? getApp() : initializeApp(FIREBASE_CONFIG);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

function createMessageId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `msg-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatMessageDate(value: unknown) {
  const date =
    value && typeof value === 'object' && 'toDate' in value && typeof (value as { toDate?: () => Date }).toDate === 'function'
      ? (value as { toDate: () => Date }).toDate()
      : value instanceof Date
        ? value
        : null;

  if (!date) {
    return '';
  }

  return new Intl.DateTimeFormat('es-CO', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

function sanitizeStreamUrl(value: string | undefined, fallbackUrl: string) {
  const nextValue = String(value || '').trim();
  return nextValue || fallbackUrl;
}

function resolveLiveSource(config: TvConfigDoc | null): StreamSource {
  return {
    key: 'live',
    url: sanitizeStreamUrl(config?.urlLive, PRIMARY_LIVE_URL),
  };
}

function formatStreamLabel(_source: StreamSource | undefined) {
  return 'LIVE';
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12.24 10.285v3.955h5.518c-.243 1.273-.972 2.351-2.065 3.075l3.34 2.593c1.946-1.793 3.067-4.434 3.067-7.568 0-.724-.065-1.421-.186-2.055H12.24Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.79 0 5.13-.926 6.84-2.51l-3.34-2.593c-.927.621-2.111.989-3.5.989-2.691 0-4.97-1.816-5.785-4.259H2.76v2.674A10.33 10.33 0 0 0 12 22Z"
      />
      <path
        fill="#4A90E2"
        d="M6.215 13.627A6.198 6.198 0 0 1 5.89 11.7c0-.669.116-1.318.325-1.927V7.099H2.76A10.33 10.33 0 0 0 1.6 11.7c0 1.649.395 3.21 1.16 4.601l3.455-2.674Z"
      />
      <path
        fill="#FBBC05"
        d="M12 5.514c1.518 0 2.882.522 3.955 1.546l2.966-2.966C17.125 2.413 14.786 1.4 12 1.4A10.33 10.33 0 0 0 2.76 7.099l3.455 2.674C7.03 7.33 9.309 5.514 12 5.514Z"
      />
    </svg>
  );
}

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.365 12.83c.02 2.11 1.848 2.813 1.868 2.821-.015.05-.292 1.002-.965 1.986-.582.85-1.186 1.697-2.138 1.715-.935.018-1.235-.554-2.304-.554-1.068 0-1.403.536-2.287.572-.919.035-1.62-.922-2.206-1.769-1.197-1.732-2.112-4.894-.884-7.026.61-1.059 1.7-1.729 2.883-1.747.9-.018 1.75.607 2.304.607.553 0 1.591-.75 2.682-.64.457.019 1.742.184 2.566 1.39-.066.041-1.534.894-1.519 2.645Zm-1.904-5.64c.488-.591.817-1.413.727-2.232-.703.028-1.553.467-2.057 1.057-.452.522-.85 1.359-.742 2.16.783.06 1.584-.398 2.072-.985Z"
      />
    </svg>
  );
}

async function probeStreamAvailability(url: string) {
  if (typeof window === 'undefined') {
    return false;
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), MANIFEST_PROBE_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!response.ok) {
      return false;
    }

    const manifest = await response.text();
    return manifest.includes('#EXTM3U');
  } catch {
    return false;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function extractVariantManifestUrls(manifestText: string, manifestUrl: string) {
  const lines = manifestText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  const variantUrls: string[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    if (!lines[index].startsWith('#EXT-X-STREAM-INF')) {
      continue;
    }

    const nextLine = lines[index + 1];
    if (!nextLine || nextLine.startsWith('#')) {
      continue;
    }

    variantUrls.push(new URL(nextLine, manifestUrl).toString());
  }

  return variantUrls;
}

async function fetchManifestText(url: string) {
  if (typeof window === 'undefined') {
    return null;
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), MANIFEST_PROBE_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!response.ok) {
      return null;
    }

    const manifest = await response.text();
    return manifest.includes('#EXTM3U') ? manifest : null;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function probeSourceAvailability(source: StreamSource) {
  const manifestText = await fetchManifestText(source.url);
  if (!manifestText) {
    return false;
  }

  if (source.key !== 'live') {
    return true;
  }

  const variantUrls = extractVariantManifestUrls(manifestText, source.url);

  if (!variantUrls.length) {
    return !manifestText.includes('#EXT-X-ENDLIST');
  }

  for (const variantUrl of variantUrls) {
    const variantManifest = await fetchManifestText(variantUrl);

    if (variantManifest && !variantManifest.includes('#EXT-X-ENDLIST')) {
      return true;
    }
  }

  return false;
}

async function syncUserDocument(user: User, isNewUser = false) {
  const displayName = (user.displayName || user.email?.split('@')[0] || 'Salsero').trim();

  await setDoc(
    doc(db, 'users', user.uid),
    {
      displayName,
      email: user.email || '',
      isSubscriber: false,
      photoURL: user.photoURL || '',
      updatedAt: serverTimestamp(),
      ...(isNewUser ? { createdAt: serverTimestamp() } : {}),
      playlists: {
        uid: user.uid,
        updatedAt: new Date().toISOString(),
      },
    },
    { merge: true },
  );
}

async function startProviderLogin(provider: AuthProvider) {
  const shouldRedirect =
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 920px)').matches || /iPhone|iPad|Android/i.test(window.navigator.userAgent));

  if (shouldRedirect) {
    await signInWithRedirect(auth, provider);
    return null;
  }

  return signInWithPopup(auth, provider);
}

async function tryAutoPlay(video: HTMLVideoElement) {
  try {
    video.muted = false;
    await video.play();
    return;
  } catch {}

  try {
    video.muted = true;
    await video.play();
  } catch {}
}

export default function App() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const composerRef = useRef<HTMLTextAreaElement | null>(null);
  const chatComposeRef = useRef<HTMLDivElement | null>(null);
  const lastVisibleMessagesRef = useRef<ChatRecord[]>([]);
  const hasResolvedChatRef = useRef(false);
  const currentSourceIndexRef = useRef<number | null>(null);
  const currentAttemptRef = useRef<{ id: number; sourceIndex: number } | null>(null);
  const startupTimeoutRef = useRef<number | null>(null);
  const retryTimeoutRef = useRef<number | null>(null);
  const promotionProbeIntervalRef = useRef<number | null>(null);
  const probeInFlightRef = useRef(false);
  const attemptCounterRef = useRef(0);
  const [configDoc, setConfigDoc] = useState<TvConfigDoc | null>(null);
  const [messages, setMessages] = useState<ChatRecord[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatError, setChatError] = useState('');
  const [authError, setAuthError] = useState('');
  const [authMode, setAuthMode] = useState<AuthMode>('sign-in');
  const [authOpen, setAuthOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);
  const [isSubmittingMessage, setIsSubmittingMessage] = useState(false);
  const [isComposerFocused, setIsComposerFocused] = useState(false);
  const [activeSourceIndex, setActiveSourceIndex] = useState(0);
  const [showPlayerStatus, setShowPlayerStatus] = useState(true);
  const [showStartupSplash, setShowStartupSplash] = useState(true);
  const [startupSplashPhase, setStartupSplashPhase] = useState<'boot' | 'visible' | 'leaving'>('boot');
  const [playerUi, setPlayerUi] = useState({
    statusMode: 'loading' as PlayerStatusMode,
    streamLabel: 'Cargando',
    statusText: 'Cargando LIVE...',
    detailText: 'Estamos conectando la señal en vivo.',
  });

  const liveSource = useMemo(() => resolveLiveSource(configDoc), [configDoc]);
  const streamPriority = useMemo(() => [liveSource], [liveSource]);
  const currentDisplayName = (currentUser?.displayName || currentUser?.email?.split('@')[0] || '').trim();
  const resolvedChatDisplayName = currentDisplayName || currentUser?.email?.trim() || 'Salsero';
  const playerIsLive = !showPlayerStatus;
  const pageSplashClass = showStartupSplash
    ? startupSplashPhase === 'leaving'
      ? ' is-revealing'
      : ' is-splashing'
    : '';

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const root = document.documentElement;
    const viewport = window.visualViewport;
    const updateViewportHeight = () => {
      const height = viewport?.height || window.innerHeight;
      const offsetTop = viewport?.offsetTop || 0;
      const keyboardOffset = Math.max(0, window.innerHeight - (height + offsetTop));
      root.style.setProperty('--tv-vh', `${height}px`);
      root.style.setProperty('--tv-vtop', `${offsetTop}px`);
      root.style.setProperty('--tv-keyboard-offset', `${keyboardOffset}px`);
    };

    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);
    viewport?.addEventListener('resize', updateViewportHeight);
    viewport?.addEventListener('scroll', updateViewportHeight);

    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      viewport?.removeEventListener('resize', updateViewportHeight);
      viewport?.removeEventListener('scroll', updateViewportHeight);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    if (!isMobile || !isComposerFocused) {
      return;
    }

    const body = document.body;
    const html = document.documentElement;
    const scrollY = window.scrollY;
    const previousBody = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    const previousHtmlOverflow = html.style.overflow;

    html.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    const pinViewport = () => {
      window.scrollTo(0, 0);
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    };

    const rafId = window.requestAnimationFrame(pinViewport);
    const timeoutId = window.setTimeout(pinViewport, 120);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      html.style.overflow = previousHtmlOverflow;
      body.style.position = previousBody.position;
      body.style.top = previousBody.top;
      body.style.left = previousBody.left;
      body.style.right = previousBody.right;
      body.style.width = previousBody.width;
      body.style.overflow = previousBody.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [isComposerFocused]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const root = document.documentElement;
    const composeNode = chatComposeRef.current;
    if (!composeNode) {
      return;
    }

    const updateComposeHeight = () => {
      const nextHeight = Math.ceil(composeNode.getBoundingClientRect().height);
      root.style.setProperty('--tv-compose-height', `${nextHeight}px`);
    };

    updateComposeHeight();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateComposeHeight);
      return () => {
        window.removeEventListener('resize', updateComposeHeight);
      };
    }

    const observer = new ResizeObserver(updateComposeHeight);
    observer.observe(composeNode);

    return () => {
      observer.disconnect();
    };
  }, [currentUser]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) {
      setShowStartupSplash(false);
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      setStartupSplashPhase('visible');
    });

    const exitId = window.setTimeout(() => {
      setStartupSplashPhase('leaving');
    }, STARTUP_SPLASH_EXIT_MS);

    const hideId = window.setTimeout(() => {
      setShowStartupSplash(false);
    }, STARTUP_SPLASH_HIDE_MS);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(exitId);
      window.clearTimeout(hideId);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setCurrentUser(nextUser);

      if (nextUser) {
        void syncUserDocument(nextUser);
      }
    });

    void getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          return syncUserDocument(result.user);
        }

        return null;
      })
      .catch((error) => {
        console.error('No se pudo completar el login social:', error);
        setAuthError(error instanceof Error ? error.message : 'No pudimos completar el acceso social.');
      });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'Config'),
      (snapshot) => {
        const [firstDoc] = snapshot.docs;
        setConfigDoc((firstDoc?.data() as TvConfigDoc | undefined) || null);
      },
      (error) => {
        console.error('No se pudo leer Config:', error);
      },
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    const chatQuery = query(collection(db, 'Chats'), orderBy('createdAt', 'desc'), limit(80));
    hasResolvedChatRef.current = false;
    lastVisibleMessagesRef.current = [];
    setIsChatLoading(true);

    const unsubscribe = onSnapshot(
      chatQuery,
      (snapshot) => {
        const nextMessages = snapshot.docs
          .map((docItem) => {
            const data = docItem.data() as {
              text?: string;
              createdAt?: unknown;
              user?: {
                id?: string;
                name?: string;
                avatar?: string;
              };
            };

            return {
              id: docItem.id,
              text: data.text || '',
              userName: data.user?.name || '@Anonimo',
              userAvatar: data.user?.avatar || CHAT_AVATAR_FALLBACK,
              isOwn: data.user?.id === currentUser?.uid,
              sentAtLabel: formatMessageDate(data.createdAt),
            };
          })
          .filter((item) => item.text)
          .reverse();

        const shouldKeepVisibleMessages =
          snapshot.empty && snapshot.metadata.fromCache && lastVisibleMessagesRef.current.length > 0;
        const shouldWaitForServerSnapshot =
          snapshot.empty && snapshot.metadata.fromCache && !hasResolvedChatRef.current;

        if (shouldKeepVisibleMessages || shouldWaitForServerSnapshot) {
          return;
        }

        if (!snapshot.metadata.fromCache || nextMessages.length > 0) {
          hasResolvedChatRef.current = true;
        }

        lastVisibleMessagesRef.current = nextMessages;
        setMessages(nextMessages);
        setIsChatLoading(false);
      },
      (error) => {
        console.error('No se pudo leer Chats:', error);
        setChatError('No pudimos cargar el chat.');
        setIsChatLoading(false);
      },
    );

    return unsubscribe;
  }, [currentUser?.uid]);

  useEffect(() => {
    const node = messagesRef.current;
    if (!node) {
      return;
    }

    node.scrollTop = node.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !streamPriority.length || typeof window === 'undefined') {
      return;
    }

    let cancelled = false;
    let hls: Hls | null = null;
    let detachVideoEvents: (() => void) | null = null;

    video.autoplay = true;
    video.playsInline = true;
    video.controls = true;

    function setPlayerStatusUi(sourceIndex: number, mode: PlayerStatusMode, status: string, detail: string) {
      const source = streamPriority[sourceIndex];

      setPlayerUi({
        statusMode: mode,
        streamLabel: formatStreamLabel(source),
        statusText: status,
        detailText: detail,
      });
      console.log('[LaVozSalsaTV]', `${formatStreamLabel(source)} | ${mode} | ${status} | ${detail}`);
    }

    function showLoadingState(sourceIndex: number, detail = 'Estamos conectando la señal en vivo.') {
      setPlayerStatusUi(sourceIndex, 'loading', 'Cargando LIVE...', detail);
    }

    function showOfflineState(sourceIndex: number, detail = 'Live los Martes 2:00 pm y 8:00 pm') {
      setPlayerStatusUi(sourceIndex, 'offline', 'No hay transmisión en vivo en este momento.', detail);
    }

    function scheduleRetry(sourceIndex: number, reason: string, delayMs: number, showLoadingWhileProbing = true) {
      clearRetryTimeout();
      retryTimeoutRef.current = window.setTimeout(() => {
        if (!cancelled && !document.hidden) {
          void playSource(sourceIndex, {
            reason,
            showLoadingWhileProbing,
          });
        }
      }, delayMs);
    }

    function clearStartupTimeout() {
      if (startupTimeoutRef.current) {
        window.clearTimeout(startupTimeoutRef.current);
        startupTimeoutRef.current = null;
      }
    }

    function clearRetryTimeout() {
      if (retryTimeoutRef.current) {
        window.clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    }

    function clearTimers() {
      clearStartupTimeout();
      clearRetryTimeout();
    }

    function stopPromotionProbe() {
      if (promotionProbeIntervalRef.current) {
        window.clearInterval(promotionProbeIntervalRef.current);
        promotionProbeIntervalRef.current = null;
      }

      probeInFlightRef.current = false;
    }

    function destroyCurrentPlayback() {
      if (detachVideoEvents) {
        detachVideoEvents();
        detachVideoEvents = null;
      }

      if (hls) {
        hls.destroy();
        hls = null;
      }

      video.pause();
      video.removeAttribute('src');
      video.load();
    }

    function isCurrentAttempt(attemptId: number) {
      return currentAttemptRef.current?.id === attemptId;
    }

    function handleAttemptSuccess(attemptId: number, sourceIndex: number) {
      if (!isCurrentAttempt(attemptId) || cancelled) {
        return;
      }

      clearStartupTimeout();
      currentAttemptRef.current = null;
      currentSourceIndexRef.current = sourceIndex;
      setActiveSourceIndex(sourceIndex);
      setShowPlayerStatus(false);

      if (sourceIndex === 0) {
        stopPromotionProbe();
      } else {
        startPromotionProbe();
      }

      setPlayerStatusUi(sourceIndex, 'loading', 'En vivo', 'Reproduccion activa');
    }

    function handleSourceFailure(sourceIndex: number, _detail: string) {
      clearTimers();
      currentSourceIndexRef.current = null;
      setShowPlayerStatus(true);

      showOfflineState(sourceIndex);
      scheduleRetry(sourceIndex, 'Intentando LIVE nuevamente', RETRY_SOURCE_DELAY_MS, false);
    }

    function handleConnectionRetry(sourceIndex: number, detail: string) {
      clearTimers();
      currentSourceIndexRef.current = null;
      setShowPlayerStatus(true);
      showLoadingState(sourceIndex, detail);
      scheduleRetry(sourceIndex, 'Reintentando conectar LIVE', CONNECT_RETRY_DELAY_MS);
    }

    function handleAttemptFailure(
      attemptId: number,
      sourceIndex: number,
      errorMessage: string,
      onFailure?: (message: string) => void,
    ) {
      if (!isCurrentAttempt(attemptId) || cancelled) {
        return;
      }

      clearTimers();
      currentAttemptRef.current = null;

      if (onFailure) {
        onFailure(errorMessage);
        return;
      }

      handleConnectionRetry(sourceIndex, 'Estamos reconectando LIVE.');
    }

    function bindVideoEvents(attemptId: number, sourceIndex: number, onFailure?: (message: string) => void) {
      const handleBuffering = () => {
        if (currentAttemptRef.current === null && currentSourceIndexRef.current === sourceIndex) {
          console.log('[LaVozSalsaTV]', `${formatStreamLabel(streamPriority[sourceIndex])} | Buffering | Esperando más datos del stream`);
          return;
        }

        setShowPlayerStatus(true);
        showLoadingState(sourceIndex);
      };

      const handleReady = () => {
        handleAttemptSuccess(attemptId, sourceIndex);
      };

      const handleError = () => {
        if (isCurrentAttempt(attemptId)) {
          handleAttemptFailure(attemptId, sourceIndex, 'Error HTMLMediaElement', onFailure);
          return;
        }

        handleConnectionRetry(sourceIndex, 'Estamos reconectando LIVE.');
      };

      const handleEnded = () => {
        if (isCurrentAttempt(attemptId)) {
          handleAttemptFailure(attemptId, sourceIndex, 'El stream termino', onFailure);
          return;
        }

        handleConnectionRetry(sourceIndex, 'Estamos reconectando LIVE.');
      };

      video.addEventListener('waiting', handleBuffering);
      video.addEventListener('stalled', handleBuffering);
      video.addEventListener('playing', handleReady);
      video.addEventListener('loadeddata', handleReady);
      video.addEventListener('error', handleError);
      video.addEventListener('ended', handleEnded);

      return () => {
        video.removeEventListener('waiting', handleBuffering);
        video.removeEventListener('stalled', handleBuffering);
        video.removeEventListener('playing', handleReady);
        video.removeEventListener('loadeddata', handleReady);
        video.removeEventListener('error', handleError);
        video.removeEventListener('ended', handleEnded);
      };
    }

    async function playSource(
      sourceIndex: number,
      options?: {
        reason?: string;
        onFailure?: (message: string) => void;
        showLoadingWhileProbing?: boolean;
      },
    ) {
      const source = streamPriority[sourceIndex];
      if (!source || cancelled) {
        return;
      }

      const showLoadingWhileProbing = options?.showLoadingWhileProbing ?? true;

      if (showLoadingWhileProbing) {
        setShowPlayerStatus(true);
        showLoadingState(sourceIndex, options?.reason || 'Estamos conectando la señal en vivo.');
      }

      if (source.key === 'live') {
        const isLiveAvailable = await probeSourceAvailability(source);

        if (cancelled) {
          return;
        }

        if (!isLiveAvailable) {
          if (currentSourceIndexRef.current !== null && currentSourceIndexRef.current !== sourceIndex) {
            const currentSource = streamPriority[currentSourceIndexRef.current];
            setPlayerStatusUi(
              currentSourceIndexRef.current,
              'loading',
              `Seguimos en ${formatStreamLabel(currentSource)}`,
              'LIVE aun no esta disponible',
            );
            return;
          }

          handleSourceFailure(sourceIndex, 'LIVE aun no esta disponible');
          return;
        }
      }

      setShowPlayerStatus(true);
      showLoadingState(sourceIndex, options?.reason || 'Estamos conectando la señal en vivo.');

      const attemptId = ++attemptCounterRef.current;
      clearTimers();
      destroyCurrentPlayback();

      currentAttemptRef.current = {
        id: attemptId,
        sourceIndex,
      };

      detachVideoEvents = bindVideoEvents(attemptId, sourceIndex, options?.onFailure);

      startupTimeoutRef.current = window.setTimeout(() => {
        handleAttemptFailure(attemptId, sourceIndex, 'Timeout esperando video', options?.onFailure);
      }, STARTUP_TIMEOUT_MS);

      if (Hls.isSupported()) {
        hls = new Hls({
          enableWorker: true,
          lowLatencyMode: false,
          liveSyncDurationCount: 3,
        });
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (isCurrentAttempt(attemptId)) {
            void tryAutoPlay(video);
          }
        });
        hls.on(Hls.Events.ERROR, (_event, data) => {
          const detail = data.details ? `Error HLS: ${data.details}` : 'Error HLS';

          if (isCurrentAttempt(attemptId)) {
            if (data.fatal) {
              handleAttemptFailure(attemptId, sourceIndex, detail, options?.onFailure);
            }
            return;
          }

          if (data.fatal) {
            handleConnectionRetry(sourceIndex, 'Estamos reconectando LIVE.');
          }
        });
        hls.loadSource(source.url);
        return;
      }

      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = source.url;
        void tryAutoPlay(video);
        return;
      }

      handleAttemptFailure(attemptId, sourceIndex, 'El navegador no soporta HLS', options?.onFailure);
    }

    function startPromotionProbe() {
      if (promotionProbeIntervalRef.current) {
        return;
      }

      promotionProbeIntervalRef.current = window.setInterval(async () => {
        const currentSourceIndex = currentSourceIndexRef.current;

        if (
          currentSourceIndex === null ||
          currentSourceIndex === 0 ||
          currentAttemptRef.current ||
          probeInFlightRef.current ||
          document.hidden
        ) {
          return;
        }

        const currentSource = streamPriority[currentSourceIndex];
        setPlayerStatusUi(
          currentSourceIndex,
          'loading',
          `Comprobando ${formatStreamLabel(streamPriority[0])}`,
          'Verificando si una mejor señal ya regreso',
        );

        for (let sourceIndex = 0; sourceIndex < currentSourceIndex; sourceIndex += 1) {
          const candidate = streamPriority[sourceIndex];

          probeInFlightRef.current = true;
          const isAvailable = await probeSourceAvailability(candidate);
          probeInFlightRef.current = false;

          if (
            cancelled ||
            currentAttemptRef.current ||
            document.hidden ||
            currentSourceIndexRef.current !== currentSourceIndex
          ) {
            return;
          }

          if (isAvailable) {
            void playSource(sourceIndex, {
              reason: `${formatStreamLabel(candidate)} volvio. Cambiando automaticamente`,
            });
            return;
          }
        }

        if (currentSourceIndexRef.current === currentSourceIndex) {
          setPlayerStatusUi(
            currentSourceIndex,
            'loading',
            `Seguimos en ${formatStreamLabel(currentSource)}`,
            'Las señales superiores aun no estan disponibles',
          );
        }
      }, PROBE_INTERVAL_MS);
    }

    function handleVisibilityChange() {
      if (document.hidden || currentAttemptRef.current || currentSourceIndexRef.current === 0) {
        return;
      }

      void playSource(0, {
        reason: 'La app volvio al frente. Intentando LIVE',
      });
    }

    currentAttemptRef.current = null;
    currentSourceIndexRef.current = null;
    setActiveSourceIndex(0);
    setShowPlayerStatus(true);
    setPlayerUi({
      statusMode: 'loading',
      streamLabel: 'Cargando',
      statusText: 'Cargando LIVE...',
      detailText: 'Estamos conectando la señal en vivo.',
    });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    void playSource(0, {
      reason: 'Intentando LIVE al abrir la app',
    });

    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimers();
      stopPromotionProbe();
      currentAttemptRef.current = null;
      currentSourceIndexRef.current = null;
      setShowPlayerStatus(true);
      destroyCurrentPlayback();
    };
  }, [streamPriority]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.controls = playerIsLive;
  }, [playerIsLive]);

  async function handleEmailAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError('');
    setIsSubmittingAuth(true);

    try {
      if (authMode === 'sign-in') {
        const result = await signInWithEmailAndPassword(auth, email.trim(), password);
        await syncUserDocument(result.user);
      } else {
        const name = displayName.trim();
        if (name.length < 2) {
          throw new Error('Escribe tu nombre.');
        }

        const result = await createUserWithEmailAndPassword(auth, email.trim(), password);
        await updateProfile(result.user, {
          displayName: name,
        });
        await syncUserDocument({ ...result.user, displayName: name } as User, true);
      }

      setAuthOpen(false);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'No pudimos iniciar sesión.');
    } finally {
      setIsSubmittingAuth(false);
    }
  }

  async function handlePasswordReset() {
    if (!email.trim()) {
      setAuthError('Escribe tu correo.');
      return;
    }

    setAuthError('');

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setAuthError('Te enviamos un enlace a tu correo.');
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'No pudimos enviar el enlace.');
    }
  }

  async function handleProvider(providerName: 'google' | 'apple') {
    setAuthError('');

    try {
      if (providerName === 'google') {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
          prompt: 'select_account',
        });

        const result = await startProviderLogin(provider);
        if (result?.user) {
          await syncUserDocument(result.user);
        }
        return;
      }

      const provider = new OAuthProvider('apple.com');
      provider.addScope('email');
      provider.addScope('name');

      const result = await startProviderLogin(provider);
      if (result?.user) {
        await syncUserDocument(result.user);
      }
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'No pudimos iniciar sesión.');
    }
  }

  async function handleSendMessage() {
    if (!currentUser) {
      return;
    }

    const text = chatInput.trim();
    if (!text) {
      return;
    }

    setChatError('');
    setIsSubmittingMessage(true);

    try {
      await addDoc(collection(db, 'Chats'), {
        _id: createMessageId(),
        createdAt: serverTimestamp(),
        text,
        user: {
          id: currentUser.uid,
          name: resolvedChatDisplayName,
          avatar: currentUser.photoURL || CHAT_AVATAR_FALLBACK,
        },
      });
      setChatInput('');

      if (typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches) {
        composerRef.current?.blur();
        setIsComposerFocused(false);
      }
    } catch (error) {
      console.error('No se pudo enviar el mensaje:', error);
      setChatError('No pudimos enviar tu mensaje.');
    } finally {
      setIsSubmittingMessage(false);
    }
  }

  function handleMobileSendPointerDown(event: ReactPointerEvent<HTMLButtonElement>) {
    if (typeof window === 'undefined' || !window.matchMedia('(max-width: 640px)').matches) {
      return;
    }

    event.preventDefault();
    if (!isSubmittingMessage) {
      void handleSendMessage();
    }
  }

  return (
    <>
      <StatusBar style="dark" />
      <style>{`
        @font-face {
          font-family: "Gotham";
          src: url("/fonts/GothamBook.ttf") format("truetype");
          font-weight: 500;
          font-display: swap;
        }

        @font-face {
          font-family: "Gotham";
          src: url("/fonts/GothamMedium.ttf") format("truetype");
          font-weight: 600;
          font-display: swap;
        }

        @font-face {
          font-family: "Gotham";
          src: url("/fonts/GothamBold.ttf") format("truetype");
          font-weight: 700;
          font-display: swap;
        }

        @font-face {
          font-family: "Gotham";
          src: url("/fonts/GothamBlack.otf") format("opentype");
          font-weight: 900;
          font-display: swap;
        }

        :root {
          color-scheme: dark;
          --white: #ffffff;
          --bg: #040404;
          --line: rgba(255, 255, 255, 0.08);
          --line-strong: rgba(255, 255, 255, 0.18);
          --text: #f6f6f6;
          --muted: rgba(255, 255, 255, 0.62);
          --brand: #ff1010;
          --panel: rgba(10, 10, 10, 0.94);
          --chat-bg: #0d0d0f;
          --message: #f6f6f6;
          --field: #141416;
          --shadow: 0 24px 56px rgba(0, 0, 0, 0.34);
        }

        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          min-height: 100%;
          height: 100%;
        }

        body {
          margin: 0;
          background:
            radial-gradient(circle at top right, rgba(255, 16, 16, 0.16), transparent 20%),
            radial-gradient(circle at bottom left, rgba(255, 255, 255, 0.05), transparent 22%),
            linear-gradient(180deg, #020202 0%, #090909 100%);
          color: var(--text);
          font-family: "Gotham", Arial, sans-serif;
          overflow: hidden;
        }

        #root {
          display: block !important;
        }

        img,
        video {
          display: block;
          max-width: 100%;
        }

        button,
        input,
        textarea {
          font: inherit;
        }

        button {
          cursor: pointer;
        }

        .tv-page {
          height: 100dvh;
          display: grid;
          grid-template-rows: 84px minmax(0, 1fr);
          transition: opacity 1200ms cubic-bezier(0.22, 1, 0.36, 1), transform 1300ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 1300ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .tv-page.is-splashing {
          opacity: 0;
          transform: scale(1.018);
          filter: blur(18px);
          pointer-events: none;
        }

        .tv-page.is-revealing {
          opacity: 1;
          transform: scale(1);
          filter: blur(0);
          pointer-events: none;
        }

        .tv-startup-splash {
          position: fixed;
          inset: 0;
          z-index: 60;
          display: grid;
          place-items: center;
          overflow: hidden;
          background:
            radial-gradient(circle at center, rgba(255, 18, 18, 0.1), transparent 24%),
            linear-gradient(180deg, #000000 0%, #050505 100%);
          opacity: 1;
          transition: opacity 1500ms cubic-bezier(0.22, 1, 0.36, 1), background 1500ms cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }

        .tv-startup-splash.is-leaving {
          opacity: 0;
          background:
            radial-gradient(circle at center, rgba(255, 18, 18, 0.04), transparent 28%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.92) 0%, rgba(5, 5, 5, 0.88) 100%);
        }

        .tv-startup-splash-glow {
          position: absolute;
          width: min(520px, 52vw);
          aspect-ratio: 1;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(255, 16, 16, 0.3) 0%, rgba(255, 16, 16, 0.14) 36%, transparent 72%);
          filter: blur(12px);
          opacity: 0;
          transform: scale(0.76);
          transition: opacity 1500ms cubic-bezier(0.22, 1, 0.36, 1), transform 2200ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .tv-startup-splash-logo {
          position: relative;
          z-index: 1;
          width: min(430px, 66vw);
          max-width: 80vw;
          opacity: 0;
          transform: translateY(28px) scale(0.74);
          filter: drop-shadow(0 22px 44px rgba(0, 0, 0, 0.42));
          transition: opacity 1450ms cubic-bezier(0.22, 1, 0.36, 1), transform 1900ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .tv-startup-splash.is-visible .tv-startup-splash-glow {
          opacity: 1;
          transform: scale(1);
        }

        .tv-startup-splash.is-visible .tv-startup-splash-logo {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .tv-startup-splash.is-leaving .tv-startup-splash-glow {
          opacity: 0;
          transform: scale(1.08);
        }

        .tv-startup-splash.is-leaving .tv-startup-splash-logo {
          opacity: 0;
          transform: translateY(-8px) scale(1.02);
        }

        .tv-topbar {
          background: rgba(0, 0, 0, 0.92);
          border-bottom: 1px solid var(--line);
        }

        .tv-topbar-inner {
          width: 90%;
          height: 100%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .tv-logo-link {
          display: inline-flex;
          align-items: center;
          line-height: 0;
        }

        .tv-logo {
          width: 194px;
          height: auto;
          object-fit: contain;
          max-width: 100%;
        }

        .tv-shell {
          width: 90%;
          margin: 14px auto 18px;
          min-height: 0;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 400px;
          gap: 14px;
          padding: 0;
        }

        .tv-player {
          min-width: 0;
          min-height: 0;
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: var(--shadow);
        }

        .tv-player-frame {
          position: relative;
          width: 100%;
          height: 100%;
          background:
            radial-gradient(circle at top right, rgba(255, 16, 16, 0.2), transparent 24%),
            radial-gradient(circle at bottom left, rgba(255, 255, 255, 0.06), transparent 22%),
            linear-gradient(180deg, #050505 0%, #0a0a0a 100%);
        }

        .tv-player-backdrop {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          background:
            radial-gradient(circle at top left, rgba(255, 255, 255, 0.04), transparent 16%),
            radial-gradient(circle at bottom center, rgba(120, 12, 12, 0.26), transparent 26%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.42));
        }

        .tv-player-backdrop::before {
          content: "";
          position: absolute;
          inset: 0;
          background: url("/brand/estudio.jpg") center center / cover no-repeat;
          opacity: 0.2;
          filter: saturate(1.03) contrast(1.04) brightness(1.01);
        }

        .tv-player-frame video {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          object-fit: contain;
          background: #000;
          transition: opacity 180ms ease;
        }

        .tv-player-frame.is-idle video {
          opacity: 0;
          pointer-events: none;
        }

        .tv-player-status {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          text-align: center;
          pointer-events: none;
        }

        .tv-player-status--offline {
          width: min(560px, calc(100% - 72px));
          padding: 28px 34px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 28px;
          background:
            linear-gradient(180deg, rgba(60, 41, 43, 0.48), rgba(28, 30, 33, 0.76)),
            rgba(20, 20, 24, 0.76);
          backdrop-filter: blur(18px);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
          display: grid;
          gap: 12px;
        }

        .tv-player-status--loading {
          width: auto;
          max-width: calc(100% - 48px);
          padding: 18px 24px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(10, 10, 12, 0.82);
          backdrop-filter: blur(14px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.28);
          display: inline-flex;
          align-items: center;
          gap: 14px;
        }

        .tv-player-status-loader {
          width: 16px;
          height: 16px;
          border-radius: 999px;
          border: 3px solid rgba(255, 16, 16, 0.24);
          border-top-color: var(--brand);
          border-right-color: var(--brand);
          animation: tv-live-loader 800ms linear infinite;
          flex-shrink: 0;
          box-shadow: 0 0 18px rgba(255, 16, 16, 0.28);
        }

        .tv-player-status-copy {
          display: grid;
          gap: 4px;
        }

        .tv-player-status--loading .tv-player-status-copy {
          text-align: left;
        }

        .tv-player-status--offline .tv-player-status-copy {
          text-align: center;
          justify-items: center;
        }

        .tv-player-status-stream {
          margin: 0;
          color: var(--text);
          font-size: clamp(2.1rem, 3vw, 46px);
          font-weight: 700;
          line-height: 1;
          text-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
        }

        .tv-player-status-text,
        .tv-player-status-detail {
          margin: 0;
          color: var(--muted);
          font-size: clamp(1rem, 1.4vw, 20px);
          line-height: 1.45;
          text-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
        }

        .tv-player-status-detail {
          font-size: clamp(0.9rem, 1.1vw, 16px);
          opacity: 0.9;
        }

        .tv-player-status--loading .tv-player-status-stream {
          display: none;
        }

        .tv-player-status--loading .tv-player-status-text {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text);
          line-height: 1.2;
          text-shadow: none;
        }

        .tv-player-status--loading .tv-player-status-detail {
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.72);
          line-height: 1.3;
          text-shadow: none;
        }

        .tv-player-status--offline .tv-player-status-stream {
          text-align: center;
        }

        .tv-player-status--offline .tv-player-status-text {
          text-align: center;
        }

        .tv-player-status--offline .tv-player-status-detail {
          text-align: center;
          margin-top: -2px;
          color: rgba(255, 255, 255, 0.78);
        }

        @keyframes tv-live-loader {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        .tv-chat {
          min-height: 0;
          display: grid;
          grid-template-rows: auto minmax(0, 1fr) auto;
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: var(--shadow);
        }

        .tv-chat-topbar {
          min-height: 66px;
          padding: 12px;
          border-bottom: 1px solid var(--line);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          background: rgba(255, 255, 255, 0.02);
        }

        .tv-chat-title {
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--text);
        }

        .tv-chat-user {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .tv-chat-user img {
          width: 34px;
          height: 34px;
          border-radius: 999px;
          object-fit: cover;
          border: 1px solid var(--line);
          background: #1a1a1d;
        }

        .tv-chat-user span {
          font-size: 0.9rem;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tv-chat-auth,
        .tv-chat-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .tv-btn,
        .tv-btn-light {
          min-height: 40px;
          border-radius: 999px;
          padding: 0 14px;
          border: 1px solid var(--line-strong);
          background: rgba(255, 255, 255, 0.04);
          color: var(--text);
          transition: opacity 160ms ease, transform 160ms ease, border-color 160ms ease;
        }

        .tv-btn:hover,
        .tv-btn-light:hover {
          transform: translateY(-1px);
        }

        .tv-btn-primary {
          border-color: var(--brand);
          background: var(--brand);
          color: var(--white);
        }

        .tv-chat-list {
          min-height: 0;
          overflow-y: auto;
          padding: 14px 12px;
          display: grid;
          gap: 10px;
          background: linear-gradient(180deg, #090909 0%, #0d0d0f 100%);
        }

        .tv-message {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }

        .tv-message.is-own {
          flex-direction: row-reverse;
        }

        .tv-message-avatar {
          width: 30px;
          height: 30px;
          border-radius: 999px;
          object-fit: cover;
          border: 1px solid var(--line);
          background: #1a1a1d;
          flex-shrink: 0;
        }

        .tv-message-bubble {
          max-width: 82%;
          background: rgba(255, 255, 255, 0.04);
          color: var(--message);
          border: 1px solid var(--line);
          border-radius: 18px;
          padding: 10px 12px;
        }

        .tv-message.is-own .tv-message-bubble {
          background: var(--brand);
          border-color: var(--brand);
          color: var(--white);
        }

        .tv-message-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 4px;
        }

        .tv-message-name {
          font-size: 0.78rem;
          font-weight: 700;
        }

        .tv-message-time {
          font-size: 0.7rem;
          color: var(--muted);
        }

        .tv-message.is-own .tv-message-time {
          color: rgba(255, 255, 255, 0.78);
        }

        .tv-message-text {
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.45;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .tv-chat-compose {
          padding: 6px 10px 10px;
          border-top: 1px solid var(--line);
          background: rgba(255, 255, 255, 0.02);
          display: grid;
          gap: 4px;
        }

        .tv-auth-prompt {
          color: var(--muted);
          font-size: 0.88rem;
          line-height: 1.45;
          text-align: center;
        }

        .tv-auth-providers {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .tv-provider-btn {
          min-height: 50px;
          border-radius: 16px;
          border: 1px solid var(--line-strong);
          background: rgba(255, 255, 255, 0.04);
          color: var(--text);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 0 16px;
          transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
        }

        .tv-provider-btn:hover {
          transform: translateY(-1px);
          border-color: rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.07);
        }

        .tv-provider-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        .tv-provider-icon svg {
          display: block;
          width: 100%;
          height: 100%;
        }

        .tv-provider-label {
          font-size: 0.95rem;
          font-weight: 600;
        }

        .tv-auth-email-btn {
          width: 100%;
          min-height: 44px;
          border-radius: 14px;
          border: 1px solid rgba(255, 16, 16, 0.42);
          background: rgba(255, 16, 16, 0.12);
          color: var(--text);
          font-weight: 600;
        }

        .tv-chat-compose textarea {
          width: 100%;
          min-height: 62px;
          max-height: 108px;
          resize: vertical;
          border-radius: 16px;
          border: 1px solid var(--line-strong);
          background: var(--field);
          color: var(--text);
          padding: 10px 14px;
          outline: none;
        }

        .tv-chat-compose textarea:focus,
        .tv-auth-form input:focus {
          border-color: var(--brand);
        }

        .tv-chat-compose textarea:disabled {
          background: #101012;
          color: var(--muted);
        }

        .tv-error {
          min-height: 0;
          font-size: 0.78rem;
          color: var(--brand);
        }

        .tv-error:empty {
          display: none;
        }

        .tv-modal {
          position: fixed;
          inset: 0;
          z-index: 20;
          display: grid;
          place-items: center;
          padding: 20px;
          background: rgba(0, 0, 0, 0.68);
        }

        .tv-auth-card {
          width: min(420px, 100%);
          background: #0d0d0f;
          border: 1px solid var(--line);
          border-radius: 22px;
          box-shadow: var(--shadow);
          overflow: hidden;
        }

        .tv-auth-head {
          min-height: 64px;
          padding: 16px 18px 12px;
          border-bottom: 1px solid var(--line);
          display: grid;
          gap: 6px;
        }

        .tv-auth-title {
          font-size: 1.02rem;
          font-weight: 700;
          color: var(--text);
        }

        .tv-auth-subtitle {
          font-size: 0.88rem;
          line-height: 1.45;
          color: var(--muted);
        }

        .tv-auth-form {
          padding: 14px 12px 12px;
          display: grid;
          gap: 10px;
        }

        .tv-auth-mode-switch {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding-top: 4px;
          color: var(--muted);
          font-size: 0.86rem;
        }

        .tv-auth-actions-row {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tv-auth-form input {
          width: 100%;
          min-height: 48px;
          border-radius: 14px;
          border: 1px solid var(--line-strong);
          padding: 0 14px;
          outline: none;
          background: var(--field);
          color: var(--text);
        }

        .tv-chat-placeholder {
          display: grid;
          place-items: center;
          color: var(--muted);
          font-size: 0.88rem;
          min-height: 100%;
        }

        @media (max-width: 980px) {
          body {
            overflow: auto;
          }

          .tv-page {
            height: auto;
            min-height: 100dvh;
            grid-template-rows: 84px auto;
          }

          .tv-topbar-inner {
            width: 90%;
          }

          .tv-logo {
            width: 170px;
            height: auto;
          }

          .tv-shell {
            width: 90%;
            grid-template-columns: 1fr;
            grid-template-rows: minmax(280px, 48dvh) minmax(360px, 44dvh);
            gap: 10px;
            margin: 10px auto;
          }

          .tv-player {
            border-radius: 18px;
          }

          .tv-player-status {
            width: calc(100% - 36px);
          }

          .tv-player-status--offline {
            padding: 22px 20px;
            border-radius: 22px;
          }

          .tv-auth-providers {
            grid-template-columns: 1fr;
          }

          .tv-chat {
            border-radius: 18px;
          }
        }

        @media (max-width: 640px) {
          .tv-shell {
            --tv-mobile-shell-gap: 12px;
            --tv-mobile-player-height: calc((100vw - 28px) * 9 / 16);
            --tv-mobile-compose-height: 132px;
          }

          .tv-startup-splash-glow {
            width: min(320px, 86vw);
          }

          .tv-startup-splash-logo {
            width: min(280px, 72vw);
          }

          .tv-page {
            grid-template-rows: minmax(0, 1fr);
          }

          .tv-topbar {
            display: none;
          }

          .tv-topbar-inner {
            width: calc(100% - 28px);
            justify-content: center;
            padding: 0 8px;
          }

          .tv-logo {
            width: min(154px, 46vw);
          }

          .tv-shell {
            width: calc(100% - 28px);
            grid-template-rows: auto auto;
            gap: var(--tv-mobile-shell-gap);
            margin: 6px auto 14px;
          }

          .tv-shell.is-compose-active {
            gap: 10px;
            height: var(--tv-vh, 100dvh);
            padding-top: calc(var(--tv-mobile-player-height) + 10px);
            padding-bottom: 10px;
            overflow: hidden;
          }

          .tv-player {
            align-self: start;
          }

          .tv-shell.is-compose-active .tv-player {
            position: fixed;
            top: max(env(safe-area-inset-top, 0px), 8px);
            left: 14px;
            right: 14px;
            width: calc(100vw - 28px);
            z-index: 14;
          }

          .tv-player-frame {
            aspect-ratio: 16 / 9;
            height: auto;
          }

          .tv-player-status {
            width: min(360px, calc(100% - 28px));
          }

          .tv-player-status--offline {
            padding: 18px 16px;
            border-radius: 20px;
            gap: 8px;
          }

          .tv-player-status--loading {
            width: auto;
            max-width: calc(100% - 36px);
            padding: 14px 18px;
            gap: 12px;
          }

          .tv-player-status-stream {
            font-size: clamp(1.75rem, 9vw, 2.25rem);
          }

          .tv-player-status-text {
            font-size: 0.96rem;
          }

          .tv-player-status-detail {
            font-size: 0.82rem;
          }

          .tv-chat {
            grid-template-rows: auto minmax(136px, 220px) auto;
          }

          .tv-shell.is-compose-active .tv-chat {
            height: calc(var(--tv-vh, 100dvh) - var(--tv-mobile-player-height) - 18px);
            position: relative;
            z-index: 1;
            grid-template-rows: auto minmax(0, 1fr);
          }

          .tv-shell.is-compose-active .tv-chat-list {
            overscroll-behavior: contain;
            padding-bottom: calc(var(--tv-compose-height, var(--tv-mobile-compose-height)) + 14px);
          }

          .tv-shell.is-compose-active .tv-chat-compose {
            position: fixed;
            left: 14px;
            right: 14px;
            top: max(
              calc(
                var(--tv-vtop, 0px) + var(--tv-vh, 100dvh) - var(--tv-compose-height, var(--tv-mobile-compose-height)) -
                  env(safe-area-inset-bottom, 0px) - 8px
              ),
              calc(max(env(safe-area-inset-top, 0px), 8px) + var(--tv-mobile-player-height) + 12px)
            );
            bottom: auto;
            z-index: 18;
            border: 1px solid var(--line);
            border-radius: 22px;
            background: rgba(13, 13, 15, 0.96);
            box-shadow: 0 18px 42px rgba(0, 0, 0, 0.34);
          }

          .tv-chat-topbar {
            min-height: 60px;
            padding: 12px 14px;
          }

          .tv-chat-title {
            font-size: 1.42rem;
            letter-spacing: 0;
          }

          .tv-chat-list {
            padding: 12px 10px;
          }

          .tv-message-bubble {
            max-width: 78%;
          }

          .tv-chat-compose {
            padding: 8px 10px 10px;
            gap: 6px;
          }

          .tv-auth-prompt {
            font-size: 0.94rem;
          }

          .tv-auth-providers {
            gap: 12px;
          }

          .tv-provider-btn {
            min-height: 58px;
            padding: 0 18px;
          }

          .tv-provider-label {
            font-size: 1.02rem;
          }

          .tv-auth-email-btn {
            min-height: 52px;
          }
        }
      `}</style>
      {showStartupSplash ? (
        <div
          className={`tv-startup-splash ${
            startupSplashPhase === 'visible' ? 'is-visible' : startupSplashPhase === 'leaving' ? 'is-visible is-leaving' : ''
          }`}
          aria-hidden="true"
        >
          <div className="tv-startup-splash-glow" />
          <img className="tv-startup-splash-logo" src="/brand/logo-lavozsalsa-fondo-negro-horizontal.png" alt="" />
        </div>
      ) : null}

      <div className={`tv-page${pageSplashClass}`}>
        <header className="tv-topbar">
          <div className="tv-topbar-inner">
            <a className="tv-logo-link" href="https://lavozsalsa.com/" aria-label="Ir a lavozsalsa.com">
              <img className="tv-logo" src="/brand/logo-lavozsalsa-fondo-negro-horizontal.png" alt="La Voz Salsa" />
            </a>
          </div>
        </header>

        <main className={`tv-shell${isComposerFocused ? ' is-compose-active' : ''}`}>
          <section className="tv-player">
            <div className={`tv-player-frame${showPlayerStatus ? ' is-idle' : ''}`}>
              {showPlayerStatus ? <div className="tv-player-backdrop" aria-hidden="true" /> : null}
              {showPlayerStatus ? (
                <div className={`tv-player-status tv-player-status--${playerUi.statusMode}`} aria-live="polite">
                  {playerUi.statusMode === 'loading' ? <span className="tv-player-status-loader" aria-hidden="true" /> : null}
                  <div className="tv-player-status-copy">
                    <h2 className="tv-player-status-stream">{playerUi.streamLabel}</h2>
                    <p className="tv-player-status-text">{playerUi.statusText}</p>
                    <p className="tv-player-status-detail">{playerUi.detailText}</p>
                  </div>
                </div>
              ) : null}
              <video ref={videoRef} controls={playerIsLive} playsInline autoPlay />
            </div>
          </section>

          <aside className="tv-chat">
            <div className="tv-chat-topbar">
              {currentUser ? (
                <>
                  <div className="tv-chat-user">
                    <img src={currentUser.photoURL || CHAT_AVATAR_FALLBACK} alt={currentDisplayName || 'Usuario'} />
                    <span>{currentDisplayName || currentUser.email || 'Salsero'}</span>
                  </div>
                  <div className="tv-chat-actions">
                    <button className="tv-btn tv-btn-light" type="button" onClick={() => void signOut(auth)}>
                      Salir
                    </button>
                  </div>
                </>
              ) : (
                <div className="tv-chat-title">Chat en vivo</div>
              )}
            </div>

            <div ref={messagesRef} className="tv-chat-list">
              {messages.length ? (
                messages.map((message) => (
                  <article key={message.id} className={`tv-message${message.isOwn ? ' is-own' : ''}`}>
                    <img className="tv-message-avatar" src={message.userAvatar} alt={message.userName} />
                    <div className="tv-message-bubble">
                      <div className="tv-message-topline">
                        <span className="tv-message-name">{message.userName}</span>
                        {message.sentAtLabel ? <span className="tv-message-time">{message.sentAtLabel}</span> : null}
                      </div>
                      <p className="tv-message-text">{message.text}</p>
                    </div>
                  </article>
                ))
              ) : (
                <div className="tv-chat-placeholder">{isChatLoading ? 'Cargando chat...' : 'Chat'}</div>
              )}
            </div>

            <div ref={chatComposeRef} className="tv-chat-compose">
              <div className="tv-error">{chatError || authError}</div>
              {!currentUser ? (
                <>
                  <div className="tv-auth-prompt">Inicia sesión para escribir en el chat.</div>
                  <div className="tv-auth-providers">
                    <button className="tv-provider-btn" type="button" onClick={() => void handleProvider('google')}>
                      <span className="tv-provider-icon">
                        <GoogleLogo />
                      </span>
                      <span className="tv-provider-label">Google</span>
                    </button>
                    <button className="tv-provider-btn" type="button" onClick={() => void handleProvider('apple')}>
                      <span className="tv-provider-icon">
                        <AppleLogo />
                      </span>
                      <span className="tv-provider-label">Apple</span>
                    </button>
                  </div>
                  <button
                    className="tv-auth-email-btn"
                    type="button"
                    onClick={() => {
                      setAuthError('');
                      setAuthOpen(true);
                    }}
                  >
                    Entrar con correo
                  </button>
                </>
              ) : (
                <>
                  <textarea
                    ref={composerRef}
                    placeholder="Escribe..."
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    onFocus={() => setIsComposerFocused(true)}
                    onBlur={() => setIsComposerFocused(false)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        void handleSendMessage();
                      }
                    }}
                  />
                  <div className="tv-chat-actions">
                    <button
                      className="tv-btn tv-btn-primary"
                      type="button"
                      disabled={isSubmittingMessage}
                      onPointerDown={handleMobileSendPointerDown}
                      onClick={() => {
                        if (typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches) {
                          return;
                        }

                        void handleSendMessage();
                      }}
                    >
                      {isSubmittingMessage ? 'Enviando' : 'Enviar'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </aside>
        </main>

        {authOpen ? (
          <div className="tv-modal" role="dialog" aria-modal="true" aria-labelledby="tv-auth-title">
            <div className="tv-auth-card">
              <div className="tv-auth-head">
                <div id="tv-auth-title" className="tv-auth-title">
                  Correo
                </div>
                <div className="tv-auth-subtitle">
                  {authMode === 'sign-in'
                    ? 'Ingresa con tu correo para escribir en el chat.'
                    : 'Crea tu cuenta para participar en el chat.'}
                </div>
              </div>

              <form className="tv-auth-form" onSubmit={handleEmailAuth}>
                {authMode === 'sign-up' ? (
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={displayName}
                    onChange={(event) => setDisplayName(event.target.value)}
                  />
                ) : null}

                <input
                  type="email"
                  placeholder="Correo"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                />

                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete={authMode === 'sign-in' ? 'current-password' : 'new-password'}
                />

                <div className="tv-error">{authError}</div>

                <div className="tv-auth-mode-switch">
                  <span>{authMode === 'sign-in' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}</span>
                  <button
                    className="tv-btn tv-btn-light"
                    type="button"
                    onClick={() => setAuthMode(authMode === 'sign-in' ? 'sign-up' : 'sign-in')}
                  >
                    {authMode === 'sign-in' ? 'Crear cuenta' : 'Ya tengo cuenta'}
                  </button>
                </div>

                <div className="tv-auth-actions-row">
                  <button className="tv-btn tv-btn-light" type="button" onClick={() => setAuthOpen(false)}>
                    Cerrar
                  </button>

                  {authMode === 'sign-in' ? (
                    <button className="tv-btn tv-btn-light" type="button" onClick={() => void handlePasswordReset()}>
                      Recuperar
                    </button>
                  ) : null}

                  <button className="tv-btn tv-btn-primary" type="submit" disabled={isSubmittingAuth}>
                    {isSubmittingAuth ? 'Procesando' : authMode === 'sign-in' ? 'Entrar' : 'Crear cuenta'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
