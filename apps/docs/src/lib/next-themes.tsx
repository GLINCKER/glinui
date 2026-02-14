"use client"

import * as React from "react"

type Theme = "light" | "dark" | "system"

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: "light" | "dark"
  systemTheme: "light" | "dark"
}

type ThemeProviderProps = {
  children: React.ReactNode
  attribute?: "class"
  defaultTheme?: Theme
  enableSystem?: boolean
  storageKey?: string
  disableTransitionOnChange?: boolean
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

const QUERY = "(prefers-color-scheme: dark)"

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  storageKey = "glinr-docs-theme"
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)
  const [systemTheme, setSystemTheme] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const mediaQuery = window.matchMedia(QUERY)
    const updateSystemTheme = () => {
      setSystemTheme(mediaQuery.matches ? "dark" : "light")
    }

    updateSystemTheme()

    const stored = window.localStorage.getItem(storageKey)
    if (stored === "light" || stored === "dark" || stored === "system") {
      setThemeState(stored)
    } else {
      setThemeState(defaultTheme)
    }

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateSystemTheme)
      return () => mediaQuery.removeEventListener("change", updateSystemTheme)
    }

    mediaQuery.addListener(updateSystemTheme)
    return () => mediaQuery.removeListener(updateSystemTheme)
  }, [defaultTheme, storageKey])

  const resolvedTheme: "light" | "dark" =
    theme === "system" ? (enableSystem ? systemTheme : "light") : theme

  React.useEffect(() => {
    if (typeof document === "undefined") {
      return
    }

    if (attribute === "class") {
      document.documentElement.classList.toggle("dark", resolvedTheme === "dark")
    }
  }, [attribute, resolvedTheme])

  const setTheme = React.useCallback(
    (nextTheme: Theme) => {
      setThemeState(nextTheme)
      if (typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, nextTheme)
      }
    },
    [storageKey]
  )

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      resolvedTheme,
      systemTheme
    }),
    [resolvedTheme, setTheme, systemTheme, theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }

  return context
}
