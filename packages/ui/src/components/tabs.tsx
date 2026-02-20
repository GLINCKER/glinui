import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

const tabsListVariants = cva(
  "inline-flex items-center rounded-xl border p-1 transition-[background-color,border-color,box-shadow] duration-fast ease-standard motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default: "border-[var(--color-border)] bg-[var(--color-surface)]",
        glass: "backdrop-blur-md bg-[var(--glass-1-surface)] border border-white/15 [border-top-color:var(--glass-refraction-top)]",
        outline: "bg-transparent border border-[var(--color-border)]",
        ghost: "bg-transparent border border-transparent",
        liquid:
          "border-white/25 [border-top-color:var(--glass-refraction-top)] bg-[radial-gradient(circle_at_16%_14%,rgb(255_255_255_/_0.72),transparent_46%),linear-gradient(165deg,rgb(255_255_255_/_0.58),rgb(238_238_238_/_0.32))] dark:border-white/[0.14] dark:[border-top-color:rgb(255_255_255_/_0.32)] dark:bg-[linear-gradient(165deg,rgb(255_255_255_/_0.12),rgb(255_255_255_/_0.05))]",
        matte:
          "border-black/10 bg-[linear-gradient(180deg,rgb(250_250_250),rgb(236_236_238))] dark:border-white/[0.14] dark:bg-[linear-gradient(180deg,rgb(55_60_70_/_0.9),rgb(37_42_50_/_0.9))]"
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
  }
)

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-[background-color,color,border-color,box-shadow] duration-fast ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/35 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default:
          "text-[var(--color-foreground)]/80 data-[state=active]:bg-[var(--color-background)] data-[state=active]:text-[var(--color-foreground)] data-[state=active]:shadow-[0_8px_16px_-14px_rgb(2_6_23_/_0.5)]",
        glass:
          "text-[var(--color-foreground)]/80 data-[state=active]:border data-[state=active]:border-white/20 data-[state=active]:[border-top-color:var(--glass-refraction-top)] data-[state=active]:bg-[var(--glass-2-surface)] data-[state=active]:text-[var(--color-foreground)] data-[state=active]:shadow-[0_0_0_1px_rgb(255_255_255_/_0.18)_inset] dark:data-[state=active]:border-white/[0.12]",
        outline:
          "text-[var(--color-foreground)]/80 border border-transparent data-[state=active]:border-[var(--color-border)] data-[state=active]:bg-[var(--color-surface)] data-[state=active]:text-[var(--color-foreground)]",
        ghost:
          "text-[var(--color-foreground)]/75 data-[state=active]:bg-[var(--color-foreground)]/[0.08] data-[state=active]:text-[var(--color-foreground)] dark:data-[state=active]:bg-white/[0.12]",
        liquid:
          "text-[var(--color-foreground)]/80 data-[state=active]:border data-[state=active]:border-white/25 data-[state=active]:bg-[linear-gradient(165deg,rgb(255_255_255_/_0.72),rgb(244_244_244_/_0.36))] data-[state=active]:text-[var(--color-foreground)] data-[state=active]:shadow-[0_0_0_1px_rgb(255_255_255_/_0.2)_inset] dark:data-[state=active]:border-white/[0.14] dark:data-[state=active]:bg-[linear-gradient(165deg,rgb(255_255_255_/_0.16),rgb(255_255_255_/_0.06))]",
        matte:
          "text-[var(--color-foreground)]/80 data-[state=active]:bg-black/[0.06] data-[state=active]:text-[var(--color-foreground)] dark:data-[state=active]:bg-white/[0.12]"
      },
      size: {
        sm: "h-6 px-2 text-xs",
        md: "h-8 px-3 text-sm",
        lg: "h-9 px-4 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

const tabsContentVariants = cva(
  "mt-2 rounded-xl border text-[var(--color-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/35 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-surface)] border-[var(--color-border)]",
        glass: "backdrop-blur-md bg-[var(--glass-1-surface)] border border-white/15 [border-top-color:var(--glass-refraction-top)]",
        outline: "bg-transparent border-[var(--color-border)]",
        ghost: "bg-transparent border-transparent",
        liquid:
          "border-white/25 [border-top-color:var(--glass-refraction-top)] bg-[radial-gradient(circle_at_16%_14%,rgb(255_255_255_/_0.72),transparent_46%),linear-gradient(165deg,rgb(255_255_255_/_0.58),rgb(238_238_238_/_0.32))] dark:border-white/[0.14] dark:[border-top-color:rgb(255_255_255_/_0.32)] dark:bg-[linear-gradient(165deg,rgb(255_255_255_/_0.12),rgb(255_255_255_/_0.05))]",
        matte:
          "border-black/10 bg-[linear-gradient(180deg,rgb(250_250_250),rgb(236_236_238))] dark:border-white/[0.14] dark:bg-[linear-gradient(180deg,rgb(55_60_70_/_0.9),rgb(37_42_50_/_0.9))]"
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

export type TabsProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>

export const Tabs = TabsPrimitive.Root

export type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
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

export type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
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

export type TabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> &
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
