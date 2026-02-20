import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@glinui/ui"
import { CodeBlock } from "@/components/docs/code-block"
import { InstallTabs } from "@/components/docs/install-tabs"
import { createDocsMetadata } from "@/lib/docs-metadata"

type FrameworkKey = "next" | "react" | "vue"

type FrameworkSetup = {
  key: FrameworkKey
  label: string
  subtitle: string
  createCommand: string
  installCommand: string
  tokenImport: string
  usage: string
  runCommand: string
  note: string
}

const frameworkSetups: FrameworkSetup[] = [
  {
    key: "next",
    label: "Next.js",
    subtitle: "App Router with full Glin UI component support",
    createCommand: "npm create next-app@latest my-app -- --ts --tailwind --eslint --app",
    installCommand: "npm install @glinui/ui @glinui/tokens",
    tokenImport: `/* app/globals.css */
@import "@glinui/tokens/theme.css";`,
    usage: `// app/page.tsx
import { Button } from "@glinui/ui"

export default function Page() {
  return (
    <main className="p-10">
      <Button variant="glass">Ship it</Button>
    </main>
  )
}`,
    runCommand: "npm run dev",
    note: "Recommended for production apps using the full React component library."
  },
  {
    key: "react",
    label: "React (Vite)",
    subtitle: "Fast setup with full Glin UI component support",
    createCommand: "npm create vite@latest my-app -- --template react-ts",
    installCommand: "npm install @glinui/ui @glinui/tokens",
    tokenImport: `// src/main.tsx
import React from "react"
import ReactDOM from "react-dom/client"
import "@glinui/tokens/theme.css"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)`,
    usage: `// src/App.tsx
import { Button } from "@glinui/ui"

export default function App() {
  return (
    <main className="p-10">
      <Button variant="glass">Ship it</Button>
    </main>
  )
}`,
    runCommand: "npm run dev",
    note: "Best when you want minimal tooling and a fast local iteration loop."
  },
  {
    key: "vue",
    label: "Vue",
    subtitle: "Token-first integration today",
    createCommand: "npm create vue@latest my-app",
    installCommand: "npm install @glinui/tokens",
    tokenImport: `// src/main.ts
import { createApp } from "vue"
import App from "./App.vue"
import "@glinui/tokens/theme.css"

createApp(App).mount("#app")`,
    usage: `<!-- src/App.vue -->
<template>
  <main class="p-10">
    <button class="glass-3 rounded-xl px-4 py-2">Ship it</button>
  </main>
</template>`,
    runCommand: "npm run dev",
    note: "@glinui/ui is React-first; Vue projects can use Glin tokens and glass utilities now."
  }
]

const registryOwnershipSnippet = `# Adds source files directly to your app
pnpm dlx @glinui/cli@latest add button

# Example result:
# components/ui/button.tsx
# lib/utils.ts`

export const metadata: Metadata = createDocsMetadata({
  title: "Getting Started",
  description:
    "Install Glin UI in Next.js, React, or Vue, import theme tokens, and ship your first liquid glass component.",
  path: "/docs/getting-started",
  keywords: ["Glin UI install", "Next.js UI setup", "React UI setup", "Vue design tokens"]
})

