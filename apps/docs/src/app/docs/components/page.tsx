import { PrimitiveCatalog } from "@/components/primitives-demo"

export default function ComponentsIndexPage() {
  return (
    <main className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold">Component Primitives</h1>
        <p className="max-w-2xl text-neutral-600">
          Browse accessible primitives with consistent API conventions, glass variants, and production-ready defaults.
        </p>
      </section>

      <PrimitiveCatalog />
    </main>
  )
}
