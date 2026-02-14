import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

const tabsListVariants = cva("inline-flex items-center rounded-md p-1", {
  variants: {
    variant: {
      default: "bg-[var(--color-surface)] border border-[var(--color-border)]",
      glass: "backdrop-blur-md bg-surface/80 border border-white/10",
      outline: "bg-transparent border border-[var(--color-border)]",
      ghost: "bg-transparent border border-transparent"
    },
    size: {
      sm: "h-8 gap-1",
      md: "h-10 gap-1.5",
      lg: "h-11 gap-2"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
})

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm",
  {
    variants: {
      variant: {
        default:
          "text-[var(--color-foreground)] data-[state=active]:bg-[var(--color-background)] data-[state=active]:text-[var(--color-foreground)]",
        glass:
          "text-[var(--color-foreground)] data-[state=active]:backdrop-blur-md data-[state=active]:bg-surface/80 data-[state=active]:border data-[state=active]:border-white/10",
        outline:
          "text-[var(--color-foreground)] border border-transparent data-[state=active]:border-[var(--color-border)] data-[state=active]:bg-[var(--color-background)]",
        ghost:
          "text-[var(--color-foreground)] data-[state=active]:bg-[var(--color-surface)]"
      },
      size: {
        sm: "h-6 px-2 text-xs",
        md: "h-8 px-3",
        lg: "h-9 px-4"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

const tabsContentVariants = cva(
  "mt-2 rounded-md border text-[var(--color-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-surface)] border-[var(--color-border)]",
        glass: "backdrop-blur-md bg-surface/80 border border-white/10",
        outline: "bg-transparent border-[var(--color-border)]",
        ghost: "bg-transparent border-transparent"
      },
      size: {
        sm: "p-2 text-xs",
        md: "p-3 text-sm",
        lg: "p-4 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

export const Tabs = TabsPrimitive.Root

type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>

export const TabsList = React.forwardRef<React.ComponentRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, variant, size, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListVariants({ variant, size }), className)}
      {...props}
    />
  )
)

TabsList.displayName = "TabsList"

type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
  VariantProps<typeof tabsTriggerVariants>

export const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, size, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant, size }), className)}
    {...props}
  />
))

TabsTrigger.displayName = "TabsTrigger"

type TabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> &
  VariantProps<typeof tabsContentVariants>

export const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, variant, size, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(tabsContentVariants({ variant, size }), className)}
    {...props}
  />
))

TabsContent.displayName = "TabsContent"
