package com.lavozsalsa.tv

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.os.Bundle
import android.util.Log
import android.view.WindowManager
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.StartOffset
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.focusable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.focus.onFocusChanged
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import androidx.lifecycle.lifecycleScope
import androidx.media3.common.MediaItem
import androidx.media3.common.MediaMetadata
import androidx.media3.common.MimeTypes
import androidx.media3.common.PlaybackException
import androidx.media3.common.Player
import androidx.media3.datasource.DefaultDataSource
import androidx.media3.datasource.DefaultHttpDataSource
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.exoplayer.source.DefaultMediaSourceFactory
import androidx.media3.ui.AspectRatioFrameLayout
import androidx.media3.ui.PlayerView
import com.lavozsalsa.tv.analytics.AnalyticsTracker
import com.lavozsalsa.tv.ui.theme.AccentWarm
import com.lavozsalsa.tv.ui.theme.CardBorder
import com.lavozsalsa.tv.ui.theme.CardSurface
import com.lavozsalsa.tv.ui.theme.CardSurfaceStrong
import com.lavozsalsa.tv.ui.theme.DangerGlow
import com.lavozsalsa.tv.ui.theme.DeepBackground
import com.lavozsalsa.tv.ui.theme.LaVozSalsaTVTheme
import com.lavozsalsa.tv.ui.theme.SoftText
import com.lavozsalsa.tv.ui.theme.WarmWhite
import java.io.IOException
import java.net.HttpURLConnection
import java.net.URL
import java.net.UnknownHostException
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import org.json.JSONObject
import kotlin.math.min

class MainActivity : ComponentActivity() {

    companion object {
        private const val TAG = "LaVozSalsaTV"
        private const val USER_AGENT = "LaVozSalsaTV/1.0"

        private const val RADIO_STREAM_URL = "https://emisora.lavozsalsa.com/listen/lavozsalsa/web128"
        private const val NOWPLAYING_URL = "https://emisora.lavozsalsa.com/api/nowplaying_static/lavozsalsa.json"
        private const val LIVE_URL = "https://streaming.lavozsalsa.com/live-abr/master.m3u8"

        private const val SPLASH_DURATION_MS = 2_600L
        private const val RADIO_METADATA_POLL_MS = 15_000L
        private const val RADIO_METADATA_RETRY_MS = 30_000L
        private const val RADIO_RETRY_DELAY_MS = 3_000L
        private const val LIVE_START_DELAY_MS = 850L
        private const val LIVE_RETRY_DELAY_MS = 3_000L

        private const val EXTRA_DEBUG_TEST_URL = "debug_test_url"
        private const val EXTRA_DEBUG_TEST_LABEL = "debug_test_label"
        private const val DEFAULT_DEBUG_TEST_LABEL = "TEST"

        private const val DEFAULT_RADIO_TITLE = "La Voz Salsa"
        private const val DEFAULT_RADIO_ARTIST = "Conectando señal"
        private const val DEFAULT_STATION = "La Voz Salsa"
    }

    private enum class AppSection {
        SPLASH,
        HOME,
        RADIO,
        LIVE
    }

    enum class HomeOption {
        RADIO,
        LIVE
    }

    private enum class PlaybackMode {
        NONE,
        RADIO,
        LIVE,
        DEBUG
    }

    enum class LiveUiState {
        LOADING,
        PLAYER,
        UNAVAILABLE
    }

    private data class DebugTestStream(
        val label: String,
        val url: String
    )

    private data class RadioNowPlaying(
        val title: String?,
        val artist: String,
        val stationName: String,
        val artUrl: String?
    )

    private val uniSansFamily by lazy {
        FontFamily(
            Font(
                resId = R.font.uni_sans_heavy_italic_caps,
                weight = FontWeight.Black,
                style = FontStyle.Italic
            )
        )
    }
    private val analyticsTracker by lazy { AnalyticsTracker(this) }

    private var player: ExoPlayer? = null
    private var playerView: PlayerView? = null
    private var metadataJob: Job? = null
    private var radioRetryJob: Job? = null
    private var liveRetryJob: Job? = null
    private var liveStartJob: Job? = null
    private var splashJob: Job? = null
    private var debugTestStream: DebugTestStream? = null

    private var currentSection by mutableStateOf(AppSection.SPLASH)
    private var homeFocus by mutableStateOf(HomeOption.RADIO)
    private var playbackMode by mutableStateOf(PlaybackMode.NONE)

    private var radioSongTitle by mutableStateOf(DEFAULT_RADIO_TITLE)
    private var radioArtist by mutableStateOf(DEFAULT_RADIO_ARTIST)
    private var radioStationName by mutableStateOf(DEFAULT_STATION)
    private var radioMetadataLoading by mutableStateOf(true)
    private var radioArtUrl by mutableStateOf<String?>(null)
    private var radioArtBitmap by mutableStateOf<Bitmap?>(null)
    private var radioStatusText by mutableStateOf("Conectando señal")
    private var radioIsPlaying by mutableStateOf(false)

    private var liveUiState by mutableStateOf(LiveUiState.LOADING)
    private var liveStateText by mutableStateOf("Cargando transmisión en vivo…")
    private var liveHintText by mutableStateOf("Presiona Back para volver al menú.")

    private var lastErrorText by mutableStateOf("")
    private var networkText by mutableStateOf("Sin comprobar")

