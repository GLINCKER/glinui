"use client"

import * as React from "react"
import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, FilePenLine } from "lucide-react"

import { FloatingComponentChrome } from "@/components/docs/floating-component-chrome"
import { GeneratedApiReference } from "@/components/docs/generated-api-reference"
import { ComponentPager } from "@/components/docs/component-pager"
import { DocsToc } from "@/components/docs/docs-toc"
import { ImplementationToggle } from "@/components/docs/implementation-toggle"
import { getImplementationFromPath, type DocsImplementation } from "@/lib/docs-route"
import { getComponentStructuredData } from "@/lib/structured-data"
import { primitiveComponentIds, primitiveMaturity, type ComponentId, type PrimitiveComponentId } from "@/lib/primitives"

export function ComponentDocLayout({
  badgeLabel,
  title,
  componentId,
  implementation = "radix",
  description,
  showGeneratedApi = true,
  children
}: {
  badgeLabel: string
  title: string
  componentId: ComponentId
  implementation?: DocsImplementation
  description: string
  showGeneratedApi?: boolean
  children: ReactNode
}) {
  const editHref = `https://github.com/GLINCKER/glinui/edit/main/apps/docs/src/app/docs/components/${componentId}/page.mdx`
  const pathname = usePathname()
  const resolvedImplementation = getImplementationFromPath(pathname) ?? implementation
  const isPrimitiveComponent = primitiveComponentIds.includes(componentId as PrimitiveComponentId)
  const maturity = (primitiveMaturity as Record<string, string>)[componentId] ?? "stable"
  const structuredData = React.useMemo(
    () =>
      getComponentStructuredData({
        componentId,
        title,
        description
      }),
    [componentId, description, title]
  )

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_200px] xl:gap-12">
      <FloatingComponentChrome
        badgeLabel={badgeLabel}
        title={title}
        editHref={editHref}
      />
      <article className="group min-w-0 space-y-10">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Page header — open, no card wrapper */}
        <section id="overview" className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <nav aria-label="Breadcrumb" className="text-[13px] text-neutral-500 dark:text-neutral-400">
              <ol className="flex items-center gap-1">
                <li>
                  <Link
                    href="/"
                    className="transition-colors hover:text-foreground"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="size-3 opacity-40" />
                </li>
                <li>
                  <Link
                    href="/docs/components"
                    className="transition-colors hover:text-foreground"
                  >
                    Components
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="size-3 opacity-40" />
                </li>
                <li className="text-foreground">
                  {title}
                </li>
              </ol>
            </nav>
            <div className="flex items-center gap-3">
              {isPrimitiveComponent ? (
                <ImplementationToggle componentId={componentId as PrimitiveComponentId} implementation={resolvedImplementation} />
              ) : null}
              <Link
                href={editHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[12px] text-neutral-400 transition-colors hover:text-foreground dark:text-neutral-500 dark:hover:text-neutral-300"
              >
                <FilePenLine className="size-3" />
                Edit on GitHub
              </Link>
            </div>
          </div>

          {/* Title block */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500">
                {badgeLabel}
              </span>
              <span
                className={
                  maturity === "beta"
                    ? "inline-flex items-center rounded-full border border-amber-300/50 bg-amber-100/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-amber-700 dark:border-amber-400/35 dark:bg-amber-400/15 dark:text-amber-300"
                    : "inline-flex items-center rounded-full border border-emerald-300/50 bg-emerald-100/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-emerald-700 dark:border-emerald-400/35 dark:bg-emerald-400/15 dark:text-emerald-300"
                }
              >
                {maturity}
              </span>
            </div>
            <h1 className="mt-1.5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400">{description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-md border border-neutral-200/60 bg-neutral-100/50 px-2 py-0.5 text-[11px] font-medium text-neutral-500 dark:border-white/[0.06] dark:bg-white/[0.04] dark:text-neutral-400">
                @glinui/ui
              </span>
              <span className="inline-flex items-center rounded-md border border-neutral-200/60 bg-neutral-100/50 px-2 py-0.5 text-[11px] font-medium text-neutral-500 dark:border-white/[0.06] dark:bg-white/[0.04] dark:text-neutral-400">
                Component: {componentId}
              </span>
            </div>
          </div>

          {/* Separator */}
          <div className="h-px bg-neutral-200/60 dark:bg-white/[0.06]" />
        </section>
        {children}
        {showGeneratedApi ? <GeneratedApiReference componentId={componentId} /> : null}
        {isPrimitiveComponent ? (
          <ComponentPager component={componentId as PrimitiveComponentId} implementation={resolvedImplementation} />
        ) : null}
      </article>
      <DocsToc
        componentId={isPrimitiveComponent ? (componentId as PrimitiveComponentId) : undefined}
        implementation={resolvedImplementation}
      />
    </div>
  )
}
