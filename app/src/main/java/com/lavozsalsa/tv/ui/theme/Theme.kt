package com.lavozsalsa.tv.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable

private val LaVozSalsaColorScheme = darkColorScheme(
    primary = AccentWarm,
    onPrimary = WarmWhite,
    secondary = SoftText,
    onSecondary = DeepBackground,
    tertiary = DangerGlow,
    background = DeepBackground,
    onBackground = WarmWhite,
    surface = CardSurface,
    onSurface = WarmWhite,
    surfaceVariant = CardSurfaceStrong,
    onSurfaceVariant = SoftText,
    outline = CardBorder
)

@Composable
fun LaVozSalsaTVTheme(
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = LaVozSalsaColorScheme,
        typography = Typography,
        content = content
    )
}