    private val playerListener = object : Player.Listener {
        override fun onPlaybackStateChanged(playbackState: Int) {
            when (playbackState) {
                Player.STATE_BUFFERING -> {
                    if (playbackMode == PlaybackMode.RADIO) {
                        radioStatusText = "Conectando señal"
                        analyticsTracker.markBuffering(streamTypeOverride = "radio")
                    } else if (playbackMode == PlaybackMode.LIVE || playbackMode == PlaybackMode.DEBUG) {
                        liveUiState = LiveUiState.LOADING
                        if (playbackMode == PlaybackMode.LIVE) {
                            analyticsTracker.markBuffering(streamTypeOverride = "live")
                        }
                    }
                }

                Player.STATE_READY -> {
                    if (playbackMode == PlaybackMode.RADIO) {
                        radioStatusText = "Señal al aire"
                    }
                }

                Player.STATE_ENDED -> {
                    if (playbackMode == PlaybackMode.LIVE) {
                        scheduleLiveRetry("La transmisión terminó. Reintentando…")
                    }
                }
            }

            Log.d(TAG, "Playback state: $playbackState / $playbackMode")
        }

        override fun onIsPlayingChanged(isPlaying: Boolean) {
            radioIsPlaying = playbackMode == PlaybackMode.RADIO && isPlaying
            if (playbackMode == PlaybackMode.RADIO && isPlaying) {
                analyticsTracker.markPlaybackReady(streamTypeOverride = "radio")
            }
            Log.d(TAG, "isPlaying: $isPlaying / $playbackMode")
        }

        override fun onRenderedFirstFrame() {
            if (playbackMode == PlaybackMode.LIVE || playbackMode == PlaybackMode.DEBUG) {
                liveUiState = LiveUiState.PLAYER
                liveStateText = if (playbackMode == PlaybackMode.DEBUG) {
                    "Stream de prueba activo"
                } else {
                    "Transmisión en vivo activa"
                }
                lastErrorText = ""
                if (playbackMode == PlaybackMode.LIVE) {
                    analyticsTracker.markPlaybackReady(streamTypeOverride = "live")
                }
            }
            Log.d(TAG, "Rendered first frame")
        }

        override fun onMediaMetadataChanged(mediaMetadata: MediaMetadata) {
            if (playbackMode != PlaybackMode.RADIO) {
                return
            }

            if (radioMetadataLoading) {
                val title = mediaMetadata.title?.toString()?.trim().orEmpty()
                val artist = mediaMetadata.artist?.toString()?.trim().orEmpty()
                if (title.isNotBlank()) {
                    radioSongTitle = title
                    radioArtist = artist.ifBlank { DEFAULT_RADIO_ARTIST }
                }
            }
        }

        override fun onPlayerError(playbackError: PlaybackException) {
            refreshNetworkStatus()
            val formattedError = playbackError.toReadableMessage()
            lastErrorText = formattedError
            analyticsTracker.reportError(
                errorCode = playbackError.errorCodeName,
                errorMessage = formattedError
            )
            Log.e(TAG, "Player error on $playbackMode", playbackError)

            when (playbackMode) {
                PlaybackMode.RADIO -> {
                    radioStatusText = "Recuperando señal"
                    scheduleRadioRetry()
                }

                PlaybackMode.LIVE -> {
                    scheduleLiveRetry("No se pudo mantener la transmisión. Reintentando…")
                }

                PlaybackMode.DEBUG -> {
                    liveUiState = LiveUiState.UNAVAILABLE
                    liveStateText = formattedError
                    liveHintText = "Presiona Back para volver al menú."
                }

                PlaybackMode.NONE -> Unit
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        debugTestStream = loadDebugTestStream()

        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        WindowCompat.setDecorFitsSystemWindows(window, false)
        enableImmersiveMode()

        splashJob = lifecycleScope.launch {
            delay(SPLASH_DURATION_MS)
            if (debugTestStream != null) {
                openDebugLive(debugTestStream!!)
            } else {
                currentSection = AppSection.HOME
            }
        }

        setContent {
            LaVozSalsaTVTheme {
                val showVideoLayer = currentSection == AppSection.LIVE &&
                    (playbackMode == PlaybackMode.LIVE || playbackMode == PlaybackMode.DEBUG)

                BackHandler(enabled = currentSection == AppSection.RADIO || currentSection == AppSection.LIVE) {
                    goHome()
                }

                Box(modifier = Modifier.fillMaxSize()) {
                    AndroidView(
                        factory = { context ->
                            PlayerView(context).apply {
                                useController = false
                                resizeMode = AspectRatioFrameLayout.RESIZE_MODE_ZOOM
                                setShowBuffering(PlayerView.SHOW_BUFFERING_NEVER)
                                setKeepContentOnPlayerReset(true)
                                setBackgroundColor(android.graphics.Color.BLACK)
                            }.also { createdPlayerView ->
                                playerView = createdPlayerView
                            }
                        },
                        update = { view ->
                            view.player = if (showVideoLayer) player else null
                            view.alpha = if (showVideoLayer) 1f else 0f
                        },
                        modifier = Modifier.fillMaxSize()
                    )

                    when (currentSection) {
                        AppSection.SPLASH -> SplashScreen(durationMs = SPLASH_DURATION_MS)
                        AppSection.HOME -> HomeScreen(
                            selected = homeFocus,
                            onFocused = { homeFocus = it },
                            onOpenRadio = { openRadio() },
                            onOpenLive = { openLive() }
                        )

                        AppSection.RADIO -> RadioScreen(
                            title = radioSongTitle,
                            artist = radioArtist,
                            loading = radioMetadataLoading,
                            playing = radioIsPlaying,
                            artBitmap = radioArtBitmap,
                            radioFontFamily = uniSansFamily
                        )

                        AppSection.LIVE -> LiveScreen(
                            uiState = liveUiState,
                            stateText = liveStateText,
                            hintText = liveHintText
                        )
                    }
                }
            }
        }
    }

    override fun onStart() {
        super.onStart()
        initializePlayer()
    }

    override fun onStop() {
        releasePlayer()
        super.onStop()
    }

    override fun onWindowFocusChanged(hasFocus: Boolean) {
        super.onWindowFocusChanged(hasFocus)
        if (hasFocus) {
            enableImmersiveMode()
        }
    }

    private fun initializePlayer() {
        if (player != null) {
            return
        }

        refreshNetworkStatus()

        val httpDataSourceFactory = DefaultHttpDataSource.Factory()
            .setUserAgent(USER_AGENT)
            .setAllowCrossProtocolRedirects(true)
            .setConnectTimeoutMs(10_000)
            .setReadTimeoutMs(10_000)

        val dataSourceFactory = DefaultDataSource.Factory(this, httpDataSourceFactory)

        player = ExoPlayer.Builder(this)
            .setMediaSourceFactory(DefaultMediaSourceFactory(dataSourceFactory))
            .build()
            .also { createdPlayer ->
                createdPlayer.addListener(playerListener)
                createdPlayer.playWhenReady = true
            }
    }

    private fun releasePlayer() {
        splashJob?.cancel()
        stopEverything(endReason = "app_stop")
        playerView?.player = null
        player?.removeListener(playerListener)
        player?.release()
        player = null
        playbackMode = PlaybackMode.NONE
    }

    private fun stopEverything(endReason: String = "stopped") {
        metadataJob?.cancel()
        metadataJob = null
        radioRetryJob?.cancel()
        radioRetryJob = null
        liveRetryJob?.cancel()
        liveRetryJob = null
        liveStartJob?.cancel()
        liveStartJob = null

        analyticsTracker.endSession(reason = endReason)
        player?.stop()
        player?.clearMediaItems()
        playbackMode = PlaybackMode.NONE
        radioIsPlaying = false
    }

    private fun goHome() {
        stopEverything(endReason = "go_home")
        currentSection = AppSection.HOME
        homeFocus = HomeOption.RADIO
        liveUiState = LiveUiState.LOADING
        liveStateText = "Cargando transmisión en vivo…"
        liveHintText = "Presiona Back para volver al menú."
        lastErrorText = ""
    }

    private fun openRadio() {
        initializePlayer()
        stopEverything(endReason = "switch_stream")

        currentSection = AppSection.RADIO
        playbackMode = PlaybackMode.RADIO
        radioMetadataLoading = true
        radioSongTitle = DEFAULT_RADIO_TITLE
        radioArtist = DEFAULT_RADIO_ARTIST
        radioStationName = DEFAULT_STATION
        radioStatusText = "Conectando señal"
        radioArtUrl = null
        radioArtBitmap = null

        val radioItem = MediaItem.Builder()
            .setUri("${RADIO_STREAM_URL}?ts=${System.currentTimeMillis()}")
            .build()

        analyticsTracker.startSession(
            streamType = "radio",
            extraDetails = mapOf("targetUrl" to RADIO_STREAM_URL)
        )
        player?.setMediaItem(radioItem, true)
        player?.prepare()
        player?.playWhenReady = true

        startMetadataPolling()
    }

    private fun openLive() {
        initializePlayer()
        stopEverything(endReason = "switch_stream")

        currentSection = AppSection.LIVE
        playbackMode = PlaybackMode.LIVE
        liveUiState = LiveUiState.LOADING
        liveStateText = "Cargando transmisión en vivo…"
        liveHintText = "Presiona Back para volver al menú."
        analyticsTracker.startSession(
            streamType = "live",
            extraDetails = mapOf("targetUrl" to LIVE_URL)
        )

        liveStartJob = lifecycleScope.launch {
            delay(LIVE_START_DELAY_MS)
            playLiveItem(LIVE_URL, cacheBust = true)
        }
    }

    private fun openDebugLive(testStream: DebugTestStream) {
        initializePlayer()
        stopEverything(endReason = "debug_switch")

        currentSection = AppSection.LIVE
        playbackMode = PlaybackMode.DEBUG
        liveUiState = LiveUiState.LOADING
        liveStateText = "Cargando stream de prueba…"
        liveHintText = testStream.label

        liveStartJob = lifecycleScope.launch {
            delay(240)
            playLiveItem(testStream.url)
        }
    }

    private fun playLiveItem(url: String, cacheBust: Boolean = false) {
        val resolvedUrl = if (cacheBust) {
            cacheBustUrl(url)
        } else {
            url
        }

        val liveItem = MediaItem.Builder()
            .setUri(resolvedUrl)
            .setMimeType(MimeTypes.APPLICATION_M3U8)
            .build()

        player?.setMediaItem(liveItem, true)
        player?.prepare()
        player?.playWhenReady = true
    }

    private fun scheduleLiveRetry(message: String) {
        if (currentSection != AppSection.LIVE || playbackMode != PlaybackMode.LIVE) {
            return
        }

        liveRetryJob?.cancel()
        liveUiState = LiveUiState.LOADING
        liveStateText = message
        liveHintText = "Presiona Back para volver al menú."

        liveRetryJob = lifecycleScope.launch {
            delay(LIVE_RETRY_DELAY_MS)
            if (currentSection == AppSection.LIVE && playbackMode == PlaybackMode.LIVE) {
                player?.stop()
                player?.clearMediaItems()
                playLiveItem(LIVE_URL, cacheBust = true)
            }
        }
    }

    private fun cacheBustUrl(url: String): String {
        val separator = if (url.contains('?')) '&' else '?'
        return "$url${separator}ts=${System.currentTimeMillis()}"
    }

    private fun scheduleRadioRetry() {
        radioRetryJob?.cancel()
        radioRetryJob = lifecycleScope.launch {
            delay(RADIO_RETRY_DELAY_MS)
            if (currentSection == AppSection.RADIO) {
                openRadio()
            }
        }
    }

    private fun startMetadataPolling() {
        metadataJob?.cancel()
        metadataJob = lifecycleScope.launch {
            while (isActive && currentSection == AppSection.RADIO) {
                val nowPlaying = fetchNowPlaying()
                if (nowPlaying != null) {
                    applyNowPlaying(nowPlaying)
                    delay(RADIO_METADATA_POLL_MS)
                } else {
                    delay(RADIO_METADATA_RETRY_MS)
                }
            }
        }
    }

    private suspend fun fetchNowPlaying(): RadioNowPlaying? = withContext(Dispatchers.IO) {
        val connection = try {
            URL("$NOWPLAYING_URL?ts=${System.currentTimeMillis()}").openConnection() as HttpURLConnection
        } catch (error: IOException) {
            Log.w(TAG, "Now playing open failed", error)
            return@withContext null
        }

        try {
            connection.connectTimeout = 8_000
            connection.readTimeout = 8_000
            connection.requestMethod = "GET"
            connection.setRequestProperty("User-Agent", USER_AGENT)
            connection.connect()

            if (connection.responseCode !in 200..299) {
                Log.w(TAG, "Now playing HTTP ${connection.responseCode}")
                return@withContext null
            }

            val payload = connection.inputStream.bufferedReader().use { it.readText() }
            val json = JSONObject(payload)
            val station = json.optJSONObject("station")
            val nowPlaying = json.optJSONObject("now_playing")
            val song = nowPlaying?.optJSONObject("song")

            RadioNowPlaying(
                title = song?.optStringOrNull("title"),
                artist = song?.optStringOrNull("artist") ?: DEFAULT_RADIO_ARTIST,
                stationName = station?.optStringOrNull("name") ?: DEFAULT_STATION,
                artUrl = song?.optStringOrNull("art")
            )
        } catch (error: Exception) {
            Log.w(TAG, "Now playing fetch failed", error)
            null
        } finally {
            runCatching { connection.inputStream?.closeQuietly() }
            runCatching { connection.errorStream?.closeQuietly() }
            connection.disconnect()
        }
    }

    private fun applyNowPlaying(nowPlaying: RadioNowPlaying) {
        radioMetadataLoading = nowPlaying.title.isNullOrBlank()
        radioSongTitle = nowPlaying.title ?: DEFAULT_RADIO_TITLE
        radioArtist = nowPlaying.artist
        radioStationName = nowPlaying.stationName

        if (nowPlaying.artUrl != radioArtUrl) {
            radioArtUrl = nowPlaying.artUrl
            lifecycleScope.launch {
                radioArtBitmap = fetchBitmap(nowPlaying.artUrl)
            }
        }
    }

    private suspend fun fetchBitmap(url: String?): Bitmap? = withContext(Dispatchers.IO) {
        if (url.isNullOrBlank()) {
            return@withContext null
        }

        val connection = try {
            URL(url).openConnection() as HttpURLConnection
        } catch (error: IOException) {
            Log.w(TAG, "Album art open failed", error)
            return@withContext null
        }

        try {
            connection.connectTimeout = 8_000
            connection.readTimeout = 8_000
            connection.instanceFollowRedirects = true
            connection.setRequestProperty("User-Agent", USER_AGENT)
            connection.connect()

            if (connection.responseCode !in 200..299) {
                return@withContext null
            }

            connection.inputStream.use { stream ->
                BitmapFactory.decodeStream(stream)
            }
        } catch (error: Exception) {
            Log.w(TAG, "Album art fetch failed", error)
            null
        } finally {
            runCatching { connection.inputStream?.closeQuietly() }
            runCatching { connection.errorStream?.closeQuietly() }
            connection.disconnect()
        }
    }

    private fun refreshNetworkStatus() {
        val connectivityManager = getSystemService(ConnectivityManager::class.java)
        val capabilities = connectivityManager?.getNetworkCapabilities(connectivityManager.activeNetwork)

        networkText = when {
            capabilities == null -> "Sin red activa"
            !capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET) ->
                "Sin capacidad INTERNET"

            capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED) ->
                "Red validada"

            else -> "Red no validada"
        }
    }

