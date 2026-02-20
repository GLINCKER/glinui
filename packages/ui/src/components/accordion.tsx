import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "../lib/cn"

/* ── Item Variants ─────────────────────────────────────────────────────── */

const accordionItemVariants = cva(
  "transition-[background-color,border-color,box-shadow] duration-normal ease-standard",
  {
    variants: {
      variant: {
        default:
          "rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm",
        glass:
          "relative rounded-xl border border-white/15 [border-top-color:var(--glass-refraction-top)] bg-[var(--glass-1-surface)] shadow-[0_0_0_1px_rgb(255_255_255_/_0.06)_inset,var(--shadow-glass-sm)] backdrop-blur-md backdrop-saturate-[180%]",
        frosted:
          "relative rounded-xl border border-white/25 [border-top-color:var(--glass-refraction-top)] bg-[var(--glass-2-surface)] shadow-[0_0_0_1px_rgb(255_255_255_/_0.1)_inset,0_0_16px_rgb(255_255_255_/_0.1)_inset,var(--shadow-glass-sm)] backdrop-blur-[40px] backdrop-saturate-[200%]",
        outline:
          "rounded-xl border border-[var(--color-border)] bg-transparent",
        ghost:
          "rounded-xl border border-transparent",
        separated:
          "border-b border-[var(--color-border)] last:border-b-0"
      },
      size: {
        sm: "",
        md: "",
        lg: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

/* ── Trigger Variants ──────────────────────────────────────────────────── */

const accordionTriggerVariants = cva(
  "flex w-full items-center justify-between gap-2 font-medium text-[var(--color-foreground)] transition-[color,background-color] duration-normal ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 [&[data-state=open]>svg]:rotate-180",
  {
    variants: {
      variant: {
        default: "hover:bg-black/[0.03] dark:hover:bg-white/[0.03]",
        glass: "hover:bg-white/[0.06] dark:hover:bg-white/[0.04]",
        frosted: "hover:bg-white/[0.08] dark:hover:bg-white/[0.06]",
        outline: "hover:bg-black/[0.03] dark:hover:bg-white/[0.03]",
        ghost: "hover:bg-black/[0.04] dark:hover:bg-white/[0.04]",
        separated: "hover:underline decoration-[var(--color-border)] underline-offset-4"
      },
      size: {
        sm: "px-3 py-2.5 text-sm",
        md: "px-4 py-3.5 text-sm",
        lg: "px-5 py-4 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

/* ── Content Variants ──────────────────────────────────────────────────── */

const accordionContentVariants = cva(
  "overflow-hidden text-neutral-600 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down dark:text-neutral-400",
  {
    variants: {
      variant: {
        default: "",
        glass: "",
        frosted: "",
        outline: "",
        ghost: "",
        separated: ""
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

/* ── Accordion Root ────────────────────────────────────────────────────── */

export type AccordionProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
  variant?: "default" | "glass" | "frosted" | "outline" | "ghost" | "separated"
}

export const Accordion = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(({ className, variant = "default", ...props }, ref) => (
  <AccordionPrimitive.Root
    ref={ref}
    className={cn(
      variant === "separated" ? "w-full" : "flex w-full flex-col gap-2",
      className
    )}
    {...props}
  />
))

Accordion.displayName = "Accordion"

/* ── AccordionItem ─────────────────────────────────────────────────────── */

export type AccordionItemProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> &
  VariantProps<typeof accordionItemVariants>

export const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, variant, size, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(accordionItemVariants({ variant, size }), className)}
    {...props}
  />
))

AccordionItem.displayName = "AccordionItem"

/* ── AccordionTrigger ──────────────────────────────────────────────────── */

export type AccordionTriggerProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> &
  VariantProps<typeof accordionTriggerVariants>

export const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, variant, size, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(accordionTriggerVariants({ variant, size }), className)}
      {...props}
    >
      {children}
      <ChevronDown className="size-4 shrink-0 text-neutral-500 transition-transform duration-200 ease-standard motion-reduce:transition-none dark:text-neutral-400" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))

AccordionTrigger.displayName = "AccordionTrigger"

/* ── AccordionContent ──────────────────────────────────────────────────── */

export type AccordionContentProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> &
  VariantProps<typeof accordionContentVariants> & {
    /** Padding size matching the trigger */
    contentSize?: "sm" | "md" | "lg"
  }

const contentPadding = {
  sm: "px-3 pb-3",
  md: "px-4 pb-4",
  lg: "px-5 pb-5"
} as const

export const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, children, variant, size, contentSize, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(accordionContentVariants({ variant, size }), className)}
    {...props}
  >
    <div className={contentPadding[contentSize ?? size ?? "md"]}>
      {children}
    </div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = "AccordionContent"
