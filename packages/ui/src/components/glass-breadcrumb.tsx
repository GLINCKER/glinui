import * as React from "react"
import { cn } from "../lib/cn"

export interface GlassBreadcrumbItem {
  id: string
  label: React.ReactNode
  href?: string
  onClick?: () => void
}

export interface GlassBreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /** Breadcrumb items */
  items: GlassBreadcrumbItem[]
  /** Separator character */
  separator?: React.ReactNode
  /** Max items to show (rest collapsed) */
  maxItems?: number
}

export const GlassBreadcrumb = React.forwardRef<HTMLElement, GlassBreadcrumbProps>(
  (
    {
      className,
      items,
      separator = "/",
      maxItems,
      ...props
    },
    ref
  ) => {
    const visibleItems = React.useMemo(() => {
      if (!maxItems || items.length <= maxItems) return items
      const first = items[0]
      const last = items.slice(-(maxItems - 1))
      return [first, { id: "__ellipsis__", label: "..." } as GlassBreadcrumbItem, ...last]
    }, [items, maxItems])

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn(
          "inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-2 py-1 backdrop-blur-sm",
          className
        )}
        {...props}
      >
        <ol className="flex items-center gap-1">
          {visibleItems.map((item, index) => (
            <li key={item.id} className="flex items-center gap-1">
              {index > 0 && (
                <span aria-hidden="true" className="text-xs text-foreground/30">
                  {separator}
                </span>
              )}
              {item.id === "__ellipsis__" ? (
                <span className="px-1 text-sm text-foreground/40">...</span>
              ) : index === visibleItems.length - 1 ? (
                <span
                  aria-current="page"
                  className="rounded-md bg-white/10 px-2 py-0.5 text-sm font-medium text-foreground backdrop-blur-sm"
                >
                  {item.label}
                </span>
              ) : item.href ? (
                <a
                  href={item.href}
                  className="rounded-md px-2 py-0.5 text-sm text-foreground/60 transition-colors duration-200 hover:bg-white/10 hover:text-foreground"
                  onClick={item.onClick}
                >
                  {item.label}
                </a>
              ) : (
                <button
                  type="button"
                  className="rounded-md px-2 py-0.5 text-sm text-foreground/60 transition-colors duration-200 hover:bg-white/10 hover:text-foreground"
                  onClick={item.onClick}
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ol>
      </nav>
    )
  }
)

GlassBreadcrumb.displayName = "GlassBreadcrumb"