    private fun enableImmersiveMode() {
        val controller = WindowCompat.getInsetsController(window, window.decorView)
        controller.systemBarsBehavior =
            WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
        controller.hide(WindowInsetsCompat.Type.systemBars())
    }

    private fun loadDebugTestStream(): DebugTestStream? {
        if (!BuildConfig.DEBUG) {
            return null
        }

        val url = intent?.getStringExtra(EXTRA_DEBUG_TEST_URL)?.trim().orEmpty()
        if (url.isBlank()) {
            return null
        }

        val label = intent?.getStringExtra(EXTRA_DEBUG_TEST_LABEL)
            ?.trim()
            ?.takeIf { it.isNotBlank() }
            ?: DEFAULT_DEBUG_TEST_LABEL

        return DebugTestStream(label = label, url = url)
    }

    private fun PlaybackException.toReadableMessage(): String {
        val unknownHost = findCauseOfType<UnknownHostException>()
        if (unknownHost != null) {
            return "DNS/red no disponible (${unknownHost.message})"
        }

        val ioCause = findCauseOfType<IOException>()
        if (ioCause != null) {
            val detail = ioCause.message ?: errorCodeName
            return "$errorCodeName: $detail"
        }

        val rootCause = this.rootCause()
        val detail = rootCause.message ?: message ?: errorCodeName
        return "$errorCodeName: $detail"
    }

