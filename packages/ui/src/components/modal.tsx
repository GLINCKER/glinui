import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "../lib/cn"

export type ModalProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>

export const Modal = DialogPrimitive.Root
export const ModalTrigger = DialogPrimitive.Trigger
export const ModalClose = DialogPrimitive.Close

export type ModalPortalProps = DialogPrimitive.DialogPortalProps

export const ModalPortal = (props: ModalPortalProps) => (
  <DialogPrimitive.Portal {...props} />
)

const modalContentVariants = cva(
  "fixed left-1/2 top-1/2 z-50 grid w-[min(92vw,34rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl border p-6 text-[var(--color-foreground)] outline-none duration-normal ease-standard data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:slide-in-from-bottom-3 data-[state=closed]:slide-out-to-bottom-3 motion-reduce:transition-none motion-reduce:data-[state=open]:animate-none motion-reduce:data-[state=closed]:animate-none",
  {
    variants: {
      variant: {
        default:
          "border-black/10 bg-[linear-gradient(180deg,rgb(255_255_255),rgb(244_244_246))] shadow-[0_1px_0_rgb(255_255_255_/_0.9)_inset,0_24px_50px_-30px_rgb(15_23_42_/_0.45)] dark:border-white/[0.14] dark:bg-[linear-gradient(180deg,rgb(58_64_74_/_0.94),rgb(38_42_50_/_0.94))] dark:shadow-[0_1px_0_rgb(255_255_255_/_0.08)_inset,0_26px_52px_-30px_rgb(0_0_0_/_0.72)]",
        glass:
          "border-white/20 [border-top-color:var(--glass-refraction-top)] bg-[linear-gradient(155deg,rgb(255_255_255_/_0.65),rgb(244_244_244_/_0.35))] backdrop-blur-xl backdrop-saturate-[180%] shadow-[0_0_0_1px_rgb(255_255_255_/_0.2)_inset,0_24px_50px_-30px_rgb(15_23_42_/_0.35)] dark:border-white/[0.12] dark:bg-[linear-gradient(155deg,rgb(255_255_255_/_0.14),rgb(255_255_255_/_0.05))] dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.1)_inset,0_26px_52px_-30px_rgb(0_0_0_/_0.7)]",
        frosted:
          "border-white/30 [border-top-color:var(--glass-refraction-top)] bg-[linear-gradient(155deg,rgb(255_255_255_/_0.82),rgb(244_244_244_/_0.55))] backdrop-blur-[40px] backdrop-saturate-[200%] shadow-[0_0_0_1px_rgb(255_255_255_/_0.25)_inset,0_0_20px_rgb(255_255_255_/_0.15)_inset,0_24px_50px_-30px_rgb(15_23_42_/_0.4)] dark:border-white/[0.16] dark:bg-[linear-gradient(155deg,rgb(255_255_255_/_0.2),rgb(255_255_255_/_0.08))] dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.12)_inset,0_0_20px_rgb(255_255_255_/_0.06)_inset,0_26px_52px_-30px_rgb(0_0_0_/_0.75)]",
        matte:
          "border-black/12 bg-[linear-gradient(180deg,rgb(248_248_249),rgb(234_234_236))] shadow-[0_1px_0_rgb(255_255_255_/_0.88)_inset,0_20px_42px_-28px_rgb(15_23_42_/_0.4)] dark:border-white/[0.16] dark:bg-[linear-gradient(180deg,rgb(50_55_63_/_0.96),rgb(33_37_44_/_0.96))] dark:shadow-[0_1px_0_rgb(255_255_255_/_0.1)_inset,0_22px_44px_-28px_rgb(0_0_0_/_0.7)]"
      },
      size: {
        sm: "w-[min(92vw,28rem)] p-5",
        md: "w-[min(92vw,34rem)] p-6",
        lg: "w-[min(94vw,42rem)] p-7"
      }
    },
    defaultVariants: {
      variant: "glass",
      size: "md"
    }
  }
)

export type ModalOverlayProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>

export const ModalOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  ModalOverlayProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-[radial-gradient(circle_at_top,rgb(15_23_42_/_0.24),rgb(2_6_23_/_0.52))] backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 duration-normal ease-standard motion-reduce:data-[state=open]:animate-none motion-reduce:data-[state=closed]:animate-none dark:bg-[radial-gradient(circle_at_top,rgb(15_23_42_/_0.36),rgb(2_6_23_/_0.74))]",
      className
    )}
    {...props}
  />
))

ModalOverlay.displayName = "ModalOverlay"

export type ModalContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
  VariantProps<typeof modalContentVariants>

export const ModalContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(({ className, children, variant, size, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        modalContentVariants({ variant, size }),
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-transparent bg-black/[0.04] text-[var(--color-foreground)]/70 transition-[background-color,color,border-color] duration-fast ease-standard hover:border-black/10 hover:bg-black/[0.07] hover:text-[var(--color-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 dark:bg-white/[0.06] dark:hover:border-white/[0.16] dark:hover:bg-white/[0.11]">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </ModalPortal>
))

ModalContent.displayName = "ModalContent"

export type ModalHeaderProps = React.HTMLAttributes<HTMLDivElement>

export const ModalHeader = ({ className, ...props }: ModalHeaderProps) => (
  <div className={cn("flex flex-col gap-1.5 text-left", className)} {...props} />
)

export type ModalFooterProps = React.HTMLAttributes<HTMLDivElement>

export const ModalFooter = ({ className, ...props }: ModalFooterProps) => (
  <div
    className={cn("mt-2 flex flex-col-reverse gap-2 border-t border-black/10 pt-4 sm:flex-row sm:justify-end dark:border-white/[0.12]", className)}
    {...props}
  />
)

export type ModalTitleProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>

export const ModalTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  ModalTitleProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold tracking-tight", className)} {...props} />
))

ModalTitle.displayName = "ModalTitle"

export type ModalDescriptionProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>

export const ModalDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  ModalDescriptionProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm leading-relaxed text-neutral-600 dark:text-neutral-300", className)}
    {...props}
  />
))

ModalDescription.displayName = "ModalDescription"
