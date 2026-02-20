"use client"

import {
  colorTokens,
  glassTokens,
  motionTokens,
  radiusTokens,
  shadowTokens,
  spacingTokens
} from "@glinui/tokens"

import { resolveMotionPreset } from "@glinui/motion"

type ColorKey = keyof typeof colorTokens.light

type Section = {
  title: string
  rows: Array<{ name: string; value: string }>
}

const tokenSections: Section[] = [
  {
    title: "Radius Tokens",
    rows: Object.entries(radiusTokens).map(([name, value]) => ({ name, value }))
  },
  {
    title: "Spacing Tokens",
    rows: Object.entries(spacingTokens).map(([name, value]) => ({ name, value }))
  },
  {
    title: "Shadow Tokens",
    rows: Object.entries(shadowTokens).map(([name, value]) => ({ name, value }))
  },
  {
    title: "Motion Duration",
    rows: Object.entries(motionTokens.duration).map(([name, value]) => ({ name, value }))
  },
  {
    title: "Motion Easing",
    rows: Object.entries(motionTokens.easing).map(([name, value]) => ({ name, value }))
  }
]

const motionPreview = resolveMotionPreset("slideUp")

export function TokenPreview() {
  const colorKeys = Object.keys(colorTokens.light) as ColorKey[]

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Color Tokens</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass-surface rounded-xl p-4">
            <h3 className="mb-3 text-sm font-medium">Light</h3>
            <div className="space-y-2">
              {colorKeys.map((key) => (
                <ColorRow key={`light-${key}`} name={key} value={colorTokens.light[key]} />
              ))}
            </div>
          </div>
          <div className="glass-surface rounded-xl p-4 dark">
            <h3 className="mb-3 text-sm font-medium">Dark</h3>
            <div className="space-y-2">
              {colorKeys.map((key) => (
                <ColorRow key={`dark-${key}`} name={key} value={colorTokens.dark[key]} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Glass Tokens</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <TokenCard title="Blur" value={`sm ${glassTokens.blur.sm}, md ${glassTokens.blur.md}, lg ${glassTokens.blur.lg}`} />
          <TokenCard title="Surface" value={`light ${glassTokens.surface.light}`} />
          <TokenCard title="Border" value={`light ${glassTokens.border.light}`} />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Motion Preset Preview</h2>
        <div className="glass-surface rounded-xl p-4">
          <p className="mb-2 text-sm">Preset: slideUp</p>
          <pre className="overflow-x-auto rounded-md bg-black/5 p-3 text-xs leading-5 text-foreground">
{JSON.stringify(motionPreview, null, 2)}
          </pre>
          <p className="mt-3 text-xs">
            Reduced motion is handled by CSS token overrides in `@media (prefers-reduced-motion: reduce)`.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Core Token Table</h2>
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-3 py-2 text-left">Group</th>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              {tokenSections.flatMap((section) =>
                section.rows.map((row, index) => (
                  <tr key={`${section.title}-${row.name}`} className={index === 0 ? "border-t border-border" : ""}>
                    <td className="px-3 py-2 align-top">{index === 0 ? section.title : ""}</td>
                    <td className="px-3 py-2">{row.name}</td>
                    <td className="px-3 py-2 font-mono text-xs">{row.value}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function ColorRow({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-border px-3 py-2">
      <div className="text-sm">{name}</div>
      <div className="flex items-center gap-2">
        <span className="inline-block size-4 rounded-full border border-border" style={{ background: value }} />
        <code className="text-xs">{value}</code>
      </div>
    </div>
  )
}

function TokenCard({ title, value }: { title: string; value: string }) {
  return (
    <article className="rounded-lg border border-border bg-surface p-3 shadow-soft">
      <p className="text-xs uppercase tracking-wide">{title}</p>
      <p className="mt-2 text-xs font-mono leading-5">{value}</p>
    </article>
  )
}
