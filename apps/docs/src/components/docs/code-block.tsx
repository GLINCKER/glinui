"use client"

import * as React from "react"
import { Braces, FileCode2, FileText, Terminal } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Highlight, type Language, type PrismTheme } from "prism-react-renderer"

import { cn } from "@glinui/ui"
import { CodeSurfaceFrame } from "@/components/docs/code-surface-frame"
import { useTheme } from "next-themes"
import { buildCommandTabs, PACKAGE_MANAGERS, type PackageManager } from "@/lib/npm-commands"

type CodeBlockProps = {
  code: string
  language?: string
  dir?: "ltr" | "rtl"
  className?: string
}

const SUPPORTED_LANGUAGES: ReadonlySet<string> = new Set([
  "bash",
  "shell",
  "sh",
  "tsx",
  "ts",
  "jsx",
  "js",
  "json",
  "css",
  "html",
  "md"
])

/**
 * Light theme — subtle, readable on the frosted glass surface.
 * Neutral-leaning tokens that don't compete with the glass treatment.
 */
const glassLightTheme: PrismTheme = {
  plain: { color: "#24292f", backgroundColor: "transparent" },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "#8b949e", fontStyle: "italic" as const } },
    { types: ["keyword", "operator", "tag"], style: { color: "#6639ba" } },
    { types: ["property", "attr-name", "variable"], style: { color: "#0550ae" } },
    { types: ["string", "attr-value", "template-string"], style: { color: "#0a3069" } },
    { types: ["number", "boolean"], style: { color: "#0550ae" } },
    { types: ["function", "class-name"], style: { color: "#8250df" } },
    { types: ["builtin", "constant"], style: { color: "#6639ba" } },
    { types: ["punctuation"], style: { color: "#57606a" } },
    { types: ["regex", "important"], style: { color: "#0a3069" } },
    { types: ["plain"], style: { color: "#24292f" } },
  ]
}

/**
 * Dark theme — cool, muted tones for the dark glass surface.
 * Higher contrast than vsDark, with softer highlight colors.
 */
const glassDarkTheme: PrismTheme = {
  plain: { color: "#e6edf3", backgroundColor: "transparent" },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "#6b7280", fontStyle: "italic" as const } },
    { types: ["keyword", "operator", "tag"], style: { color: "#c084fc" } },
    { types: ["property", "attr-name", "variable"], style: { color: "#7dd3fc" } },
    { types: ["string", "attr-value", "template-string"], style: { color: "#86efac" } },
    { types: ["number", "boolean"], style: { color: "#fbbf24" } },
    { types: ["function", "class-name"], style: { color: "#c4b5fd" } },
    { types: ["builtin", "constant"], style: { color: "#a78bfa" } },
    { types: ["punctuation"], style: { color: "#9ca3af" } },
    { types: ["regex", "important"], style: { color: "#86efac" } },
    { types: ["plain"], style: { color: "#e6edf3" } },
  ]
}

export function CodeBlock({ code, language = "tsx", dir = "ltr", className }: CodeBlockProps) {
  const { resolvedTheme } = useTheme()
  const [copied, setCopied] = React.useState(false)
  const [selectedPm, setSelectedPm] = React.useState<PackageManager>("pnpm")

  const commandsByPm = React.useMemo(() => buildCommandTabs(code), [code])
  const activeCode = commandsByPm ? commandsByPm[selectedPm] : code
  const normalizedCode = React.useMemo(() => activeCode.replace(/\n+$/g, ""), [activeCode])

  const normalizedLanguage = normalizeLanguage(commandsByPm ? "bash" : language)
  const languageMeta = getLanguageMeta(normalizedLanguage)
  const isDark = resolvedTheme === "dark"

  const onCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(normalizedCode)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }, [normalizedCode])

  return (
    <CodeSurfaceFrame
      className={className}
      copied={copied}
      onCopy={() => void onCopy()}
      copyLabel="Copy code block"
      copyHint="Copy code"
      left={
        commandsByPm ? (
          <div className="flex items-center gap-2">
            <span className={cn(
              "inline-flex size-6 items-center justify-center rounded-md border",
              "border-black/[0.06] bg-white/40 text-neutral-500",
              "dark:border-white/[0.08] dark:bg-white/[0.06] dark:text-neutral-400"
            )}>
              <Terminal className="size-3" />
            </span>
            <div className={cn(
              "inline-flex rounded-lg border p-0.5",
              "border-black/[0.06] bg-black/[0.03]",
              "dark:border-white/[0.08] dark:bg-white/[0.04]"
            )}>
              {PACKAGE_MANAGERS.map((pm) => (
                <button
                  key={pm}
                  type="button"
                  onClick={() => setSelectedPm(pm)}
                  className={cn(
                    "rounded-md px-2 py-0.5 text-[11px] font-semibold capitalize tracking-[0.02em] transition-all duration-fast ease-standard",
                    selectedPm === pm
                      ? "bg-white text-neutral-900 shadow-[0_1px_3px_rgb(0_0_0_/_0.08)] dark:bg-white/[0.86] dark:text-neutral-950 dark:shadow-[0_1px_3px_rgb(0_0_0_/_0.35)]"
                      : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                  )}
                >
                  {pm}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.06em]",
              "border-black/[0.06] bg-black/[0.03] text-neutral-600",
              "dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-neutral-300"
            )}
          >
            <languageMeta.icon className="size-3.5" />
            {languageMeta.label}
          </span>
        )
      }
    >
      <Highlight code={normalizedCode} language={normalizedLanguage} theme={isDark ? glassDarkTheme : glassLightTheme}>
        {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            dir={dir}
            className={cn(
              "max-h-[580px] overflow-x-auto overflow-y-auto px-0 py-4 font-mono text-[13px] leading-[1.7]",
              highlightClassName
            )}
            style={{ ...style, background: "transparent" }}
          >
            {tokens.map((line, index) => (
              <div
                key={index}
                {...getLineProps({ line })}
                className={cn(
                  "grid px-4",
                  commandsByPm ? "grid-cols-[1fr]" : "grid-cols-[2.5rem_1fr]"
                )}
              >
                {commandsByPm ? null : (
                  <span className="select-none pr-3 text-right text-[11px] leading-[1.95] text-neutral-400/60 dark:text-neutral-500/50">
                    {index + 1}
                  </span>
                )}
                <span>
                  {line.map((token, tokenIndex) => (
                    <span key={tokenIndex} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </CodeSurfaceFrame>
  )
}

function getLanguageMeta(language: Language): { icon: LucideIcon; label: string } {
  switch (language) {
    case "bash":
      return { icon: Terminal, label: "Shell" }
    case "md":
      return { icon: FileText, label: "MDX" }
    case "json":
      return { icon: Braces, label: "JSON" }
    default:
      return { icon: FileCode2, label: String(language).toUpperCase() }
  }
}

function normalizeLanguage(language: string): Language {
  const raw = language.toLowerCase().trim()
  const value = raw === "shell" || raw === "sh" ? "bash" : raw

  if (SUPPORTED_LANGUAGES.has(value)) {
    return value as Language
  }

  return "tsx"
}
