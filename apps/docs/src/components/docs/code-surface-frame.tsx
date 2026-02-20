"use client"

import * as React from "react"
import type { ReactNode } from "react"
import { Check, Copy } from "lucide-react"

import { cn, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@glinui/ui"
import { WindowControls } from "@/components/docs/window-controls"

type CodeSurfaceFrameProps = {
  left: ReactNode
  copied: boolean
  onCopy: () => void
  copyLabel: string
  copyHint?: string
  className?: string
  contentClassName?: string
  children: ReactNode
}

export function CodeSurfaceFrame({
  left,
  copied,
  onCopy,
  copyLabel,
  copyHint = "Copy",
  className,
  contentClassName,
  children
}: CodeSurfaceFrameProps) {
  const [tooltipOpen, setTooltipOpen] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    setTooltipOpen(true)
    const timer = window.setTimeout(() => setTooltipOpen(false), 1000)
    return () => window.clearTimeout(timer)
  }, [copied])

  return (
    <div
      dir="ltr"
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        // Glass container — Apple-style border with refraction
        "border border-black/[0.06] [border-top-color:rgb(255_255_255_/_0.5)]",
        // Light: warm neutral tint for code readability
        "bg-[radial-gradient(ellipse_at_50%_0%,rgb(255_255_255_/_0.6),transparent_60%),linear-gradient(to_bottom,rgb(250_250_252_/_0.85),rgb(246_247_249_/_0.72))]",
        "shadow-[0_0_0_1px_rgb(255_255_255_/_0.5)_inset,0_1px_3px_rgb(0_0_0_/_0.06),0_8px_24px_-12px_rgb(2_6_23_/_0.12)]",
        "backdrop-blur-xl backdrop-saturate-[120%]",
        // Dark: deep glass surface
        "dark:border-white/[0.08] dark:[border-top-color:rgb(255_255_255_/_0.14)]",
        "dark:bg-[radial-gradient(ellipse_at_50%_0%,rgb(255_255_255_/_0.06),transparent_55%),linear-gradient(to_bottom,rgb(17_17_20_/_0.88),rgb(12_12_16_/_0.92))]",
        "dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.06)_inset,0_12px_32px_-12px_rgb(0_0_0_/_0.5)]",
        "dark:backdrop-saturate-[140%]",
        className
      )}
    >
      {/* Specular highlights */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgb(255_255_255_/_0.12),transparent_38%)] dark:bg-[radial-gradient(circle_at_0%_0%,rgb(255_255_255_/_0.06),transparent_38%)]" />
      {/* Top refraction line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/12" />

      {/* Header bar */}
      <div className="relative flex items-center justify-between border-b border-black/[0.04] px-4 py-2.5 dark:border-white/[0.06]">
        <div className="flex min-w-0 items-center gap-3">
          <WindowControls />
          <span className="h-3.5 w-px bg-black/[0.06] dark:bg-white/[0.08]" />
          <div className="min-w-0">{left}</div>
        </div>

        <TooltipProvider delayDuration={120}>
          <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={onCopy}
                className={cn(
                  "inline-flex size-7 items-center justify-center rounded-lg border transition-all duration-fast ease-standard",
                  "border-black/[0.06] bg-white/50 text-neutral-500 hover:-translate-y-px hover:bg-white/80 hover:text-neutral-700",
                  "dark:border-white/[0.08] dark:bg-white/[0.06] dark:text-neutral-400 dark:hover:bg-white/[0.1] dark:hover:text-neutral-200"
                )}
                aria-label={copyLabel}
              >
                {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              className="rounded-lg border border-black/[0.06] bg-white/90 px-2.5 py-1 text-[11px] font-medium text-neutral-700 shadow-sm backdrop-blur-xl dark:border-white/[0.1] dark:bg-neutral-900/90 dark:text-neutral-200"
            >
              {copied ? "Copied" : copyHint}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Code content */}
      <div className={cn("relative", contentClassName)}>
        {children}
      </div>
    </div>
  )
}