    private fun Throwable.rootCause(): Throwable {
        var current: Throwable = this
        while (current.cause != null && current.cause !== current) {
            current = current.cause!!
        }
        return current
    }

    private inline fun <reified T : Throwable> Throwable.findCauseOfType(): T? {
        var current: Throwable? = this
        while (current != null) {
            if (current is T) {
                return current
            }
            current = current.cause
        }
        return null
    }
}

@Composable
private fun SplashScreen(durationMs: Long) {
    var splashPhase by remember { mutableStateOf(0) }

    LaunchedEffect(Unit) {
        splashPhase = 1
        delay((durationMs - 760L).coerceAtLeast(900L))
        splashPhase = 2
    }

    val glowAlpha by animateFloatAsState(
        targetValue = when (splashPhase) {
            0 -> 0f
            1 -> 1f
            else -> 0f
        },
        animationSpec = tween(900, easing = FastOutSlowInEasing),
        label = "splash_glow_alpha"
    )
    val glowScale by animateFloatAsState(
        targetValue = when (splashPhase) {
            0 -> 0.76f
            1 -> 1f
            else -> 1.14f
        },
        animationSpec = tween(1200, easing = FastOutSlowInEasing),
        label = "splash_glow_scale"
    )
    val logoAlpha by animateFloatAsState(
        targetValue = when (splashPhase) {
            0 -> 0f
            1 -> 1f
            else -> 0f
        },
        animationSpec = tween(820, easing = FastOutSlowInEasing),
        label = "splash_logo_alpha"
    )
    val logoScale by animateFloatAsState(
        targetValue = when (splashPhase) {
            0 -> 0.78f
            1 -> 1f
            else -> 1.07f
        },
        animationSpec = tween(920, easing = FastOutSlowInEasing),
        label = "splash_logo_scale"
    )
    val logoLift by animateFloatAsState(
        targetValue = when (splashPhase) {
            0 -> 22f
            1 -> 0f
            else -> -18f
        },
        animationSpec = tween(920, easing = FastOutSlowInEasing),
        label = "splash_logo_lift"
    )

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black),
        contentAlignment = Alignment.Center
    ) {
        Box(
            modifier = Modifier
                .size(420.dp)
                .graphicsLayer {
                    alpha = glowAlpha
                    scaleX = glowScale
                    scaleY = glowScale
                }
                .background(
                    Brush.radialGradient(
                        colors = listOf(
                            DangerGlow.copy(alpha = 0.28f),
                            Color.Transparent
                        )
                    ),
                    CircleShape
                )
        )

        Image(
            painter = painterResource(R.drawable.logo_main),
            contentDescription = "La Voz Salsa",
            modifier = Modifier
                .width(340.dp)
                .graphicsLayer {
                    alpha = logoAlpha
                    scaleX = logoScale
                    scaleY = logoScale
                    translationY = logoLift
                },
            contentScale = ContentScale.Fit
        )
    }
}

