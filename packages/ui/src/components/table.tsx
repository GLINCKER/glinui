"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

const tableWrapperVariants = cva("relative w-full overflow-auto rounded-xl border", {
  variants: {
    variant: {
      default: "border-[var(--color-border)] bg-[var(--color-surface)]",
      glass: "glass-2",
      outline: "border-[var(--color-border)] bg-transparent",
      ghost: "border-transparent bg-transparent",
      liquid:
        "border-white/25 [border-top-color:rgb(255_255_255_/_0.76)] bg-[radial-gradient(circle_at_16%_10%,rgb(255_255_255_/_0.72),transparent_45%),linear-gradient(165deg,rgb(255_255_255_/_0.62),rgb(236_236_236_/_0.32))] backdrop-blur-xl dark:border-white/[0.14] dark:[border-top-color:rgb(255_255_255_/_0.3)] dark:bg-[linear-gradient(165deg,rgb(255_255_255_/_0.12),rgb(255_255_255_/_0.05))]",
      matte:
        "border-black/10 bg-[linear-gradient(180deg,rgb(252_252_252),rgb(241_241_243))] dark:border-white/[0.12] dark:bg-[linear-gradient(180deg,rgb(56_60_69_/_0.9),rgb(38_42_50_/_0.9))]"
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
})

const tableHeadCellVariants = cva(
  "align-middle font-medium text-neutral-500 dark:text-neutral-400 [&:has([role=checkbox])]:pr-0",
  {
    variants: {
      size: {
        sm: "h-8 px-2",
        md: "h-10 px-3",
        lg: "h-12 px-4"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
)

const tableCellVariants = cva("align-middle [&:has([role=checkbox])]:pr-0", {
  variants: {
    size: {
      sm: "p-2",
      md: "p-3",
      lg: "p-4"
    }
  },
  defaultVariants: {
    size: "md"
  }
})

const tableAlignmentVariants = cva("", {
  variants: {
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right"
    }
  },
  defaultVariants: {
    align: "left"
  }
})

const tableRowToneVariants = cva("", {
  variants: {
    tone: {
      default: "",
      info: "bg-sky-500/[0.04] dark:bg-sky-400/[0.08]",
      success: "bg-emerald-500/[0.04] dark:bg-emerald-400/[0.08]",
      warning: "bg-amber-500/[0.05] dark:bg-amber-400/[0.1]",
      danger: "bg-rose-500/[0.05] dark:bg-rose-400/[0.1]"
    }
  },
  defaultVariants: {
    tone: "default"
  }
})

type TableContextValue = {
  variant: NonNullable<VariantProps<typeof tableWrapperVariants>["variant"]>
  size: NonNullable<VariantProps<typeof tableWrapperVariants>["size"]>
  striped: boolean
  interactive: boolean
  stickyHeader: boolean
  stickyFirstColumn: boolean
  grid: boolean
  noWrap: boolean
  rowDividers: boolean
}

const TableContext = React.createContext<TableContextValue>({
  variant: "default",
  size: "md",
  striped: false,
  interactive: true,
  stickyHeader: false,
  stickyFirstColumn: false,
  grid: false,
  noWrap: false,
  rowDividers: true
})

function useTableContext() {
  return React.useContext(TableContext)
}

function getStickySurfaceClass(variant: TableContextValue["variant"]) {
  switch (variant) {
    case "glass":
      return "bg-[var(--glass-2-surface)]"
    case "liquid":
      return "bg-[var(--color-surface)]/95 backdrop-blur-md"
    case "matte":
      return "bg-[var(--color-surface)]"
    case "ghost":
      return "bg-[var(--color-background)]"
    case "outline":
      return "bg-[var(--color-background)]"
    default:
      return "bg-[var(--color-surface)]"
  }
}

function getFirstStickySurfaceClass(variant: TableContextValue["variant"]) {
  switch (variant) {
    case "glass":
      return "first:bg-[var(--glass-2-surface)]"
    case "liquid":
      return "first:bg-[var(--color-surface)]/95 first:backdrop-blur-md"
    case "matte":
      return "first:bg-[var(--color-surface)]"
    case "ghost":
      return "first:bg-[var(--color-background)]"
    case "outline":
      return "first:bg-[var(--color-background)]"
    default:
      return "first:bg-[var(--color-surface)]"
  }
}

export type TableProps = React.HTMLAttributes<HTMLTableElement> &
  VariantProps<typeof tableWrapperVariants> & {
    containerClassName?: string
    striped?: boolean
    interactive?: boolean
    stickyHeader?: boolean
    stickyFirstColumn?: boolean
    grid?: boolean
    noWrap?: boolean
    rowDividers?: boolean
    layout?: "auto" | "fixed"
  }

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      className,
      variant,
      size,
      containerClassName,
      striped = false,
      interactive = true,
      stickyHeader = false,
      stickyFirstColumn = false,
      grid = false,
      noWrap = false,
      rowDividers = true,
      layout = "auto",
      ...props
    },
    ref
  ) => {
    const resolvedVariant = variant ?? "default"
    const resolvedSize = size ?? "md"

    return (
      <TableContext.Provider
        value={{
          variant: resolvedVariant,
          size: resolvedSize,
          striped,
          interactive,
          stickyHeader,
          stickyFirstColumn,
          grid,
          noWrap,
          rowDividers
        }}
      >
        <div
          data-slot="table-container"
          className={cn(
            tableWrapperVariants({ variant: resolvedVariant, size: resolvedSize }),
            containerClassName
          )}
        >
          <table
            ref={ref}
            data-slot="table"
            className={cn(
              "w-full caption-bottom",
              layout === "fixed" ? "table-fixed" : "table-auto",
              className
            )}
            {...props}
          />
        </div>
      </TableContext.Provider>
    )
  }
)

Table.displayName = "Table"

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  const { stickyHeader, variant, rowDividers } = useTableContext()

  return (
    <thead
      ref={ref}
      data-slot="table-header"
      className={cn(
        rowDividers && "[&_tr]:border-b [&_tr]:border-[var(--color-border)]",
        stickyHeader && "sticky top-0 z-10",
        stickyHeader && getStickySurfaceClass(variant),
        stickyHeader && "backdrop-blur-sm",
        className
      )}
      {...props}
    />
  )
})

