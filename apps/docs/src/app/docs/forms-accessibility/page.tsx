import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, ShieldCheck } from "lucide-react"

import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@glinui/ui"
import { CodeBlock } from "@/components/docs/code-block"
import { DEFAULT_DOCS_IMPLEMENTATION } from "@/lib/docs-config"
import { createDocsMetadata } from "@/lib/docs-metadata"
import { buildComponentHref } from "@/lib/docs-route"

const visibleLabelSnippet = `import { Input } from "@glinui/ui"

export function EmailField() {
  return (
    <div className="space-y-2">
      <label htmlFor="email" className="text-sm font-medium">Email address</label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  )
}`

const ariaLabelSnippet = `import { Input } from "@glinui/ui"

export function SearchField() {
  return <Input aria-label="Search components" placeholder="Search..." />
}`

const groupedControlSnippet = `import { RadioGroup, RadioGroupItem } from "@glinui/ui"

export function BillingFrequency() {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium">Billing frequency</legend>
      <RadioGroup defaultValue="monthly" aria-label="Billing frequency">
        <label htmlFor="monthly" className="flex items-center gap-2 text-sm">
          <RadioGroupItem id="monthly" value="monthly" />
          Monthly
        </label>
        <label htmlFor="yearly" className="flex items-center gap-2 text-sm">
          <RadioGroupItem id="yearly" value="yearly" />
          Yearly
        </label>
      </RadioGroup>
    </fieldset>
  )
}`

const switchLabelSnippet = `import { Switch } from "@glinui/ui"

export function MarketingToggle() {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border/60 p-4">
      <div className="space-y-0.5">
        <p className="text-sm font-medium">Marketing emails</p>
        <p className="text-sm text-neutral-500">Product updates and release notes.</p>
      </div>
      <Switch aria-label="Marketing emails" />
    </div>
  )
}`

export const metadata: Metadata = createDocsMetadata({
  title: "Forms Accessibility",
  description:
    "Labeling contracts and accessible form patterns for Input, Select, Textarea, Checkbox, Radio Group, and Switch.",
  path: "/docs/forms-accessibility",
  keywords: ["form accessibility", "aria-label", "labeling patterns", "accessible forms"]
})

export default function FormsAccessibilityPage() {
  return (
    <main className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-[var(--glass-3-surface)] p-6 shadow-[var(--shadow-glass-md)]">
        <div className="pointer-events-none absolute -left-12 top-0 h-36 w-36 rounded-full bg-cyan-300/25 blur-3xl dark:bg-cyan-400/15" />
        <div className="pointer-events-none absolute -right-14 bottom-0 h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-400/12" />
        <div className="relative space-y-4">
          <Badge variant="glass" className="w-fit">
            Accessibility
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Forms Accessibility</h1>
          <p className="max-w-3xl text-sm text-neutral-600 dark:text-neutral-300 sm:text-base">
            Keep every form control in Glin UI explicitly labeled. Placeholder text is hint content only and should
            never be the sole accessible name.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-base">
              <ShieldCheck className="h-4 w-4" />
              Labeling Contract
            </CardTitle>
            <CardDescription>Apply these rules to every field and control.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                <span>
                  Use a visible <code>{`<label htmlFor="...">`}</code> whenever layout allows it.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                Use `aria-label` for icon-only or compact controls.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                <span>
                  Use <code>{`<fieldset>`}</code> + <code>{`<legend>`}</code> for grouped options (radio/checkbox
                  sets).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                Keep placeholder text as guidance, not identity.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-base">Reference Components</CardTitle>
            <CardDescription>Use these docs pages when implementing production forms.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Link
              className="block text-neutral-700 underline-offset-4 hover:underline dark:text-neutral-200"
              href={buildComponentHref("input", DEFAULT_DOCS_IMPLEMENTATION)}
            >
              Input
            </Link>
            <Link
              className="block text-neutral-700 underline-offset-4 hover:underline dark:text-neutral-200"
              href={buildComponentHref("textarea", DEFAULT_DOCS_IMPLEMENTATION)}
            >
              Textarea
            </Link>
            <Link
              className="block text-neutral-700 underline-offset-4 hover:underline dark:text-neutral-200"
              href={buildComponentHref("select", DEFAULT_DOCS_IMPLEMENTATION)}
            >
              Select
            </Link>
            <Link
              className="block text-neutral-700 underline-offset-4 hover:underline dark:text-neutral-200"
              href={buildComponentHref("checkbox", DEFAULT_DOCS_IMPLEMENTATION)}
            >
              Checkbox
            </Link>
            <Link
              className="block text-neutral-700 underline-offset-4 hover:underline dark:text-neutral-200"
              href={buildComponentHref("radio-group", DEFAULT_DOCS_IMPLEMENTATION)}
            >
              Radio Group
            </Link>
            <Link
              className="block text-neutral-700 underline-offset-4 hover:underline dark:text-neutral-200"
              href={buildComponentHref("switch", DEFAULT_DOCS_IMPLEMENTATION)}
            >
              Switch
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Patterns</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="space-y-2">
            <h3 className="text-sm font-semibold">Visible label + control</h3>
            <CodeBlock language="tsx" code={visibleLabelSnippet} />
          </article>
          <article className="space-y-2">
            <h3 className="text-sm font-semibold">Compact control with `aria-label`</h3>
            <CodeBlock language="tsx" code={ariaLabelSnippet} />
          </article>
          <article className="space-y-2">
            <h3 className="text-sm font-semibold">Grouped options</h3>
            <CodeBlock language="tsx" code={groupedControlSnippet} />
          </article>
          <article className="space-y-2">
            <h3 className="text-sm font-semibold">Switch with descriptive text</h3>
            <CodeBlock language="tsx" code={switchLabelSnippet} />
          </article>
        </div>
      </section>
    </main>
  )
}
