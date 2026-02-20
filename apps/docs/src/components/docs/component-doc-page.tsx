"use client"

import { getRegistryItem } from "@glinui/registry"
import { Tree, buildFileTree } from "@glinui/ui"

import { ComponentDocLayout } from "@/components/docs/component-doc-layout"
import { ExampleBlock } from "@/components/docs/example-block"
import { InstallTabs } from "@/components/docs/install-tabs"
import { PropsTable } from "@/components/docs/props-table"
import { componentDocs, type PropsGroup } from "@/lib/component-docs"
import { type DocsImplementation } from "@/lib/docs-route"
import {
  primitiveDescriptions,
  primitiveTitles,
  type PrimitiveComponentId
} from "@/lib/primitives"

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")
}

function isPropsGroups(props: unknown): props is PropsGroup[] {
  return Array.isArray(props) && props.length > 0 && "title" in (props[0] as Record<string, unknown>)
}

export function ComponentDocPage({
  componentId,
  implementation
}: {
  componentId: PrimitiveComponentId
  implementation: DocsImplementation
}) {
  const meta = componentDocs[componentId]
  const item = getRegistryItem(componentId)
  const title = primitiveTitles[componentId]
  const description = item?.description ?? primitiveDescriptions[componentId]

  return (
    <ComponentDocLayout
      badgeLabel={meta.badge}
      componentId={componentId}
      implementation={implementation}
      title={title}
      description={description}
    >
      {/* ── Installation ──────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="installation" className="text-xl font-semibold text-foreground">Installation</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Install from the package for shared ownership or from the registry for copy-paste control.
        </p>

        <h3 id="package-manager" className="text-sm font-medium text-foreground">Package Manager</h3>
        <InstallTabs command={item?.install.package ?? "pnpm add @glinui/ui @glinui/tokens"} />

        <h3 id="registry" className="text-sm font-medium text-foreground">Registry</h3>
        <InstallTabs command={item?.install.registry ?? `pnpm dlx @glinui/cli@latest add ${componentId}`} />
      </section>

      {/* ── Examples ──────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 id="usage" className="text-xl font-semibold text-foreground">Usage</h2>
        {meta.examples.map((example, i) => (
          <div key={example.title} className="space-y-2">
            {(i > 0 || meta.examples.length > 1) && (
              <h3 id={slugify(example.title)} className="text-sm font-medium text-foreground">{example.title}</h3>
            )}
            {example.description && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{example.description}</p>
            )}
            <ExampleBlock code={example.code} codeDefaultOpen={i === 0}>
              {example.render}
            </ExampleBlock>
          </div>
        ))}
      </section>

      {/* ── Accessibility ────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="accessibility" className="text-xl font-semibold text-foreground">Accessibility</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
          {meta.accessibility.summary.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>

        {meta.accessibility.keyboard && meta.accessibility.keyboard.length > 0 && (
          <div className="space-y-2">
            <h3 id="keyboard-interactions" className="text-sm font-medium text-foreground">Keyboard Interactions</h3>
            <div className="overflow-x-auto rounded-xl border border-border/60">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-black/5 dark:bg-white/5">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Key</th>
                    <th className="px-3 py-2 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {meta.accessibility.keyboard.map((row) => (
                    <tr key={row.key} className="border-t border-border/60">
                      <td className="px-3 py-2">
                        <kbd className="rounded border border-border/80 bg-neutral-100 px-1.5 py-0.5 font-mono text-xs dark:bg-white/[0.06]">{row.key}</kbd>
                      </td>
                      <td className="px-3 py-2 text-neutral-600 dark:text-neutral-400">{row.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {meta.accessibility.aria && meta.accessibility.aria.length > 0 && (
          <div className="space-y-2">
            <h3 id="aria-attributes" className="text-sm font-medium text-foreground">ARIA Attributes</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
              {meta.accessibility.aria.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* ── Reduced Motion ───────────────────────────────────────────── */}
      <section className="space-y-3">
        <h2 id="reduced-motion" className="text-xl font-semibold text-foreground">Reduced Motion</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{meta.reducedMotion.description}</p>
        {meta.reducedMotion.affected && meta.reducedMotion.affected.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-400 dark:text-neutral-500">Affected properties</p>
            <div className="flex flex-wrap gap-1.5">
              {meta.reducedMotion.affected.map((prop) => (
                <code key={prop} className="rounded border border-border/60 bg-neutral-100/50 px-1.5 py-0.5 text-xs dark:bg-white/[0.04]">{prop}</code>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── API Reference ────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 id="api-reference" className="text-xl font-semibold text-foreground">API Reference</h2>
        {isPropsGroups(meta.props) ? (
          meta.props.map((group) => (
            <div key={group.title} className="space-y-2">
              <h3 id={slugify(group.title)} className="text-sm font-medium text-foreground">
                <code>{group.title}</code>
              </h3>
              <PropsTable
                rows={group.rows}
                componentId={componentId}
                propsType={group.title}
                autoAppendGenerated
              />
            </div>
          ))
        ) : (
          <PropsTable rows={meta.props} componentId={componentId} autoAppendGenerated />
        )}
      </section>

      {/* ── Source ────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="source" className="text-xl font-semibold text-foreground">Source</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Import directly from the package or browse the source on GitHub. Click any file to view it.
        </p>

        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-400 dark:text-neutral-500">Import</p>
            <pre className="rounded-lg border border-border/60 bg-white/30 px-4 py-3 text-sm dark:bg-white/[0.02]">
              <code>{`import { ${title.replace(/\s*\/\s*/g, ", ").replace(/\s+/g, "")} } from "${item?.importPath ?? "@glinui/ui"}"`}</code>
            </pre>
          </div>

          {item?.files && item.files.length > 0 && (() => {
            const sourceFiles = item.files.filter((f) => !f.includes("test"))
            const testFiles = item.files.filter((f) => f.includes("test"))
            const treeNodes = [
              ...(sourceFiles.length > 0
                ? [{
                    label: title,
                    children: sourceFiles.map((f) => ({
                      label: f.split("/").pop() ?? f,
                      href: `https://github.com/GLINCKER/glinui/blob/main/${f}`,
                      external: true
                    }))
                  }]
                : []),
              ...(testFiles.length > 0
                ? [{
                    label: "Tests",
                    children: testFiles.map((f) => ({
                      label: f.split("/").pop() ?? f,
                      href: `https://github.com/GLINCKER/glinui/blob/main/${f}`,
                      external: true,
                      badge: "test" as const,
                      badgeVariant: "success" as const
                    }))
                  }]
                : [])
            ]
            return (
              <div className="space-y-1.5">
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-400 dark:text-neutral-500">Source Files</p>
                <Tree variant="outline" nodes={treeNodes} />
              </div>
            )
          })()}

          {item?.dependencies && item.dependencies.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-400 dark:text-neutral-500">Dependencies</p>
              <div className="flex flex-wrap gap-1.5">
                {item.dependencies.map((dep) => (
                  <code key={dep} className="rounded border border-border/60 bg-neutral-100/50 px-2 py-0.5 text-xs dark:bg-white/[0.04]">{dep}</code>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </ComponentDocLayout>
  )
}
