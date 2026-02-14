import { Badge } from "@glinr/ui"

export default function GettingStartedPage() {
  return (
    <main className="space-y-8">
      <section className="space-y-3">
        <Badge variant="glass" className="w-fit">Quickstart</Badge>
        <h1 className="text-3xl font-semibold">Getting Started</h1>
        <p className="max-w-2xl text-neutral-600">
          Install Glinr packages, include the token stylesheet, and start composing primitive components with glass
          variants.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="glass-2 rounded-2xl p-5">
          <h2 className="text-sm font-semibold">1. Install</h2>
          <pre className="mt-3 overflow-x-auto rounded-lg border border-border/50 bg-black/10 p-3 text-xs">
{`pnpm add @glinr/ui @glinr/tokens`}
          </pre>
        </article>

        <article className="glass-2 rounded-2xl p-5">
          <h2 className="text-sm font-semibold">2. Import Theme Tokens</h2>
          <pre className="mt-3 overflow-x-auto rounded-lg border border-border/50 bg-black/10 p-3 text-xs">
{`@import "@glinr/tokens/theme.css";`}
          </pre>
        </article>

        <article className="glass-2 rounded-2xl p-5">
          <h2 className="text-sm font-semibold">3. Use Components</h2>
          <pre className="mt-3 overflow-x-auto rounded-lg border border-border/50 bg-black/10 p-3 text-xs">
{`import { Button } from "@glinr/ui"`}
          </pre>
        </article>
      </section>
    </main>
  )
}