@Composable
private fun HomeScreen(
    selected: MainActivity.HomeOption,
    onFocused: (MainActivity.HomeOption) -> Unit,
    onOpenRadio: () -> Unit,
    onOpenLive: () -> Unit
) {
    val radioFocusRequester = remember { FocusRequester() }
    val liveFocusRequester = remember { FocusRequester() }

    LaunchedEffect(selected) {
        delay(120)
        when (selected) {
            MainActivity.HomeOption.RADIO -> radioFocusRequester.requestFocus()
            MainActivity.HomeOption.LIVE -> liveFocusRequester.requestFocus()
        }
    }

    BoxWithConstraints(modifier = Modifier.fillMaxSize()) {
        val widthScale = maxWidth.value / 1920f
        val heightScale = maxHeight.value / 1080f
        val textScale = min(widthScale, heightScale)

        fun w(value: Float) = (value * widthScale).dp
        fun h(value: Float) = (value * heightScale).dp
        fun s(value: Float) = (value * textScale).sp

        val safeLeft = w(88f)
        val safeRight = w(88f)
        val safeTop = h(38f)
        val safeBottom = h(84f)

        val panelStart = w(64f)
        val panelBottom = h(60f)
        val panelWidth = w(900f)
        val panelHeight = h(226f)

        val accentStart = w(118f)
        val accentBottom = h(46f)
        val accentWidth = w(760f)
        val accentHeight = h(6f)

        val menuGap = w(22f)
        val buttonWidth = w(384f)
        val buttonHeight = h(182f)
        val menuTitleSize = s(50f)
        val menuSubtitleSize = s(21f)
        val brandWidth = w(122f)

        Box(modifier = Modifier.fillMaxSize()) {
            EditorialBackground(
                overlayBrush = Brush.horizontalGradient(
                    listOf(
                        Color.Black.copy(alpha = 0.95f),
                        Color.Black.copy(alpha = 0.84f),
                        Color.Black.copy(alpha = 0.91f)
                    )
                )
            )

            TopBrand(
                logoRes = R.drawable.logo_small,
                width = brandWidth,
                modifier = Modifier
                    .align(Alignment.TopEnd)
                    .padding(top = safeTop, end = safeRight)
            )

            Box(
                modifier = Modifier
                    .align(Alignment.BottomStart)
                    .padding(start = panelStart, bottom = panelBottom)
                    .width(panelWidth)
                    .height(panelHeight)
                    .clip(RoundedCornerShape(36.dp))
                    .background(
                        Brush.verticalGradient(
                            listOf(
                                Color(0xD1121212),
                                Color(0xC6000000)
                            )
                        )
                    )
            )

            Box(
                modifier = Modifier
                    .align(Alignment.BottomStart)
                    .padding(start = accentStart, bottom = accentBottom)
                    .width(accentWidth)
                    .height(accentHeight)
                    .clip(RoundedCornerShape(999.dp))
                    .background(
                        Brush.horizontalGradient(
                            listOf(
                                Color.White.copy(alpha = 0.10f),
                                Color.White.copy(alpha = 0.82f),
                                Color.White.copy(alpha = 0.98f),
                                Color.White.copy(alpha = 0.82f),
                                Color.White.copy(alpha = 0.10f)
                            )
                        )
                    )
            )

            Row(
                modifier = Modifier
                    .align(Alignment.BottomStart)
                    .padding(start = safeLeft, bottom = safeBottom),
                horizontalArrangement = Arrangement.spacedBy(menuGap)
            ) {
                HomeMenuButton(
                    title = "RADIO",
                    subtitle = "24/7 Salsa en vivo",
                    focusRequester = radioFocusRequester,
                    focused = selected == MainActivity.HomeOption.RADIO,
                    onFocused = { onFocused(MainActivity.HomeOption.RADIO) },
                    onClick = onOpenRadio,
                    buttonWidth = buttonWidth,
                    buttonHeight = buttonHeight,
                    titleFontSize = menuTitleSize,
                    subtitleFontSize = menuSubtitleSize
                )

                HomeMenuButton(
                    title = "LIVE",
                    subtitle = "Transmisión en vivo",
                    focusRequester = liveFocusRequester,
                    focused = selected == MainActivity.HomeOption.LIVE,
                    onFocused = { onFocused(MainActivity.HomeOption.LIVE) },
                    onClick = onOpenLive,
                    buttonWidth = buttonWidth,
                    buttonHeight = buttonHeight,
                    titleFontSize = menuTitleSize,
                    subtitleFontSize = menuSubtitleSize
                )
            }
        }
    }
}

