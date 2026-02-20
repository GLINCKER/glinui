import type { Metadata } from "next"
import Link from "next/link"

import { TokenPreview } from "@/components/token-preview"
import { createDocsMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = createDocsMetadata({
  title: "Design Tokens and Theme Contract",
  description:
    "Reference Glin UI color, spacing, motion, shadow, and glass tokens shared across components and docs.",
  path: "/docs/tokens",
  keywords: ["design tokens", "theme contract", "OKLCH tokens", "glass UI tokens"]
})

export default function TokensPage() {
  return (
    <main className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold">Design Tokens and Theme Contract</h1>
        <p className="max-w-2xl text-neutral-600">
          Shared OKLCH color, spacing, motion, shadow, and glass tokens used by the component library and docs shell.
        </p>
        <p className="text-sm text-neutral-600">
          Continue to{" "}
          <Link className="underline decoration-border underline-offset-4" href="/docs/glass-physics">
            Glass Physics
          </Link>
          {" "}for elevation-level surface previews.
        </p>
      </section>

      <TokenPreview />
    </main>
  )
}
