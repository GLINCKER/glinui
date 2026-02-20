"use client"

import { useEffect, useState } from "react"

type Mode = "light" | "dark"

const STORAGE_KEY = "glinui-docs-theme"

export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("light")

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === "light" || stored === "dark") {
      setMode(stored)
      document.documentElement.classList.toggle("dark", stored === "dark")
      return
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const nextMode: Mode = prefersDark ? "dark" : "light"
    setMode(nextMode)
    document.documentElement.classList.toggle("dark", prefersDark)
  }, [])

  const toggle = () => {
    const nextMode: Mode = mode === "light" ? "dark" : "light"
    setMode(nextMode)
    document.documentElement.classList.toggle("dark", nextMode === "dark")
    window.localStorage.setItem(STORAGE_KEY, nextMode)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-md border border-border bg-surface px-3 py-2 text-sm shadow-soft transition-all duration-fast ease-standard hover:shadow-elevated"
      aria-label="Toggle light and dark mode"
    >
      Theme: {mode === "light" ? "Light" : "Dark"}
    </button>
  )
}
