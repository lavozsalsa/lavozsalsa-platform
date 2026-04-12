package com.lavozsalsa.tv.analytics

import android.content.Context
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.os.Build
import android.util.Log
import com.lavozsalsa.tv.BuildConfig
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL
import java.util.UUID
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.delay
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import org.json.JSONObject

class AnalyticsTracker(context: Context) {

    companion object {
        private const val TAG = "LVSAnalytics"
        private const val PREFS_NAME = "lavozsalsa_analytics"
        private const val PREF_DEVICE_ID = "device_id"
        private const val HEARTBEAT_INTERVAL_MS = 60_000L
        private const val REQUEST_TIMEOUT_MS = 8_000
        private const val PLATFORM = "android_tv"
    }

    private data class ActiveSession(
        val sessionId: String,
        val deviceId: String,
        val streamType: String,
        val startedAtMs: Long,
        var playbackState: String
    )

    private val appContext = context.applicationContext
    private val ioScope = CoroutineScope(SupervisorJob() + Dispatchers.IO)
    private val prefs by lazy {
        appContext.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
    }
    private val analyticsUrl = BuildConfig.ANALYTICS_ENDPOINT.trim().trimEnd('/')
    private val ingestKey = BuildConfig.ANALYTICS_INGEST_KEY.trim()
    private val appVersion by lazy {
        runCatching {
            appContext.packageManager.getPackageInfo(appContext.packageName, 0).versionName
        }.getOrNull().orEmpty().ifBlank { "unknown" }
    }

    private var activeSession: ActiveSession? = null
    private var heartbeatJob: Job? = null

    fun startSession(streamType: String, extraDetails: Map<String, Any?> = emptyMap()) {
        if (!isEnabled()) {
            return
        }

        endSession(reason = "session_replaced")

        val session = ActiveSession(
            sessionId = UUID.randomUUID().toString(),
            deviceId = getOrCreateDeviceId(),
            streamType = streamType,
            startedAtMs = System.currentTimeMillis(),
            playbackState = "starting"
        )

        activeSession = session
        sendEvent(
            eventType = "session_started",
            session = session,
            details = extraDetails + mapOf(
                "deviceManufacturer" to Build.MANUFACTURER,
                "deviceModel" to Build.MODEL
            )
        )
        startHeartbeatLoop()
    }

    fun markBuffering(streamTypeOverride: String? = null) {
        val session = activeSession ?: return
        streamTypeOverride?.let {
            activeSession = session.copy(streamType = it, playbackState = "buffering")
        } ?: run {
            session.playbackState = "buffering"
        }

        sendEvent(
            eventType = "playback_buffering",
            session = activeSession ?: session
        )
    }

    fun markPlaybackReady(streamTypeOverride: String? = null) {
        val session = activeSession ?: return
        streamTypeOverride?.let {
            activeSession = session.copy(streamType = it, playbackState = "playing")
        } ?: run {
            session.playbackState = "playing"
        }

        sendEvent(
            eventType = "playback_ready",
            session = activeSession ?: session
        )
    }

    fun reportError(errorCode: String?, errorMessage: String) {
        val session = activeSession ?: return
        session.playbackState = "error"

        sendEvent(
            eventType = "playback_error",
            session = session,
            errorCode = errorCode,
            errorMessage = errorMessage
        )
    }

    fun endSession(reason: String) {
        val session = activeSession ?: return
        activeSession = null
        heartbeatJob?.cancel()
        heartbeatJob = null

        sendEvent(
            eventType = "session_ended",
            session = session,
            details = mapOf(
                "reason" to reason,
                "startedAtMs" to session.startedAtMs
            )
        )
    }

    private fun isEnabled(): Boolean = analyticsUrl.isNotBlank()

    private fun getOrCreateDeviceId(): String {
        val existing = prefs.getString(PREF_DEVICE_ID, null)?.trim().orEmpty()
        if (existing.isNotEmpty()) {
            return existing
        }

        val generated = UUID.randomUUID().toString()
        prefs.edit().putString(PREF_DEVICE_ID, generated).apply()
        return generated
    }

    private fun startHeartbeatLoop() {
        heartbeatJob?.cancel()
        heartbeatJob = ioScope.launch {
            while (isActive) {
                delay(HEARTBEAT_INTERVAL_MS)
                val session = activeSession ?: break
                sendEvent(
                    eventType = "heartbeat",
                    session = session
                )
            }
        }
    }

    private fun sendEvent(
        eventType: String,
        session: ActiveSession,
        errorCode: String? = null,
        errorMessage: String? = null,
        details: Map<String, Any?> = emptyMap()
    ) {
        if (!isEnabled()) {
            return
        }

        ioScope.launch {
            runCatching {
                val payload = JSONObject().apply {
                    put("eventId", UUID.randomUUID().toString())
                    put("sessionId", session.sessionId)
                    put("deviceId", session.deviceId)
                    put("platform", PLATFORM)
                    put("appVersion", appVersion)
                    put("streamType", session.streamType)
                    put("eventType", eventType)
                    put("playbackState", session.playbackState)
                    put("clientTimestamp", System.currentTimeMillis())
                    put("networkType", resolveNetworkType())
                    if (!errorCode.isNullOrBlank()) {
                        put("errorCode", errorCode)
                    }
                    if (!errorMessage.isNullOrBlank()) {
                        put("errorMessage", errorMessage)
                    }
                    put("details", JSONObject().apply {
                        details.forEach { (key, value) ->
                            when (value) {
                                null -> put(key, JSONObject.NULL)
                                is Number,
                                is Boolean,
                                is String -> put(key, value)
                                else -> put(key, value.toString())
                            }
                        }
                    })
                }

                val connection = URL("$analyticsUrl/api/v1/events").openConnection() as HttpURLConnection
                try {
                    connection.requestMethod = "POST"
                    connection.connectTimeout = REQUEST_TIMEOUT_MS
                    connection.readTimeout = REQUEST_TIMEOUT_MS
                    connection.doOutput = true
                    connection.setRequestProperty("Content-Type", "application/json; charset=utf-8")
                    if (ingestKey.isNotBlank()) {
                        connection.setRequestProperty("X-Ingest-Key", ingestKey)
                    }

                    OutputStreamWriter(connection.outputStream, Charsets.UTF_8).use { writer ->
                        writer.write(payload.toString())
                    }

                    connection.responseCode
                    connection.inputStream?.close()
                    connection.errorStream?.close()
                } finally {
                    connection.disconnect()
                }
            }.onFailure { error ->
                Log.w(TAG, "Analytics send failed for $eventType", error)
            }
        }
    }

    private fun resolveNetworkType(): String {
        val connectivityManager = appContext.getSystemService(ConnectivityManager::class.java)
        val capabilities = connectivityManager?.getNetworkCapabilities(connectivityManager.activeNetwork)
            ?: return "offline"

        return when {
            capabilities.hasTransport(NetworkCapabilities.TRANSPORT_ETHERNET) -> "ethernet"
            capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) -> "wifi"
            capabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) -> "cellular"
            capabilities.hasTransport(NetworkCapabilities.TRANSPORT_BLUETOOTH) -> "bluetooth"
            else -> "connected"
        }
    }
}
