import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "../lib/cn"

const accordionItemVariants = cva("rounded-md border", {
  variants: {
    variant: {
      default: "bg-[var(--color-surface)] border-[var(--color-border)]",
      glass: "backdrop-blur-md bg-surface/80 border border-white/10",
      outline: "bg-transparent border-[var(--color-border)]",
      ghost: "bg-transparent border-transparent"
    },
    size: {
      sm: "px-2",
      md: "px-3",
      lg: "px-4"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
})

const accordionTriggerVariants = cva(
  "flex w-full items-center justify-between font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "text-[var(--color-foreground)]",
        glass: "text-[var(--color-foreground)]",
        outline: "text-[var(--color-foreground)]",
        ghost: "text-[var(--color-foreground)]"
      },
      size: {
        sm: "py-2 text-sm",
        md: "py-3 text-sm",
        lg: "py-4 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

const accordionContentVariants = cva("overflow-hidden text-[var(--color-foreground)]", {
  variants: {
    variant: {
      default: "",
      glass: "",
      outline: "",
      ghost: ""
    },
    size: {
      sm: "pb-2 text-xs",
      md: "pb-3 text-sm",
      lg: "pb-4 text-base"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
})

export const Accordion = AccordionPrimitive.Root

type AccordionItemProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> &
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

type AccordionTriggerProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> &
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
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-180" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))

AccordionTrigger.displayName = "AccordionTrigger"

type AccordionContentProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> &
  VariantProps<typeof accordionContentVariants>

export const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, children, variant, size, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(accordionContentVariants({ variant, size }), className)}
    {...props}
  >
    <div>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = "AccordionContent"
