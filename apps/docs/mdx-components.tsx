import type { MDXComponents } from "mdx/types"
import * as React from "react"

import { cn } from "@glinui/ui"
import { CodeBlock } from "@/components/docs/code-block"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }) => (
      <h1 className={cn("group text-3xl font-semibold tracking-tight sm:text-4xl", className)} {...props} />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          "group scroll-mt-24 border-b border-border/50 pb-2 text-2xl font-semibold tracking-tight",
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3 className={cn("group scroll-mt-24 text-xl font-semibold tracking-tight", className)} {...props} />
    ),
    p: ({ className, ...props }) => <p className={cn("leading-7 text-neutral-700 dark:text-neutral-300", className)} {...props} />,
    ul: ({ className, ...props }) => <ul className={cn("ml-6 list-disc space-y-2", className)} {...props} />,
    li: ({ className, ...props }) => <li className={cn("text-neutral-700 dark:text-neutral-300", className)} {...props} />,
    code: ({ className, ...props }) => {
      const isBlock = typeof className === "string" && className.includes("language-")

      if (isBlock) {
        return <code className={className} {...props} />
      }

      return (
        <code
          className={cn(
            "rounded-md bg-black/10 px-1.5 py-0.5 font-mono text-[0.9em] text-foreground dark:bg-white/10",
            className
          )}
          {...props}
        />
      )
    },
    pre: ({ className, children, ...props }) => {
      if (React.isValidElement(children)) {
        const childProps = children.props as { className?: string; children?: React.ReactNode }
        const languageClass = childProps.className ?? ""
        const language = languageClass.replace("language-", "") || "tsx"
        const rawCode = typeof childProps.children === "string" ? childProps.children : ""

        if (rawCode) {
          return <CodeBlock code={rawCode} language={language} className={className} />
        }
      }

      return (
        <pre
          className={cn("overflow-x-auto rounded-xl border border-border/60 bg-black/15 p-4 text-sm", className)}
          {...props}
        >
          {children}
        </pre>
      )
    },
    ...components
  }
}
