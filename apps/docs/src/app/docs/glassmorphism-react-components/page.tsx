import type { Metadata } from "next"
import Link from "next/link"

import { Badge, Button, GlassCard, Separator } from "@glinui/ui"

import { createDocsMetadata } from "@/lib/docs-metadata"
import { createAbsoluteUrl } from "@/lib/seo"

export const metadata: Metadata = createDocsMetadata({
  title: "Glassmorphism React Components",
  description:
    "Use production-ready glassmorphism React components with liquid surfaces, accessibility defaults, dark mode, and motion-safe interactions.",
  path: "/docs/glassmorphism-react-components",
  keywords: [
    "glassmorphism react components",
    "glass ui react",
    "liquid glass react",
    "glass design system",
    "tailwind glassmorphism"
  ]
})

const checklist = [
  "Use consistent blur, refraction, and elevation tokens.",
  "Keep contrast at WCAG AA across light and dark themes.",
  "Prefer transform and opacity for motion performance.",
  "Provide reduced-motion fallbacks for all animated surfaces.",
  "Standardize semantic variants for status and intent."
]

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are glassmorphism React components?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Glassmorphism React components use translucent layers, blur, and depth cues to create glass-like interfaces while keeping semantic structure and accessibility."
      }
    },
    {
      "@type": "Question",
      name: "Can glassmorphism be production-ready?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, when contrast, motion fallbacks, and component consistency are built into the system."
      }
    }
  ]
}

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Docs",
      item: createAbsoluteUrl("/docs")
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Glassmorphism React Components",
      item: createAbsoluteUrl("/docs/glassmorphism-react-components")
    }
  ]
}

export default function GlassmorphismReactComponentsPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 pb-14 pt-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <Badge variant="glass" className="w-fit tracking-[0.14em]">
        GLASSMORPHISM
      </Badge>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Glassmorphism React Components</h1>
      <p className="max-w-3xl text-sm text-neutral-700 dark:text-neutral-300 sm:text-base">
        Glin UI gives you glassmorphism components that are designed for real product teams, not just visual demos.
      </p>

      <GlassCard className="space-y-3 border-white/20 p-3 sm:p-4">
        <h2 className="text-base font-semibold sm:text-lg">Production checklist</h2>
        <Separator />
        <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
          {checklist.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </GlassCard>

      <div className="flex flex-wrap gap-3">
        <Button asChild variant="default">
          <Link href="/docs/components/glass-card">View glass components</Link>
        </Button>
        <Button asChild variant="glass">
          <Link href="/docs/tokens">Inspect glass tokens</Link>
        </Button>
      </div>
    </main>
  )
}
