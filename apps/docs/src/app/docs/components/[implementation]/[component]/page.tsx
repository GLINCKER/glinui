import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import ButtonDocsPage from "@/app/docs/components/button/page.mdx"
import { ComponentPager } from "@/components/docs/component-pager"
import { ImplementationToggle } from "@/components/docs/implementation-toggle"
import { PrimitiveDocsDemo } from "@/components/primitives-demo"
import { resolveImplementation, type DocsImplementation } from "@/lib/docs-route"
import {
  primitiveComponentIds,
  primitiveDescriptions,
  primitiveTitles,
  type PrimitiveComponentId
} from "@/lib/primitives"

export function generateStaticParams() {
  const implementations: DocsImplementation[] = ["radix", "base"]
  return implementations.flatMap((implementation) =>
    primitiveComponentIds.map((component) => ({ implementation, component }))
  )
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ implementation: string; component: string }>
}): Promise<Metadata> {
  const { component } = await params
  if (!primitiveComponentIds.includes(component as PrimitiveComponentId)) {
    return {}
  }

  const id = component as PrimitiveComponentId
  return {
    title: `${primitiveTitles[id]} - Glinr UI`,
    description: primitiveDescriptions[id]
  }
}

export default async function ImplementationComponentPage({
  params
}: {
  params: Promise<{ implementation: string; component: string }>
}) {
  const resolvedParams = await params
  const implementation = resolveImplementation(resolvedParams.implementation)

  if (!primitiveComponentIds.includes(resolvedParams.component as PrimitiveComponentId)) {
    notFound()
  }

  const component = resolvedParams.component as PrimitiveComponentId

  if (component === "button") {
    return <ButtonDocsPage />
  }

  return (
    <main className="space-y-6">
      <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/docs/components" className="transition-colors hover:text-foreground">
              Components
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground">{primitiveTitles[component]}</li>
        </ol>
      </nav>

      <ImplementationToggle componentId={component} implementation={implementation} />

      <PrimitiveDocsDemo component={component} implementation={implementation} />
      <ComponentPager component={component} implementation={implementation} />
    </main>
  )
}
