import * as React from "react"

import { cn } from "../lib/cn"

export type SelectOption = {
  label: string
  value: string
  disabled?: boolean
}

export type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
  options: SelectOption[]
  placeholder?: string
  size?: "sm" | "md" | "lg"
}

const sizeClasses: Record<NonNullable<SelectProps["size"]>, string> = {
  sm: "h-8",
  md: "h-10",
  lg: "h-11"
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, size = "md", ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[var(--color-foreground)] shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
          sizeClasses[size],
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
