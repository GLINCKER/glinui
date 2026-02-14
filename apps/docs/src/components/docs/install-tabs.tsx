"use client"

import * as React from "react"
import { Terminal } from "lucide-react"

import { cn } from "@glinr/ui"
import { CodeSurfaceFrame } from "@/components/docs/code-surface-frame"
import { buildCommandTabs, PACKAGE_MANAGERS, type PackageManager } from "@/lib/npm-commands"

type InstallTabsProps = {
  command: string
  className?: string
}

export function InstallTabs({ command, className }: InstallTabsProps) {
  const [activePm, setActivePm] = React.useState<PackageManager>("pnpm")
  const [copied, setCopied] = React.useState(false)
  const tabs = React.useMemo(() => buildCommandTabs(command), [command])

  if (!tabs) {
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

  const activeCommand = tabs[activePm]

  return (
    <CodeSurfaceFrame
      className={className}
      copied={copied}
      onCopy={() => {
        void (async () => {
          try {
            await navigator.clipboard.writeText(activeCommand)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1500)
          } catch {
            setCopied(false)
          }
        })()
      }}
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
        <code className="font-mono text-neutral-800 dark:text-neutral-100">{activeCommand}</code>
      </pre>
    </CodeSurfaceFrame>
  )
}
