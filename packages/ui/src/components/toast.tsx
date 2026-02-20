import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "../lib/cn"

export const ToastProvider = ToastPrimitives.Provider

const toastVariants = cva(
  "group pointer-events-auto relative isolate flex w-full items-start justify-between gap-3 overflow-hidden rounded-2xl border transition-[transform,opacity,box-shadow,border-color,background-color] duration-normal ease-standard data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-bottom-3 data-[state=closed]:fade-out-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] motion-reduce:transition-none motion-reduce:data-[state=open]:animate-none motion-reduce:data-[state=closed]:animate-none",
  {
    variants: {
      variant: {
        default:
          "border-black/10 bg-[linear-gradient(180deg,rgb(255_255_255),rgb(244_244_246))] text-[var(--color-foreground)] shadow-[0_1px_0_rgb(255_255_255_/_0.9)_inset,0_10px_26px_-18px_rgb(15_23_42_/_0.38)] dark:border-white/[0.14] dark:bg-[linear-gradient(180deg,rgb(56_62_72_/_0.94),rgb(37_42_50_/_0.94))] dark:shadow-[0_1px_0_rgb(255_255_255_/_0.08)_inset,0_12px_28px_-18px_rgb(0_0_0_/_0.68)]",
        glass:
          "border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[linear-gradient(155deg,rgb(255_255_255_/_0.64),rgb(246_246_246_/_0.35))] text-[var(--color-foreground)] backdrop-blur-lg backdrop-saturate-[180%] shadow-[0_0_0_1px_rgb(255_255_255_/_0.2)_inset,0_10px_26px_-18px_rgb(15_23_42_/_0.32)] dark:border-white/[0.12] dark:bg-[linear-gradient(155deg,rgb(255_255_255_/_0.14),rgb(255_255_255_/_0.05))] dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.09)_inset,0_12px_28px_-18px_rgb(0_0_0_/_0.66)]",
        frosted:
          "border-white/30 [border-top-color:var(--glass-refraction-top)] bg-[linear-gradient(155deg,rgb(255_255_255_/_0.8),rgb(246_246_246_/_0.55))] text-[var(--color-foreground)] backdrop-blur-[40px] backdrop-saturate-[200%] shadow-[0_0_0_1px_rgb(255_255_255_/_0.25)_inset,0_0_16px_rgb(255_255_255_/_0.12)_inset,0_10px_26px_-18px_rgb(15_23_42_/_0.36)] dark:border-white/[0.16] dark:bg-[linear-gradient(155deg,rgb(255_255_255_/_0.2),rgb(255_255_255_/_0.08))] dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.12)_inset,0_0_16px_rgb(255_255_255_/_0.05)_inset,0_12px_28px_-18px_rgb(0_0_0_/_0.7)]",
        matte:
          "border-black/12 bg-[linear-gradient(180deg,rgb(248_248_249),rgb(232_232_235))] text-[var(--color-foreground)] shadow-[0_1px_0_rgb(255_255_255_/_0.88)_inset,0_10px_24px_-18px_rgb(15_23_42_/_0.34)] dark:border-white/[0.16] dark:bg-[linear-gradient(180deg,rgb(50_55_63_/_0.96),rgb(33_37_44_/_0.96))] dark:shadow-[0_1px_0_rgb(255_255_255_/_0.1)_inset,0_12px_26px_-18px_rgb(0_0_0_/_0.7)]"
      },
      size: {
        sm: "p-3.5 pr-5",
        md: "p-4 pr-6",
        lg: "p-5 pr-7"
      }
    },
    defaultVariants: {
      variant: "glass",
      size: "md"
    }
  }
)

export type ToastViewportProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>

export const ToastViewport = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Viewport>,
  ToastViewportProps
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "pointer-events-none fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col gap-2 p-4 sm:bottom-3 sm:right-3 sm:max-w-[440px]",
      className
    )}
    {...props}
  />
))

ToastViewport.displayName = "ToastViewport"

export type ToastProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
  VariantProps<typeof toastVariants>

export const Toast = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Root>,
  ToastProps
>(({ className, variant, size, ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    className={cn(
      toastVariants({ variant, size }),
      className
    )}
    {...props}
  />
))

Toast.displayName = "Toast"

export type ToastTitleProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>

export const ToastTitle = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Title>,
  ToastTitleProps
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold leading-tight tracking-tight", className)}
    {...props}
  />
))

ToastTitle.displayName = "ToastTitle"

export type ToastDescriptionProps = React.ComponentPropsWithoutRef<
  typeof ToastPrimitives.Description
>

export const ToastDescription = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Description>,
  ToastDescriptionProps
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm leading-relaxed text-neutral-600 dark:text-neutral-300", className)}
    {...props}
  />
))

ToastDescription.displayName = "ToastDescription"

export type ToastCloseProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>

export const ToastClose = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Close>,
  ToastCloseProps
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-md border border-transparent bg-black/[0.04] text-neutral-500 transition-[color,background-color,border-color] duration-fast ease-standard hover:border-black/10 hover:bg-black/[0.08] hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 dark:bg-white/[0.06] dark:text-neutral-300 dark:hover:border-white/[0.18] dark:hover:bg-white/[0.12] dark:hover:text-neutral-100",
      className
    )}
    {...props}
  >
    <X className="h-3.5 w-3.5" />
    <span className="sr-only">Close</span>
  </ToastPrimitives.Close>
))

ToastClose.displayName = "ToastClose"
