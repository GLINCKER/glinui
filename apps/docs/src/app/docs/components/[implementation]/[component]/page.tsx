import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { ComponentDocPage } from "@/components/docs/component-doc-page"
import { generatedRegistryByName } from "@/lib/generated-registry-metadata"
import { DEFAULT_DOCS_IMPLEMENTATION } from "@/lib/docs-config"
import { createDocsMetadata } from "@/lib/docs-metadata"
import { resolveImplementation, type DocsImplementation } from "@/lib/docs-route"
import {
  primitiveComponentIds,
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
  const { component, implementation } = await params
  const registryItem = generatedRegistryByName[component as keyof typeof generatedRegistryByName]
  if (!registryItem) {
    return {}
  }

  if (registryItem.type === "primitive") {
    const resolvedImplementation = resolveImplementation(implementation)
    const canonicalPath = `/docs/components/${DEFAULT_DOCS_IMPLEMENTATION}/${component}`

    return {
      ...createDocsMetadata({
        title: registryItem.title,
        description: registryItem.description,
        path: canonicalPath,
        keywords: ["React component docs", "UI component API", "Glin UI component"]
      }),
      robots:
        resolvedImplementation === DEFAULT_DOCS_IMPLEMENTATION
          ? {
              index: true,
              follow: true
            }
          : {
              index: false,
              follow: true
            }
    }
  }

  return createDocsMetadata({
    title: registryItem.title,
    description: registryItem.description,
    path: registryItem.docsPath,
    keywords: ["signature component docs", "glass UI component", "Glin UI component"]
  })
}

export default async function ImplementationComponentPage({
  params
}: {
  params: Promise<{ implementation: string; component: string }>
}) {
  const resolvedParams = await params
  const implementation = resolveImplementation(resolvedParams.implementation)
  const registryItem = generatedRegistryByName[
    resolvedParams.component as keyof typeof generatedRegistryByName
  ]

  if (registryItem?.type === "signature") {
    redirect(registryItem.docsPath)
  }

  if (!registryItem || registryItem.type !== "primitive") {
    notFound()
  }

  return (
    <ComponentDocPage
      componentId={resolvedParams.component as PrimitiveComponentId}
      implementation={implementation}
    />
  )
}
