import type { Metadata } from "next"

import { DEFAULT_OG_IMAGE_PATH, SITE_NAME } from "@/lib/seo"

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
    keywords,
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      url: canonicalPath,
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
      images: [imagePath]
    }
  }
}
