(function () {
    var LIVE_URL = 'https://streaming.lavozsalsa.com/live-abr/master.m3u8';
    var FALLBACK_URL = 'https://streaming.lavozsalsa.com/fallback-abr/master.m3u8';
    var PROBE_INTERVAL_MS = 15000;
    var MANIFEST_PROBE_TIMEOUT_MS = 4000;
    var STARTUP_TIMEOUT_MS = 12000;
    var RETRY_FALLBACK_DELAY_MS = 3000;
    var ANALYTICS_HEARTBEAT_MS = 60000;

    var streamLabelEl = document.getElementById('streamLabel');
    var statusTextEl = document.getElementById('statusText');
    var detailTextEl = document.getElementById('detailText');

    var analyticsConfig = window.LaVozSalsaConfig || {};
    var analyticsBaseUrl = String(analyticsConfig.analyticsBaseUrl || '').replace(/\/+$/, '');
    var analyticsIngestKey = analyticsConfig.analyticsIngestKey || '';
    var analyticsEnabled = Boolean(analyticsBaseUrl);
    var currentSource = null;
    var currentAttempt = null;
    var startupTimeoutId = null;
    var liveProbeIntervalId = null;
    var fallbackRetryTimeoutId = null;
    var liveManifestCheckInFlight = false;
    var attemptCounter = 0;
    var analyticsSession = null;
    var analyticsHeartbeatIntervalId = null;
    var lastAnalyticsBufferingAt = 0;

    function setUi(source, status, detail) {
        streamLabelEl.textContent = source;
        statusTextEl.textContent = status;
        detailTextEl.textContent = detail;
        console.log('[LaVozSalsaTV]', source + ' | ' + status + ' | ' + detail);
    }

    function createUuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (character) {
            var random = Math.random() * 16 | 0;
            var value = character === 'x' ? random : (random & 0x3 | 0x8);
            return value.toString(16);
        });
    }

    function getOrCreateDeviceId() {
        var storageKey = 'lavozsalsaAnalyticsDeviceId';
        var deviceId = '';

        try {
            deviceId = localStorage.getItem(storageKey) || '';
            if (!deviceId) {
                deviceId = createUuid();
                localStorage.setItem(storageKey, deviceId);
            }
        } catch (error) {
            deviceId = createUuid();
        }

        return deviceId;
    }

    function postAnalyticsPayload(payload) {
        if (!analyticsEnabled) {
            return;
        }

        try {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', analyticsBaseUrl + '/api/v1/events', true);
            xhr.timeout = 5000;
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            if (analyticsIngestKey) {
                xhr.setRequestHeader('X-Ingest-Key', analyticsIngestKey);
            }
            xhr.send(JSON.stringify(payload));
        } catch (error) {
            console.log('[LaVozSalsaTV] analytics skipped:', error.message);
        }
    }

    function stopAnalyticsHeartbeat() {
        if (analyticsHeartbeatIntervalId) {
            clearInterval(analyticsHeartbeatIntervalId);
            analyticsHeartbeatIntervalId = null;
        }
    }

    function startAnalyticsHeartbeat() {
        stopAnalyticsHeartbeat();

        analyticsHeartbeatIntervalId = setInterval(function () {
            if (!analyticsSession || document.hidden) {
                return;
            }

            trackAnalyticsEvent('heartbeat', {
                playbackState: analyticsSession.playbackState
            });
        }, ANALYTICS_HEARTBEAT_MS);
    }

    function trackAnalyticsEvent(eventType, extra) {
        var metadata = extra || {};

        if (!analyticsEnabled || !analyticsSession) {
            return;
        }

        postAnalyticsPayload({
            eventId: createUuid(),
            sessionId: analyticsSession.id,
            deviceId: analyticsSession.deviceId,
            platform: 'tizen_tv',
            appVersion: analyticsConfig.appVersion || '1.0.0',
            streamType: analyticsSession.streamType,
            eventType: eventType,
            playbackState: metadata.playbackState || analyticsSession.playbackState,
            clientTimestamp: Date.now(),
            networkType: navigator.onLine ? 'online' : 'offline',
            errorCode: metadata.errorCode || undefined,
            errorMessage: metadata.errorMessage || undefined,
            details: metadata.details || {}
        });
    }

    function ensureAnalyticsSession(sourceName, url) {
        var nextStreamType = String(sourceName || 'LIVE').toLowerCase();

        if (!analyticsEnabled) {
            return;
        }

        if (!analyticsSession) {
            analyticsSession = {
                id: createUuid(),
                deviceId: getOrCreateDeviceId(),
                streamType: nextStreamType,
                playbackState: 'starting'
            };

            trackAnalyticsEvent('session_started', {
                playbackState: 'starting',
                details: {
                    sourceName: sourceName,
                    sourceUrl: url
                }
            });
            startAnalyticsHeartbeat();
            return;
        }

        if (analyticsSession.streamType !== nextStreamType) {
            var previousStreamType = analyticsSession.streamType;
            analyticsSession.streamType = nextStreamType;
            trackAnalyticsEvent('stream_switched', {
                details: {
                    previousStreamType: previousStreamType,
                    nextStreamType: nextStreamType,
                    sourceUrl: url
                }
            });
        }

        analyticsSession.playbackState = 'starting';
    }

    function markAnalyticsBuffering(sourceName) {
        var now = Date.now();

        if (!analyticsSession || now - lastAnalyticsBufferingAt < 4000) {
            return;
        }

        analyticsSession.streamType = String(sourceName || analyticsSession.streamType).toLowerCase();
        analyticsSession.playbackState = 'buffering';
        lastAnalyticsBufferingAt = now;
        trackAnalyticsEvent('playback_buffering', {
            playbackState: 'buffering'
        });
    }

    function markAnalyticsReady(sourceName) {
        if (!analyticsSession) {
            return;
        }

        analyticsSession.streamType = String(sourceName || analyticsSession.streamType).toLowerCase();
        analyticsSession.playbackState = 'playing';
        trackAnalyticsEvent('playback_ready', {
            playbackState: 'playing'
        });
    }

    function reportAnalyticsError(sourceName, errorMessage) {
        if (!analyticsSession) {
            return;
        }

        analyticsSession.streamType = String(sourceName || analyticsSession.streamType).toLowerCase();
        analyticsSession.playbackState = 'error';
        trackAnalyticsEvent('playback_error', {
            playbackState: 'error',
            errorMessage: errorMessage
        });
    }

    function endAnalyticsSession(reason) {
        if (!analyticsSession) {
            return;
        }

        trackAnalyticsEvent('session_ended', {
            playbackState: analyticsSession.playbackState,
            details: {
                reason: reason
            }
        });
        analyticsSession = null;
        stopAnalyticsHeartbeat();
    }

    function clearTimers() {
        if (startupTimeoutId) {
            clearTimeout(startupTimeoutId);
            startupTimeoutId = null;
        }

        if (fallbackRetryTimeoutId) {
            clearTimeout(fallbackRetryTimeoutId);
            fallbackRetryTimeoutId = null;
        }
    }

    function stopLiveProbe() {
        if (liveProbeIntervalId) {
            clearInterval(liveProbeIntervalId);
            liveProbeIntervalId = null;
        }
    }

    function startLiveProbe() {
        if (liveProbeIntervalId) {
            return;
        }

        liveProbeIntervalId = setInterval(function () {
            if (currentSource !== 'FALLBACK' || currentAttempt || liveManifestCheckInFlight || document.hidden) {
                return;
            }

            setUi('FALLBACK', 'Comprobando LIVE', 'Verificando si LIVE ya regreso');

            probeStreamAvailability(LIVE_URL, function (isAvailable) {
                if (currentSource !== 'FALLBACK' || currentAttempt || document.hidden) {
                    return;
                }

                if (isAvailable) {
                    playSource('LIVE', LIVE_URL, {
                        reason: 'LIVE volvio. Cambiando automaticamente'
                    });
                    return;
                }

                if (currentSource === 'FALLBACK') {
                    setUi('FALLBACK', 'Seguimos en FALLBACK', 'LIVE aun no esta disponible');
                }
            });
        }, PROBE_INTERVAL_MS);
    }

    function safeStopClose() {
        try {
            if (webapis.avplay.getState() === 'PLAYING' || webapis.avplay.getState() === 'PAUSED') {
                webapis.avplay.stop();
            }
        } catch (error) {
            console.log('[LaVozSalsaTV] stop skipped:', error.message);
        }

        try {
            if (webapis.avplay.getState() !== 'NONE') {
                webapis.avplay.close();
            }
        } catch (error) {
            console.log('[LaVozSalsaTV] close skipped:', error.message);
        }
    }

    function applyFullScreen() {
        try {
            webapis.avplay.setDisplayRect(0, 0, 1920, 1080);
            webapis.avplay.setDisplayMethod('PLAYER_DISPLAY_MODE_FULL_SCREEN');
        } catch (error) {
            console.log('[LaVozSalsaTV] display config skipped:', error.message);
        }
    }

    function isCurrentAttempt(attemptId) {
        return currentAttempt && currentAttempt.id === attemptId;
    }

    function probeStreamAvailability(url, callback) {
        var xhr = new XMLHttpRequest();

        liveManifestCheckInFlight = true;
        xhr.open('GET', url, true);
        xhr.timeout = MANIFEST_PROBE_TIMEOUT_MS;
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }

            liveManifestCheckInFlight = false;

            if (xhr.status >= 200 && xhr.status < 300 && xhr.responseText.indexOf('#EXTM3U') !== -1) {
                callback(true);
                return;
            }

            callback(false);
        };
        xhr.onerror = function () {
            liveManifestCheckInFlight = false;
            callback(false);
        };
        xhr.ontimeout = function () {
            liveManifestCheckInFlight = false;
            callback(false);
        };

        try {
            xhr.send();
        } catch (error) {
            liveManifestCheckInFlight = false;
            callback(false);
        }
    }

    function handleSourceFailure(sourceName, detail) {
        clearTimers();

        if (sourceName === 'LIVE') {
            playSource('FALLBACK', FALLBACK_URL, {
                reason: 'LIVE no disponible. Entrando a FALLBACK'
            });
            return;
        }

        setUi('FALLBACK', 'Recuperando FALLBACK', detail);
        fallbackRetryTimeoutId = setTimeout(function () {
            playSource('FALLBACK', FALLBACK_URL, {
                reason: 'Recuperando FALLBACK'
            });
        }, RETRY_FALLBACK_DELAY_MS);
    }

    function handleAttemptSuccess(attemptId, sourceName) {
        if (!isCurrentAttempt(attemptId)) {
            return;
        }

        clearTimeout(startupTimeoutId);
        startupTimeoutId = null;
        currentAttempt = null;
        currentSource = sourceName;

        if (sourceName === 'LIVE') {
            stopLiveProbe();
        } else {
            startLiveProbe();
        }

        markAnalyticsReady(sourceName);
        setUi(sourceName, 'En vivo', 'Reproduccion activa');
    }

    function handleAttemptFailure(attemptId, sourceName, errorMessage, onFailure) {
        if (!isCurrentAttempt(attemptId)) {
            return;
        }

        clearTimers();
        currentAttempt = null;
        reportAnalyticsError(sourceName, errorMessage);

        if (typeof onFailure === 'function') {
            onFailure(errorMessage);
            return;
        }

        handleSourceFailure(sourceName, errorMessage);
    }

    function buildListener(attemptId, sourceName, onFailure) {
        return {
            onbufferingstart: function () {
                markAnalyticsBuffering(sourceName);
                setUi(sourceName, 'Buffering', 'Conectando al stream');
            },
            onbufferingcomplete: function () {
                handleAttemptSuccess(attemptId, sourceName);
            },
            oncurrentplaytime: function (currentTime) {
                if (currentTime > 0) {
                    handleAttemptSuccess(attemptId, sourceName);
                }
            },
            onstreamcompleted: function () {
                if (isCurrentAttempt(attemptId)) {
                    handleAttemptFailure(attemptId, sourceName, 'El stream termino', onFailure);
                    return;
                }

                handleSourceFailure(sourceName, 'El stream termino');
            },
            onerror: function (eventType) {
                var detail = 'Error AVPlay: ' + eventType;

                if (isCurrentAttempt(attemptId)) {
                    handleAttemptFailure(attemptId, sourceName, detail, onFailure);
                    return;
                }

                handleSourceFailure(sourceName, detail);
            },
            onerrormsg: function (eventType, data) {
                var message = 'Error AVPlay: ' + eventType;
                if (data) {
                    message += ' (' + data + ')';
                }

                if (isCurrentAttempt(attemptId)) {
                    handleAttemptFailure(attemptId, sourceName, message, onFailure);
                    return;
                }

                handleSourceFailure(sourceName, message);
            }
        };
    }

    function playSource(sourceName, url, options) {
        var opts = options || {};
        var attemptId = ++attemptCounter;

        clearTimers();
        currentAttempt = {
            id: attemptId,
            sourceName: sourceName
        };
        ensureAnalyticsSession(sourceName, url);

        setUi(sourceName, 'Preparando', opts.reason || 'Abriendo stream');

        try {
            safeStopClose();
            webapis.avplay.open(url);
            webapis.avplay.setListener(buildListener(attemptId, sourceName, opts.onFailure));
            applyFullScreen();
            webapis.avplay.prepareAsync(
                function () {
                    if (!currentAttempt || currentAttempt.id !== attemptId) {
                        return;
                    }

                    try {
                        webapis.avplay.play();
                    } catch (playError) {
                        handleAttemptFailure(
                            attemptId,
                            sourceName,
                            'No se pudo iniciar la reproduccion: ' + playError.message,
                            opts.onFailure
                        );
                        return;
                    }

                    startupTimeoutId = setTimeout(function () {
                        handleAttemptFailure(
                            attemptId,
                            sourceName,
                            'Timeout esperando video',
                            opts.onFailure
                        );
                    }, STARTUP_TIMEOUT_MS);
                },
                function (prepareError) {
                    var detail = prepareError && prepareError.message ? prepareError.message : 'prepareAsync fallo';
                    handleAttemptFailure(attemptId, sourceName, detail, opts.onFailure);
                }
            );
        } catch (error) {
            handleAttemptFailure(attemptId, sourceName, error.message || 'Fallo desconocido', opts.onFailure);
        }
    }

    function registerKeys() {
        if (!window.tizen || !tizen.tvinputdevice) {
            return;
        }

        ['Exit'].forEach(function (keyName) {
            try {
                tizen.tvinputdevice.registerKey(keyName);
            } catch (error) {
                console.log('[LaVozSalsaTV] key skipped:', keyName, error.message);
            }
        });
    }

    function handleRemoteKeys(event) {
        if (event.keyCode === 10009) {
            safeStopClose();
            endAnalyticsSession('remote_exit');
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (error) {
                console.log('[LaVozSalsaTV] exit failed:', error.message);
            }
            return;
        }

        if (event.keyCode === 415 || event.keyCode === 10252) {
            if (!currentAttempt && currentSource !== 'LIVE') {
                playSource('LIVE', LIVE_URL, {
                    reason: 'Forzando comprobacion manual de LIVE'
                });
            }
            return;
        }

        if (event.keyCode === 19 || event.keyCode === 10232) {
            safeStopClose();
            endAnalyticsSession('remote_stop');
        }
    }

    function handleVisibility() {
        if (document.hidden) {
            clearTimers();
            stopLiveProbe();
            safeStopClose();
            endAnalyticsSession('app_hidden');
            return;
        }

        playSource('LIVE', LIVE_URL, {
            reason: 'La app volvio al frente. Intentando LIVE'
        });
    }

    function installRuntimeErrorHooks() {
        window.addEventListener('error', function (event) {
            console.log('[LaVozSalsaTV] window error:', event.message);
            reportAnalyticsError(currentSource || 'LIVE', event.message);
        });

        document.addEventListener('visibilitychange', handleVisibility);
        document.addEventListener('keydown', handleRemoteKeys);
        window.addEventListener('tizenhwkey', function (event) {
            if (event.keyName === 'back') {
                safeStopClose();
                endAnalyticsSession('hardware_back');
                tizen.application.getCurrentApplication().exit();
            }
        });
    }

    function startApp() {
        registerKeys();
        installRuntimeErrorHooks();
        playSource('LIVE', LIVE_URL, {
            reason: 'Intentando LIVE al abrir la app'
        });
    }

    startApp();
}());
