import type { Metadata } from "next"
import Link from "next/link"
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@glinui/ui"
import { CodeBlock } from "@/components/docs/code-block"
import { createDocsMetadata } from "@/lib/docs-metadata"

const authRecipe = `import { Button, Input, Label } from "@glinui/ui"

export function LoginForm() {
  return (
    <form className="space-y-4" aria-label="Login form">
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" autoComplete="email" placeholder="you@example.com" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" autoComplete="current-password" />
      </div>
      <Button type="submit" variant="glass" className="w-full">Sign in</Button>
    </form>
  )
}`

const checkoutRecipe = `import { Button, Input, Label, Select } from "@glinui/ui"

const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "gb", label: "United Kingdom" }
]

export function CheckoutAddressForm() {
  return (
    <form className="grid gap-4" aria-label="Checkout address form">
      <div className="space-y-1.5">
        <Label htmlFor="full-name">Full name</Label>
        <Input id="full-name" autoComplete="name" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="address-line-1">Address line 1</Label>
        <Input id="address-line-1" autoComplete="address-line1" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="country">Country</Label>
        <Select id="country" options={countries} placeholder="Select country" />
      </div>
      <Button type="submit" variant="glass">Continue to payment</Button>
    </form>
  )
}`

const settingsRecipe = `import { Label, Switch, Textarea } from "@glinui/ui"

export function NotificationSettingsForm() {
  return (
    <form className="space-y-5" aria-label="Notification settings">
      <div className="flex items-center justify-between rounded-lg border border-border/60 p-4">
        <div className="space-y-0.5">
          <Label htmlFor="marketing-emails">Marketing emails</Label>
          <p className="text-sm text-neutral-500">Product updates and release notes.</p>
        </div>
        <Switch id="marketing-emails" aria-label="Marketing emails" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="feedback">Feedback</Label>
        <Textarea id="feedback" rows={4} placeholder="Tell us what to improve" />
      </div>
    </form>
  )
}`

export const metadata: Metadata = createDocsMetadata({
  title: "Form Recipes",
  description:
    "Production-ready auth, checkout, and settings form patterns with explicit labels and accessibility-safe defaults.",
  path: "/docs/forms-recipes",
  keywords: ["form recipes", "auth form UI", "checkout form UI", "settings form UI"]
})

export default function FormsRecipesPage() {
  return (
    <main className="space-y-8">
      <section className="space-y-4 rounded-3xl border border-white/15 bg-[var(--glass-3-surface)] p-6 shadow-[var(--shadow-glass-md)]">
        <Badge variant="glass" className="w-fit">
          Recipes
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Form Recipes</h1>
        <p className="max-w-3xl text-sm text-neutral-600 dark:text-neutral-300 sm:text-base">
          Copy these production-oriented patterns for auth, checkout, and settings workflows. Each recipe includes
          explicit labels and accessibility-safe defaults.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-base">Auth</CardTitle>
            <CardDescription>Email and password with semantic autofill support.</CardDescription>
          </CardHeader>
        </Card>
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-base">Checkout</CardTitle>
            <CardDescription>Address form with explicit labels and country select.</CardDescription>
          </CardHeader>
        </Card>
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-base">Settings</CardTitle>
            <CardDescription>Switch + textarea preferences with clear naming.</CardDescription>
          </CardHeader>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Auth Recipe</h2>
        <CodeBlock language="tsx" code={authRecipe} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Checkout Recipe</h2>
        <CodeBlock language="tsx" code={checkoutRecipe} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Settings Recipe</h2>
        <CodeBlock language="tsx" code={settingsRecipe} />
      </section>

      <section className="space-y-2 rounded-2xl border border-border/60 bg-background/40 p-4">
        <h2 className="text-base font-semibold">Related Guides</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/docs/forms-accessibility" className="underline decoration-border underline-offset-4">
            Forms Accessibility
          </Link>
          <Link href="/docs/getting-started" className="underline decoration-border underline-offset-4">
            Getting Started
          </Link>
          <Link href="/docs/components" className="underline decoration-border underline-offset-4">
            Component Catalog
          </Link>
        </div>
      </section>
    </main>
  )
}
