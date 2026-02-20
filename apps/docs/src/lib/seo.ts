const FALLBACK_SITE_URL = "https://glinui.com"

function normalizeSiteUrl(value?: string) {
  if (!value) return FALLBACK_SITE_URL
  const trimmed = value.trim()
  if (!trimmed) return FALLBACK_SITE_URL
  return trimmed.replace(/\/+$/g, "")
}

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)
export const SITE_NAME = "Glin UI"
export const SITE_TITLE = "Glin UI — Liquid Glass React Components"
export const SITE_DESCRIPTION =
  "Production-grade liquid glass React components with Radix accessibility, Tailwind styling, and motion-safe defaults by GLINR STUDIO."
export const SITE_LOCALE = "en_US"
export const ORGANIZATION_NAME = "GLINR STUDIO"
export const ORGANIZATION_HANDLE = "@glincker"
export const ORGANIZATION_GITHUB_URL = "https://github.com/GLINCKER/glinui"
export const DEFAULT_OG_IMAGE_PATH = "/opengraph-image.png"
export const DEFAULT_KEYWORDS = [
  "react component library",
  "next.js ui components",
  "glassmorphism",
  "liquid glass ui",
  "radix ui components",
  "radix ui react components",
  "tailwind css components",
  "typescript design system",
  "accessible ui components",
  "motion design system",
  "frontend ui toolkit",
  "shadcn ui alternative",
  "magic ui alternative",
  "glassmorphism react components",
  "react ui library"
]

export function createAbsoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}

export function isLocalSiteUrl(url: string) {
  return /localhost|127\.0\.0\.1/.test(url)
}
