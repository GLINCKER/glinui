"use client"

import * as React from "react"
import { Toaster as SonnerToaster, toast } from "sonner"
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  Loader2,
  X
} from "lucide-react"

import { cn } from "../lib/cn"

/* ── Glass-styled Toaster ─────────────────────────────────────────────────── */

type ToasterVariant = "default" | "glass" | "matte"

type GlinToasterProps = Omit<React.ComponentPropsWithoutRef<typeof SonnerToaster>, "icons"> & {
  /** Visual surface treatment for all toasts */
  variant?: ToasterVariant
}

const variantClassMap: Record<ToasterVariant, { toast: string; title: string; description: string; actionButton: string; cancelButton: string; closeButton: string }> = {
  default: {
    toast:
      "group relative isolate overflow-hidden border-black/10 bg-[linear-gradient(180deg,rgb(255_255_255),rgb(244_244_246))] text-[var(--color-foreground)] shadow-[0_1px_0_rgb(255_255_255_/_0.9)_inset,0_14px_30px_-18px_rgb(15_23_42_/_0.3)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent dark:border-white/[0.14] dark:bg-[linear-gradient(180deg,rgb(55_61_71_/_0.94),rgb(36_40_48_/_0.94))] dark:shadow-[0_1px_0_rgb(255_255_255_/_0.09)_inset,0_16px_34px_-18px_rgb(0_0_0_/_0.66)] dark:before:via-white/20",
    title: "font-medium tracking-tight text-[var(--color-foreground)]",
    description: "text-neutral-600 dark:text-neutral-300",
    actionButton:
      "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-white",
    cancelButton:
      "bg-black/[0.05] text-neutral-700 hover:bg-black/[0.09] dark:bg-white/[0.1] dark:text-neutral-200 dark:hover:bg-white/[0.15]",
    closeButton: "text-neutral-500 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white"
  },
  glass: {
    toast:
      "group relative isolate overflow-hidden border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[linear-gradient(155deg,rgb(255_255_255_/_0.66),rgb(246_246_246_/_0.36))] text-[var(--color-foreground)] backdrop-blur-xl backdrop-saturate-[180%] shadow-[0_0_0_1px_rgb(255_255_255_/_0.2)_inset,0_14px_30px_-18px_rgb(15_23_42_/_0.28)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent dark:border-white/[0.12] dark:bg-[linear-gradient(155deg,rgb(255_255_255_/_0.15),rgb(255_255_255_/_0.05))] dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.1)_inset,0_16px_34px_-18px_rgb(0_0_0_/_0.64)] dark:before:via-white/22",
    title: "font-medium tracking-tight text-[var(--color-foreground)]",
    description: "text-neutral-600 dark:text-neutral-300",
    actionButton:
      "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-white",
    cancelButton:
      "bg-black/[0.05] text-neutral-700 hover:bg-black/[0.09] dark:bg-white/[0.1] dark:text-neutral-200 dark:hover:bg-white/[0.15]",
    closeButton: "text-neutral-500 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white"
  },
  matte: {
    toast:
      "group relative isolate overflow-hidden border-black/12 bg-[linear-gradient(180deg,rgb(248_248_249),rgb(232_232_235))] text-[var(--color-foreground)] shadow-[0_1px_0_rgb(255_255_255_/_0.88)_inset,0_12px_28px_-18px_rgb(15_23_42_/_0.28)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(180deg,rgb(255_255_255_/_0.52),transparent)] dark:border-white/[0.16] dark:bg-[linear-gradient(180deg,rgb(50_55_63_/_0.96),rgb(33_37_44_/_0.96))] dark:shadow-[0_1px_0_rgb(255_255_255_/_0.1)_inset,0_14px_30px_-18px_rgb(0_0_0_/_0.68)] dark:before:bg-[linear-gradient(180deg,rgb(255_255_255_/_0.1),transparent)]",
    title: "font-medium tracking-tight text-[var(--color-foreground)]",
    description: "text-neutral-600 dark:text-neutral-300",
    actionButton:
      "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-white",
    cancelButton:
      "bg-black/[0.05] text-neutral-700 hover:bg-black/[0.09] dark:bg-white/[0.1] dark:text-neutral-200 dark:hover:bg-white/[0.15]",
    closeButton: "text-neutral-500 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white"
  }
}

/* ── Semantic type overrides (success/error/warning/info) ────────────────── */

