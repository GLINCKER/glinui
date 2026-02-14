import type { PrimitiveComponentId } from "@/lib/primitives"
import { DEFAULT_DOCS_IMPLEMENTATION, type DocsImplementation } from "@/lib/docs-config"
export type { DocsImplementation } from "@/lib/docs-config"

export function resolveImplementation(value?: string): DocsImplementation {
  if (value === "base" || value === "radix") {
    return value
  }
  return DEFAULT_DOCS_IMPLEMENTATION
}

export function getImplementationFromPath(pathname: string): DocsImplementation {
  const match = pathname.match(/^\/docs\/components\/(radix|base)(?:\/|$)/)
  return resolveImplementation(match?.[1])
}

export function buildComponentHref(component: PrimitiveComponentId, implementation: DocsImplementation): string {
  return `/docs/components/${implementation}/${component}`
}
