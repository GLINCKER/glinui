"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronRight, Folder, FolderOpen, FileText } from "lucide-react"

import { cn } from "../lib/cn"

/* ── Variants ──────────────────────────────────────────────────────────── */

const treeVariants = cva("w-full rounded-lg border text-sm", {
  variants: {
    variant: {
      default: "border-border/60 bg-[var(--color-surface)]",
      glass: "backdrop-blur-md border-white/10 bg-[var(--glass-1-surface)]",
      outline: "border-border/60 bg-transparent",
      ghost: "border-transparent bg-transparent"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

/* ── Types ─────────────────────────────────────────────────────────────── */

export type TreeNode = {
  /** Display label */
  label: string
  /** Optional href — makes the node a link */
  href?: string
  /** Open link in new tab */
  external?: boolean
  /** Optional badge text shown after the label */
  badge?: string
  /** Badge color variant */
  badgeVariant?: "default" | "success" | "warning" | "info" | "destructive"
  /** Nested children — presence makes this a folder */
  children?: TreeNode[]
  /** Custom icon override */
  icon?: React.ReactNode
}

export type TreeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof treeVariants> & {
    /** Extra classes for the tree root wrapper. */
    className?: string
    /** Tree data */
    nodes: TreeNode[]
    /** Expand all folders by default */
    defaultExpanded?: boolean
  }

/* ── TreeNodeItem (recursive) ──────────────────────────────────────────── */

const badgeColors = {
  default: "bg-neutral-100/60 text-neutral-600 dark:bg-white/[0.06] dark:text-neutral-400",
  success: "bg-emerald-100/60 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  warning: "bg-amber-100/60 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  info: "bg-blue-100/60 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  destructive: "bg-red-100/60 text-red-700 dark:bg-red-900/30 dark:text-red-400"
} as const

function TreeNodeItem({
  node,
  depth,
  defaultExpanded
}: {
  node: TreeNode
  depth: number
  defaultExpanded: boolean
}) {
  const isFolder = node.children && node.children.length > 0
  const [expanded, setExpanded] = React.useState(defaultExpanded)

  const paddingLeft = 12 + depth * 16

  const content = (
    <>
      {isFolder ? (
        <span className="text-neutral-400 dark:text-neutral-500">
          {expanded ? <FolderOpen className="size-4" /> : <Folder className="size-4" />}
        </span>
      ) : (
        <span className="text-neutral-400 dark:text-neutral-500">
          {node.icon ?? <FileText className="size-3.5" />}
        </span>
      )}
      <span className={cn("truncate", isFolder ? "font-medium text-foreground" : "font-mono text-neutral-700 dark:text-neutral-300")}>
        {node.label}
      </span>
      {node.badge && (
        <span className={cn("ml-auto shrink-0 rounded-md border border-current/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider", badgeColors[node.badgeVariant ?? "default"])}>
          {node.badge}
        </span>
      )}
    </>
  )

  if (isFolder) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center gap-2 py-1.5 text-left transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
          style={{ paddingLeft }}
        >
          <ChevronRight className={cn("size-3 shrink-0 text-neutral-400 transition-transform duration-150", expanded && "rotate-90")} />
          {content}
        </button>
        {expanded && (
          <div>
            {node.children!.map((child, i) => (
              <TreeNodeItem key={`${child.label}-${i}`} node={child} depth={depth + 1} defaultExpanded={defaultExpanded} />
            ))}
          </div>
        )}
      </div>
    )
  }

  const sharedClassName = "flex w-full items-center gap-2 py-1.5 transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"

  if (node.href) {
    return (
      <a
        href={node.href}
        target={node.external ? "_blank" : undefined}
        rel={node.external ? "noopener noreferrer" : undefined}
        className={sharedClassName}
        style={{ paddingLeft: paddingLeft + 15 }}
      >
        {content}
      </a>
    )
  }

  return (
    <div className={sharedClassName} style={{ paddingLeft: paddingLeft + 15 }}>
      {content}
    </div>
  )
}

/* ── Tree ──────────────────────────────────────────────────────────────── */

export const Tree = React.forwardRef<HTMLDivElement, TreeProps>(
  ({ className, variant, nodes, defaultExpanded = true, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(treeVariants({ variant }), className)} {...props}>
        <div className="py-1">
          {nodes.map((node, i) => (
            <TreeNodeItem key={`${node.label}-${i}`} node={node} depth={0} defaultExpanded={defaultExpanded} />
          ))}
        </div>
      </div>
    )
  }
)

Tree.displayName = "Tree"

/* ── Utility: build tree from flat file paths ─────────────────────────── */

export function buildFileTree(
  paths: string[],
  options?: {
    /** Base href prefix for leaf nodes */
    hrefPrefix?: string
    /** Custom badge function per file path */
    getBadge?: (path: string) => { badge: string; badgeVariant?: TreeNode["badgeVariant"] } | null
  }
): TreeNode[] {
  const root: TreeNode = { label: "", children: [] }

  for (const filePath of paths) {
    const parts = filePath.split("/")
    let current = root

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const isLeaf = i === parts.length - 1

      if (isLeaf) {
        const badgeInfo = options?.getBadge?.(filePath)
        current.children!.push({
          label: part,
          href: options?.hrefPrefix ? `${options.hrefPrefix}/${filePath}` : undefined,
          external: !!options?.hrefPrefix,
          ...(badgeInfo ?? {})
        })
      } else {
        let folder = current.children!.find((c) => c.label === part && c.children)
        if (!folder) {
          folder = { label: part, children: [] }
          current.children!.push(folder)
        }
        current = folder
      }
    }
  }

  return root.children!
}
