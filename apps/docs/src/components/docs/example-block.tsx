"use client"

import * as React from "react"
import { ChevronDown, Code2 } from "lucide-react"
import type { ReactNode } from "react"

import { cn } from "@glinui/ui"
import { CodeBlock } from "@/components/docs/code-block"

type ExampleSnippet = {
  label: string
  code: string
  language?: string
}

type PreviewBg = "mesh" | "light" | "dark" | "vivid"

const previewBgClasses: Record<PreviewBg, string> = {
  mesh: [
    "bg-[radial-gradient(circle_at_20%_30%,rgb(196_181_253_/_0.12),transparent_50%),radial-gradient(circle_at_80%_70%,rgb(125_211_252_/_0.12),transparent_50%),linear-gradient(180deg,rgb(240_240_244_/_0.7),rgb(228_228_232_/_0.5))]",
    "dark:bg-[radial-gradient(circle_at_20%_30%,rgb(196_181_253_/_0.06),transparent_50%),radial-gradient(circle_at_80%_70%,rgb(125_211_252_/_0.06),transparent_50%),linear-gradient(180deg,rgb(255_255_255_/_0.04),rgb(255_255_255_/_0.015))]"
  ].join(" "),
  light: "bg-white dark:bg-white",
  dark: "bg-neutral-900 dark:bg-neutral-900",
  vivid: "bg-[linear-gradient(135deg,rgb(99_102_241),rgb(168_85_247),rgb(236_72_153))] dark:bg-[linear-gradient(135deg,rgb(79_70_229),rgb(147_51_234),rgb(219_39_119))]"
}

const previewSwatchClasses: Record<PreviewBg, string> = {
  mesh: "bg-[linear-gradient(135deg,rgb(196_181_253_/_0.3),rgb(125_211_252_/_0.3))]",
  light: "bg-white",
  dark: "bg-neutral-900",
  vivid: "bg-[linear-gradient(135deg,rgb(99_102_241),rgb(236_72_153))]"
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
  const [previewBg, setPreviewBg] = React.useState<PreviewBg>("mesh")

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
        "overflow-hidden rounded-2xl border border-black/[0.06] [border-top-color:var(--glass-refraction-top)] bg-[var(--glass-3-surface)] shadow-[0_0_0_1px_rgb(255_255_255_/_0.2)_inset,var(--shadow-soft)] dark:border-white/[0.1] dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.06)_inset,var(--shadow-soft)]",
        className
      )}
    >
      <div className="relative">
        <div
          className={cn(
            "flex min-h-[160px] items-center justify-center px-6 py-8 transition-colors duration-300 [&>div]:w-full",
            previewBgClasses[previewBg],
            previewClassName
          )}
        >
          {children}
        </div>

        <div className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-lg border border-black/[0.06] bg-white/70 px-1.5 py-1 backdrop-blur-md dark:border-white/[0.1] dark:bg-neutral-900/70">
          {(Object.keys(previewBgClasses) as PreviewBg[]).map((bg) => (
            <button
              key={bg}
              type="button"
              onClick={() => setPreviewBg(bg)}
              aria-label={`${bg} background`}
              className={cn(
                "size-4 rounded-full border transition-[box-shadow,border-color] duration-150",
                previewSwatchClasses[bg],
                previewBg === bg
                  ? "border-neutral-400 shadow-[0_0_0_2px_rgb(255_255_255),0_0_0_3.5px_rgb(99_102_241)] dark:border-neutral-500 dark:shadow-[0_0_0_2px_rgb(23_23_23),0_0_0_3.5px_rgb(129_140_248)]"
                  : "border-black/10 hover:border-black/25 dark:border-white/15 dark:hover:border-white/30"
              )}
            />
          ))}
        </div>
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
