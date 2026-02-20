import type { Metadata } from "next"

import {
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE_PATH,
  ORGANIZATION_HANDLE,
  ORGANIZATION_NAME,
  SITE_LOCALE,
  SITE_NAME
} from "@/lib/seo"

type DocsMetadataOptions = {
  title: string
  description: string
  path: string
  keywords?: string[]
  imagePath?: string
}

function normalizePath(path: string) {
  if (!path) return "/"
  return path.startsWith("/") ? path : `/${path}`
}

function mergeKeywords(keywords?: string[]) {
  return Array.from(new Set([...DEFAULT_KEYWORDS, ...(keywords ?? [])]))
}

export function createDocsMetadata({
  title,
  description,
  path,
  keywords,
  imagePath = DEFAULT_OG_IMAGE_PATH
}: DocsMetadataOptions): Metadata {
  const canonicalPath = normalizePath(path)
  const socialTitle = `${title} | ${SITE_NAME}`

  return {
    title,
    description,
    keywords: mergeKeywords(keywords),
    authors: [{ name: ORGANIZATION_NAME }],
    creator: ORGANIZATION_NAME,
    publisher: ORGANIZATION_NAME,
    alternates: {
      canonical: canonicalPath,
      languages: {
        "en-US": canonicalPath,
        "x-default": canonicalPath
      }
    },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      url: canonicalPath,
      locale: SITE_LOCALE,
      images: [
        {
          url: imagePath,
          width: 1200,
          height: 630,
          alt: socialTitle
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [imagePath],
      creator: ORGANIZATION_HANDLE
    }
  }
}
