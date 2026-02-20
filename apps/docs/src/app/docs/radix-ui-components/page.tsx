import type { Metadata } from "next"
import Link from "next/link"

import { Badge, Button, GlassCard, Separator } from "@glinui/ui"

import { createDocsMetadata } from "@/lib/docs-metadata"
import { createAbsoluteUrl } from "@/lib/seo"

export const metadata: Metadata = createDocsMetadata({
  title: "Radix UI Components with Glin UI",
  description:
    "Build accessible Radix UI components faster with Glin UI's liquid-glass design system, shared variants, and production-ready defaults.",
  path: "/docs/radix-ui-components",
  keywords: [
    "radix ui components",
    "radix ui react",
    "accessible radix components",
    "react radix component library",
    "radix ui design system"
  ]
})

const categories = [
  {
    title: "Form primitives",
    details: "Input, Textarea, Select, Checkbox, Radio Group, Switch with accessible semantics and glass variants."
  },
  {
    title: "Overlay primitives",
    details: "Modal, Popover, Tooltip, Hover Card, Dropdown Menu built on Radix interaction patterns."
  },
  {
    title: "Feedback primitives",
    details: "Alert, Toast, Progress, Skeleton and status UI with consistent tone and contrast handling."
  },
  {
    title: "Layout + navigation",
    details: "Tabs, Accordion, Table and container surfaces designed for production interfaces."
  }
]

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does Glin UI use Radix UI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Glin UI uses Radix primitives for accessible interaction patterns and layers a liquid-glass visual system with standardized variants."
      }
    },
    {
      "@type": "Question",
      name: "Why use Glin UI for Radix components?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Glin UI reduces implementation drift by shipping consistent component APIs, tokenized surfaces, dark mode behavior, and accessibility QA guidance across the full component set."
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
      name: "Radix UI Components",
      item: createAbsoluteUrl("/docs/radix-ui-components")
    }
  ]
}

export default function RadixUiComponentsPage() {
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
        RADIX + GLIN UI
      </Badge>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Accessible Radix UI Components</h1>
      <p className="max-w-3xl text-sm text-neutral-700 dark:text-neutral-300 sm:text-base">
        Glin UI uses Radix primitives under the hood, then layers a complete liquid-glass visual system and consistent variant API on top.
      </p>

      <GlassCard className="space-y-2 border-white/20 p-3 sm:p-4">
        {categories.map((item, index) => (
          <div key={item.title}>
            {index > 0 ? <Separator className="my-3" /> : null}
            <h2 className="text-base font-semibold sm:text-lg">{item.title}</h2>
            <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">{item.details}</p>
          </div>
        ))}
      </GlassCard>

      <div className="flex flex-wrap gap-3">
        <Button asChild variant="default">
          <Link href="/docs/components">See all components</Link>
        </Button>
        <Button asChild variant="glass">
          <Link href="/docs/accessibility">Review accessibility docs</Link>
        </Button>
      </div>
    </main>
  )
}
