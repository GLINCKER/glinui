import type { ReactNode } from "react"

export function DemoFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-surface p-5 shadow-soft" aria-label={`${title} demo frame`}>
      <h2 className="mb-3 mt-0 text-lg font-medium">{title}</h2>
      <div>{children}</div>
    </section>
  )
}
