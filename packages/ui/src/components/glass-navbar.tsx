"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"
import { usePrefersReducedMotion } from "../lib/use-prefers-reduced-motion"

const glassNavbarVariants = cva(
  "sticky top-0 z-50 w-full border text-foreground [border-color:var(--glass-border-strong)] [border-top-color:var(--glass-refraction-top)] transition-[backdrop-filter,background-color,box-shadow] duration-normal ease-standard motion-reduce:transition-none",
  {
    variants: {
      elevation: {
        base: "bg-[var(--glass-2-surface)] [backdrop-filter:saturate(var(--glass-saturate))_blur(var(--glass-2-blur))] [-webkit-backdrop-filter:saturate(var(--glass-saturate))_blur(var(--glass-2-blur))] shadow-[0_0_0_1px_var(--glass-border-strong),0_1px_0_var(--glass-refraction-top)_inset,var(--glass-2-shadow)]",
        scrolled:
          "bg-[var(--glass-4-surface)] [backdrop-filter:saturate(var(--glass-saturate))_blur(var(--glass-4-blur))] [-webkit-backdrop-filter:saturate(var(--glass-saturate))_blur(var(--glass-4-blur))] shadow-[0_0_0_1px_var(--glass-border-strong),0_1px_0_var(--glass-refraction-top)_inset,var(--glass-4-shadow)]"
      },
      size: {
        sm: "min-h-12",
        md: "min-h-14",
        lg: "min-h-16"
      }
    },
    defaultVariants: {
      elevation: "base",
      size: "md"
    }
  }
)

export type GlassNavbarProps = React.HTMLAttributes<HTMLElement> &
  Omit<VariantProps<typeof glassNavbarVariants>, "elevation"> & {
    scrollThreshold?: number
    disableScrollTracking?: boolean
    elevation?: VariantProps<typeof glassNavbarVariants>["elevation"]
  }

export const GlassNavbar = React.forwardRef<HTMLElement, GlassNavbarProps>(
  (
    {
      className,
      children,
      size,
      elevation,
      scrollThreshold = 8,
      disableScrollTracking = false,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = usePrefersReducedMotion()
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
      if (disableScrollTracking || typeof window === "undefined") {
        return
      }

      const update = () => {
        setIsScrolled(window.scrollY > scrollThreshold)
      }

      update()
      window.addEventListener("scroll", update, { passive: true })

      return () => {
        window.removeEventListener("scroll", update)
      }
    }, [disableScrollTracking, scrollThreshold])

    const resolvedElevation = elevation ?? (isScrolled ? "scrolled" : "base")

    return (
      <nav
        ref={ref}
        className={cn(
          glassNavbarVariants({ elevation: resolvedElevation, size }),
          prefersReducedMotion ? "transition-none" : null,
          className
        )}
        {...props}
      >
        {children}
      </nav>
    )
  }
)

GlassNavbar.displayName = "GlassNavbar"
