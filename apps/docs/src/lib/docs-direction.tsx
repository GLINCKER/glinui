"use client"

import * as React from "react"

export type DocsDirection = "ltr" | "rtl"

type DocsDirectionContextValue = {
  direction: DocsDirection
  setDirection: (direction: DocsDirection) => void
}

const DocsDirectionContext = React.createContext<DocsDirectionContextValue | null>(null)
const STORAGE_KEY = "glinui:docs-direction"

export function DocsDirectionProvider({ children }: { children: React.ReactNode }) {
  const [direction, setDirection] = React.useState<DocsDirection>("ltr")

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === "rtl" || stored === "ltr") {
      setDirection(stored)
    }
  }, [])

  React.useEffect(() => {
    document.documentElement.setAttribute("dir", direction)
    document.documentElement.setAttribute("lang", direction === "rtl" ? "ar" : "en")
    window.localStorage.setItem(STORAGE_KEY, direction)
  }, [direction])

  return <DocsDirectionContext.Provider value={{ direction, setDirection }}>{children}</DocsDirectionContext.Provider>
}

export function useDocsDirection() {
  const context = React.useContext(DocsDirectionContext)
  if (!context) {
    throw new Error("useDocsDirection must be used inside DocsDirectionProvider")
  }
  return context
}
