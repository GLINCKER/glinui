import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

const sheetTriggerVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-surface)] text-[var(--color-foreground)] border border-[var(--color-border)]",
        glass: "backdrop-blur-md bg-surface/80 border border-white/10 text-[var(--color-foreground)]",
        outline: "bg-transparent border border-[var(--color-border)] text-[var(--color-foreground)]",
        ghost: "bg-transparent border border-transparent text-[var(--color-foreground)]"
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-11 px-5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

const sheetContentVariants = cva(
  "fixed z-50 border p-6 shadow-[var(--shadow-glass-md)] transition-transform duration-200 ease-out data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-foreground)]",
        glass: "backdrop-blur-md bg-surface/80 border border-white/10 text-[var(--color-foreground)]",
        outline: "bg-transparent border-[var(--color-border)] text-[var(--color-foreground)]",
        ghost: "bg-transparent border-transparent text-[var(--color-foreground)]"
      },
      size: {
        sm: "",
        md: "",
        lg: ""
      },
      side: {
        top: "inset-x-0 top-0 border-b rounded-b-xl data-[state=closed]:-translate-y-full data-[state=open]:translate-y-0",
        bottom:
          "inset-x-0 bottom-0 border-t rounded-t-xl data-[state=closed]:translate-y-full data-[state=open]:translate-y-0",
        left: "inset-y-0 left-0 h-full border-r rounded-r-xl data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0",
        right:
          "inset-y-0 right-0 h-full border-l rounded-l-xl data-[state=closed]:translate-x-full data-[state=open]:translate-x-0"
      }
    },
    compoundVariants: [
      { side: "left", size: "sm", className: "w-72" },
      { side: "left", size: "md", className: "w-96" },
      { side: "left", size: "lg", className: "w-[32rem]" },
      { side: "right", size: "sm", className: "w-72" },
      { side: "right", size: "md", className: "w-96" },
      { side: "right", size: "lg", className: "w-[32rem]" },
      { side: "top", size: "sm", className: "h-56" },
      { side: "top", size: "md", className: "h-72" },
      { side: "top", size: "lg", className: "h-80" },
      { side: "bottom", size: "sm", className: "h-56" },
      { side: "bottom", size: "md", className: "h-72" },
      { side: "bottom", size: "lg", className: "h-80" }
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      side: "right"
    }
  }
)

export const Sheet = DialogPrimitive.Root
export const Drawer = Sheet

export const SheetTrigger = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger> & VariantProps<typeof sheetTriggerVariants>
>(({ className, variant, size, ...props }, ref) => (
  <DialogPrimitive.Trigger
    ref={ref}
    className={cn(sheetTriggerVariants({ variant, size }), className)}
    {...props}
  />
))

SheetTrigger.displayName = DialogPrimitive.Trigger.displayName

export const SheetClose = DialogPrimitive.Close

export const SheetPortal = (props: DialogPrimitive.DialogPortalProps) => <DialogPrimitive.Portal {...props} />

export const SheetOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-200 data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
      className
    )}
    {...props}
  />
))

SheetOverlay.displayName = DialogPrimitive.Overlay.displayName

export const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & VariantProps<typeof sheetContentVariants>
>(({ className, children, variant, size, side, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(sheetContentVariants({ variant, size, side }), className)}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </SheetPortal>
))

SheetContent.displayName = DialogPrimitive.Content.displayName

export const SheetHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex flex-col space-y-1.5 text-left", className)} {...props} />
)

SheetHeader.displayName = "SheetHeader"

export const SheetFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />
  )
)

SheetFooter.displayName = "SheetFooter"

export const SheetTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
))

SheetTitle.displayName = DialogPrimitive.Title.displayName

export const SheetDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("text-sm text-neutral-600", className)} {...props} />
))

SheetDescription.displayName = DialogPrimitive.Description.displayName