@Composable
private fun HomeMenuButton(
    title: String,
    subtitle: String,
    focusRequester: FocusRequester,
    focused: Boolean,
    onFocused: () -> Unit,
    onClick: () -> Unit,
    buttonWidth: androidx.compose.ui.unit.Dp,
    buttonHeight: androidx.compose.ui.unit.Dp,
    titleFontSize: TextUnit,
    subtitleFontSize: TextUnit
) {
    val innerInset = buttonWidth * 0.02f
    val glowHorizontalInset = buttonWidth * 0.08f
    val glowBottomInset = buttonHeight * 0.10f
    val contentHorizontal = buttonWidth * 0.085f
    val contentVertical = buttonHeight * 0.16f

    Surface(
        modifier = Modifier
            .width(buttonWidth)
            .height(buttonHeight)
            .focusRequester(focusRequester)
            .onFocusChanged {
                if (it.isFocused) {
                    onFocused()
                }
            }
            .focusable()
            .clickable(
                interactionSource = remember { MutableInteractionSource() },
                indication = null,
                onClick = onClick
            ),
        shape = RoundedCornerShape(28.dp),
        color = Color.Transparent,
        border = BorderStroke(
            width = if (focused) 2.4.dp else 1.8.dp,
            color = if (focused) Color.White.copy(alpha = 0.98f) else Color.White.copy(alpha = 0.18f)
        )
    ) {
        Box(modifier = Modifier.fillMaxSize()) {
            Box(
                modifier = Modifier
                    .matchParentSize()
                    .padding(innerInset)
                    .clip(RoundedCornerShape(20.dp))
                    .background(
                        Brush.linearGradient(
                            listOf(
                                DangerGlow.copy(alpha = if (focused) 0.34f else 0.18f),
                                Color.Transparent
                            )
                        )
                    )
            )

            if (focused) {
                val pulse by rememberInfiniteTransition(label = "home_pulse").animateFloat(
                    initialValue = 0.52f,
                    targetValue = 1f,
                    animationSpec = infiniteRepeatable(
                        animation = tween(1800, easing = FastOutSlowInEasing),
                        repeatMode = RepeatMode.Reverse
                    ),
                    label = "home_button_pulse"
                )

                Box(
                    modifier = Modifier
                        .align(Alignment.BottomCenter)
                        .padding(horizontal = glowHorizontalInset, vertical = glowBottomInset)
                        .fillMaxWidth()
                        .height(4.dp)
                        .alpha(pulse)
                        .clip(RoundedCornerShape(999.dp))
                        .background(
                            Brush.horizontalGradient(
                                listOf(
                                    DangerGlow.copy(alpha = 0.18f),
                                    AccentWarm.copy(alpha = 0.95f),
                                    Color.White.copy(alpha = 0.45f),
                                    AccentWarm.copy(alpha = 0.95f),
                                    DangerGlow.copy(alpha = 0.18f)
                                )
                            )
                        )
                )
            }

            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(horizontal = contentHorizontal, vertical = contentVertical),
                verticalArrangement = Arrangement.Center
            ) {
                Text(
                    text = title,
                    color = WarmWhite,
                    fontSize = titleFontSize,
                    fontWeight = FontWeight.ExtraBold
                )
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = subtitle,
                    color = SoftText,
                    fontSize = subtitleFontSize,
                    lineHeight = subtitleFontSize * 1.25f
                )
            }
        }
    }
}

@Composable
private fun RadioScreen(
    title: String,
    artist: String,
    loading: Boolean,
    playing: Boolean,
    artBitmap: Bitmap?,
    radioFontFamily: FontFamily
) {
    BoxWithConstraints(modifier = Modifier.fillMaxSize()) {
        val widthScale = maxWidth.value / 1920f
        val heightScale = maxHeight.value / 1080f
        val textScale = min(widthScale, heightScale)

        fun w(value: Float) = (value * widthScale).dp
        fun h(value: Float) = (value * heightScale).dp
        fun s(value: Float) = (value * textScale).sp

        val safeLeft = w(92f)
        val safeRight = w(88f)
        val safeTop = h(112f)
        val safeBottom = h(96f)
        val brandTop = h(36f)
        val brandWidth = w(122f)
        val layoutGap = w(64f)
        val artSizeByWidth = w(470f)
        val artSizeByHeight = h(470f)
        val artSize = if (artSizeByWidth < artSizeByHeight) artSizeByWidth else artSizeByHeight
        val infoWidth = w(820f)

        val badgeFontSize = s(16f)
        val sectionTitleSize = s(32f)
        val songTitleSize = s(60f)
        val songTitleLineHeight = s(62f)
        val artistSize = s(34f)
        val pillFontSize = s(17f)
        val visualizerHeight = h(70f)
        val visualizerGap = w(8f)
        val visualizerBarWidth = w(8f)
        val badgeBottomSpace = h(16f)
        val sectionBottomSpace = h(12f)
        val artistBottomSpace = h(20f)
        val pillTopSpace = h(24f)

        Box(modifier = Modifier.fillMaxSize()) {
            RadioBackground(artBitmap = artBitmap)

            TopBrand(
                logoRes = R.drawable.logo_radio_small,
                width = brandWidth,
                modifier = Modifier
                    .align(Alignment.TopEnd)
                    .padding(top = brandTop, end = safeRight)
            )

            Row(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(start = safeLeft, top = safeTop, end = safeRight, bottom = safeBottom),
                horizontalArrangement = Arrangement.spacedBy(layoutGap),
                verticalAlignment = Alignment.CenterVertically
            ) {
                AlbumArtCard(
                    artBitmap = artBitmap,
                    modifier = Modifier.size(artSize),
                    cornerRadius = w(28f)
                )

                Column(
                    modifier = Modifier.widthIn(max = infoWidth),
                    verticalArrangement = Arrangement.Center
                ) {
                    LiveBadge(
                        fontSize = badgeFontSize,
                        dotSize = w(9f),
                        horizontalPadding = w(18f),
                        verticalPadding = h(7f),
                        cornerRadius = w(14f)
                    )
                    Spacer(modifier = Modifier.height(badgeBottomSpace))

                    Text(
                        text = "LAVOZSALSA",
                        color = WarmWhite,
                        fontSize = sectionTitleSize,
                        fontFamily = radioFontFamily,
                        fontWeight = FontWeight.Black
                    )

                    Spacer(modifier = Modifier.height(sectionBottomSpace))

                    if (loading) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(14.dp)
                        ) {
                            CircularProgressIndicator(
                                modifier = Modifier.size(w(24f)),
                                color = WarmWhite,
                                strokeWidth = 3.dp
                            )
                        }
                        Spacer(modifier = Modifier.height(18.dp))
                    } else {
                        Text(
                            text = title,
                            color = WarmWhite,
                            fontSize = songTitleSize,
                            lineHeight = songTitleLineHeight,
                            fontWeight = FontWeight.ExtraBold,
                            maxLines = 2,
                            overflow = TextOverflow.Ellipsis
                        )
                        Spacer(modifier = Modifier.height(6.dp))
                    }

                    Text(
                        text = artist,
                        color = SoftText,
                        fontSize = artistSize,
                        fontWeight = FontWeight.SemiBold,
                        maxLines = 2,
                        overflow = TextOverflow.Ellipsis
                    )

                    Spacer(modifier = Modifier.height(artistBottomSpace))

                    ElegantVisualizer(
                        isAnimating = loading || playing,
                        visualizerHeight = visualizerHeight,
                        barWidth = visualizerBarWidth,
                        barGap = visualizerGap
                    )

                    Spacer(modifier = Modifier.height(pillTopSpace))

                    MetaPill(
                        text = "Señal Digital",
                        fontSize = pillFontSize,
                        horizontalPadding = w(22f),
                        verticalPadding = h(8f),
                        cornerRadius = w(14f)
                    )
                }
            }
        }
    }
}

