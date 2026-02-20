import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

export type SelectOption = {
  label: string
  value: string
  disabled?: boolean
}

const selectVariants = cva(
  "w-full border font-medium text-[var(--color-foreground)] transition-[background-color,border-color,box-shadow,color] duration-normal ease-standard focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none dark:[color-scheme:dark]",
  {
    variants: {
      variant: {
        default:
          "rounded-xl border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm focus-visible:border-[var(--color-accent)]/60 focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/28 focus-visible:ring-offset-1 hover:border-[var(--color-border)]/80 dark:border-white/10 dark:bg-white/[0.04] dark:focus-visible:ring-[var(--color-accent)]/20",
        glass:
          "rounded-xl border-white/24 [border-top-color:var(--glass-refraction-top)] bg-[radial-gradient(circle_at_18%_14%,rgb(255_255_255_/_0.86),transparent_44%),linear-gradient(158deg,rgb(255_255_255_/_0.7),rgb(243_247_250_/_0.46))] backdrop-blur-md backdrop-saturate-[180%] shadow-[0_0_0_1px_rgb(255_255_255_/_0.2)_inset,0_8px_18px_-14px_rgb(15_23_42_/_0.24)] focus-visible:border-white/34 focus-visible:[border-top-color:rgb(255_255_255_/_0.82)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/22 focus-visible:ring-offset-0 hover:border-white/32 dark:border-white/[0.1] dark:bg-white/[0.05] dark:focus-visible:border-white/20 dark:focus-visible:ring-white/15",
        frosted:
          "rounded-xl border-white/30 [border-top-color:var(--glass-refraction-top)] bg-[radial-gradient(circle_at_18%_14%,rgb(255_255_255_/_0.92),transparent_44%),linear-gradient(158deg,rgb(255_255_255_/_0.85),rgb(243_247_250_/_0.65))] backdrop-blur-[40px] backdrop-saturate-[200%] shadow-[0_0_0_1px_rgb(255_255_255_/_0.25)_inset,0_0_16px_rgb(255_255_255_/_0.1)_inset,0_8px_18px_-14px_rgb(15_23_42_/_0.28)] focus-visible:border-white/40 focus-visible:[border-top-color:rgb(255_255_255_/_0.88)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/24 focus-visible:ring-offset-0 hover:border-white/36 dark:border-white/[0.14] dark:bg-white/[0.08] dark:focus-visible:border-white/24 dark:focus-visible:ring-white/18",
        liquid:
          "rounded-xl border-white/24 [border-top-color:var(--glass-refraction-top)] bg-[radial-gradient(circle_at_18%_12%,rgb(255_255_255_/_0.92),transparent_42%),radial-gradient(circle_at_84%_88%,rgb(226_232_240_/_0.58),transparent_58%),linear-gradient(145deg,rgb(255_255_255_/_0.82),rgb(235_241_246_/_0.55))] backdrop-blur-xl backdrop-saturate-[180%] shadow-[0_0_0_1px_rgb(255_255_255_/_0.24)_inset,0_10px_20px_-14px_rgb(15_23_42_/_0.26)] focus-visible:border-white/36 focus-visible:[border-top-color:rgb(255_255_255_/_0.88)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/24 focus-visible:ring-offset-0 hover:border-white/34 dark:border-white/[0.12] dark:bg-[linear-gradient(145deg,rgb(255_255_255_/_0.13),rgb(255_255_255_/_0.05))] dark:focus-visible:border-white/[0.24] dark:focus-visible:ring-white/16",
        matte:
          "rounded-xl border-black/12 bg-[linear-gradient(180deg,rgb(249_250_251),rgb(237_239_242))] shadow-[0_1px_0_rgb(255_255_255_/_0.88)_inset,0_6px_14px_-12px_rgb(15_23_42_/_0.24)] focus-visible:border-black/25 focus-visible:ring-2 focus-visible:ring-black/12 focus-visible:ring-offset-0 hover:border-black/16 dark:border-white/[0.14] dark:bg-[linear-gradient(180deg,rgb(49_54_63_/_0.92),rgb(34_38_46_/_0.92))] dark:focus-visible:border-white/[0.28] dark:focus-visible:ring-white/14",
        outline:
          "rounded-xl border-[var(--color-border)] bg-transparent shadow-sm focus-visible:border-[var(--color-accent)]/70 focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/25 focus-visible:ring-offset-1 hover:border-[var(--color-foreground)]/20 dark:border-white/15 dark:focus-visible:border-[var(--color-accent)]/50",
        ghost:
          "rounded-xl border-transparent bg-transparent focus-visible:border-white/10 focus-visible:bg-[var(--glass-1-surface)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/20 focus-visible:ring-offset-0 hover:border-white/10 hover:bg-[var(--glass-1-surface)] dark:hover:bg-white/[0.06] dark:focus-visible:bg-white/[0.06]"
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-3.5 text-sm",
        lg: "h-12 px-4 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

export type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> &
  VariantProps<typeof selectVariants> & {
    options: SelectOption[]
    placeholder?: string
  }

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, variant, size, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          selectVariants({ variant, size }),
          className
        )}
        {...props}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    )
  }
)

Select.displayName = "Select"
