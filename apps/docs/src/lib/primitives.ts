import {
  generatedComponentDescriptions,
  generatedComponentTitles
} from "./generated-registry-metadata"

// ── Primitive (Atom) Components ──────────────────────────────────────────────
export const primitiveComponentIds = [
  "accordion",
  "alert",
  "alert-dialog",
  "avatar",
  "badge",
  "button",
  "card",
  "checkbox",
  "chip",
  "code",
  "command",
  "counter",
  "data-table",
  "dropdown-menu",
  "heading",
  "hover-card",
  "icon-frame",
  "input",
  "kbd",
  "label",
  "link",
  "modal",
  "popover",
  "progress",
  "radio-group",
  "select",
  "separator",
  "sheet",
  "skeleton",
  "slider",
  "status-dot",
  "switch",
  "table",
  "tabs",
  "text",
  "textarea",
  "toast",
  "tooltip",
  "tree"
] as const

export type PrimitiveComponentId = (typeof primitiveComponentIds)[number]

// ── Signature (Glass) Components ────────────────────────────────────────────
export const signatureComponentIds = [
  "animated-gradient",
  "aurora-background",
  "blur-fade",
  "blur-spotlight",
  "border-beam",
  "chromatic-text",
  "depth-card",
  "dot-pattern",
  "floating-panel",
  "glass-breadcrumb",
  "glass-card",
  "glass-dock",
  "glass-navbar",
  "glass-toggle",
  "glow-border",
  "gradient-mesh",
  "light-leak",
  "liquid-button",
  "magnetic-cta",
  "marquee",
  "meteor-shower",
  "morphing-tabs",
  "number-ticker",
  "orbiting-circles",
  "particle-field",
  "prism-border",
  "pulsating-button",
  "retro-grid",
  "reveal-text",
  "ripple-button",
  "ripple",
  "shimmer-button",
  "spotlight",
  "spotlight-card",
  "text-reveal",
  "typewriter",
  "word-rotate"
] as const

export type SignatureComponentId = (typeof signatureComponentIds)[number]

export type ComponentId = PrimitiveComponentId | SignatureComponentId

export const allComponentIds = [...primitiveComponentIds, ...signatureComponentIds] as const

export type ComponentMaturity = "stable" | "beta"

const primitiveBetaIds: PrimitiveComponentId[] = [
  "alert-dialog",
  "command",
  "data-table",
  "hover-card",
  "sheet",
  "slider",
  "table",
  "toast",
  "tree"
]

const primitiveBetaSet = new Set<PrimitiveComponentId>(primitiveBetaIds)

export const primitiveMaturity = Object.fromEntries(
  primitiveComponentIds.map((id) => [id, primitiveBetaSet.has(id) ? "beta" : "stable"])
) as Record<PrimitiveComponentId, ComponentMaturity>

function toTitleCaseFromId(id: string): string {
  return id
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function toDescriptionFallback(id: string) {
  return `${toTitleCaseFromId(id)} component.`
}

function buildRegistryRecord<TIds extends readonly string[]>(
  ids: TIds,
  resolver: (id: TIds[number]) => string
): Record<TIds[number], string> {
  return Object.fromEntries(ids.map((id) => [id, resolver(id)])) as Record<TIds[number], string>
}

// ── Titles ──────────────────────────────────────────────────────────────────
export const primitiveTitles = buildRegistryRecord(
  primitiveComponentIds,
  (id) => generatedComponentTitles[id] ?? toTitleCaseFromId(id)
)

export const signatureTitles = buildRegistryRecord(
  signatureComponentIds,
  (id) => generatedComponentTitles[id] ?? toTitleCaseFromId(id)
)

export const componentTitles: Record<ComponentId, string> = {
  ...(primitiveTitles as Record<ComponentId, string>),
  ...(signatureTitles as Record<ComponentId, string>)
}

// ── Descriptions ────────────────────────────────────────────────────────────
export const primitiveDescriptions = buildRegistryRecord(
  primitiveComponentIds,
  (id) => generatedComponentDescriptions[id] ?? toDescriptionFallback(id)
)

export const signatureDescriptions = buildRegistryRecord(
  signatureComponentIds,
  (id) => generatedComponentDescriptions[id] ?? toDescriptionFallback(id)
)
