"use client"

import * as React from "react"
import { ChevronDown, Code2 } from "lucide-react"
import type { ReactNode } from "react"

import { cn } from "@glinr/ui"
import { CodeBlock } from "@/components/docs/code-block"

type ExampleSnippet = {
  label: string
  code: string
  language?: string
}

type ExampleBlockProps = {
  code: string
  language?: string
  snippets?: ExampleSnippet[]
  className?: string
  previewClassName?: string
  codeDefaultOpen?: boolean
  children: ReactNode
}

export function ExampleBlock({
  code,
  language = "tsx",
  snippets,
  className,
  previewClassName,
  codeDefaultOpen = false,
  children
}: ExampleBlockProps) {
  const resolvedSnippets = React.useMemo<ExampleSnippet[]>(
    () =>
      snippets && snippets.length > 0
        ? snippets
        : [{ label: language.toUpperCase(), code, language }],
    [snippets, language, code]
  )

  const [activeSnippetLabel, setActiveSnippetLabel] = React.useState<string>(resolvedSnippets[0]?.label ?? "TSX")
  const [codeOpen, setCodeOpen] = React.useState(codeDefaultOpen)

  React.useEffect(() => {
    setActiveSnippetLabel(resolvedSnippets[0]?.label ?? "TSX")
  }, [resolvedSnippets])

  const activeSnippet =
    resolvedSnippets.find((snippet) => snippet.label === activeSnippetLabel) ?? resolvedSnippets[0]

  const codePreview = React.useMemo(() => {
    const previewSource = activeSnippet?.code ?? code
    const lines = previewSource.replace(/\n+$/g, "").split("\n").filter((line) => line.trim().length > 0)
    return lines.slice(0, 3).join("\n")
  }, [activeSnippet, code])

  return (
    <section
      className={cn(
        "overflow-hidden rounded-2xl border border-black/[0.06] [border-top-color:rgb(255_255_255_/_0.45)] bg-[var(--glass-3-surface)] shadow-[0_0_0_1px_rgb(255_255_255_/_0.2)_inset,var(--shadow-soft)] dark:border-white/[0.1] dark:[border-top-color:rgb(255_255_255_/_0.12)] dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.06)_inset,var(--shadow-soft)]",
        className
      )}
    >
      <div
        className={cn(
          "flex min-h-[160px] items-center justify-center bg-[linear-gradient(180deg,rgb(255_255_255_/_0.24),rgb(255_255_255_/_0.08))] px-6 py-8 dark:bg-[linear-gradient(180deg,rgb(255_255_255_/_0.04),rgb(255_255_255_/_0.015))]",
          previewClassName
        )}
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => setCodeOpen((open) => !open)}
        aria-expanded={codeOpen}
        className="group relative w-full border-t border-black/[0.06] px-3 py-2 text-left transition-colors hover:bg-white/35 dark:border-white/[0.08] dark:hover:bg-white/[0.03]"
      >
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">
            <Code2 className="size-3.5" />
            {codeOpen ? "Hide source" : "View source"}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
            <span>{codeOpen ? "Collapse" : "Expand"}</span>
            <ChevronDown className={cn("size-3.5 transition-transform", codeOpen ? "rotate-180" : "rotate-0")} />
          </span>
        </div>

        {!codeOpen ? (
          <div className="relative mt-2 overflow-hidden rounded-lg border border-black/[0.05] bg-white/30 dark:border-white/[0.08] dark:bg-white/[0.02]">
            <pre className="max-h-12 overflow-hidden px-3 py-2 font-mono text-[11px] leading-5 text-neutral-500 blur-[1px] dark:text-neutral-400">
              {codePreview}
            </pre>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/95 to-transparent dark:from-[rgb(10_12_18_/_0.96)]" />
          </div>
        ) : null}
      </button>

      {resolvedSnippets.length > 1 ? (
        <div className="border-t border-black/[0.06] px-3 py-2 dark:border-white/[0.08]">
          <label className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">
            Language
            <select
              value={activeSnippetLabel}
              onChange={(event) => setActiveSnippetLabel(event.target.value)}
              className="rounded-md border border-black/[0.08] bg-white/60 px-2 py-1 text-[12px] font-medium normal-case tracking-normal text-neutral-700 outline-none transition-colors focus:border-black/20 dark:border-white/[0.12] dark:bg-white/[0.06] dark:text-neutral-200 dark:focus:border-white/25"
            >
              {resolvedSnippets.map((snippet) => (
                <option key={snippet.label} value={snippet.label}>
                  {snippet.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      ) : null}

      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-standard",
          codeOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden border-t border-black/[0.06] dark:border-white/[0.08]">
          <CodeBlock
            code={activeSnippet?.code ?? code}
            language={activeSnippet?.language ?? language}
            className="rounded-none border-0 shadow-none"
          />
        </div>
      </div>
    </section>
  )
}
