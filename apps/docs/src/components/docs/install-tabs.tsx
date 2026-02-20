"use client"

import * as React from "react"
import { FileCode2, Terminal } from "lucide-react"

import { cn } from "@glinui/ui"
import { CodeBlock } from "@/components/docs/code-block"
import { CodeSurfaceFrame } from "@/components/docs/code-surface-frame"
import { buildCommandTabs, PACKAGE_MANAGERS, type PackageManager } from "@/lib/npm-commands"

type SourceFile = {
  fileName: string
  code: string
  language: string
}

type InstallTabsProps = {
  command: string
  sources?: SourceFile[]
  className?: string
}

type InstallMode = "cli" | "manual"

export function InstallTabs({ command, sources, className }: InstallTabsProps) {
  const [mode, setMode] = React.useState<InstallMode>("cli")
  const [activePm, setActivePm] = React.useState<PackageManager>("pnpm")
  const [activeFileIndex, setActiveFileIndex] = React.useState(0)
  const [copied, setCopied] = React.useState(false)
  const tabs = React.useMemo(() => buildCommandTabs(command), [command])

  const hasSources = sources && sources.length > 0
  const activeSource = sources?.[activeFileIndex]

  const copyText = mode === "manual" && activeSource
    ? activeSource.code
    : tabs?.[activePm] ?? command

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(copyText)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }, [copyText])

  if (!tabs && !hasSources) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgb(255_255_255_/_0.24),rgb(255_255_255_/_0.04))] p-4 font-mono text-sm shadow-[0_0_0_1px_rgb(255_255_255_/_0.14)_inset,var(--shadow-soft)] backdrop-blur-2xl",
          className
        )}
      >
        <code>{command}</code>
      </div>
    )
  }

  return (
    <div className={cn("space-y-3", className)}>
      {/* CLI / Manual toggle */}
      {hasSources ? (
        <div className={cn(
          "inline-flex rounded-xl border p-1",
          "border-black/[0.06] bg-black/[0.03]",
          "dark:border-white/[0.08] dark:bg-white/[0.04]"
        )}>
          <button
            type="button"
            onClick={() => setMode("cli")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all duration-fast ease-standard",
              mode === "cli"
                ? "bg-white text-neutral-900 shadow-[0_1px_3px_rgb(0_0_0_/_0.08)] dark:bg-white/[0.86] dark:text-neutral-950"
                : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            )}
          >
            <Terminal className="size-3" />
            CLI
          </button>
          <button
            type="button"
            onClick={() => setMode("manual")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all duration-fast ease-standard",
              mode === "manual"
                ? "bg-white text-neutral-900 shadow-[0_1px_3px_rgb(0_0_0_/_0.08)] dark:bg-white/[0.86] dark:text-neutral-950"
                : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            )}
          >
            <FileCode2 className="size-3" />
            Manual
          </button>
        </div>
      ) : null}

      {/* CLI view */}
      {mode === "cli" && tabs ? (
        <CodeSurfaceFrame
          copied={copied}
          onCopy={() => void handleCopy()}
          copyLabel="Copy install command"
          copyHint="Copy install"
          left={
            <div className="flex items-center gap-2">
              <span className="inline-flex size-7 items-center justify-center rounded-full border border-white/15 bg-white/10 text-neutral-500 backdrop-blur-xl dark:text-neutral-300">
                <Terminal className="size-3.5" />
              </span>
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 p-1 backdrop-blur-xl">
                {PACKAGE_MANAGERS.map((pm) => (
                  <button
                    key={pm}
                    type="button"
                    onClick={() => setActivePm(pm)}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize tracking-[0.02em] transition-all duration-fast ease-standard",
                      activePm === pm
                        ? "bg-white/70 text-black shadow-[0_4px_10px_-7px_rgb(2_6_23_/_0.35)] dark:bg-white/[0.86] dark:text-neutral-950"
                        : "text-neutral-600 hover:text-foreground dark:text-neutral-300"
                    )}
                  >
                    {pm}
                  </button>
                ))}
              </div>
            </div>
          }
        >
          <pre className="overflow-x-auto p-4 text-sm">
            <code className="font-mono text-neutral-800 dark:text-neutral-100">{tabs[activePm]}</code>
          </pre>
        </CodeSurfaceFrame>
      ) : null}

      {/* Manual view */}
      {mode === "manual" && hasSources ? (
        <div className="space-y-2">
          <p className="text-[13px] text-neutral-500 dark:text-neutral-400">
            Copy and paste the following code into your project.
          </p>

          {/* File tabs (if multiple files) */}
          {sources.length > 1 ? (
            <div className={cn(
              "inline-flex rounded-lg border p-0.5",
              "border-black/[0.06] bg-black/[0.03]",
              "dark:border-white/[0.08] dark:bg-white/[0.04]"
            )}>
              {sources.map((source, index) => (
                <button
                  key={source.fileName}
                  type="button"
                  onClick={() => setActiveFileIndex(index)}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-[11px] font-medium font-mono transition-all duration-fast ease-standard",
                    activeFileIndex === index
                      ? "bg-white text-neutral-900 shadow-[0_1px_3px_rgb(0_0_0_/_0.08)] dark:bg-white/[0.86] dark:text-neutral-950"
                      : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                  )}
                >
                  {source.fileName}
                </button>
              ))}
            </div>
          ) : null}

          {activeSource ? (
            <CodeBlock
              code={activeSource.code}
              language={activeSource.language}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