TableHeader.displayName = "TableHeader"

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    data-slot="table-body"
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))

TableBody.displayName = "TableBody"

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  const { variant } = useTableContext()

  return (
    <tfoot
      ref={ref}
      data-slot="table-footer"
      className={cn(
        "border-t border-[var(--color-border)] font-medium [&>tr]:last:border-b-0",
        variant === "glass" ? "bg-[var(--glass-1-surface)]" : "bg-[var(--color-surface)]/50",
        className
      )}
      {...props}
    />
  )
})

TableFooter.displayName = "TableFooter"

export type TableRowTone = NonNullable<VariantProps<typeof tableRowToneVariants>["tone"]>

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement> & {
  tone?: TableRowTone
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, tone = "default", ...props }, ref) => {
    const { variant, striped, interactive, rowDividers } = useTableContext()

    return (
      <tr
        ref={ref}
        data-slot="table-row"
        className={cn(
          rowDividers ? "border-b border-[var(--color-border)]" : "border-0",
          "transition-colors duration-fast ease-standard motion-reduce:transition-none",
          "data-[state=selected]:bg-[var(--color-surface)]",
          striped &&
            (variant === "glass"
              ? "even:bg-[var(--glass-1-surface)]/55"
              : "even:bg-[var(--color-surface)]/35"),
          interactive &&
            (variant === "glass" ? "hover:bg-[var(--glass-1-surface)]" : "hover:bg-[var(--color-surface)]/50"),
          tableRowToneVariants({ tone }),
          className
        )}
        {...props}
      />
    )
  }
)

TableRow.displayName = "TableRow"

export type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement> & {
  align?: "left" | "center" | "right"
  sticky?: boolean
}

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, align = "left", sticky = false, ...props }, ref) => {
    const { size, grid, noWrap, stickyFirstColumn, variant } = useTableContext()

    return (
      <th
        ref={ref}
        data-slot="table-head"
        className={cn(
          tableHeadCellVariants({ size }),
          tableAlignmentVariants({ align }),
          noWrap && "whitespace-nowrap",
          grid && "border-r border-[var(--color-border)] last:border-r-0",
          stickyFirstColumn &&
            "first:sticky first:left-0 first:z-[3] first:shadow-[6px_0_10px_-10px_rgb(0_0_0_/_0.35)]",
          stickyFirstColumn && getFirstStickySurfaceClass(variant),
          sticky && "sticky left-0 z-[4] shadow-[6px_0_10px_-10px_rgb(0_0_0_/_0.35)]",
          sticky && getStickySurfaceClass(variant),
          className
        )}
        {...props}
      />
    )
  }
)

TableHead.displayName = "TableHead"

export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement> & {
  align?: "left" | "center" | "right"
  truncate?: boolean
  sticky?: boolean
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, align = "left", truncate = false, sticky = false, ...props }, ref) => {
    const { size, grid, noWrap, stickyFirstColumn, variant } = useTableContext()

    return (
      <td
        ref={ref}
        data-slot="table-cell"
        className={cn(
          tableCellVariants({ size }),
          tableAlignmentVariants({ align }),
          noWrap && "whitespace-nowrap",
          truncate && "max-w-[18rem] truncate",
          grid && "border-r border-[var(--color-border)] last:border-r-0",
          stickyFirstColumn &&
            "first:sticky first:left-0 first:z-[1] first:shadow-[6px_0_10px_-10px_rgb(0_0_0_/_0.28)]",
          stickyFirstColumn && getFirstStickySurfaceClass(variant),
          sticky && "sticky left-0 z-[2] shadow-[6px_0_10px_-10px_rgb(0_0_0_/_0.28)]",
          sticky && getStickySurfaceClass(variant),
          className
        )}
        {...props}
      />
    )
  }
)

TableCell.displayName = "TableCell"

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    data-slot="table-caption"
    className={cn("mt-4 text-sm text-neutral-500", className)}
    {...props}
  />
))

TableCaption.displayName = "TableCaption"

export function TableEmpty({ colSpan, children }: { colSpan: number; children?: React.ReactNode }) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center" className="h-24 text-neutral-500 dark:text-neutral-400">
        {children ?? "No results."}
      </TableCell>
    </TableRow>
  )
}