const typeClassMap: Record<string, string> = {
  success:
    "border-emerald-200/70 bg-emerald-50/95 text-emerald-900 shadow-[0_10px_22px_-18px_rgb(16_185_129_/_0.5)] [&_[data-title]]:text-emerald-900 [&_[data-description]]:text-emerald-800/80 dark:border-emerald-800/45 dark:bg-emerald-950/80 dark:text-emerald-200 dark:[&_[data-title]]:text-emerald-200 dark:[&_[data-description]]:text-emerald-300/80",
  error:
    "border-red-200/70 bg-red-50/95 text-red-900 shadow-[0_10px_22px_-18px_rgb(239_68_68_/_0.5)] [&_[data-title]]:text-red-900 [&_[data-description]]:text-red-800/80 dark:border-red-800/45 dark:bg-red-950/80 dark:text-red-200 dark:[&_[data-title]]:text-red-200 dark:[&_[data-description]]:text-red-300/80",
  warning:
    "border-amber-200/70 bg-amber-50/95 text-amber-900 shadow-[0_10px_22px_-18px_rgb(245_158_11_/_0.5)] [&_[data-title]]:text-amber-900 [&_[data-description]]:text-amber-800/80 dark:border-amber-800/45 dark:bg-amber-950/80 dark:text-amber-200 dark:[&_[data-title]]:text-amber-200 dark:[&_[data-description]]:text-amber-300/80",
  info:
    "border-blue-200/70 bg-blue-50/95 text-blue-900 shadow-[0_10px_22px_-18px_rgb(59_130_246_/_0.5)] [&_[data-title]]:text-blue-900 [&_[data-description]]:text-blue-800/80 dark:border-blue-800/45 dark:bg-blue-950/80 dark:text-blue-200 dark:[&_[data-title]]:text-blue-200 dark:[&_[data-description]]:text-blue-300/80"
}

/* ── Custom icons ─────────────────────────────────────────────────────────── */

const iconClass = "size-[18px] shrink-0"

const customIcons = {
  success: <CheckCircle2 className={cn(iconClass, "text-emerald-600 dark:text-emerald-400")} />,
  info: <Info className={cn(iconClass, "text-blue-600 dark:text-blue-400")} />,
  warning: <AlertTriangle className={cn(iconClass, "text-amber-600 dark:text-amber-400")} />,
  error: <AlertCircle className={cn(iconClass, "text-red-600 dark:text-red-400")} />,
  loading: <Loader2 className={cn(iconClass, "animate-spin text-neutral-500 dark:text-neutral-400")} />,
  close: <X className="size-3.5" />
}

/* ── Toaster Component ────────────────────────────────────────────────────── */

const Toaster = React.forwardRef<HTMLElement, GlinToasterProps>(
  ({ variant = "default", className, ...props }, ref) => {
    const classes = variantClassMap[variant]

    return (
      <SonnerToaster
        ref={ref}
        className={cn("toaster group", className)}
        icons={customIcons}
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: cn(
              "flex w-full items-start gap-3 rounded-2xl border p-4 pr-3 transition-[transform,opacity,box-shadow,border-color,background-color] duration-normal ease-standard data-[mounted=true]:animate-in data-[removed=true]:animate-out data-[swipe=move]:translate-x-[var(--swipe-move-x)] data-[swipe=end]:translate-x-[var(--swipe-end-x)] data-[swipe=cancel]:translate-x-0 motion-reduce:transition-none",
              classes.toast
            ),
            title: cn("text-sm leading-tight", classes.title),
            description: cn("text-sm leading-relaxed", classes.description),
            actionButton: cn(
              "inline-flex items-center justify-center rounded-lg border border-transparent px-3 py-1.5 text-xs font-medium transition-[background-color,color,border-color] duration-fast ease-standard",
              classes.actionButton
            ),
            cancelButton: cn(
              "inline-flex items-center justify-center rounded-lg border border-transparent px-3 py-1.5 text-xs font-medium transition-[background-color,color,border-color] duration-fast ease-standard",
              classes.cancelButton
            ),
            closeButton: cn(
              "rounded-md border border-transparent bg-black/[0.04] p-0.5 transition-[background-color,color,border-color] duration-fast dark:bg-white/[0.06]",
              classes.closeButton
            ),
            success: typeClassMap.success,
            error: typeClassMap.error,
            warning: typeClassMap.warning,
            info: typeClassMap.info
          }
        }}
        {...props}
      />
    )
  }
)

Toaster.displayName = "Toaster"

export { Toaster, toast }
export type { GlinToasterProps as ToasterProps }
