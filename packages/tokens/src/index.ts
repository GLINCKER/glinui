export type ThemeMode = "light" | "dark"

export const colorTokens = {
  light: {
    background: "oklch(0.985 0.002 240)",
    foreground: "oklch(0.23 0.01 248)",
    surface: "oklch(0.997 0.002 245)",
    border: "oklch(0.89 0.01 246)",
    accent: "oklch(0.63 0.19 254)",
    accentForeground: "oklch(0.99 0.003 240)"
  },
  dark: {
    background: "oklch(0.18 0.01 250)",
    foreground: "oklch(0.95 0.01 247)",
    surface: "oklch(0.23 0.01 250)",
    border: "oklch(0.34 0.01 250)",
    accent: "oklch(0.74 0.19 252)",
    accentForeground: "oklch(0.15 0.01 252)"
  }
} as const

/**
 * Glass tokens — Apple Liquid Glass spec (WWDC 2025).
 *
 * Key principles:
 * - saturate(180%) always paired with blur
 * - Higher surface opacity than old glassmorphism (Apple Beta 3+)
 * - Dark mode significantly MORE opaque than light mode
 * - Top border brighter than sides (light refraction edge)
 * - 4.5:1 contrast ratio for text on glass (WCAG AA)
 */
export const glassTokens = {
  blur: {
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "40px"
  },
  saturate: {
    default: "180%",
    subtle: "130%"
  },
  surface: {
    light: "rgba(255, 255, 255, 0.18)",
    dark: "rgba(0, 0, 0, 0.40)"
  },
  border: {
    light: "rgba(255, 255, 255, 0.20)",
    dark: "rgba(255, 255, 255, 0.10)"
  },
  borderStrong: {
    light: "rgba(255, 255, 255, 0.35)",
    dark: "rgba(255, 255, 255, 0.18)"
  },
  refractionTop: {
    light: "rgba(255, 255, 255, 0.40)",
    dark: "rgba(255, 255, 255, 0.15)"
  }
} as const

export const radiusTokens = {
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.25rem",
  "2xl": "1.75rem"
} as const

export const spacingTokens = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
  "2xl": "2rem"
} as const

export const shadowTokens = {
  "glass-sm": "0 2px 8px rgba(0, 0, 0, 0.08)",
  "glass-md":
    "0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)",
  "glass-lg":
    "0 16px 48px rgba(0, 0, 0, 0.16), 0 4px 8px rgba(0, 0, 0, 0.08)",
  "glass-inset":
    "inset 0 1px 0 rgba(255, 255, 255, 0.12), inset 0 -1px 0 rgba(0, 0, 0, 0.05)"
} as const

/**
 * Composed glass elevation levels.
 * Each bundles blur + surface opacity + shadow.
 * CSS classes also apply saturate(180%) and refraction top border.
 */
export const glassLevelTokens = {
  "glass-1": {
    blur: "8px",
    opacity: { light: "0.08", dark: "0.20" },
    shadow: "glass-sm"
  },
  "glass-2": {
    blur: "12px",
    opacity: { light: "0.12", dark: "0.30" },
    shadow: "glass-sm"
  },
  "glass-3": {
    blur: "16px",
    opacity: { light: "0.18", dark: "0.40" },
    shadow: "glass-md"
  },
  "glass-4": {
    blur: "24px",
    opacity: { light: "0.25", dark: "0.55" },
    shadow: "glass-lg"
  },
  "glass-5": {
    blur: "40px",
    opacity: { light: "0.35", dark: "0.70" },
    shadow: "glass-lg"
  }
} as const

export const motionTokens = {
  duration: {
    fast: "150ms",
    normal: "250ms",
    slow: "400ms",
    spring: "500ms"
  },
  easing: {
    standard: "cubic-bezier(0.2, 0.0, 0.0, 1.0)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    glass: "cubic-bezier(0.4, 0.0, 0.2, 1.0)"
  }
} as const

export const tokenContract = {
  colorTokens,
  glassTokens,
  glassLevelTokens,
  radiusTokens,
  spacingTokens,
  shadowTokens,
  motionTokens
} as const
