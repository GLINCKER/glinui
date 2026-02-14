"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, FilePenLine } from "lucide-react"

import { FloatingComponentChrome } from "@/components/docs/floating-component-chrome"
import { ComponentPager } from "@/components/docs/component-pager"
import { DocsToc } from "@/components/docs/docs-toc"
import { ImplementationToggle } from "@/components/docs/implementation-toggle"
import { getImplementationFromPath, type DocsImplementation } from "@/lib/docs-route"
import { type PrimitiveComponentId } from "@/lib/primitives"

export function ComponentDocLayout({
  badgeLabel,
  title,
  componentId,
  implementation = "radix",
  description,
  children
}: {
  badgeLabel: string
  title: string
  componentId: PrimitiveComponentId
  implementation?: DocsImplementation
  description: string
  children: ReactNode
}) {
  const editHref = `https://github.com/glinr/open-ui/edit/main/apps/docs/src/app/docs/components/${componentId}/page.mdx`
  const pathname = usePathname()
  const resolvedImplementation = getImplementationFromPath(pathname) ?? implementation

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_200px] xl:gap-12">
      <FloatingComponentChrome
        badgeLabel={badgeLabel}
        title={title}
        editHref={editHref}
      />
      <article className="group min-w-0 space-y-10">
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

          {/* Title block */}
          <div>
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500">
              {badgeLabel}
            </span>
            <h1 className="mt-1.5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400">{description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-md border border-neutral-200/60 bg-neutral-100/50 px-2 py-0.5 text-[11px] font-medium text-neutral-500 dark:border-white/[0.06] dark:bg-white/[0.04] dark:text-neutral-400">
                @glinr/ui
              </span>
              <span className="inline-flex items-center rounded-md border border-neutral-200/60 bg-neutral-100/50 px-2 py-0.5 text-[11px] font-medium text-neutral-500 dark:border-white/[0.06] dark:bg-white/[0.04] dark:text-neutral-400">
                Component: {componentId}
              </span>
            </div>
          </div>

          {/* Separator */}
          <div className="h-px bg-neutral-200/60 dark:bg-white/[0.06]" />
          <ImplementationToggle componentId={componentId} implementation={resolvedImplementation} />
        </section>
        {children}
        <ComponentPager component={componentId} implementation={resolvedImplementation} />
      </article>
      <DocsToc componentId={componentId} implementation={resolvedImplementation} />
    </div>
  )
}