function FrameworkPanel({ setup }: { setup: FrameworkSetup }) {
  return (
    <Card variant="glass">
      <CardHeader className="space-y-2">
        <CardTitle className="text-base">{setup.label}</CardTitle>
        <CardDescription>{setup.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <section className="space-y-2">
            <h3 className="text-sm font-semibold">1. Create project</h3>
            <InstallTabs command={setup.createCommand} />
          </section>
          <section className="space-y-2">
            <h3 className="text-sm font-semibold">2. Install packages</h3>
            <InstallTabs command={setup.installCommand} />
          </section>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <section className="space-y-2">
            <h3 className="text-sm font-semibold">3. Import tokens</h3>
            <CodeBlock language={setup.key === "next" ? "css" : "ts"} code={setup.tokenImport} />
          </section>
          <section className="space-y-2">
            <h3 className="text-sm font-semibold">4. Render your first UI</h3>
            <CodeBlock language={setup.key === "vue" ? "html" : "tsx"} code={setup.usage} />
          </section>
        </div>

        <section className="space-y-2">
          <h3 className="text-sm font-semibold">5. Start development server</h3>
          <InstallTabs command={setup.runCommand} />
        </section>

        <p className="rounded-xl border border-border/60 bg-background/30 px-3 py-2 text-xs text-neutral-600 dark:text-neutral-300">
          {setup.note}
        </p>
      </CardContent>
    </Card>
  )
}

export default function GettingStartedPage() {
  return (
    <main className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-[var(--glass-3-surface)] p-6 shadow-[var(--shadow-glass-md)]">
        <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-cyan-300/30 blur-3xl dark:bg-cyan-400/15" />
        <div className="pointer-events-none absolute -right-12 bottom-0 h-44 w-44 rounded-full bg-emerald-300/25 blur-3xl dark:bg-emerald-400/15" />
        <div className="relative space-y-4">
          <Badge variant="glass" className="w-fit">
            Setup Guide
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Getting Started</h1>
          <p className="max-w-3xl text-sm text-neutral-600 dark:text-neutral-300 sm:text-base">
            Choose your framework, install packages with your preferred package manager, import tokens, and ship your
            first screen in minutes.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <Card variant="glass">
              <CardHeader className="space-y-1">
                <CardTitle className="text-sm">Install</CardTitle>
                <CardDescription>Add `@glinui/ui` and `@glinui/tokens`.</CardDescription>
              </CardHeader>
            </Card>
            <Card variant="glass">
              <CardHeader className="space-y-1">
                <CardTitle className="text-sm">Import Tokens</CardTitle>
                <CardDescription>Load `theme.css` once at app entry.</CardDescription>
              </CardHeader>
            </Card>
            <Card variant="glass">
              <CardHeader className="space-y-1">
                <CardTitle className="text-sm">Ship Components</CardTitle>
                <CardDescription>Compose atoms and primitives fast.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 id="install" className="text-2xl font-semibold tracking-tight">
          Base Install
        </h2>
        <InstallTabs command="npm install @glinui/ui @glinui/tokens" />
      </section>

      <section className="space-y-4">
        <h2 id="registry-workflow" className="text-2xl font-semibold tracking-tight">
          Registry Workflow
        </h2>
        <p className="max-w-3xl text-sm text-neutral-600 dark:text-neutral-300">
          Prefer file ownership instead of package imports? Use the Glin CLI registry flow to copy component source
          into your app and customize directly.
        </p>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-base">Add from Registry</CardTitle>
              <CardDescription>Copies component files into your project.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <InstallTabs command="pnpm dlx @glinui/cli@latest add button" />
              <InstallTabs command="pnpm dlx @glinui/cli@latest add data-table" />
            </CardContent>
          </Card>
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-base">Ownership Pattern</CardTitle>
              <CardDescription>Source is local, so edits are yours.</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock language="bash" code={registryOwnershipSnippet} />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h2 id="framework-setup" className="text-2xl font-semibold tracking-tight">
          Framework Setup
        </h2>

        <Tabs defaultValue="next" className="space-y-4">
          <TabsList variant="glass" className="w-full justify-start overflow-x-auto">
            {frameworkSetups.map((setup) => (
              <TabsTrigger key={setup.key} value={setup.key} variant="glass" size="sm">
                {setup.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {frameworkSetups.map((setup) => (
            <TabsContent key={setup.key} value={setup.key} variant="ghost" className="m-0 border-0 p-0">
              <FrameworkPanel setup={setup} />
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section className="space-y-3">
        <h2 id="sanity-check" className="text-2xl font-semibold tracking-tight">
          Sanity Checklist
        </h2>
        <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
            Tokens are imported once at the app root (`theme.css`).
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
            First component renders without custom CSS overrides.
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
            Package-manager command tabs match your local tooling.
          </li>
        </ul>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Button asChild variant="glass" className="justify-start">
          <Link href="/docs/components" className="inline-flex items-center gap-2">
            Browse Components
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline" className="justify-start">
          <Link href="/docs/tokens">Read Token Guide</Link>
        </Button>
        <Button asChild variant="outline" className="justify-start">
          <Link href="/docs/forms-accessibility">Forms Accessibility</Link>
        </Button>
        <Button asChild variant="outline" className="justify-start">
          <Link href="/docs/accessibility">Accessibility Hub</Link>
        </Button>
        <Button asChild variant="outline" className="justify-start">
          <Link href="/docs/forms-recipes">Form Recipes</Link>
        </Button>
        <Button asChild variant="outline" className="justify-start">
          <Link href="/docs/screen-reader-testing">Screen Reader Testing</Link>
        </Button>
        <Button asChild variant="outline" className="justify-start">
          <Link href="/docs/focus-management">Focus Management</Link>
        </Button>
        <Button asChild variant="outline" className="justify-start">
          <Link href="/docs/color-contrast">Color Contrast</Link>
        </Button>
        <Button asChild variant="outline" className="justify-start">
          <Link href="/docs/api-metadata">API Metadata</Link>
        </Button>
      </section>
    </main>
  )
}
