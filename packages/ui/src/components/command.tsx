"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { cva, type VariantProps } from "class-variance-authority"
import { Search } from "lucide-react"

import { cn } from "../lib/cn"

const commandVariants = cva(
  "flex h-full w-full flex-col overflow-hidden rounded-xl border transition-[background-color,border-color,box-shadow] duration-fast ease-standard motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default:
          "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)] shadow-[0_12px_24px_-20px_rgb(2_6_23_/_0.28)] dark:shadow-[0_12px_24px_-18px_rgb(0_0_0_/_0.45)]",
        glass:
          "bg-[var(--glass-2-surface)] backdrop-blur-xl backdrop-saturate-[180%] border-white/15 [border-top-color:var(--glass-refraction-top)] text-[var(--color-foreground)] shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)_inset,var(--shadow-glass-sm)] dark:border-white/[0.1] dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.05)_inset,0_8px_24px_rgb(0_0_0_/_0.35)]",
        frosted:
          "bg-[var(--glass-3-surface)] backdrop-blur-[40px] backdrop-saturate-[200%] border-white/25 [border-top-color:var(--glass-refraction-top)] text-[var(--color-foreground)] shadow-[0_0_0_1px_rgb(255_255_255_/_0.12)_inset,0_0_20px_rgb(255_255_255_/_0.1)_inset,var(--shadow-glass-md)] dark:border-white/[0.14] dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.07)_inset,0_0_20px_rgb(255_255_255_/_0.03)_inset,0_8px_24px_rgb(0_0_0_/_0.4)]",
        outline: "border-[var(--color-border)] bg-transparent text-[var(--color-foreground)]",
        ghost: "border-transparent bg-transparent text-[var(--color-foreground)]",
        liquid:
          "border-white/25 [border-top-color:var(--glass-refraction-top)] bg-[radial-gradient(circle_at_16%_10%,rgb(255_255_255_/_0.74),transparent_45%),linear-gradient(162deg,rgb(255_255_255_/_0.62),rgb(236_236_236_/_0.35))] text-[var(--color-foreground)] backdrop-blur-xl backdrop-saturate-[180%] shadow-[0_0_0_1px_rgb(255_255_255_/_0.2)_inset,var(--shadow-glass-md)] dark:border-white/[0.14] dark:bg-[linear-gradient(162deg,rgb(255_255_255_/_0.12),rgb(255_255_255_/_0.05))] dark:shadow-[0_0_0_1px_rgb(255_255_255_/_0.06)_inset,0_12px_36px_rgb(0_0_0_/_0.4)]",
        matte:
          "border-black/10 bg-[linear-gradient(180deg,rgb(250_250_250),rgb(236_236_238))] text-[var(--color-foreground)] dark:border-white/[0.14] dark:bg-[linear-gradient(180deg,rgb(55_60_70_/_0.9),rgb(37_42_50_/_0.9))]"
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

type CommandContextValue = {
  variant: NonNullable<VariantProps<typeof commandVariants>["variant"]>
  size: NonNullable<VariantProps<typeof commandVariants>["size"]>
}

const CommandContext = React.createContext<CommandContextValue>({
  variant: "default",
  size: "md"
})

function useCommandContext() {
  return React.useContext(CommandContext)
}

const commandInputWrapperVariants = cva(
  "flex items-center border-b transition-[background-color,border-color] duration-fast ease-standard focus-within:bg-[var(--color-foreground)]/[0.03] dark:focus-within:bg-white/[0.05]",
  {
    variants: {
      variant: {
        default: "border-[var(--color-border)]",
        glass: "border-white/12 bg-[var(--glass-1-surface)]/60",
        frosted: "border-white/16 bg-[var(--glass-2-surface)]/70",
        outline: "border-[var(--color-border)]/80 bg-transparent",
        ghost: "border-[var(--color-border)]/50 bg-transparent",
        liquid:
          "border-white/20 bg-[linear-gradient(180deg,rgb(255_255_255_/_0.35),rgb(255_255_255_/_0.12))] dark:border-white/[0.12] dark:bg-white/[0.06]",
        matte:
          "border-black/10 bg-black/[0.03] dark:border-white/[0.14] dark:bg-white/[0.05]"
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
  }
)

const commandInputVariants = cva(
  "w-full rounded-md bg-transparent outline-none placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 py-2 text-xs",
        md: "h-10 py-3 text-sm",
        lg: "h-12 py-3 text-base"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
)

const commandItemVariants = cva(
  "relative flex cursor-default select-none items-center gap-2 rounded-lg px-2.5 outline-none transition-[background-color,color,border-color,box-shadow] duration-fast ease-standard data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "data-[selected=true]:bg-[var(--color-foreground)]/[0.08] data-[selected=true]:text-[var(--color-foreground)] dark:data-[selected=true]:bg-white/[0.12]",
        glass:
          "data-[selected=true]:border data-[selected=true]:border-white/18 data-[selected=true]:bg-white/40 data-[selected=true]:text-[var(--color-foreground)] dark:data-[selected=true]:border-white/[0.12] dark:data-[selected=true]:bg-white/[0.14]",
        frosted:
          "data-[selected=true]:border data-[selected=true]:border-white/22 data-[selected=true]:bg-white/50 data-[selected=true]:text-[var(--color-foreground)] dark:data-[selected=true]:border-white/[0.14] dark:data-[selected=true]:bg-white/[0.16]",
        outline:
          "data-[selected=true]:border data-[selected=true]:border-[var(--color-border)] data-[selected=true]:bg-[var(--color-surface)] dark:data-[selected=true]:border-white/20 dark:data-[selected=true]:bg-white/[0.06]",
        ghost:
          "data-[selected=true]:bg-[var(--color-foreground)]/[0.07] dark:data-[selected=true]:bg-white/[0.1]",
        liquid:
          "data-[selected=true]:border data-[selected=true]:border-white/25 data-[selected=true]:bg-[linear-gradient(165deg,rgb(255_255_255_/_0.6),rgb(242_242_242_/_0.34))] data-[selected=true]:shadow-[0_0_0_1px_rgb(255_255_255_/_0.2)_inset] dark:data-[selected=true]:border-white/[0.14] dark:data-[selected=true]:bg-[linear-gradient(165deg,rgb(255_255_255_/_0.14),rgb(255_255_255_/_0.06))]",
        matte:
          "data-[selected=true]:bg-black/[0.06] dark:data-[selected=true]:bg-white/[0.11]"
      },
      size: {
        sm: "py-1 text-xs",
        md: "py-1.5 text-sm",
        lg: "py-2 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

export type CommandProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive> &
  VariantProps<typeof commandVariants>

export const Command = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive>,
  CommandProps
>(({ className, variant, size, ...props }, ref) => {
  const resolvedVariant = variant ?? "default"
  const resolvedSize = size ?? "md"

  return (
    <CommandContext.Provider value={{ variant: resolvedVariant, size: resolvedSize }}>
      <CommandPrimitive
        ref={ref}
        className={cn(commandVariants({ variant: resolvedVariant, size: resolvedSize }), className)}
        {...props}
      />
    </CommandContext.Provider>
  )
})

Command.displayName = "Command"

export const CommandInput = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => {
  const { size, variant } = useCommandContext()

  return (
    <div className={cn(commandInputWrapperVariants({ size, variant }))} cmdk-input-wrapper="">
      <Search
        className={cn(
          "mr-2 shrink-0 text-neutral-500",
          size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"
        )}
      />
      <CommandPrimitive.Input
        ref={ref}
        className={cn(commandInputVariants({ size }), className)}
        {...props}
      />
    </div>
  )
})

CommandInput.displayName = "CommandInput"

export const CommandList = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[320px] overflow-y-auto overflow-x-hidden p-1.5", className)}
    {...props}
  />
))

CommandList.displayName = "CommandList"

export const CommandEmpty = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty ref={ref} className={cn("py-8 text-center text-sm", className)} {...props} />
))

CommandEmpty.displayName = "CommandEmpty"

export const CommandGroup = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => {
  const { variant } = useCommandContext()

  return (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        "overflow-hidden p-1 text-[var(--color-foreground)] [&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.08em]",
        variant === "glass" || variant === "liquid" || variant === "frosted"
          ? "[&_[cmdk-group-heading]]:text-neutral-500 dark:[&_[cmdk-group-heading]]:text-neutral-300"
          : "[&_[cmdk-group-heading]]:text-neutral-500 dark:[&_[cmdk-group-heading]]:text-neutral-400",
        className
      )}
      {...props}
    />
  )
})

CommandGroup.displayName = "CommandGroup"

export const CommandSeparator = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("my-1 h-px bg-[var(--color-border)]", className)}
    {...props}
  />
))

CommandSeparator.displayName = "CommandSeparator"

export const CommandItem = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => {
  const { size, variant } = useCommandContext()

  return (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(commandItemVariants({ size, variant }), className)}
      {...props}
    />
  )
})

CommandItem.displayName = "CommandItem"

export const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("ml-auto text-[11px] tracking-[0.08em] text-neutral-400", className)} {...props} />
)

CommandShortcut.displayName = "CommandShortcut"
