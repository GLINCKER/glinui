import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, Focus, ScanEye } from "lucide-react"

import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@glinui/ui"
import { CodeBlock } from "@/components/docs/code-block"
import { createDocsMetadata } from "@/lib/docs-metadata"

const dialogFocusSnippet = `import { useRef } from "react"
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalTrigger
} from "@glinui/ui"

export function DeleteDialog() {
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  return (
    <Modal>
      <ModalTrigger asChild>
        <Button ref={triggerRef} variant="destructive">
          Delete project
        </Button>
      </ModalTrigger>
      <ModalContent
        onCloseAutoFocus={(event) => {
          event.preventDefault()
          triggerRef.current?.focus()
        }}
      >
        <ModalHeader>
          <ModalTitle>Delete project</ModalTitle>
          <ModalDescription>This action cannot be undone.</ModalDescription>
        </ModalHeader>
      </ModalContent>
    </Modal>
  )
}`

const skipLinkSnippet = `<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2"
>
  Skip to content
</a>`

const focusRules = [
  "Keep a visible focus ring on every interactive control.",
  "Restore focus to the trigger after closing modal/sheet/popover.",
  "Do not trap keyboard users in non-modal surfaces.",
  "Add a skip link for large docs and dashboard pages."
]

export const metadata: Metadata = createDocsMetadata({
  title: "Focus Management Patterns",
  description:
    "Focus-trap, focus-restore, and skip-link patterns for accessible dialogs, sheets, and long content flows.",
  path: "/docs/focus-management",
  keywords: ["focus management", "keyboard accessibility", "modal focus restore", "skip links"]
})

export default function FocusManagementPage() {
  return (
    <main className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-[var(--glass-3-surface)] p-6 shadow-[var(--shadow-glass-md)]">
        <div className="pointer-events-none absolute -left-12 top-0 h-40 w-40 rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-400/12" />
        <div className="pointer-events-none absolute -right-12 bottom-0 h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-400/12" />
        <div className="relative space-y-4">
          <Badge variant="glass" className="w-fit">
            Keyboard UX
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Focus Management Patterns</h1>
          <p className="max-w-3xl text-sm text-neutral-600 dark:text-neutral-300 sm:text-base">
            Use these patterns to keep keyboard and assistive-tech navigation predictable across modals, popovers, and
            long content pages.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-base">
              <Focus className="h-4 w-4" />
              Focus Rules
            </CardTitle>
            <CardDescription>Apply these rules to all interactive flows.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
              {focusRules.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-base">
              <ScanEye className="h-4 w-4" />
              Manual Test Pass
            </CardTitle>
            <CardDescription>Quick QA flow before merge or release.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
            <p>Press `Tab` through the full page and verify visual ring continuity.</p>
            <p>Open and close each dialog/sheet; ensure focus returns to the initiating control.</p>
            <p>Check that `Esc` closes expected overlays and leaves focus in a valid place.</p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight">Modal Focus Restore Pattern</h2>
        <CodeBlock language="tsx" code={dialogFocusSnippet} />
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight">Skip Link Pattern</h2>
        <CodeBlock language="tsx" code={skipLinkSnippet} />
      </section>

      <section className="space-y-2 rounded-2xl border border-border/60 bg-background/40 p-4">
        <h2 className="text-base font-semibold">Related Guides</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/docs/forms-accessibility" className="underline decoration-border underline-offset-4">
            Forms Accessibility
          </Link>
          <Link href="/docs/screen-reader-testing" className="underline decoration-border underline-offset-4">
            Screen Reader Testing
          </Link>
          <Link href="/docs/color-contrast" className="underline decoration-border underline-offset-4">
            Color Contrast
          </Link>
        </div>
      </section>
    </main>
  )
}
