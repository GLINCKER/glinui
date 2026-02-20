import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

const alertDialogContentVariants = cva(
  "fixed left-1/2 top-1/2 z-50 grid w-[min(92vw,32rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl border p-6 text-[var(--color-foreground)] outline-none duration-normal ease-standard data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:slide-in-from-bottom-3 data-[state=closed]:slide-out-to-bottom-3 motion-reduce:transition-none motion-reduce:data-[state=open]:animate-none motion-reduce:data-[state=closed]:animate-none",
  {
    variants: {
      variant: {
        default:
          "border-black/10 bg-[linear-gradient(180deg,rgb(255_255_255),rgb(244_244_246))] shadow-[0_1px_0_rgb(255_255_255_/_0.9)_inset,0_24px_50px_-30px_rgb(15_23_42_/_0.45)] dark:border-white/[0.14] dark:bg-[linear-gradient(180deg,rgb(58_64_74_/_0.94),rgb(38_42_50_/_0.94))] dark:shadow-[0_1px_0_rgb(255_255_255_/_0.08)_inset,0_26px_52px_-30px_rgb(0_0_0_/_0.72)]",
        glass:
          "border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[linear-gradient(155deg,rgb(255_255_255_/_0.66),rgb(245_245_245_/_0.35))] backdrop-blur-xl backdrop-saturate-[180%] shadow-[0_0_0_1px_rgb(255_255_255_/_0.2)_inset,0_24px_50px_-30px_rgb(15_23_42_/_0.35)] dark:border-white/[0.12] dark:bg-[linear-gradient(155deg,rgb(255_255_255_/_0.14),rgb(255_255_255_/_0.05))] dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.1)_inset,0_26px_52px_-30px_rgb(0_0_0_/_0.7)]",
        matte:
          "border-black/12 bg-[linear-gradient(180deg,rgb(248_248_249),rgb(234_234_236))] shadow-[0_1px_0_rgb(255_255_255_/_0.88)_inset,0_20px_42px_-28px_rgb(15_23_42_/_0.4)] dark:border-white/[0.16] dark:bg-[linear-gradient(180deg,rgb(50_55_63_/_0.96),rgb(33_37_44_/_0.96))] dark:shadow-[0_1px_0_rgb(255_255_255_/_0.1)_inset,0_22px_44px_-28px_rgb(0_0_0_/_0.7)]"
      },
      size: {
        sm: "w-[min(92vw,28rem)] p-5",
        md: "w-[min(92vw,32rem)] p-6",
        lg: "w-[min(94vw,38rem)] p-7"
      }
    },
    defaultVariants: {
      variant: "glass",
      size: "md"
    }
  }
)

const alertDialogActionVariants = cva(
  "inline-flex h-10 items-center justify-center rounded-lg border border-transparent px-4 text-sm font-medium transition-[background-color,color,border-color] duration-fast ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-white",
        glass:
          "border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[linear-gradient(155deg,rgb(255_255_255_/_0.66),rgb(246_246_246_/_0.36))] text-[var(--color-foreground)] backdrop-blur-lg backdrop-saturate-[180%] hover:bg-[linear-gradient(155deg,rgb(255_255_255_/_0.78),rgb(249_249_249_/_0.45))] dark:border-white/[0.12] dark:bg-[linear-gradient(155deg,rgb(255_255_255_/_0.15),rgb(255_255_255_/_0.06))] dark:hover:bg-[linear-gradient(155deg,rgb(255_255_255_/_0.2),rgb(255_255_255_/_0.08))]",
        matte:
          "border-black/12 bg-[linear-gradient(180deg,rgb(248_248_249),rgb(232_232_235))] text-[var(--color-foreground)] hover:bg-[linear-gradient(180deg,rgb(252_252_252),rgb(238_238_240))] dark:border-white/[0.16] dark:bg-[linear-gradient(180deg,rgb(50_55_63_/_0.96),rgb(33_37_44_/_0.96))] dark:hover:bg-[linear-gradient(180deg,rgb(56_61_69_/_0.96),rgb(38_42_50_/_0.96))]"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

const alertDialogCancelVariants = cva(
  "inline-flex h-10 items-center justify-center rounded-lg border border-black/12 bg-black/[0.03] px-4 text-sm font-medium text-[var(--color-foreground)] transition-[background-color,color,border-color] duration-fast ease-standard hover:bg-black/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 dark:border-white/[0.16] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]"
)

export const AlertDialog = AlertDialogPrimitive.Root
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger
export const AlertDialogPortal = AlertDialogPrimitive.Portal

export const AlertDialogOverlay = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-[radial-gradient(circle_at_top,rgb(15_23_42_/_0.24),rgb(2_6_23_/_0.52))] backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 duration-normal ease-standard motion-reduce:data-[state=open]:animate-none motion-reduce:data-[state=closed]:animate-none dark:bg-[radial-gradient(circle_at_top,rgb(15_23_42_/_0.36),rgb(2_6_23_/_0.74))]",
      className
    )}
    {...props}
  />
))

AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

export type AlertDialogContentProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Content
> &
  VariantProps<typeof alertDialogContentVariants>

export const AlertDialogContent = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Content>,
  AlertDialogContentProps
>(({ className, variant, size, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(alertDialogContentVariants({ variant, size }), className)}
      {...props}
    />
  </AlertDialogPortal>
))

AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

export const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-2 text-left", className)} {...props} />
)

export const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse gap-2 border-t border-black/10 pt-4 sm:flex-row sm:justify-end dark:border-white/[0.12]",
      className
    )}
    {...props}
  />
)

export const AlertDialogTitle = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold tracking-tight", className)}
    {...props}
  />
))

AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

export const AlertDialogDescription = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm leading-relaxed text-neutral-600 dark:text-neutral-300", className)}
    {...props}
  />
))

AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName

export type AlertDialogActionProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Action
> &
  VariantProps<typeof alertDialogActionVariants>

export const AlertDialogAction = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Action>,
  AlertDialogActionProps
>(({ className, variant, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(alertDialogActionVariants({ variant }), className)}
    {...props}
  />
))

AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

export const AlertDialogCancel = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(alertDialogCancelVariants(), className)}
    {...props}
  />
))

AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName
