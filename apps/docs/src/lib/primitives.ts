export const primitiveComponentIds = [
  "button",
  "accordion",
  "tabs",
  "dropdown-menu",
  "popover",
  "sheet",
  "card",
  "badge",
  "input",
  "textarea",
  "select",
  "checkbox",
  "radio-group",
  "switch",
  "modal",
  "tooltip",
  "toast"
] as const

export type PrimitiveComponentId = (typeof primitiveComponentIds)[number]

export const primitiveTitles: Record<PrimitiveComponentId, string> = {
  button: "Button",
  accordion: "Accordion",
  tabs: "Tabs",
  "dropdown-menu": "Dropdown Menu",
  popover: "Popover",
  sheet: "Sheet / Drawer",
  card: "Card",
  badge: "Badge",
  input: "Input",
  textarea: "Textarea",
  select: "Select",
  checkbox: "Checkbox",
  "radio-group": "Radio Group",
  switch: "Switch",
  modal: "Modal",
  tooltip: "Tooltip",
  toast: "Toast"
}

export const primitiveDescriptions: Record<PrimitiveComponentId, string> = {
  button: "Pressable action component with variants and sizes.",
  accordion: "Expandable content sections with smooth disclosure behavior.",
  tabs: "Tabbed interface for switching between grouped content panels.",
  "dropdown-menu": "Action menu anchored to a trigger with keyboard navigation.",
  popover: "Floating content panel anchored to a trigger element.",
  sheet: "Sliding panel for side, top, or bottom contextual workflows.",
  card: "Flexible surface container for grouped content.",
  badge: "Compact status indicator for labels, states, and counts.",
  input: "Single-line text input with shared sizing and focus behavior.",
  textarea: "Multi-line text entry field for larger content.",
  select: "Selection field with option list and placeholder support.",
  checkbox: "Binary checked control built on Radix checkbox primitive.",
  "radio-group": "Mutually exclusive option selection control.",
  switch: "On/off control built on Radix switch primitive.",
  modal: "Layered dialog for focused tasks or confirmations.",
  tooltip: "Context hint on hover/focus using Radix tooltip primitive.",
  toast: "Transient feedback message using Radix toast primitive."
}
