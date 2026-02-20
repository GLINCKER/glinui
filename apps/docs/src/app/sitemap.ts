import type { MetadataRoute } from "next"

import { generatedRegistryItems } from "@/lib/generated-registry-metadata"
import { DEFAULT_DOCS_IMPLEMENTATION } from "@/lib/docs-config"
import { SITE_URL } from "@/lib/seo"

export const dynamic = "force-static"

const staticRoutes = [
  "/",
  "/docs",
  "/docs/getting-started",
  "/docs/components",
  "/docs/accessibility",
  "/docs/forms-accessibility",
  "/docs/forms-recipes",
  "/docs/screen-reader-testing",
  "/docs/focus-management",
  "/docs/color-contrast",
  "/docs/tokens",
  "/docs/motion",
  "/docs/glass-physics",
  "/docs/api-metadata"
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const urls: MetadataRoute.Sitemap = []
  const seen = new Set<string>()

  for (const route of staticRoutes) {
    seen.add(route)
    urls.push({
      url: `${SITE_URL}${route}`,
      lastModified: now,
      changeFrequency: route === "/" ? "weekly" : "monthly",
      priority: route === "/" ? 1 : route === "/docs/components" ? 0.9 : 0.8
    })
  }

  for (const item of generatedRegistryItems) {
    const route =
      item.type === "signature"
        ? item.docsPath
        : `/docs/components/${DEFAULT_DOCS_IMPLEMENTATION}/${item.name}`

    if (seen.has(route)) {
      continue
    }

    seen.add(route)
    urls.push({
      url: `${SITE_URL}${route}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75
    })
  }

  return urls
}
