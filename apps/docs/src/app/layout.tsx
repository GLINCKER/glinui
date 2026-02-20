import "./globals.css"

import type { Metadata } from "next"
import type { ReactNode } from "react"

import { DocsShell } from "@/components/layout/docs-shell"
import { DocsDirectionProvider } from "@/lib/docs-direction"
import {
  DEFAULT_OG_IMAGE_PATH,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  isLocalSiteUrl
} from "@/lib/seo"
import { ThemeProvider } from "next-themes"

const metadataBaseUrl = SITE_URL
const isLocal = isLocalSiteUrl(metadataBaseUrl)

export const metadata: Metadata = {
  metadataBase: new URL(metadataBaseUrl),
  applicationName: SITE_NAME,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "React UI library",
    "Next.js components",
    "glassmorphism",
    "liquid glass UI",
    "Radix UI components",
    "Tailwind CSS components",
    "design system"
  ],
  category: "technology",
  creator: "GLINR Studios",
  publisher: "GLINR Studios",
  authors: [{ name: "GLINR Studios", url: metadataBaseUrl }],
  openGraph: {
    type: "website",
    url: metadataBaseUrl,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: "Glin UI - Liquid glass React component library"
      }
    ]
  },
  alternates: {
    canonical: "/"
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE_PATH],
    creator: "@glincker"
  },
  robots: isLocal
    ? {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false
        }
      }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1
        }
      }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    description: SITE_DESCRIPTION,
    url: metadataBaseUrl,
    creator: {
      "@type": "Organization",
      name: "GLINR Studios",
      url: metadataBaseUrl
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Blocking theme script — runs before first paint to prevent light→dark flash */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("glinui-docs-theme")||"system";var d=t==="system"?window.matchMedia("(prefers-color-scheme:dark)").matches:t==="dark";if(d){document.documentElement.classList.add("dark");document.documentElement.style.colorScheme="dark"}else{document.documentElement.style.colorScheme="light"}}catch(e){}})()`
          }}
        />
      </head>
      <body className="min-h-screen">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <DocsDirectionProvider>
            <DocsShell>{children}</DocsShell>
          </DocsDirectionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