@Composable
private fun LiveScreen(
    uiState: MainActivity.LiveUiState,
    stateText: String,
    hintText: String
) {
    Box(modifier = Modifier.fillMaxSize()) {
        if (uiState != MainActivity.LiveUiState.PLAYER) {
            EditorialBackground(
                overlayBrush = Brush.verticalGradient(
                    listOf(
                        Color.Black.copy(alpha = 0.22f),
                        Color.Black.copy(alpha = 0.86f)
                    )
                )
            )

            TopBrand(
                logoRes = R.drawable.logo_small,
                modifier = Modifier
                    .align(Alignment.TopEnd)
                    .padding(top = 40.dp, end = 96.dp)
            )
        }

        if (uiState != MainActivity.LiveUiState.PLAYER) {
            val cardAlpha by animateFloatAsState(
                targetValue = 1f,
                animationSpec = tween(760, easing = FastOutSlowInEasing),
                label = "live_card_alpha"
            )
            val cardScale by animateFloatAsState(
                targetValue = 1f,
                animationSpec = tween(760, easing = FastOutSlowInEasing),
                label = "live_card_scale"
            )

            Surface(
                modifier = Modifier
                    .align(Alignment.Center)
                    .width(640.dp)
                    .graphicsLayer {
                        alpha = cardAlpha
                        scaleX = 0.965f + (0.035f * cardScale)
                        scaleY = 0.965f + (0.035f * cardScale)
                    },
                shape = RoundedCornerShape(34.dp),
                color = Color.White.copy(alpha = 0.08f),
                border = BorderStroke(1.dp, Color.White.copy(alpha = 0.16f))
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 48.dp, vertical = 40.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    if (uiState == MainActivity.LiveUiState.LOADING) {
                        CircularProgressIndicator(
                            modifier = Modifier.size(40.dp),
                            color = WarmWhite,
                            strokeWidth = 3.dp
                        )
                        Spacer(modifier = Modifier.height(22.dp))
                    }

                    Text(
                        text = "LIVE",
                        color = WarmWhite,
                        fontSize = 46.sp,
                        fontWeight = FontWeight.ExtraBold
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    Text(
                        text = stateText,
                        color = SoftText,
                        fontSize = 22.sp,
                        lineHeight = 28.sp
                    )

                    if (uiState == MainActivity.LiveUiState.UNAVAILABLE) {
                        Spacer(modifier = Modifier.height(18.dp))
                        Text(
                            text = hintText,
                            color = SoftText.copy(alpha = 0.72f),
                            fontSize = 16.sp
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun EditorialBackground(overlayBrush: Brush) {
    Box(modifier = Modifier.fillMaxSize()) {
        Image(
            painter = painterResource(R.drawable.tizen_bg),
            contentDescription = null,
            modifier = Modifier.fillMaxSize(),
            contentScale = ContentScale.Crop
        )
        Box(
            modifier = Modifier
                .matchParentSize()
                .background(overlayBrush)
        )
    }
}

@Composable
private fun RadioBackground(artBitmap: Bitmap?) {
    Box(modifier = Modifier.fillMaxSize()) {
        if (artBitmap != null) {
            Image(
                bitmap = artBitmap.asImageBitmap(),
                contentDescription = null,
                modifier = Modifier
                    .fillMaxSize()
                    .graphicsLayer {
                        scaleX = 1.06f
                        scaleY = 1.06f
                    }
                    .alpha(0.14f),
                contentScale = ContentScale.Crop
            )
        } else {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(DeepBackground)
            )
        }

        Box(
            modifier = Modifier
                .matchParentSize()
                .background(
                    Brush.radialGradient(
                        colors = listOf(
                            DangerGlow.copy(alpha = 0.18f),
                            Color.Black.copy(alpha = 0.93f)
                        )
                    )
                )
        )
    }
}

@Composable
private fun TopBrand(
    logoRes: Int,
    modifier: Modifier = Modifier,
    width: androidx.compose.ui.unit.Dp = 104.dp
) {
    Image(
        painter = painterResource(logoRes),
        contentDescription = "La Voz Salsa",
        modifier = modifier.width(width),
        contentScale = ContentScale.Fit
    )
}

@Composable
private fun AlbumArtCard(
    artBitmap: Bitmap?,
    modifier: Modifier = Modifier,
    cornerRadius: androidx.compose.ui.unit.Dp = 30.dp
) {
    Surface(
        modifier = modifier,
        shape = RoundedCornerShape(cornerRadius),
        color = Color.White.copy(alpha = 0.06f),
        border = BorderStroke(1.dp, Color.White.copy(alpha = 0.10f))
    ) {
        if (artBitmap != null) {
            Image(
                bitmap = artBitmap.asImageBitmap(),
                contentDescription = "Carátula",
                modifier = Modifier.fillMaxSize(),
                contentScale = ContentScale.Crop
            )
        } else {
            Image(
                painter = painterResource(R.drawable.logo_radio_small),
                contentDescription = "La Voz Salsa Radio",
                modifier = Modifier
                    .fillMaxSize()
                    .padding(24.dp),
                contentScale = ContentScale.Fit
            )
        }
    }
}

@Composable
private fun LiveBadge(
    fontSize: TextUnit = 14.sp,
    dotSize: androidx.compose.ui.unit.Dp = 10.dp,
    horizontalPadding: androidx.compose.ui.unit.Dp = 14.dp,
    verticalPadding: androidx.compose.ui.unit.Dp = 8.dp,
    cornerRadius: androidx.compose.ui.unit.Dp = 16.dp
) {
    Row(
        modifier = Modifier
            .clip(RoundedCornerShape(cornerRadius))
            .background(DangerGlow.copy(alpha = 0.16f))
            .padding(horizontal = horizontalPadding, vertical = verticalPadding),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        val pulse by rememberInfiniteTransition(label = "live_badge").animateFloat(
            initialValue = 1f,
            targetValue = 1.18f,
            animationSpec = infiniteRepeatable(
                animation = tween(1700, easing = FastOutSlowInEasing),
                repeatMode = RepeatMode.Reverse
            ),
            label = "live_badge_pulse"
        )

        Box(
            modifier = Modifier
                .size(dotSize)
                .graphicsLayer {
                    scaleX = pulse
                    scaleY = pulse
                }
                .background(Color(0xFFFF2D2D), CircleShape)
        )

        Text(
            text = "AL AIRE",
            color = WarmWhite,
            fontSize = fontSize,
            fontWeight = FontWeight.Bold
        )
    }
}

@Composable
private fun MetaPill(
    text: String,
    fontSize: TextUnit = 18.sp,
    horizontalPadding: androidx.compose.ui.unit.Dp = 20.dp,
    verticalPadding: androidx.compose.ui.unit.Dp = 12.dp,
    cornerRadius: androidx.compose.ui.unit.Dp = 16.dp
) {
    Surface(
        shape = RoundedCornerShape(cornerRadius),
        color = Color.White.copy(alpha = 0.14f),
        border = BorderStroke(1.dp, Color.White.copy(alpha = 0.18f))
    ) {
        Text(
            text = text,
            color = WarmWhite,
            fontSize = fontSize,
            fontWeight = FontWeight.SemiBold,
            modifier = Modifier.padding(horizontal = horizontalPadding, vertical = verticalPadding)
        )
    }
}

@Composable
private fun ElegantVisualizer(
    isAnimating: Boolean,
    visualizerHeight: androidx.compose.ui.unit.Dp = 64.dp,
    barWidth: androidx.compose.ui.unit.Dp = 8.dp,
    barGap: androidx.compose.ui.unit.Dp = 8.dp
) {
    val transition = rememberInfiniteTransition(label = "radio_visualizer")
    val offsets = listOf(0, 120, 220, 340, 460, 600, 180, 420, 260, 520, 140, 380)

    Row(
        horizontalArrangement = Arrangement.spacedBy(barGap),
        verticalAlignment = Alignment.Bottom,
        modifier = Modifier.height(visualizerHeight)
    ) {
        offsets.forEachIndexed { index, offset ->
            val factor by transition.animateFloat(
                initialValue = 0.22f,
                targetValue = 1f,
                animationSpec = infiniteRepeatable(
                    animation = tween(
                        durationMillis = 1080 + (index * 34),
                        easing = FastOutSlowInEasing
                    ),
                    repeatMode = RepeatMode.Reverse,
                    initialStartOffset = StartOffset(offset)
                ),
                label = "bar_$index"
            )

            val barHeight = if (isAnimating) 12.dp + (40.dp * factor) else 12.dp
            Box(
                modifier = Modifier
                    .width(barWidth)
                    .height(barHeight)
                    .clip(RoundedCornerShape(999.dp))
                    .background(
                        Brush.verticalGradient(
                            listOf(
                                Color.White.copy(alpha = 0.96f),
                                Color.White.copy(alpha = 0.70f),
                                AccentWarm.copy(alpha = 0.98f),
                                Color(0x33500000)
                            )
                        )
                    )
            )
        }
    }
}

private operator fun androidx.compose.ui.unit.Dp.times(multiplier: Float): androidx.compose.ui.unit.Dp =
    (value * multiplier).dp

private fun JSONObject.optStringOrNull(key: String): String? =
    optString(key).trim().takeIf { it.isNotBlank() && it.lowercase() != "null" }

private fun java.io.InputStream.closeQuietly() {
    runCatching { close() }
}
