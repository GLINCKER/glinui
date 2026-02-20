"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import type { PropRow } from "@/components/docs/props-table"
import type { PrimitiveComponentId } from "@/lib/primitives"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Chip,
  Code,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
  DataTable,
  Counter,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Heading,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  IconFrame,
  Input,
  Kbd,
  Label,
  Link,
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  ProgressCircle,
  RadioGroup,
  RadioGroupItem,
  Select,
  Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Skeleton,
  Slider,
  StatusDot,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  Textarea,
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Toaster,
  toast,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tree
} from "@glinui/ui"

// ── Types ────────────────────────────────────────────────────────────────────

export type ComponentExample = {
  title: string
  description?: string
  code: string
  render: ReactNode
}

export type KeyboardRow = {
  key: string
  description: string
}

export type PropsGroup = {
  title: string
  rows: PropRow[]
}

export type ComponentDocMeta = {
  badge: string
  /** Props for single-component, or groups for molecules with sub-components */
  props: PropRow[] | PropsGroup[]
  accessibility: {
    summary: string[]
    keyboard?: KeyboardRow[]
    aria?: string[]
  }
  reducedMotion: {
    description: string
    affected?: string[]
  }
  examples: ComponentExample[]
}

// ── Helper for stateful previews ─────────────────────────────────────────────

function ToastDemo() {
  return (
    <>
      <Toaster position="bottom-right" />
      <Button onClick={() => toast("Settings saved", { description: "Your workspace has been updated." })}>
        Show toast
      </Button>
    </>
  )
}

function ToastTypesDemo() {
  return (
    <>
      <Toaster position="bottom-right" />
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={() => toast.success("Saved", { description: "Your changes were saved." })}>Success</Button>
        <Button size="sm" onClick={() => toast.error("Failed", { description: "Something went wrong." })}>Error</Button>
        <Button size="sm" onClick={() => toast.warning("Careful", { description: "This action cannot be undone." })}>Warning</Button>
        <Button size="sm" onClick={() => toast.info("Info", { description: "A new version is available." })}>Info</Button>
        <Button size="sm" onClick={() => toast.loading("Uploading...", { description: "Please wait." })}>Loading</Button>
      </div>
    </>
  )
}

function ToastActionDemo() {
  return (
    <>
      <Toaster position="bottom-right" />
      <Button size="sm" onClick={() => toast("File deleted", {
        description: "The file has been moved to trash.",
        action: { label: "Undo", onClick: () => toast.success("Restored") }
      })}>
        With action
      </Button>
    </>
  )
}

function ToastPromiseDemo() {
  return (
    <>
      <Toaster position="bottom-right" />
      <Button size="sm" onClick={() => {
        toast.promise(
          new Promise<{ name: string }>((resolve) => setTimeout(() => resolve({ name: "report.pdf" }), 2000)),
          {
            loading: "Generating report...",
            success: (data) => `${data.name} is ready!`,
            error: "Failed to generate report"
          }
        )
      }}>
        Promise toast
      </Button>
    </>
  )
}

function CheckboxDemo() {
  const [checked, setChecked] = useState(false)
  return (
    <label className="flex items-center gap-2 text-sm">
      <Checkbox checked={checked} onCheckedChange={(v) => setChecked(Boolean(v))} aria-label="Enable" />
      Enable experimental mode
    </label>
  )
}

function SwitchDemo() {
  const [on, setOn] = useState(true)
  return (
    <label className="flex items-center gap-2 text-sm">
      <Switch checked={on} onCheckedChange={setOn} aria-label="Notifications" />
      Notifications
    </label>
  )
}

function SliderRangeDemo() {
  const [value, setValue] = useState([24, 78])

  return (
    <div className="space-y-3">
      <Slider value={value} onValueChange={setValue} max={100} step={1} aria-label="Engagement range" />
      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
        <span>{value[0]}%</span>
        <span>{value[1]}%</span>
      </div>
    </div>
  )
}

function SliderAtmosphereDemo() {
  const [value, setValue] = useState([62])

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/25 bg-[var(--glass-1-surface)] p-4 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="pointer-events-none absolute -left-6 -top-10 h-24 w-24 rounded-full bg-[var(--color-accent)]/25 blur-2xl motion-safe:animate-pulse" />
      <div className="pointer-events-none absolute -bottom-10 right-0 h-24 w-24 rounded-full bg-[var(--color-foreground)]/15 blur-3xl motion-safe:animate-pulse" />
      <div className="relative space-y-3">
        <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-300">
          <span>Atmosphere</span>
          <Badge variant="glass">{value[0]}%</Badge>
        </div>
        <Slider variant="liquid" value={value} onValueChange={setValue} max={100} aria-label="Atmosphere amount" />
      </div>
    </div>
  )
}

// ── Registry ─────────────────────────────────────────────────────────────────

export const componentDocs: Record<PrimitiveComponentId, ComponentDocMeta> = {
  button: {
    badge: "Primitive / Atom",
    props: [
      { prop: "variant", type: '"default" | "glass" | "liquid" | "matte" | "glow" | "outline" | "ghost"', defaultValue: "default", description: "Visual treatment." },
      { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Height and horizontal padding scale." },
      { prop: "asChild", type: "boolean", defaultValue: "false", description: "Renders child element with button styles." }
    ],
    accessibility: {
      summary: [
        "Native `button` semantics by default.",
        "Visible focus ring via tokenized accent color.",
        "`disabled` state blocks interaction and lowers visual emphasis.",
        "Supports `asChild` for semantic link rendering."
      ],
      keyboard: [
        { key: "Enter", description: "Activate the button." },
        { key: "Space", description: "Activate the button." }
      ],
      aria: [
        '`role="button"` native',
        "`aria-disabled` when disabled"
      ]
    },
    reducedMotion: {
      description: "Transitions use tokenized timing and disable transform-heavy motion with `prefers-reduced-motion`.",
      affected: ["transform", "opacity", "box-shadow", "background-color"]
    },
    examples: [
      {
        title: "Basic",
        code: `import { Button } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="flex gap-3">\n      <Button>Default</Button>\n      <Button variant="outline">Outline</Button>\n      <Button variant="ghost">Ghost</Button>\n    </div>\n  )\n}`,
        render: (
          <div className="flex gap-3">
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        )
      },
      {
        title: "Variants",
        code: `import { Button } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="flex flex-wrap gap-2">\n      <Button>Default</Button>\n      <Button variant="glass">Glass</Button>\n      <Button variant="liquid">Liquid</Button>\n      <Button variant="matte">Matte</Button>\n      <Button variant="glow">Glow</Button>\n      <Button variant="outline">Outline</Button>\n      <Button variant="ghost">Ghost</Button>\n    </div>\n  )\n}`,
        render: (
          <div className="flex flex-wrap gap-2">
            <Button>Default</Button>
            <Button variant="glass">Glass</Button>
            <Button variant="liquid">Liquid</Button>
            <Button variant="matte">Matte</Button>
            <Button variant="glow">Glow</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        )
      },
      {
        title: "Sizes",
        code: `import { Button } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="flex items-end gap-2">\n      <Button size="sm">Small</Button>\n      <Button size="md">Medium</Button>\n      <Button size="lg">Large</Button>\n    </div>\n  )\n}`,
        render: (
          <div className="flex items-end gap-2">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        )
      }
    ]
  },

  input: {
    badge: "Primitive / Atom",
    props: [
      { prop: "variant", type: '"default" | "glass" | "liquid" | "matte" | "outline" | "ghost" | "underline" | "filled"', defaultValue: "default", description: "Visual treatment." },
      { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Height scale." },
      { prop: "type", type: "string", defaultValue: "text", description: "HTML input type." },
      { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction." },
      { prop: "placeholder", type: "string", description: "Placeholder text." }
    ],
    accessibility: {
      summary: [
        "Native `input` semantics.",
        "Visible focus ring on `:focus-visible`.",
        "Pair with `<label>` or `aria-label` for screen readers."
      ],
      keyboard: [
        { key: "Tab", description: "Move focus to the input." }
      ],
      aria: [
        '`role="textbox"` native',
        "`aria-invalid` for validation"
      ]
    },
    reducedMotion: {
      description: "Focus transitions use tokenized timing.",
      affected: ["border-color", "box-shadow"]
    },
    examples: [
      {
        title: "Default",
        code: `import { Input } from "@glinui/ui"\n\nexport function Demo() {\n  return <Input placeholder="name@example.com" />\n}`,
        render: <Input placeholder="name@example.com" />
      },
      {
        title: "Glass",
        code: `import { Input } from "@glinui/ui"\n\nexport function Demo() {\n  return <Input variant="glass" placeholder="Glass input" />\n}`,
        render: <Input variant="glass" placeholder="Glass input" />
      },
      {
        title: "Liquid + Matte",
        code: `import { Input } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="space-y-3">\n      <Input variant="liquid" placeholder="Liquid input" />\n      <Input variant="matte" placeholder="Matte input" />\n    </div>\n  )\n}`,
        render: (
          <div className="space-y-3">
            <Input variant="liquid" placeholder="Liquid input" />
            <Input variant="matte" placeholder="Matte input" />
          </div>
        )
      },
      {
        title: "Underline",
        code: `import { Input } from "@glinui/ui"\n\nexport function Demo() {\n  return <Input variant="underline" placeholder="Underline input" />\n}`,
        render: <Input variant="underline" placeholder="Underline input" />
      },
      {
        title: "Filled",
        code: `import { Input } from "@glinui/ui"\n\nexport function Demo() {\n  return <Input variant="filled" placeholder="Filled input" />\n}`,
        render: <Input variant="filled" placeholder="Filled input" />
      },
      {
        title: "Ghost",
        code: `import { Input } from "@glinui/ui"\n\nexport function Demo() {\n  return <Input variant="ghost" placeholder="Ghost input" />\n}`,
        render: <Input variant="ghost" placeholder="Ghost input" />
      }
    ]
  },

  chip: {
    badge: "Primitive / Atom",
    props: [
      { prop: "variant", type: '"default" | "glass" | "outline" | "ghost"', defaultValue: "default", description: "Surface treatment." },
      { prop: "tone", type: '"neutral" | "info" | "success" | "warning" | "danger"', defaultValue: "neutral", description: "Semantic text color." },
      { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Height and horizontal padding scale." }
    ],
    accessibility: {
      summary: [
        "Non-interactive status label element by default.",
        "Use `aria-label` when chip meaning is not explicit from text."
      ],
      aria: [
        '`role="status"` optional for live status chips'
      ]
    },
    reducedMotion: {
      description: "Chip visual transitions are color-only and disabled with reduced motion.",
      affected: ["background-color", "border-color", "color"]
    },
    examples: [
      {
        title: "Tones",
        code: `import { Chip } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="flex flex-wrap gap-2">\n      <Chip>Neutral</Chip>\n      <Chip tone="info">Info</Chip>\n      <Chip tone="success">Success</Chip>\n      <Chip tone="warning">Warning</Chip>\n      <Chip tone="danger">Danger</Chip>\n    </div>\n  )\n}`,
        render: (
          <div className="flex flex-wrap gap-2">
            <Chip>Neutral</Chip>
            <Chip tone="info">Info</Chip>
            <Chip tone="success">Success</Chip>
            <Chip tone="warning">Warning</Chip>
            <Chip tone="danger">Danger</Chip>
          </div>
        )
      },
      {
        title: "Glass",
        code: `import { Chip } from "@glinui/ui"\n\nexport function Demo() {\n  return <Chip variant="glass">Preview</Chip>\n}`,
        render: <Chip variant="glass">Preview</Chip>
      }
    ]
  },

  code: {
    badge: "Primitive / Atom",
    props: [
      { prop: "variant", type: '"default" | "glass" | "outline" | "ghost"', defaultValue: "default", description: "Surface treatment." },
      { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Font-size scale." }
    ],
    accessibility: {
      summary: [
        "Uses semantic `<code>` element for inline code fragments."
      ],
      aria: []
    },
    reducedMotion: {
      description: "No motion-dependent behavior.",
      affected: []
    },
    examples: [
      {
        title: "Inline Code",
        code: `import { Code } from "@glinui/ui"\n\nexport function Demo() {\n  return <Code>pnpm --filter @glinui/docs dev</Code>\n}`,
        render: <Code>pnpm --filter @glinui/docs dev</Code>
      },
      {
        title: "Variants",
        code: `import { Code } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="flex flex-wrap gap-2">\n      <Code>default</Code>\n      <Code variant="glass">glass</Code>\n      <Code variant="outline">outline</Code>\n      <Code variant="ghost">ghost</Code>\n    </div>\n  )\n}`,
        render: (
          <div className="flex flex-wrap gap-2">
            <Code>default</Code>
            <Code variant="glass">glass</Code>
            <Code variant="outline">outline</Code>
            <Code variant="ghost">ghost</Code>
          </div>
        )
      }
    ]
  },

  counter: {
    badge: "Primitive / Atom",
    props: [
      { prop: "value", type: "number", description: "Current numeric value." },
      { prop: "max", type: "number", defaultValue: "99", description: "Maximum before collapsing into `max+` format." },
      { prop: "variant", type: '"default" | "glass" | "outline" | "ghost"', defaultValue: "default", description: "Surface treatment." },
      { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Counter density." }
    ],
    accessibility: {
      summary: [
        "Use `aria-label` to describe what the count represents."
      ],
      aria: [
        '`aria-live="polite"` for dynamically updating counts'
      ]
    },
    reducedMotion: {
      description: "Counter updates are static by default with no animated value tweening.",
      affected: []
    },
    examples: [
      {
        title: "Basic",
        code: `import { Counter } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="flex items-center gap-2">\n      <Counter value={7} />\n      <Counter variant="glass" value={32} />\n      <Counter variant="outline" value={120} max={99} />\n    </div>\n  )\n}`,
        render: (
          <div className="flex items-center gap-2">
            <Counter value={7} />
            <Counter variant="glass" value={32} />
            <Counter variant="outline" value={120} max={99} />
          </div>
        )
      }
    ]
  },

  heading: {
    badge: "Primitive / Atom",
    props: [
      { prop: "level", type: "1 | 2 | 3 | 4 | 5 | 6", defaultValue: "2", description: "Semantic heading tag level." },
      { prop: "variant", type: '"default" | "glass" | "outline" | "ghost"', defaultValue: "default", description: "Surface treatment." },
      { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Typographic scale independent of level." }
    ],
    accessibility: {
      summary: [
        "Preserves semantic heading hierarchy with configurable level."
      ],
      aria: []
    },
    reducedMotion: {
      description: "No motion-dependent behavior.",
      affected: []
    },
    examples: [
      {
        title: "Levels",
        code: `import { Heading } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="space-y-2">\n      <Heading level={1} size="lg">Hero heading</Heading>\n      <Heading level={2}>Section heading</Heading>\n      <Heading level={3} size="sm">Subsection heading</Heading>\n    </div>\n  )\n}`,
        render: (
          <div className="space-y-2">
            <Heading level={1} size="lg">Hero heading</Heading>
            <Heading level={2}>Section heading</Heading>
            <Heading level={3} size="sm">Subsection heading</Heading>
          </div>
        )
      },
      {
        title: "Glass",
        code: `import { Heading } from "@glinui/ui"\n\nexport function Demo() {\n  return <Heading variant="glass">Frosted heading</Heading>\n}`,
        render: <Heading variant="glass">Frosted heading</Heading>
      }
    ]
  },

  "hover-card": {
    badge: "Primitive / Molecule",
    props: [
      {
        title: "HoverCardProps",
        rows: [
          { prop: "openDelay", type: "number", defaultValue: "200", description: "Delay in milliseconds before opening on hover/focus." },
          { prop: "closeDelay", type: "number", defaultValue: "100", description: "Delay in milliseconds before closing after pointer leaves." },
          { prop: "open", type: "boolean", description: "Controlled open state." },
          { prop: "defaultOpen", type: "boolean", description: "Initial open state for uncontrolled usage." },
          { prop: "onOpenChange", type: "(open: boolean) => void", description: "Open state change handler." }
        ]
      },
      {
        title: "HoverCardContentProps",
        rows: [
          { prop: "variant", type: '"default" | "glass" | "outline" | "ghost"', defaultValue: "glass", description: "Visual surface treatment." },
          { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Content width and density scale." },
          { prop: "align", type: '"start" | "center" | "end"', defaultValue: "center", description: "Alignment relative to the trigger." },
          { prop: "side", type: '"top" | "right" | "bottom" | "left"', defaultValue: "bottom", description: "Preferred side for content placement." },
          { prop: "sideOffset", type: "number", defaultValue: "10", description: "Distance from trigger in pixels." }
        ]
      }
    ],
    accessibility: {
      summary: [
        "Built on Radix Hover Card and opens on hover and keyboard focus.",
        "Hover card content should be supplemental; avoid critical-only information.",
        "Use non-interactive preview content for concise summaries."
      ],
      keyboard: [
        { key: "Tab / Shift+Tab", description: "Move focus to or away from the trigger." },
        { key: "Escape", description: "Close the hover card when focused." }
      ],
      aria: [
        "`aria-describedby` linkage is handled by Radix primitives",
        "Trigger remains semantic and keyboard reachable"
      ]
    },
    reducedMotion: {
      description: "Entrance and exit transitions are disabled under `prefers-reduced-motion`.",
      affected: ["opacity", "transform"]
    },
    examples: [
      {
        title: "Basic",
        code: `import { Avatar, HoverCard, HoverCardContent, HoverCardTrigger } from "@glinui/ui"

export function Demo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="inline-flex items-center gap-2 text-sm font-medium underline decoration-dotted underline-offset-4">
          <Avatar fallback="GL" size="sm" />
          @glinui
        </button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-1">
          <p className="text-sm font-semibold">@glinui</p>
          <p className="text-xs text-neutral-600 dark:text-neutral-300">
            Glass-first component system for modern interfaces.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}`,
        render: (
          <HoverCard>
            <HoverCardTrigger asChild>
              <button className="inline-flex items-center gap-2 text-sm font-medium underline decoration-dotted underline-offset-4">
                <Avatar fallback="GL" size="sm" />
                @glinui
              </button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="space-y-1">
                <p className="text-sm font-semibold">@glinui</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-300">
                  Glass-first component system for modern interfaces.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        )
      },
      {
        title: "Surface and Delays",
        code: `import { Badge, HoverCard, HoverCardContent, HoverCardTrigger } from "@glinui/ui"

export function Demo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <HoverCard openDelay={0} closeDelay={150}>
        <HoverCardTrigger asChild>
          <button className="text-sm font-medium underline decoration-dotted underline-offset-4">
            Instant preview
          </button>
        </HoverCardTrigger>
        <HoverCardContent variant="glass" size="sm">
          <div className="space-y-2">
            <Badge variant="glass">glass</Badge>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">Open delay: 0ms</p>
          </div>
        </HoverCardContent>
      </HoverCard>
      <HoverCard openDelay={500} closeDelay={250}>
        <HoverCardTrigger asChild>
          <button className="text-sm font-medium underline decoration-dotted underline-offset-4">
            Delayed preview
          </button>
        </HoverCardTrigger>
        <HoverCardContent variant="outline" size="md">
          <p className="text-xs text-neutral-600 dark:text-neutral-300">
            Opens after 500ms with outline surface.
          </p>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}`,
        render: (
          <div className="flex flex-wrap items-center gap-4">
            <HoverCard openDelay={0} closeDelay={150}>
              <HoverCardTrigger asChild>
                <button className="text-sm font-medium underline decoration-dotted underline-offset-4">
                  Instant preview
                </button>
              </HoverCardTrigger>
              <HoverCardContent variant="glass" size="sm">
                <div className="space-y-2">
                  <Badge variant="glass">glass</Badge>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300">Open delay: 0ms</p>
                </div>
              </HoverCardContent>
            </HoverCard>
            <HoverCard openDelay={500} closeDelay={250}>
              <HoverCardTrigger asChild>
                <button className="text-sm font-medium underline decoration-dotted underline-offset-4">
                  Delayed preview
                </button>
              </HoverCardTrigger>
              <HoverCardContent variant="outline" size="md">
                <p className="text-xs text-neutral-600 dark:text-neutral-300">
                  Opens after 500ms with outline surface.
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>
        )
      }
    ]
  },

  "icon-frame": {
    badge: "Primitive / Atom",
    props: [
      { prop: "variant", type: '"default" | "glass" | "outline" | "ghost"', defaultValue: "default", description: "Surface treatment." },
      { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Square frame size." }
    ],
    accessibility: {
      summary: [
        "Use `aria-hidden` when decorative.",
        "Add screen-reader text for meaningful icons."
      ],
      aria: [
        '`aria-hidden="true"` for decorative usage'
      ]
    },
    reducedMotion: {
      description: "Frame transitions are color-only and respect reduced-motion settings.",
      affected: ["background-color", "border-color"]
    },
    examples: [
      {
        title: "Basic",
        code: `import { IconFrame } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="flex items-center gap-2">\n      <IconFrame size="sm">A</IconFrame>\n      <IconFrame variant="glass">B</IconFrame>\n      <IconFrame variant="outline" size="lg">C</IconFrame>\n    </div>\n  )\n}`,
        render: (
          <div className="flex items-center gap-2">
            <IconFrame size="sm">A</IconFrame>
            <IconFrame variant="glass">B</IconFrame>
            <IconFrame variant="outline" size="lg">C</IconFrame>
          </div>
        )
      }
    ]
  },

  kbd: {
    badge: "Primitive / Atom",
    props: [
      { prop: "variant", type: '"default" | "glass" | "outline" | "ghost"', defaultValue: "default", description: "Surface treatment." },
      { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Keycap size." }
    ],
    accessibility: {
      summary: [
        "Uses semantic `<kbd>` element for keyboard shortcuts."
      ],
      aria: []
    },
    reducedMotion: {
      description: "No motion-dependent behavior.",
      affected: []
    },
    examples: [
      {
        title: "Shortcut",
        code: `import { Kbd } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="flex items-center gap-2 text-sm">\n      <span>Open command palette:</span>\n      <Kbd>cmd</Kbd>\n      <Kbd>K</Kbd>\n    </div>\n  )\n}`,
        render: (
          <div className="flex items-center gap-2 text-sm">
            <span>Open command palette:</span>
            <Kbd>cmd</Kbd>
            <Kbd>K</Kbd>
          </div>
        )
      }
    ]
  },

  label: {
    badge: "Primitive / Atom",
    props: [
      { prop: "htmlFor", type: "string", description: "Associates label with a form control id." },
      { prop: "variant", type: '"default" | "glass" | "outline" | "ghost"', defaultValue: "default", description: "Surface treatment." },
      { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Font-size scale." }
    ],
    accessibility: {
      summary: [
        "Uses semantic `<label>` for screen reader form-field association."
      ],
      aria: [
        "`htmlFor` should match form control `id`"
      ]
    },
    reducedMotion: {
      description: "No motion-dependent behavior.",
      affected: []
    },
    examples: [
      {
        title: "Field Label",
        code: `import { Input, Label } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="space-y-2">\n      <Label htmlFor="email">Email address</Label>\n      <Input id="email" type="email" placeholder="name@example.com" />\n    </div>\n  )\n}`,
        render: (
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="name@example.com" />
          </div>
        )
      }
    ]
  },

  link: {
    badge: "Primitive / Atom",
    props: [
      { prop: "href", type: "string", description: "Destination URL." },
      { prop: "variant", type: '"default" | "glass" | "outline" | "ghost"', defaultValue: "default", description: "Surface treatment." },
      { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Text scale." },
      { prop: "underline", type: "boolean", defaultValue: "true", description: "Enable underline decoration." }
    ],
    accessibility: {
      summary: [
        "Uses semantic anchor element with keyboard navigation.",
        "Focus-visible ring is applied for keyboard users."
      ],
      keyboard: [
        { key: "Enter", description: "Open the link destination." }
      ],
      aria: [
        '`role="link"` native',
        "`aria-current` for active navigation states"
      ]
    },
    reducedMotion: {
      description: "Hover/focus styles are color-only and respect reduced motion settings.",
      affected: ["color", "background-color", "border-color"]
    },
    examples: [
      {
        title: "Variants",
        code: `import { Link } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="flex flex-wrap gap-2">\n      <Link href=\"#\">Default</Link>\n      <Link href=\"#\" variant=\"glass\">Glass</Link>\n      <Link href=\"#\" variant=\"outline\">Outline</Link>\n      <Link href=\"#\" variant=\"ghost\">Ghost</Link>\n    </div>\n  )\n}`,
        render: (
          <div className="flex flex-wrap gap-2">
            <Link href="#">Default</Link>
            <Link href="#" variant="glass">Glass</Link>
            <Link href="#" variant="outline">Outline</Link>
            <Link href="#" variant="ghost">Ghost</Link>
          </div>
        )
      }
    ]
  },

  "status-dot": {
    badge: "Primitive / Atom",
    props: [
      { prop: "status", type: '"neutral" | "info" | "success" | "warning" | "danger"', defaultValue: "neutral", description: "Dot color semantic." },
      { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Dot and label size scale." },
      { prop: "pulse", type: "boolean", defaultValue: "false", description: "Enable subtle pulse animation on the indicator." },
      { prop: "label", type: "string", description: "Optional status label text." }
    ],
    accessibility: {
      summary: [
        "Pair status color with text for non-color-only communication.",
        "Optional pulse animation is reduced-motion safe."
      ],
      aria: [
        '`aria-live="polite"` when representing dynamic system state'
      ]
    },
    reducedMotion: {
      description: "Pulse animation uses `motion-safe` and disables with reduced-motion preferences.",
      affected: ["opacity"]
    },
    examples: [
      {
        title: "Status States",
        code: `import { StatusDot } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="space-y-2">\n      <StatusDot status="success" label="Healthy" />\n      <StatusDot status="warning" label="Degraded" />\n      <StatusDot status="danger" label="Down" pulse />\n    </div>\n  )\n}`,
        render: (
          <div className="space-y-2">
            <StatusDot status="success" label="Healthy" />
            <StatusDot status="warning" label="Degraded" />
            <StatusDot status="danger" label="Down" pulse />
          </div>
        )
      }
    ]
  },

  text: {
    badge: "Primitive / Atom",
    props: [
      { prop: "variant", type: '"default" | "muted" | "glass" | "ghost"', defaultValue: "default", description: "Text treatment style." },
      { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Type scale." }
    ],
    accessibility: {
      summary: [
        "Renders semantic paragraph text by default."
      ],
      aria: []
    },
    reducedMotion: {
      description: "No motion-dependent behavior.",
      affected: []
    },
    examples: [
      {
        title: "Styles",
        code: `import { Text } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="space-y-2">\n      <Text>Default body copy.</Text>\n      <Text variant="muted">Muted supporting copy.</Text>\n      <Text variant="glass">Glass highlighted note.</Text>\n    </div>\n  )\n}`,
        render: (
          <div className="space-y-2">
            <Text>Default body copy.</Text>
            <Text variant="muted">Muted supporting copy.</Text>
            <Text variant="glass">Glass highlighted note.</Text>
          </div>
        )
      }
    ]
  },

  textarea: {
    badge: "Primitive / Atom",
    props: [
      { prop: "variant", type: '"default" | "glass" | "liquid" | "matte" | "outline" | "ghost" | "underline" | "filled"', defaultValue: "default", description: "Visual treatment." },
      { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Text size and inner spacing." },
      { prop: "rows", type: "number", defaultValue: "4", description: "Number of visible text lines." },
      { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction." },
      { prop: "placeholder", type: "string", description: "Placeholder text." }
    ],
    accessibility: {
      summary: [
        "Native `textarea` semantics.",
        "Pair with `<label>` or `aria-label` for screen readers."
      ],
      keyboard: [
        { key: "Tab", description: "Move focus to the textarea." }
      ],
      aria: [
        '`role="textbox"` native',
        "`aria-invalid` for validation"
      ]
    },
    reducedMotion: {
      description: "No animation dependencies.",
      affected: []
    },
    examples: [
      {
        title: "Basic",
        code: `import { Textarea } from "@glinui/ui"\n\nexport function Demo() {\n  return <Textarea placeholder="Share your feedback..." />\n}`,
        render: <Textarea placeholder="Share your feedback..." />
      },
      {
        title: "Custom Rows",
        code: `import { Textarea } from "@glinui/ui"\n\nexport function Demo() {\n  return <Textarea placeholder="Write a longer message..." rows={8} />\n}`,
        render: <Textarea placeholder="Write a longer message..." rows={8} />
      },
      {
        title: "Variants",
        code: `import { Textarea } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="space-y-3">\n      <Textarea variant="glass" placeholder="Glass textarea" />\n      <Textarea variant="liquid" placeholder="Liquid textarea" />\n      <Textarea variant="matte" placeholder="Matte textarea" />\n    </div>\n  )\n}`,
        render: (
          <div className="space-y-3">
            <Textarea variant="glass" placeholder="Glass textarea" />
            <Textarea variant="liquid" placeholder="Liquid textarea" />
            <Textarea variant="matte" placeholder="Matte textarea" />
          </div>
        )
      }
    ]
  },

  select: {
    badge: "Primitive / Atom",
    props: [
      { prop: "options", type: "SelectOption[]", description: "Array of { label, value, disabled? }." },
      { prop: "placeholder", type: "string", description: "Disabled placeholder option text." },
      { prop: "variant", type: '"default" | "glass" | "liquid" | "matte" | "outline" | "ghost"', defaultValue: "default", description: "Visual treatment." },
      { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Height scale." },
      { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction." }
    ],
    accessibility: {
      summary: [
        "Native `select` semantics with keyboard navigation.",
        "Pair with `<label>` or `aria-label`."
      ],
      keyboard: [
        { key: "Enter / Space", description: "Open the select dropdown." },
        { key: "Arrow Up / Down", description: "Navigate options." }
      ],
      aria: [
        '`role="combobox"` native',
        "`aria-expanded`",
        "`aria-selected`"
      ]
    },
    reducedMotion: {
      description: "No animation dependencies.",
      affected: []
    },
    examples: [
      {
        title: "Basic",
        code: `import { Select } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <Select\n      placeholder="Pick a framework"\n      options={[\n        { value: "react", label: "React" },\n        { value: "vue", label: "Vue" },\n        { value: "svelte", label: "Svelte" }\n      ]}\n    />\n  )\n}`,
        render: (
          <Select
            placeholder="Pick a framework"
            options={[
              { value: "react", label: "React" },
              { value: "vue", label: "Vue" },
              { value: "svelte", label: "Svelte" }
            ]}
          />
        )
      },
      {
        title: "Sizes",
        code: `import { Select } from "@glinui/ui"\n\nconst opts = [{ value: "a", label: "Alpha" }, { value: "b", label: "Beta" }]\n\nexport function Demo() {\n  return (\n    <div className="space-y-3 max-w-xs">\n      <Select size="sm" options={opts} placeholder="Small" />\n      <Select size="md" options={opts} placeholder="Medium" />\n      <Select size="lg" options={opts} placeholder="Large" />\n    </div>\n  )\n}`,
        render: (
          <div className="space-y-3 max-w-xs">
            <Select size="sm" options={[{ value: "a", label: "Alpha" }, { value: "b", label: "Beta" }]} placeholder="Small" />
            <Select size="md" options={[{ value: "a", label: "Alpha" }, { value: "b", label: "Beta" }]} placeholder="Medium" />
            <Select size="lg" options={[{ value: "a", label: "Alpha" }, { value: "b", label: "Beta" }]} placeholder="Large" />
          </div>
        )
      },
      {
        title: "Variants",
        code: `import { Select } from "@glinui/ui"\n\nconst opts = [{ value: "a", label: "Alpha" }, { value: "b", label: "Beta" }]\n\nexport function Demo() {\n  return (\n    <div className="space-y-3 max-w-xs">\n      <Select variant="glass" options={opts} placeholder="Glass" />\n      <Select variant="liquid" options={opts} placeholder="Liquid" />\n      <Select variant="matte" options={opts} placeholder="Matte" />\n    </div>\n  )\n}`,
        render: (
          <div className="space-y-3 max-w-xs">
            <Select variant="glass" options={[{ value: "a", label: "Alpha" }, { value: "b", label: "Beta" }]} placeholder="Glass" />
            <Select variant="liquid" options={[{ value: "a", label: "Alpha" }, { value: "b", label: "Beta" }]} placeholder="Liquid" />
            <Select variant="matte" options={[{ value: "a", label: "Alpha" }, { value: "b", label: "Beta" }]} placeholder="Matte" />
          </div>
        )
      }
    ]
  },

  checkbox: {
    badge: "Primitive / Atom",
    props: [
      { prop: "variant", type: '"default" | "glass" | "liquid" | "matte" | "outline"', defaultValue: "default", description: "Visual treatment." },
      { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Control size." },
      { prop: "checked", type: "boolean | 'indeterminate'", description: "Controlled checked state." },
      { prop: "defaultChecked", type: "boolean", description: "Initial checked state." },
      { prop: "onCheckedChange", type: "(checked: boolean | 'indeterminate') => void", description: "Change handler." },
      { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction." }
    ],
    accessibility: {
      summary: [
        "Built on Radix Checkbox with full ARIA support.",
        "Pair with `<label>` via `htmlFor`."
      ],
      keyboard: [
        { key: "Space", description: "Toggle checked state." }
      ],
      aria: [
        '`role="checkbox"`',
        "`aria-checked`",
        "`aria-required`"
      ]
    },
    reducedMotion: {
      description: "Check icon transitions respect `prefers-reduced-motion`.",
      affected: ["transform", "opacity"]
    },
    examples: [
      {
        title: "Basic",
        code: `import { Checkbox } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <label className="flex items-center gap-2 text-sm">\n      <Checkbox />\n      Accept terms and conditions\n    </label>\n  )\n}`,
        render: <CheckboxDemo />
      },
      {
        title: "Disabled",
        code: `import { Checkbox } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <label className="flex items-center gap-2 text-sm opacity-50">\n      <Checkbox disabled />\n      Disabled option\n    </label>\n  )\n}`,
        render: (
          <label className="flex items-center gap-2 text-sm opacity-50">
            <Checkbox disabled />
            Disabled option
          </label>
        )
      },
      {
        title: "Variants + Sizes",
        code: `import { Checkbox } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="space-y-3">\n      <div className="flex items-center gap-3">\n        <Checkbox variant="default" defaultChecked aria-label="Default" />\n        <Checkbox variant="glass" defaultChecked aria-label="Glass" />\n        <Checkbox variant="liquid" defaultChecked aria-label="Liquid" />\n        <Checkbox variant="matte" defaultChecked aria-label="Matte" />\n        <Checkbox variant="outline" defaultChecked aria-label="Outline" />\n      </div>\n      <div className="flex items-center gap-3">\n        <Checkbox size="sm" defaultChecked aria-label="Small" />\n        <Checkbox size="md" defaultChecked aria-label="Medium" />\n        <Checkbox size="lg" defaultChecked aria-label="Large" />\n      </div>\n    </div>\n  )\n}`,
        render: (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Checkbox variant="default" defaultChecked aria-label="Default" />
              <Checkbox variant="glass" defaultChecked aria-label="Glass" />
              <Checkbox variant="liquid" defaultChecked aria-label="Liquid" />
              <Checkbox variant="matte" defaultChecked aria-label="Matte" />
              <Checkbox variant="outline" defaultChecked aria-label="Outline" />
            </div>
            <div className="flex items-center gap-3">
              <Checkbox size="sm" defaultChecked aria-label="Small" />
              <Checkbox size="md" defaultChecked aria-label="Medium" />
              <Checkbox size="lg" defaultChecked aria-label="Large" />
            </div>
          </div>
        )
      }
    ]
  },

  "radio-group": {
    badge: "Primitive / Atom",
    props: [
      {
        title: "RadioGroupProps",
        rows: [
          { prop: "value", type: "string", description: "Controlled selected value." },
          { prop: "defaultValue", type: "string", description: "Initial selected value for uncontrolled usage." },
          { prop: "onValueChange", type: "(value: string) => void", description: "Change handler." },
          { prop: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"vertical"', description: "Layout direction." },
          { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables all items." }
        ]
      },
      {
        title: "RadioGroupItemProps",
        rows: [
          { prop: "value", type: "string", description: "Value submitted by the item when selected." },
          { prop: "variant", type: '"default" | "glass" | "liquid" | "matte" | "outline"', defaultValue: '"default"', description: "Visual treatment for `RadioGroupItem`." },
          { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Control size for `RadioGroupItem`." },
          { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables this radio item." }
        ]
      }
    ],
    accessibility: {
      summary: [
        "Built on Radix RadioGroup with full ARIA support.",
        "Each item requires a unique `value`."
      ],
      keyboard: [
        { key: "Arrow Up / Down / Left / Right", description: "Navigate between radio items." },
        { key: "Space", description: "Select the focused radio item." }
      ],
      aria: [
        '`role="radiogroup"` on root',
        '`role="radio"` on items',
        "`aria-checked`"
      ]
    },
    reducedMotion: {
      description: "Indicator transitions respect `prefers-reduced-motion`.",
      affected: ["transform", "opacity"]
    },
    examples: [
      {
        title: "Basic",
        code: `import { RadioGroup, RadioGroupItem } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <RadioGroup defaultValue="starter" className="gap-3">\n      <label className="flex items-center gap-2 text-sm">\n        <RadioGroupItem value="starter" /> Starter\n      </label>\n      <label className="flex items-center gap-2 text-sm">\n        <RadioGroupItem value="pro" /> Pro\n      </label>\n      <label className="flex items-center gap-2 text-sm">\n        <RadioGroupItem value="enterprise" /> Enterprise\n      </label>\n    </RadioGroup>\n  )\n}`,
        render: (
          <RadioGroup defaultValue="starter" className="gap-3">
            <label className="flex items-center gap-2 text-sm">
              <RadioGroupItem value="starter" /> Starter
            </label>
            <label className="flex items-center gap-2 text-sm">
              <RadioGroupItem value="pro" /> Pro
            </label>
            <label className="flex items-center gap-2 text-sm">
              <RadioGroupItem value="enterprise" /> Enterprise
            </label>
          </RadioGroup>
        )
      },
      {
        title: "Variants + Sizes",
        code: `import { RadioGroup, RadioGroupItem } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="space-y-3">\n      <RadioGroup defaultValue="glass" orientation="horizontal" className="flex items-center gap-3">\n        <RadioGroupItem value="default" variant="default" aria-label="Default" />\n        <RadioGroupItem value="glass" variant="glass" aria-label="Glass" />\n        <RadioGroupItem value="liquid" variant="liquid" aria-label="Liquid" />\n        <RadioGroupItem value="matte" variant="matte" aria-label="Matte" />\n        <RadioGroupItem value="outline" variant="outline" aria-label="Outline" />\n      </RadioGroup>\n      <RadioGroup defaultValue="md" orientation="horizontal" className="flex items-center gap-3">\n        <RadioGroupItem value="sm" size="sm" aria-label="Small" />\n        <RadioGroupItem value="md" size="md" aria-label="Medium" />\n        <RadioGroupItem value="lg" size="lg" aria-label="Large" />\n      </RadioGroup>\n    </div>\n  )\n}`,
        render: (
          <div className="space-y-3">
            <RadioGroup defaultValue="glass" orientation="horizontal" className="flex items-center gap-3">
              <RadioGroupItem value="default" variant="default" aria-label="Default" />
              <RadioGroupItem value="glass" variant="glass" aria-label="Glass" />
              <RadioGroupItem value="liquid" variant="liquid" aria-label="Liquid" />
              <RadioGroupItem value="matte" variant="matte" aria-label="Matte" />
              <RadioGroupItem value="outline" variant="outline" aria-label="Outline" />
            </RadioGroup>
            <RadioGroup defaultValue="md" orientation="horizontal" className="flex items-center gap-3">
              <RadioGroupItem value="sm" size="sm" aria-label="Small" />
              <RadioGroupItem value="md" size="md" aria-label="Medium" />
              <RadioGroupItem value="lg" size="lg" aria-label="Large" />
            </RadioGroup>
          </div>
        )
      }
    ]
  },

  switch: {
    badge: "Primitive / Atom",
    props: [
      { prop: "checked", type: "boolean", description: "Controlled on/off state." },
      { prop: "defaultChecked", type: "boolean", description: "Initial state." },
      { prop: "onCheckedChange", type: "(checked: boolean) => void", description: "Change handler." },
      { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction." }
    ],
    accessibility: {
      summary: [
        "Built on Radix Switch with `role=\"switch\"`.",
        "Pair with `<label>` for context."
      ],
      keyboard: [
        { key: "Space", description: "Toggle the switch on/off." }
      ],
      aria: [
        '`role="switch"`',
        "`aria-checked`"
      ]
    },
    reducedMotion: {
      description: "Thumb slide transition respects `prefers-reduced-motion`.",
      affected: ["transform"]
    },
    examples: [
      {
        title: "Basic",
        code: `import { Switch } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <label className="flex items-center gap-2 text-sm">\n      <Switch /> Notifications\n    </label>\n  )\n}`,
        render: <SwitchDemo />
      },
      {
        title: "Disabled",
        code: `import { Switch } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <label className="flex items-center gap-2 text-sm opacity-50">\n      <Switch disabled /> Disabled\n    </label>\n  )\n}`,
        render: (
          <label className="flex items-center gap-2 text-sm opacity-50">
            <Switch disabled />
            Disabled
          </label>
        )
      }
    ]
  },

  accordion: {
    badge: "Primitive / Molecule",
    props: [
      {
        title: "Accordion",
        rows: [
          { prop: "type", type: '"single" | "multiple"', defaultValue: "single", description: "Allow one or multiple open items." },
          { prop: "collapsible", type: "boolean", defaultValue: "false", description: "Allow closing all items when type is single." },
          { prop: "defaultValue", type: "string | string[]", description: "Initially open item value(s)." },
          { prop: "value", type: "string | string[]", description: "Controlled open item value(s)." },
          { prop: "onValueChange", type: "(value: string | string[]) => void", description: "Open state change handler." }
        ]
      },
      {
        title: "AccordionItem",
        rows: [
          { prop: "value", type: "string", description: "Unique identifier for the item." },
          { prop: "variant", type: '"default" | "glass" | "outline" | "ghost" | "separated"', defaultValue: "default", description: "Visual treatment." },
          { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Density scale." },
          { prop: "disabled", type: "boolean", defaultValue: "false", description: "Prevents interaction." }
        ]
      },
      {
        title: "AccordionTrigger",
        rows: [
          { prop: "variant", type: '"default" | "glass" | "outline" | "ghost" | "separated"', defaultValue: "default", description: "Visual treatment." },
          { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Density scale." }
        ]
      },
      {
        title: "AccordionContent",
        rows: [
          { prop: "variant", type: '"default" | "glass" | "outline" | "ghost" | "separated"', defaultValue: "default", description: "Visual treatment." },
          { prop: "contentSize", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Content area density scale." }
        ]
      }
    ],
    accessibility: {
      summary: [
        "Built on Radix Accordion with full WAI-ARIA.",
        "Content regions are associated via `aria-controls`."
      ],
      keyboard: [
        { key: "Enter / Space", description: "Toggle the focused item open/closed." },
        { key: "Arrow Up", description: "Move focus to the previous trigger." },
        { key: "Arrow Down", description: "Move focus to the next trigger." }
      ],
      aria: [
        '`role="region"` on content',
        "`aria-expanded` on trigger",
        "`aria-controls` linking trigger to content"
      ]
    },
    reducedMotion: {
      description: "Open/close height transitions respect `prefers-reduced-motion`.",
      affected: ["height"]
    },
    examples: [
      {
        title: "Basic",
        code: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <Accordion type="single" collapsible>\n      <AccordionItem value="item-1">\n        <AccordionTrigger>Is it accessible?</AccordionTrigger>\n        <AccordionContent>Yes. Built on Radix with full WAI-ARIA support.</AccordionContent>\n      </AccordionItem>\n      <AccordionItem value="item-2">\n        <AccordionTrigger>Is it styled?</AccordionTrigger>\n        <AccordionContent>Yes. Ships with glass, outline, and ghost variants.</AccordionContent>\n      </AccordionItem>\n      <AccordionItem value="item-3">\n        <AccordionTrigger>Is it animated?</AccordionTrigger>\n        <AccordionContent>Yes. Smooth transitions with reduced-motion fallback.</AccordionContent>\n      </AccordionItem>\n    </Accordion>\n  )\n}`,
        render: (
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>Yes. Built on Radix with full WAI-ARIA support.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>Yes. Ships with glass, outline, and ghost variants.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>Yes. Smooth transitions with reduced-motion fallback.</AccordionContent>
            </AccordionItem>
          </Accordion>
        )
      },
      {
        title: "Glass Variant",
        code: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <Accordion type="single" collapsible>\n      <AccordionItem value="item-1" variant="glass">\n        <AccordionTrigger variant="glass">Glass accordion</AccordionTrigger>\n        <AccordionContent variant="glass">Frosted content surface.</AccordionContent>\n      </AccordionItem>\n    </Accordion>\n  )\n}`,
        render: (
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" variant="glass">
              <AccordionTrigger variant="glass">Glass accordion</AccordionTrigger>
              <AccordionContent variant="glass">Frosted content surface.</AccordionContent>
            </AccordionItem>
          </Accordion>
        )
      },
      {
        title: "Separated",
        code: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <Accordion type="single" collapsible>\n      <AccordionItem value="item-1" variant="separated">\n        <AccordionTrigger variant="separated">What is glinui?</AccordionTrigger>\n        <AccordionContent variant="separated">A glassmorphic component library built on Radix UI.</AccordionContent>\n      </AccordionItem>\n      <AccordionItem value="item-2" variant="separated">\n        <AccordionTrigger variant="separated">Is it customizable?</AccordionTrigger>\n        <AccordionContent variant="separated">Yes. Every token and variant is configurable.</AccordionContent>\n      </AccordionItem>\n      <AccordionItem value="item-3" variant="separated">\n        <AccordionTrigger variant="separated">Does it support dark mode?</AccordionTrigger>\n        <AccordionContent variant="separated">Yes. All components respect the color scheme automatically.</AccordionContent>\n      </AccordionItem>\n    </Accordion>\n  )\n}`,
        render: (
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" variant="separated">
              <AccordionTrigger variant="separated">What is glinui?</AccordionTrigger>
              <AccordionContent variant="separated">A glassmorphic component library built on Radix UI.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" variant="separated">
              <AccordionTrigger variant="separated">Is it customizable?</AccordionTrigger>
              <AccordionContent variant="separated">Yes. Every token and variant is configurable.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" variant="separated">
              <AccordionTrigger variant="separated">Does it support dark mode?</AccordionTrigger>
              <AccordionContent variant="separated">Yes. All components respect the color scheme automatically.</AccordionContent>
            </AccordionItem>
          </Accordion>
        )
      }
    ]
  },

  alert: {
    badge: "Primitive / Molecule",
    props: [
      {
        title: "Alert",
        rows: [
          { prop: "variant", type: '"default" | "glass" | "liquid" | "matte" | "glow" | "outline" | "ghost" | "success" | "warning" | "destructive" | "info"', defaultValue: "default", description: "Visual treatment." },
          { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Padding density." },
          { prop: "role", type: "string", defaultValue: "alert", description: "ARIA role." }
        ]
      },
      {
        title: "AlertTitle",
        rows: [
          { prop: "className", type: "string", description: "Additional class names." }
        ]
      },
      {
        title: "AlertDescription",
        rows: [
          { prop: "className", type: "string", description: "Additional class names." }
        ]
      }
    ],
    accessibility: {
      summary: [
        "Uses `role=\"alert\"` by default.",
        "Keep alert text concise and actionable.",
        "Prefer one alert per context region."
      ],
      aria: [
        '`role="alert"` native',
        '`aria-live="assertive"`'
      ]
    },
    reducedMotion: {
      description: "Alert is static and does not rely on animation.",
      affected: []
    },
    examples: [
      {
        title: "Basic",
        code: `import { Alert, AlertTitle, AlertDescription } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <Alert>\n      <AlertTitle>Changes saved</AlertTitle>\n      <AlertDescription>Your workspace has been updated.</AlertDescription>\n    </Alert>\n  )\n}`,
        render: (
          <Alert>
            <AlertTitle>Changes saved</AlertTitle>
            <AlertDescription>Your workspace has been updated.</AlertDescription>
          </Alert>
        )
      },
      {
        title: "Glass Variants",
        code: `import { Alert, AlertTitle, AlertDescription } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="space-y-3">\n      <Alert variant="glass">\n        <AlertTitle>Glass</AlertTitle>\n        <AlertDescription>Frosted glass surface with refraction edge.</AlertDescription>\n      </Alert>\n      <Alert variant="liquid">\n        <AlertTitle>Liquid</AlertTitle>\n        <AlertDescription>Caustic light pools with depth shimmer.</AlertDescription>\n      </Alert>\n      <Alert variant="matte">\n        <AlertTitle>Matte</AlertTitle>\n        <AlertDescription>Brushed aluminum with inner glow.</AlertDescription>\n      </Alert>\n      <Alert variant="glow">\n        <AlertTitle>Glow</AlertTitle>\n        <AlertDescription>Dark surface with soft outer luminance.</AlertDescription>\n      </Alert>\n    </div>\n  )\n}`,
        render: (
          <div className="space-y-3">
            <Alert variant="glass">
              <AlertTitle>Glass</AlertTitle>
              <AlertDescription>Frosted glass surface with refraction edge.</AlertDescription>
            </Alert>
            <Alert variant="liquid">
              <AlertTitle>Liquid</AlertTitle>
              <AlertDescription>Caustic light pools with depth shimmer.</AlertDescription>
            </Alert>
            <Alert variant="matte">
              <AlertTitle>Matte</AlertTitle>
              <AlertDescription>Brushed aluminum with inner glow.</AlertDescription>
            </Alert>
            <Alert variant="glow">
              <AlertTitle>Glow</AlertTitle>
              <AlertDescription>Dark surface with soft outer luminance.</AlertDescription>
            </Alert>
          </div>
        )
      },
      {
        title: "Semantic Variants",
        code: `import { Alert, AlertTitle, AlertDescription } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="space-y-3">\n      <Alert variant="success">\n        <AlertTitle>Success</AlertTitle>\n        <AlertDescription>Operation completed successfully.</AlertDescription>\n      </Alert>\n      <Alert variant="warning">\n        <AlertTitle>Warning</AlertTitle>\n        <AlertDescription>Please review before continuing.</AlertDescription>\n      </Alert>\n      <Alert variant="destructive">\n        <AlertTitle>Error</AlertTitle>\n        <AlertDescription>Something went wrong.</AlertDescription>\n      </Alert>\n      <Alert variant="info">\n        <AlertTitle>Info</AlertTitle>\n        <AlertDescription>Here is some helpful context.</AlertDescription>\n      </Alert>\n    </div>\n  )\n}`,
        render: (
          <div className="space-y-3">
            <Alert variant="success">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Operation completed successfully.</AlertDescription>
            </Alert>
            <Alert variant="warning">
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>Please review before continuing.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Something went wrong.</AlertDescription>
            </Alert>
            <Alert variant="info">
              <AlertTitle>Info</AlertTitle>
              <AlertDescription>Here is some helpful context.</AlertDescription>
            </Alert>
          </div>
        )
      },
      {
        title: "Minimal Variants",
        code: `import { Alert, AlertTitle } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="space-y-3">\n      <Alert variant="outline"><AlertTitle>Outline</AlertTitle></Alert>\n      <Alert variant="ghost"><AlertTitle>Ghost</AlertTitle></Alert>\n    </div>\n  )\n}`,
        render: (
          <div className="space-y-3">
            <Alert variant="outline"><AlertTitle>Outline</AlertTitle></Alert>
            <Alert variant="ghost"><AlertTitle>Ghost</AlertTitle></Alert>
          </div>
        )
      }
    ]
  },

  "alert-dialog": {
    badge: "Primitive / Molecule",
    props: [
      {
        title: "AlertDialog",
        rows: [
          { prop: "open", type: "boolean", description: "Controlled open state." },
          { prop: "defaultOpen", type: "boolean", description: "Initial open state for uncontrolled usage." },
          { prop: "onOpenChange", type: "(open: boolean) => void", description: "Open state change handler." }
        ]
      },
      {
        title: "AlertDialogTrigger",
        rows: [{ prop: "asChild", type: "boolean", defaultValue: "false", description: "Render trigger as child element." }]
      },
      {
        title: "AlertDialogContentProps",
        rows: [
          { prop: "variant", type: '"default" | "glass" | "matte"', defaultValue: "glass", description: "Visual surface treatment." },
          { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Content width and density scale." }
        ]
      },
      {
        title: "AlertDialogActionProps",
        rows: [
          { prop: "variant", type: '"default" | "glass" | "matte"', defaultValue: "default", description: "Visual treatment for confirm action." }
        ]
      },
      {
        title: "AlertDialogCancel",
        rows: [{ prop: "asChild", type: "boolean", defaultValue: "false", description: "Render cancel action as child element." }]
      }
    ],
    accessibility: {
      summary: [
        "Built on Radix Alert Dialog with focus trap and screen reader semantics.",
        "Use a clear, explicit `AlertDialogTitle` and concise `AlertDialogDescription` for destructive actions.",
        "Focus returns to the trigger after close."
      ],
      keyboard: [
        { key: "Escape", description: "Close the alert dialog." },
        { key: "Tab / Shift+Tab", description: "Cycle focus between actions." },
        { key: "Enter / Space", description: "Activate focused action." }
      ],
      aria: [
        '`role="alertdialog"`',
        "`aria-labelledby`",
        "`aria-describedby`"
      ]
    },
    reducedMotion: {
      description: "Overlay and panel transitions respect `prefers-reduced-motion` and reduce to instant state changes.",
      affected: ["opacity", "transform"]
    },
    examples: [
      {
        title: "Basic Confirmation",
        code: `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button
} from "@glinui/ui"

export function Demo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="matte">Delete project</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone and will permanently remove all project data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`,
        render: (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="matte">Delete project</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete project?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone and will permanently remove all project data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )
      },
      {
        title: "Glass Surface",
        code: `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button
} from "@glinui/ui"

export function Demo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="glass">Archive workspace</Button>
      </AlertDialogTrigger>
      <AlertDialogContent variant="glass" size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Archive workspace?</AlertDialogTitle>
          <AlertDialogDescription>
            Members will lose write access until you restore the workspace.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Not now</AlertDialogCancel>
          <AlertDialogAction variant="glass">Archive</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`,
        render: (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="glass">Archive workspace</Button>
            </AlertDialogTrigger>
            <AlertDialogContent variant="glass" size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>Archive workspace?</AlertDialogTitle>
                <AlertDialogDescription>
                  Members will lose write access until you restore the workspace.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Not now</AlertDialogCancel>
                <AlertDialogAction variant="glass">Archive</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )
      }
    ]
  },

  avatar: {
    badge: "Primitive / Atom",
    props: [
      { prop: "variant", type: '"default" | "glass" | "liquid" | "matte" | "glow" | "outline" | "ghost"', defaultValue: "default", description: "Visual surface treatment." },
      { prop: "size", type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"', defaultValue: "md", description: "Dimensions: xs=24px, sm=32px, md=40px, lg=48px, xl=56px, 2xl=80px." },
      { prop: "radius", type: '"full" | "lg" | "md" | "square"', defaultValue: "full", description: "Corner radius style." },
      { prop: "src", type: "string", description: "Image URL." },
      { prop: "alt", type: "string", description: "Alt text; first char used as fallback." },
      { prop: "fallback", type: "string", description: "Explicit fallback text (overrides alt)." },
      { prop: "status", type: '"online" | "offline" | "busy" | "away"', description: "Status indicator dot." },
      { prop: "ring", type: "boolean", defaultValue: "false", description: "Add ring for grouped/emphasized avatars." }
    ],
    accessibility: {
      summary: [
        "Image alt text provided via `alt` prop.",
        "Fallback text rendered when image fails to load.",
        "Status indicators include `aria-label` for screen readers."
      ],
      aria: [
        '`role="img"` on image',
        "`aria-label` on status dot"
      ]
    },
    reducedMotion: {
      description: "Hover transitions respect `prefers-reduced-motion`.",
      affected: ["transform", "box-shadow"]
    },
    examples: [
      {
        title: "Glass Variants",
        code: `import { Avatar } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="flex items-center gap-4">\n      <Avatar fallback="DF" variant="default" />\n      <Avatar fallback="GL" variant="glass" />\n      <Avatar fallback="LQ" variant="liquid" />\n      <Avatar fallback="MT" variant="matte" />\n      <Avatar fallback="GW" variant="glow" />\n    </div>\n  )\n}`,
        render: (
          <div className="flex items-center gap-4">
            <Avatar fallback="DF" variant="default" />
            <Avatar fallback="GL" variant="glass" />
            <Avatar fallback="LQ" variant="liquid" />
            <Avatar fallback="MT" variant="matte" />
            <Avatar fallback="GW" variant="glow" />
          </div>
        )
      },
      {
        title: "Status & Group",
        code: `import { Avatar, AvatarGroup } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="space-y-4">\n      <div className="flex gap-4">\n        <Avatar fallback="ON" variant="glass" status="online" />\n        <Avatar fallback="AW" variant="glass" status="away" />\n        <Avatar fallback="BS" variant="glass" status="busy" />\n      </div>\n      <AvatarGroup max={3}>\n        <Avatar fallback="A" />\n        <Avatar fallback="B" />\n        <Avatar fallback="C" />\n        <Avatar fallback="D" />\n      </AvatarGroup>\n    </div>\n  )\n}`,
        render: (
          <div className="space-y-4">
            <div className="flex gap-4">
              <Avatar fallback="ON" variant="glass" status="online" />
              <Avatar fallback="AW" variant="glass" status="away" />
              <Avatar fallback="BS" variant="glass" status="busy" />
            </div>
            <AvatarGroup max={3}>
              <Avatar fallback="A" />
              <Avatar fallback="B" />
              <Avatar fallback="C" />
              <Avatar fallback="D" />
            </AvatarGroup>
          </div>
        )
      }
    ]
  },

  badge: {
    badge: "Primitive / Atom",
    props: [
      { prop: "variant", type: '"default" | "glass" | "liquid" | "matte" | "glow" | "outline" | "ghost" | "success" | "warning" | "destructive" | "info"', defaultValue: "default", description: "Visual treatment." },
      { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Height scale (h-5/h-6/h-7)." }
    ],
    accessibility: {
      summary: [
        "Renders as `<span>` -- decorative by default.",
        "Add `role=\"status\"` if badge conveys live state."
      ],
      aria: [
        "Decorative by default",
        'Add `role="status"` for live state badges'
      ]
    },
    reducedMotion: {
      description: "No animation dependencies.",
      affected: []
    },
    examples: [
      {
        title: "Glass Variants",
        code: `import { Badge } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="flex flex-wrap gap-2">\n      <Badge>Default</Badge>\n      <Badge variant="glass">Glass</Badge>\n      <Badge variant="liquid">Liquid</Badge>\n      <Badge variant="matte">Matte</Badge>\n      <Badge variant="glow">Glow</Badge>\n    </div>\n  )\n}`,
        render: (
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="glass">Glass</Badge>
            <Badge variant="liquid">Liquid</Badge>
            <Badge variant="matte">Matte</Badge>
            <Badge variant="glow">Glow</Badge>
          </div>
        )
      },
      {
        title: "Semantic Variants",
        code: `import { Badge } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="flex flex-wrap gap-2">\n      <Badge variant="success">Success</Badge>\n      <Badge variant="warning">Warning</Badge>\n      <Badge variant="destructive">Error</Badge>\n      <Badge variant="info">Info</Badge>\n    </div>\n  )\n}`,
        render: (
          <div className="flex flex-wrap gap-2">
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="destructive">Error</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        )
      },
      {
        title: "Minimal & Sizes",
        code: `import { Badge } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="flex flex-wrap items-end gap-2">\n      <Badge variant="outline">Outline</Badge>\n      <Badge variant="ghost">Ghost</Badge>\n      <Badge size="sm">Small</Badge>\n      <Badge size="md">Medium</Badge>\n      <Badge size="lg">Large</Badge>\n    </div>\n  )\n}`,
        render: (
          <div className="flex flex-wrap items-end gap-2">
            <Badge variant="outline">Outline</Badge>
            <Badge variant="ghost">Ghost</Badge>
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
          </div>
        )
      }
    ]
  },

  card: {
    badge: "Primitive / Molecule",
    props: [
      {
        title: "CardProps",
        rows: [
          { prop: "variant", type: '"default" | "glass" | "outline" | "ghost"', defaultValue: "default", description: "Visual treatment." },
          { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Padding density (p-4/p-6/p-8)." }
        ]
      },
      {
        title: "CardHeaderProps",
        rows: [
          { prop: "className", type: "string", description: "Additional class names." }
        ]
      },
      {
        title: "CardTitleProps",
        rows: [
          { prop: "className", type: "string", description: "Additional class names." }
        ]
      },
      {
        title: "CardDescriptionProps",
        rows: [
          { prop: "className", type: "string", description: "Additional class names." }
        ]
      },
      {
        title: "CardContentProps",
        rows: [
          { prop: "className", type: "string", description: "Additional class names." }
        ]
      },
      {
        title: "CardFooterProps",
        rows: [
          { prop: "className", type: "string", description: "Additional class names." }
        ]
      }
    ],
    accessibility: {
      summary: [
        "Semantic `<div>` containers.",
        "Use `CardTitle` for heading hierarchy.",
        "Add landmark roles if card represents a section."
      ],
      aria: [
        "Semantic divs",
        "Heading hierarchy via CardTitle"
      ]
    },
    reducedMotion: {
      description: "No animation dependencies.",
      affected: []
    },
    examples: [
      {
        title: "Basic",
        code: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <Card>\n      <CardHeader>\n        <CardTitle>Project Overview</CardTitle>\n        <CardDescription>Weekly performance summary.</CardDescription>\n      </CardHeader>\n      <CardContent>Revenue grew 18% and churn dropped 1.2%.</CardContent>\n      <CardFooter>\n        <p className="text-sm text-neutral-500">Updated 2 min ago</p>\n      </CardFooter>\n    </Card>\n  )\n}`,
        render: (
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
              <CardDescription>Weekly performance summary.</CardDescription>
            </CardHeader>
            <CardContent>Revenue grew 18% and churn dropped 1.2%.</CardContent>
            <CardFooter>
              <p className="text-sm text-neutral-500">Updated 2 min ago</p>
            </CardFooter>
          </Card>
        )
      },
      {
        title: "Glass Variant",
        code: `import { Card, CardHeader, CardTitle, CardContent } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <Card variant="glass">\n      <CardHeader>\n        <CardTitle>Glass Card</CardTitle>\n      </CardHeader>\n      <CardContent>Frosted surface container.</CardContent>\n    </Card>\n  )\n}`,
        render: (
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Glass Card</CardTitle>
            </CardHeader>
            <CardContent>Frosted surface container.</CardContent>
          </Card>
        )
      }
    ]
  },

  command: {
    badge: "Primitive / Molecule",
    props: [
      {
        title: "Command",
        rows: [
          { prop: "children", type: "ReactNode", description: "CommandInput, CommandList, etc." },
          { prop: "variant", type: '"default" | "glass" | "outline" | "ghost" | "liquid" | "matte"', defaultValue: "default", description: "Surface style for the command root." },
          { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Density scale for input and item rows." },
          { prop: "className", type: "string", description: "Additional class names." },
          { prop: "filter", type: "(value: string, search: string) => number", description: "Custom filter function." },
          { prop: "shouldFilter", type: "boolean", defaultValue: "true", description: "Enable built-in filtering." }
        ]
      },
      {
        title: "CommandInput",
        rows: [
          { prop: "placeholder", type: "string", description: "Placeholder text for the search input." },
          { prop: "className", type: "string", description: "Additional class names." }
        ]
      },
      {
        title: "CommandList",
        rows: [
          { prop: "className", type: "string", description: "Additional class names." }
        ]
      },
      {
        title: "CommandGroup",
        rows: [
          { prop: "heading", type: "string", description: "Group heading label." },
          { prop: "className", type: "string", description: "Additional class names." }
        ]
      },
      {
        title: "CommandItem",
        rows: [
          { prop: "value", type: "string", description: "Value used for filtering and selection." },
          { prop: "onSelect", type: "(value: string) => void", description: "Called when item is selected." },
          { prop: "disabled", type: "boolean", defaultValue: "false", description: "Prevents interaction." }
        ]
      },
      {
        title: "CommandShortcut",
        rows: [
          { prop: "className", type: "string", description: "Additional class names." }
        ]
      }
    ],
    accessibility: {
      summary: [
        "Built on cmdk with keyboard-first navigation.",
        "Input auto-focuses for immediate search."
      ],
      keyboard: [
        { key: "Arrow Up / Down", description: "Navigate between items." },
        { key: "Enter", description: "Select the highlighted item." },
        { key: "Escape", description: "Close the command palette." }
      ],
      aria: [
        '`role="listbox"` on list',
        '`role="option"` on items',
        "`aria-selected`"
      ]
    },
    reducedMotion: {
      description: "List transitions respect `prefers-reduced-motion`.",
      affected: ["opacity", "transform"]
    },
    examples: [
      {
        title: "Basic",
        code: `import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <Command className="max-w-md">\n      <CommandInput placeholder="Type a command..." />\n      <CommandList>\n        <CommandEmpty>No results.</CommandEmpty>\n        <CommandGroup heading="Suggestions">\n          <CommandItem>Calendar<CommandShortcut>\u2318K</CommandShortcut></CommandItem>\n          <CommandItem>Search<CommandShortcut>\u2318S</CommandShortcut></CommandItem>\n          <CommandItem>Settings</CommandItem>\n        </CommandGroup>\n      </CommandList>\n    </Command>\n  )\n}`,
        render: (
          <Command className="max-w-md">
            <CommandInput placeholder="Type a command..." />
            <CommandList>
              <CommandEmpty>No results.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Calendar<CommandShortcut>⌘K</CommandShortcut></CommandItem>
                <CommandItem>Search<CommandShortcut>⌘S</CommandShortcut></CommandItem>
                <CommandItem>Settings</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        )
      },
      {
        title: "Surface Variants",
        code: `import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="grid gap-3 md:grid-cols-2">\n      <Command variant="glass" size="sm">\n        <CommandInput placeholder="Glass palette" />\n        <CommandList>\n          <CommandGroup heading="Actions">\n            <CommandItem>Open settings</CommandItem>\n          </CommandGroup>\n        </CommandList>\n      </Command>\n      <Command variant="matte" size="sm">\n        <CommandInput placeholder="Matte palette" />\n        <CommandList>\n          <CommandGroup heading="Actions">\n            <CommandItem>Open settings</CommandItem>\n          </CommandGroup>\n        </CommandList>\n      </Command>\n      <Command variant="liquid" size="sm">\n        <CommandInput placeholder="Liquid palette" />\n        <CommandList>\n          <CommandGroup heading="Actions">\n            <CommandItem>Open settings</CommandItem>\n          </CommandGroup>\n        </CommandList>\n      </Command>\n      <Command variant="outline" size="sm">\n        <CommandInput placeholder="Outline palette" />\n        <CommandList>\n          <CommandGroup heading="Actions">\n            <CommandItem>Open settings</CommandItem>\n          </CommandGroup>\n        </CommandList>\n      </Command>\n    </div>\n  )\n}`,
        render: (
          <div className="grid gap-3 md:grid-cols-2">
            <Command variant="glass" size="sm">
              <CommandInput placeholder="Glass palette" />
              <CommandList>
                <CommandGroup heading="Actions">
                  <CommandItem>Open settings</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
            <Command variant="matte" size="sm">
              <CommandInput placeholder="Matte palette" />
              <CommandList>
                <CommandGroup heading="Actions">
                  <CommandItem>Open settings</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
            <Command variant="liquid" size="sm">
              <CommandInput placeholder="Liquid palette" />
              <CommandList>
                <CommandGroup heading="Actions">
                  <CommandItem>Open settings</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
            <Command variant="outline" size="sm">
              <CommandInput placeholder="Outline palette" />
              <CommandList>
                <CommandGroup heading="Actions">
                  <CommandItem>Open settings</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )
      }
    ]
  },

  "dropdown-menu": {
    badge: "Primitive / Molecule",
    props: [
      {
        title: "DropdownMenu",
        rows: [
          { prop: "open", type: "boolean", description: "Controlled open state." },
          { prop: "defaultOpen", type: "boolean", description: "Initial open state." },
          { prop: "onOpenChange", type: "(open: boolean) => void", description: "Open state change handler." },
          { prop: "modal", type: "boolean", defaultValue: "true", description: "Trap focus within the menu." }
        ]
      },
      {
        title: "DropdownMenuTrigger",
        rows: [
          { prop: "variant", type: '"default" | "glass" | "outline" | "ghost"', defaultValue: "default", description: "Visual treatment." },
          { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Density scale." },
          { prop: "asChild", type: "boolean", defaultValue: "false", description: "Render as child element." }
        ]
      },
      {
        title: "DropdownMenuContent",
        rows: [
          { prop: "variant", type: '"default" | "glass" | "outline" | "ghost"', defaultValue: "default", description: "Visual treatment." },
          { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Density scale." },
          { prop: "sideOffset", type: "number", defaultValue: "4", description: "Distance from trigger in pixels." },
          { prop: "align", type: '"start" | "center" | "end"', defaultValue: "center", description: "Alignment relative to trigger." }
        ]
      },
      {
        title: "DropdownMenuItem",
        rows: [
          { prop: "variant", type: '"default" | "glass" | "outline" | "ghost"', defaultValue: "default", description: "Visual treatment." },
          { prop: "inset", type: "boolean", defaultValue: "false", description: "Adds left padding for icon alignment." },
          { prop: "disabled", type: "boolean", defaultValue: "false", description: "Prevents interaction." }
        ]
      },
      {
        title: "DropdownMenuLabel",
        rows: [
          { prop: "inset", type: "boolean", defaultValue: "false", description: "Adds left padding for icon alignment." }
        ]
      }
    ],
    accessibility: {
      summary: [
        "Built on Radix DropdownMenu with full WAI-ARIA.",
        "Focus is trapped within the menu when open."
      ],
      keyboard: [
        { key: "Enter / Space", description: "Open the menu or select an item." },
        { key: "Arrow Up / Down", description: "Navigate between menu items." },
        { key: "Arrow Right", description: "Open a submenu." },
        { key: "Arrow Left", description: "Close a submenu." },
        { key: "Escape", description: "Close the menu." }
      ],
      aria: [
        '`role="menu"`',
        '`role="menuitem"`',
        "`aria-expanded`",
        "`aria-haspopup`"
      ]
    },
    reducedMotion: {
      description: "Open/close transitions respect `prefers-reduced-motion`.",
      affected: ["opacity", "transform"]
    },
    examples: [
      {
        title: "Basic",
        code: `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <DropdownMenu>\n      <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>\n      <DropdownMenuContent>\n        <DropdownMenuLabel>My Account</DropdownMenuLabel>\n        <DropdownMenuSeparator />\n        <DropdownMenuItem>Profile</DropdownMenuItem>\n        <DropdownMenuItem>Settings</DropdownMenuItem>\n        <DropdownMenuItem>Logout</DropdownMenuItem>\n      </DropdownMenuContent>\n    </DropdownMenu>\n  )\n}`,
        render: (
          <DropdownMenu>
            <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
      {
        title: "Glass Variant",
        code: `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <DropdownMenu>\n      <DropdownMenuTrigger variant="glass">Glass menu</DropdownMenuTrigger>\n      <DropdownMenuContent variant="glass">\n        <DropdownMenuItem variant="glass">Profile</DropdownMenuItem>\n        <DropdownMenuItem variant="glass">Billing</DropdownMenuItem>\n      </DropdownMenuContent>\n    </DropdownMenu>\n  )\n}`,
        render: (
          <DropdownMenu>
            <DropdownMenuTrigger variant="glass">Glass menu</DropdownMenuTrigger>
            <DropdownMenuContent variant="glass">
              <DropdownMenuItem variant="glass">Profile</DropdownMenuItem>
              <DropdownMenuItem variant="glass">Billing</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    ]
  },

  modal: {
    badge: "Primitive / Molecule",
    props: [
      {
        title: "Modal",
        rows: [
          { prop: "open", type: "boolean", description: "Controlled open state." },
          { prop: "defaultOpen", type: "boolean", description: "Initial open state." },
          { prop: "onOpenChange", type: "(open: boolean) => void", description: "Open state change handler." },
          { prop: "modal", type: "boolean", defaultValue: "true", description: "Trap focus and block background interaction." }
        ]
      },
      {
        title: "ModalTrigger",
        rows: [
          { prop: "asChild", type: "boolean", defaultValue: "false", description: "Render as child element." }
        ]
      },
      {
        title: "ModalContent",
        rows: [
          { prop: "className", type: "string", description: "Additional class names." },
          { prop: "onEscapeKeyDown", type: "(event: KeyboardEvent) => void", description: "Called when Escape is pressed." },
          { prop: "onPointerDownOutside", type: "(event: PointerDownOutsideEvent) => void", description: "Called when clicking outside." }
        ]
      },
      {
        title: "ModalHeader",
        rows: [
          { prop: "className", type: "string", description: "Additional class names." }
        ]
      },
      {
        title: "ModalTitle",
        rows: [
          { prop: "className", type: "string", description: "Additional class names." }
        ]
      },
      {
        title: "ModalDescription",
        rows: [
          { prop: "className", type: "string", description: "Additional class names." }
        ]
      },
      {
        title: "ModalFooter",
        rows: [
          { prop: "className", type: "string", description: "Additional class names." }
        ]
      },
      {
        title: "ModalClose",
        rows: [
          { prop: "asChild", type: "boolean", defaultValue: "false", description: "Render as child element." }
        ]
      }
    ],
    accessibility: {
      summary: [
        "Built on Radix Dialog with focus trapping.",
        "ModalTitle is required for screen readers.",
        "Background interaction blocked when modal."
      ],
      keyboard: [
        { key: "Escape", description: "Close the modal." },
        { key: "Tab", description: "Cycle focus within the modal." }
      ],
      aria: [
        '`role="dialog"`',
        '`aria-modal="true"`',
        "`aria-labelledby`",
        "`aria-describedby`"
      ]
    },
    reducedMotion: {
      description: "Open/close transitions respect `prefers-reduced-motion`.",
      affected: ["opacity", "transform"]
    },
    examples: [
      {
        title: "Basic",
        code: `import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, ModalClose, Button } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <Modal>\n      <ModalTrigger asChild><Button>Open Modal</Button></ModalTrigger>\n      <ModalContent>\n        <ModalHeader>\n          <ModalTitle>Edit Profile</ModalTitle>\n          <ModalDescription>Make changes to your profile.</ModalDescription>\n        </ModalHeader>\n        <ModalFooter>\n          <ModalClose asChild><Button variant="ghost">Cancel</Button></ModalClose>\n          <Button>Save</Button>\n        </ModalFooter>\n      </ModalContent>\n    </Modal>\n  )\n}`,
        render: (
          <Modal>
            <ModalTrigger asChild><Button>Open Modal</Button></ModalTrigger>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Edit Profile</ModalTitle>
                <ModalDescription>Make changes to your profile.</ModalDescription>
              </ModalHeader>
              <ModalFooter>
                <ModalClose asChild><Button variant="ghost">Cancel</Button></ModalClose>
                <Button>Save</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )
      }
    ]
  },

  popover: {
    badge: "Primitive / Molecule",
    props: [
      {
        title: "Popover",
        rows: [
          { prop: "open", type: "boolean", description: "Controlled open state." },
          { prop: "defaultOpen", type: "boolean", description: "Initial open state." },
          { prop: "onOpenChange", type: "(open: boolean) => void", description: "Open state change handler." },
          { prop: "modal", type: "boolean", defaultValue: "false", description: "Trap focus within the popover." }
        ]
      },
      {
        title: "PopoverTrigger",
        rows: [
          { prop: "asChild", type: "boolean", defaultValue: "false", description: "Render as child element." }
        ]
      },
      {
        title: "PopoverContent",
        rows: [
          { prop: "variant", type: '"default" | "glass" | "outline" | "ghost"', defaultValue: "default", description: "Visual treatment." },
          { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Content width (w-56/w-72/w-80)." },
          { prop: "align", type: '"start" | "center" | "end"', defaultValue: "center", description: "Alignment relative to trigger." },
          { prop: "sideOffset", type: "number", defaultValue: "8", description: "Distance from trigger in pixels." },
          { prop: "side", type: '"top" | "right" | "bottom" | "left"', defaultValue: "bottom", description: "Preferred side of the trigger." }
        ]
      }
    ],
    accessibility: {
      summary: [
        "Built on Radix Popover with focus management.",
        "Focus returns to trigger on close."
      ],
      keyboard: [
        { key: "Escape", description: "Close the popover." },
        { key: "Tab", description: "Cycle focus within the popover." }
      ],
      aria: [
        "`aria-expanded` on trigger",
        "`aria-controls` linking trigger to content"
      ]
    },
    reducedMotion: {
      description: "Open/close transitions respect `prefers-reduced-motion`.",
      affected: ["opacity", "transform"]
    },
    examples: [
      {
        title: "Basic",
        code: `import { Popover, PopoverTrigger, PopoverContent } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <Popover>\n      <PopoverTrigger>Open popover</PopoverTrigger>\n      <PopoverContent>\n        <div className="space-y-2">\n          <h4 className="font-medium text-sm">Dimensions</h4>\n          <p className="text-sm text-neutral-500">Set the dimensions for the layer.</p>\n        </div>\n      </PopoverContent>\n    </Popover>\n  )\n}`,
        render: (
          <Popover>
            <PopoverTrigger>Open popover</PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Dimensions</h4>
                <p className="text-sm text-neutral-500">Set the dimensions for the layer.</p>
              </div>
            </PopoverContent>
          </Popover>
        )
      }
    ]
  },

  progress: {
    badge: "Primitive / Atom",
    props: [
      { prop: "variant", type: '"default" | "glass" | "liquid" | "matte"', defaultValue: "default", description: "Visual treatment." },
      { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Track height (h-2/h-3/h-4)." },
      { prop: "value", type: "number", defaultValue: "0", description: "Progress value (0–100, clamped)." },
      { prop: "indeterminate", type: "boolean", defaultValue: "false", description: "Loading state without a specific value." }
    ],
    accessibility: {
      summary: [
        "Built on Radix Progress with `role=\"progressbar\"`.",
        "Provide `aria-label` for screen readers."
      ],
      aria: [
        '`role="progressbar"`',
        "`aria-valuenow`",
        "`aria-valuemin`",
        "`aria-valuemax`"
      ]
    },
    reducedMotion: {
      description: "Width transition respects `prefers-reduced-motion` via `motion-reduce:transition-none`.",
      affected: ["width"]
    },
    examples: [
      {
        title: "Basic",
        code: `import { Progress } from "@glinui/ui"\n\nexport function Demo() {\n  return <Progress value={68} aria-label="Upload progress" />\n}`,
        render: <Progress value={68} aria-label="Upload progress" />
      },
      {
        title: "Glass + Sizes",
        code: `import { Progress } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="space-y-4">\n      <Progress variant="glass" size="sm" value={25} aria-label="Small" />\n      <Progress variant="liquid" size="md" value={50} aria-label="Medium" />\n      <Progress variant="matte" size="lg" value={75} aria-label="Large" />\n    </div>\n  )\n}`,
        render: (
          <div className="space-y-4">
            <Progress variant="glass" size="sm" value={25} aria-label="Small" />
            <Progress variant="liquid" size="md" value={50} aria-label="Medium" />
            <Progress variant="matte" size="lg" value={75} aria-label="Large" />
          </div>
        )
      },
      {
        title: "Circular",
        code: `import { ProgressCircle } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="flex items-center gap-4">\n      <ProgressCircle size="sm" value={30} aria-label="Small progress" />\n      <ProgressCircle variant="glass" value={64} aria-label="Glass progress" />\n      <ProgressCircle size="lg" variant="liquid" value={88} aria-label="Liquid progress" />\n    </div>\n  )\n}`,
        render: (
          <div className="flex items-center gap-4">
            <ProgressCircle size="sm" value={30} aria-label="Small progress" />
            <ProgressCircle variant="glass" value={64} aria-label="Glass progress" />
            <ProgressCircle size="lg" variant="liquid" value={88} aria-label="Liquid progress" />
          </div>
        )
      },
      {
        title: "Indeterminate",
        code: `import { Progress, ProgressCircle } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="flex items-center gap-4">\n      <div className="w-64">\n        <Progress variant="glass" indeterminate aria-label="Loading data" />\n      </div>\n      <ProgressCircle variant="matte" indeterminate aria-label="Syncing" />\n    </div>\n  )\n}`,
        render: (
          <div className="flex items-center gap-4">
            <div className="w-64">
              <Progress variant="glass" indeterminate aria-label="Loading data" />
            </div>
            <ProgressCircle variant="matte" indeterminate aria-label="Syncing" />
          </div>
        )
      }
    ]
  },

  separator: {
    badge: "Primitive / Atom",
    props: [
      { prop: "variant", type: '"default" | "glass" | "outline" | "ghost" | "gradient" | "dashed" | "dotted"', defaultValue: "default", description: "Visual treatment." },
      { prop: "orientation", type: '"horizontal" | "vertical"', defaultValue: "horizontal", description: "Divider direction." },
      { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Thickness." },
      { prop: "label", type: "string", description: "Centered text label displayed on the separator." },
      { prop: "icon", type: "ReactNode", description: "Centered icon displayed on the separator." },
      { prop: "decorative", type: "boolean", defaultValue: "true", description: "When true, sets aria-hidden." }
    ],
    accessibility: {
      summary: [
        "Uses `role=\"separator\"` when not decorative.",
        "Set `decorative={false}` for semantic separators."
      ],
      aria: [
        '`role="separator"` when not decorative',
        "`aria-orientation`",
        "`aria-hidden` when decorative"
      ]
    },
    reducedMotion: {
      description: "No animation dependencies.",
      affected: []
    },
    examples: [
      {
        title: "Default",
        code: `import { Separator } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="space-y-4">\n      <p className="text-sm">Section A</p>\n      <Separator />\n      <p className="text-sm">Section B</p>\n    </div>\n  )\n}`,
        render: (
          <div className="space-y-4">
            <p className="text-sm">Section A</p>
            <Separator />
            <p className="text-sm">Section B</p>
          </div>
        )
      },
      {
        title: "Gradient",
        code: `import { Separator } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="space-y-4">\n      <p className="text-sm">Section A</p>\n      <Separator variant="gradient" />\n      <p className="text-sm">Section B</p>\n    </div>\n  )\n}`,
        render: (
          <div className="space-y-4">
            <p className="text-sm">Section A</p>
            <Separator variant="gradient" />
            <p className="text-sm">Section B</p>
          </div>
        )
      },
      {
        title: "With Label",
        code: `import { Separator } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="space-y-4">\n      <p className="text-sm">Login with email</p>\n      <Separator label="OR" />\n      <p className="text-sm">Continue with provider</p>\n    </div>\n  )\n}`,
        render: (
          <div className="space-y-4">
            <p className="text-sm">Login with email</p>
            <Separator label="OR" />
            <p className="text-sm">Continue with provider</p>
          </div>
        )
      },
      {
        title: "Dashed",
        code: `import { Separator } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="space-y-4">\n      <p className="text-sm">Section A</p>\n      <Separator variant="dashed" />\n      <p className="text-sm">Section B</p>\n    </div>\n  )\n}`,
        render: (
          <div className="space-y-4">
            <p className="text-sm">Section A</p>
            <Separator variant="dashed" />
            <p className="text-sm">Section B</p>
          </div>
        )
      },
      {
        title: "Dotted",
        code: `import { Separator } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="space-y-4">\n      <p className="text-sm">Section A</p>\n      <Separator variant="dotted" />\n      <p className="text-sm">Section B</p>\n    </div>\n  )\n}`,
        render: (
          <div className="space-y-4">
            <p className="text-sm">Section A</p>
            <Separator variant="dotted" />
            <p className="text-sm">Section B</p>
          </div>
        )
      }
    ]
  },

  sheet: {
    badge: "Primitive / Molecule",
    props: [
      {
        title: "Sheet",
        rows: [
          { prop: "open", type: "boolean", description: "Controlled open state." },
          { prop: "defaultOpen", type: "boolean", description: "Initial open state." },
          { prop: "onOpenChange", type: "(open: boolean) => void", description: "Open state change handler." },
          { prop: "modal", type: "boolean", defaultValue: "true", description: "Trap focus and block background interaction." }
        ]
      },
      {
        title: "SheetTrigger",
        rows: [
          { prop: "asChild", type: "boolean", defaultValue: "false", description: "Render as child element." }
        ]
      },
      {
        title: "SheetContent",
        rows: [
          { prop: "variant", type: '"default" | "glass" | "outline" | "ghost"', defaultValue: "default", description: "Visual treatment." },
          { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Panel width/height." },
          { prop: "side", type: '"top" | "bottom" | "left" | "right"', defaultValue: "right", description: "Slide-in direction." }
        ]
      },
      {
        title: "SheetHeader",
        rows: [
          { prop: "className", type: "string", description: "Additional class names." }
        ]
      },
      {
        title: "SheetTitle",
        rows: [
          { prop: "className", type: "string", description: "Additional class names." }
        ]
      },
      {
        title: "SheetDescription",
        rows: [
          { prop: "className", type: "string", description: "Additional class names." }
        ]
      },
      {
        title: "SheetFooter",
        rows: [
          { prop: "className", type: "string", description: "Additional class names." }
        ]
      },
      {
        title: "SheetClose",
        rows: [
          { prop: "asChild", type: "boolean", defaultValue: "false", description: "Render as child element." }
        ]
      }
    ],
    accessibility: {
      summary: [
        "Built on Radix Dialog with focus trapping.",
        "SheetTitle required for screen readers."
      ],
      keyboard: [
        { key: "Escape", description: "Close the sheet." },
        { key: "Tab", description: "Cycle focus within the sheet." }
      ],
      aria: [
        '`role="dialog"`',
        '`aria-modal="true"`',
        "`aria-labelledby`"
      ]
    },
    reducedMotion: {
      description: "Slide transitions respect `prefers-reduced-motion`.",
      affected: ["transform"]
    },
    examples: [
      {
        title: "Basic",
        code: `import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose, Button } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <Sheet>\n      <SheetTrigger asChild><Button variant="outline">Open Sheet</Button></SheetTrigger>\n      <SheetContent>\n        <SheetHeader>\n          <SheetTitle>Settings</SheetTitle>\n          <SheetDescription>Adjust preferences.</SheetDescription>\n        </SheetHeader>\n        <SheetFooter>\n          <SheetClose asChild><Button variant="ghost">Cancel</Button></SheetClose>\n          <Button>Save</Button>\n        </SheetFooter>\n      </SheetContent>\n    </Sheet>\n  )\n}`,
        render: (
          <Sheet>
            <SheetTrigger asChild><Button variant="outline">Open Sheet</Button></SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Settings</SheetTitle>
                <SheetDescription>Adjust preferences.</SheetDescription>
              </SheetHeader>
              <SheetFooter>
                <SheetClose asChild><Button variant="ghost">Cancel</Button></SheetClose>
                <Button>Save</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        )
      },
      {
        title: "Bottom Sheet",
        code: `import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, Button } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <Sheet>\n      <SheetTrigger asChild><Button>Bottom Sheet</Button></SheetTrigger>\n      <SheetContent side="bottom">\n        <SheetHeader><SheetTitle>Quick Actions</SheetTitle></SheetHeader>\n      </SheetContent>\n    </Sheet>\n  )\n}`,
        render: (
          <Sheet>
            <SheetTrigger asChild><Button>Bottom Sheet</Button></SheetTrigger>
            <SheetContent side="bottom">
              <SheetHeader><SheetTitle>Quick Actions</SheetTitle></SheetHeader>
            </SheetContent>
          </Sheet>
        )
      }
    ]
  },

  skeleton: {
    badge: "Primitive / Atom",
    props: [
      { prop: "variant", type: '"default" | "glass" | "outline" | "ghost"', defaultValue: "default", description: "Visual treatment." },
      { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Height (h-4/h-6/h-10)." },
      { prop: "decorative", type: "boolean", defaultValue: "true", description: "When true, sets aria-hidden." }
    ],
    accessibility: {
      summary: [
        "Sets `aria-hidden` when decorative.",
        "Uses `motion-safe:animate-pulse` with `motion-reduce:animate-none`."
      ],
      aria: [
        '`aria-hidden="true"` when decorative',
        '`aria-busy="true"` on parent container'
      ]
    },
    reducedMotion: {
      description: "Pulse animation disabled with `prefers-reduced-motion: reduce`.",
      affected: ["opacity"]
    },
    examples: [
      {
        title: "Loading Pattern",
        code: `import { Skeleton } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="space-y-3">\n      <Skeleton className="h-32 w-full rounded-xl" />\n      <Skeleton className="h-4 w-3/4" />\n      <Skeleton className="h-4 w-1/2" />\n    </div>\n  )\n}`,
        render: (
          <div className="space-y-3">
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        )
      },
      {
        title: "Glass Variant",
        code: `import { Skeleton } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="space-y-3">\n      <Skeleton variant="glass" className="h-6 w-40" />\n      <Skeleton variant="glass" className="h-4 w-full max-w-sm" />\n    </div>\n  )\n}`,
        render: (
          <div className="space-y-3">
            <Skeleton variant="glass" className="h-6 w-40" />
            <Skeleton variant="glass" className="h-4 w-full max-w-sm" />
          </div>
        )
      }
    ]
  },

  slider: {
    badge: "Primitive / Atom",
    props: [
      { prop: "variant", type: '"default" | "glass" | "outline" | "ghost" | "liquid"', defaultValue: "default", description: "Visual treatment." },
      { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Track and thumb size scale." },
      { prop: "defaultValue", type: "number[]", description: "Initial value(s)." },
      { prop: "value", type: "number[]", description: "Controlled value(s)." },
      { prop: "onValueChange", type: "(value: number[]) => void", description: "Change handler for controlled sliders." },
      { prop: "max", type: "number", defaultValue: "100", description: "Maximum value." },
      { prop: "step", type: "number", defaultValue: "1", description: "Step increment." },
      { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction." }
    ],
    accessibility: {
      summary: [
        "Built on Radix Slider with full ARIA support.",
        "Supports single-value and range sliders (multiple thumbs).",
        "Provide `aria-label` for screen readers."
      ],
      keyboard: [
        { key: "Arrow Left / Right", description: "Decrease / increase value by one step." },
        { key: "Home", description: "Set to minimum value." },
        { key: "End", description: "Set to maximum value." }
      ],
      aria: [
        '`role="slider"`',
        "`aria-valuenow`",
        "`aria-valuemin`",
        "`aria-valuemax`",
        "`aria-orientation`"
      ]
    },
    reducedMotion: {
      description: "Thumb and track transitions respect `prefers-reduced-motion`.",
      affected: ["transform", "box-shadow", "opacity"]
    },
    examples: [
      {
        title: "Basic",
        code: `import { Slider } from "@glinui/ui"\n\nexport function Demo() {\n  return <Slider defaultValue={[35]} max={100} step={1} aria-label="Volume" />\n}`,
        render: <Slider defaultValue={[35]} max={100} step={1} aria-label="Volume" />
      },
      {
        title: "Surface Variants",
        code: `import { Slider } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="space-y-4">\n      <Slider defaultValue={[20]} aria-label="Default slider" />\n      <Slider variant="glass" defaultValue={[40]} aria-label="Glass slider" />\n      <Slider variant="outline" defaultValue={[58]} aria-label="Outline slider" />\n      <Slider variant="ghost" defaultValue={[72]} aria-label="Ghost slider" />\n      <Slider variant="liquid" defaultValue={[86]} aria-label="Liquid slider" />\n    </div>\n  )\n}`,
        render: (
          <div className="space-y-4">
            <Slider defaultValue={[20]} aria-label="Default slider" />
            <Slider variant="glass" defaultValue={[40]} aria-label="Glass slider" />
            <Slider variant="outline" defaultValue={[58]} aria-label="Outline slider" />
            <Slider variant="ghost" defaultValue={[72]} aria-label="Ghost slider" />
            <Slider variant="liquid" defaultValue={[86]} aria-label="Liquid slider" />
          </div>
        )
      },
      {
        title: "Sizes",
        code: `import { Slider } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="space-y-4">\n      <Slider size="sm" defaultValue={[24]} aria-label="Small slider" />\n      <Slider size="md" defaultValue={[52]} aria-label="Medium slider" />\n      <Slider size="lg" defaultValue={[78]} aria-label="Large slider" />\n    </div>\n  )\n}`,
        render: (
          <div className="space-y-4">
            <Slider size="sm" defaultValue={[24]} aria-label="Small slider" />
            <Slider size="md" defaultValue={[52]} aria-label="Medium slider" />
            <Slider size="lg" defaultValue={[78]} aria-label="Large slider" />
          </div>
        )
      },
      {
        title: "Range",
        code: `import * as React from "react"\nimport { Slider } from "@glinui/ui"\n\nexport function Demo() {\n  const [value, setValue] = React.useState([24, 78])\n\n  return (\n    <div className="space-y-3">\n      <Slider value={value} onValueChange={setValue} max={100} step={1} aria-label="Engagement range" />\n      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">\n        <span>{value[0]}%</span>\n        <span>{value[1]}%</span>\n      </div>\n    </div>\n  )\n}`,
        render: <SliderRangeDemo />
      },
      {
        title: "Animated Atmosphere",
        description: "Decorative blur layers pulse with reduced-motion fallback while slider values stay readable.",
        code: `import * as React from "react"\nimport { Badge, Slider } from "@glinui/ui"\n\nexport function Demo() {\n  const [value, setValue] = React.useState([62])\n\n  return (\n    <div className="relative overflow-hidden rounded-2xl border border-white/25 bg-[var(--glass-1-surface)] p-4 dark:border-white/10 dark:bg-white/[0.03]">\n      <div className="pointer-events-none absolute -left-6 -top-10 h-24 w-24 rounded-full bg-[var(--color-accent)]/25 blur-2xl motion-safe:animate-pulse" />\n      <div className="pointer-events-none absolute -bottom-10 right-0 h-24 w-24 rounded-full bg-[var(--color-foreground)]/15 blur-3xl motion-safe:animate-pulse" />\n      <div className="relative space-y-3">\n        <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-300">\n          <span>Atmosphere</span>\n          <Badge variant="glass">{value[0]}%</Badge>\n        </div>\n        <Slider variant="liquid" value={value} onValueChange={setValue} max={100} aria-label="Atmosphere amount" />\n      </div>\n    </div>\n  )\n}`,
        render: <SliderAtmosphereDemo />
      }
    ]
  },

  tabs: {
    badge: "Primitive / Molecule",
    props: [
      {
        title: "Tabs",
        rows: [
          { prop: "defaultValue", type: "string", description: "Initially active tab." },
          { prop: "value", type: "string", description: "Controlled active tab." },
          { prop: "onValueChange", type: "(value: string) => void", description: "Tab change handler." },
          { prop: "orientation", type: '"horizontal" | "vertical"', defaultValue: "horizontal", description: "Layout direction of the tab list." }
        ]
      },
      {
        title: "TabsList",
        rows: [
          { prop: "variant", type: '"default" | "glass" | "outline" | "ghost" | "liquid" | "matte"', defaultValue: "default", description: "Visual treatment." },
          { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Density scale." }
        ]
      },
      {
        title: "TabsTrigger",
        rows: [
          { prop: "value", type: "string", description: "Unique value identifying this tab." },
          { prop: "variant", type: '"default" | "glass" | "outline" | "ghost" | "liquid" | "matte"', defaultValue: "default", description: "Visual treatment." },
          { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Density scale." },
          { prop: "disabled", type: "boolean", defaultValue: "false", description: "Prevents interaction." }
        ]
      },
      {
        title: "TabsContent",
        rows: [
          { prop: "value", type: "string", description: "Value matching the associated trigger." },
          { prop: "variant", type: '"default" | "glass" | "outline" | "ghost" | "liquid" | "matte"', defaultValue: "default", description: "Visual treatment." }
        ]
      }
    ],
    accessibility: {
      summary: [
        "Built on Radix Tabs with full WAI-ARIA.",
        "Content is associated via `aria-controls`."
      ],
      keyboard: [
        { key: "Arrow Left / Right", description: "Navigate between tab triggers." },
        { key: "Enter / Space", description: "Select the focused tab." }
      ],
      aria: [
        '`role="tablist"` on list',
        '`role="tab"` on triggers',
        '`role="tabpanel"` on content',
        "`aria-selected`",
        "`aria-controls`"
      ]
    },
    reducedMotion: {
      description: "Active indicator transitions respect `prefers-reduced-motion`.",
      affected: ["transform", "opacity"]
    },
    examples: [
      {
        title: "Basic",
        code: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <Tabs defaultValue="account">\n      <TabsList>\n        <TabsTrigger value="account">Account</TabsTrigger>\n        <TabsTrigger value="password">Password</TabsTrigger>\n      </TabsList>\n      <TabsContent value="account">\n        <p className="text-sm text-neutral-600 dark:text-neutral-400">Account settings.</p>\n      </TabsContent>\n      <TabsContent value="password">\n        <p className="text-sm text-neutral-600 dark:text-neutral-400">Password settings.</p>\n      </TabsContent>\n    </Tabs>\n  )\n}`,
        render: (
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Account settings.</p>
            </TabsContent>
            <TabsContent value="password">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Password settings.</p>
            </TabsContent>
          </Tabs>
        )
      },
      {
        title: "Glass Variant",
        code: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <Tabs defaultValue="first">\n      <TabsList variant="glass">\n        <TabsTrigger value="first" variant="glass">First</TabsTrigger>\n        <TabsTrigger value="second" variant="glass">Second</TabsTrigger>\n      </TabsList>\n      <TabsContent value="first" variant="glass">Glass tab content.</TabsContent>\n      <TabsContent value="second" variant="glass">Second panel.</TabsContent>\n    </Tabs>\n  )\n}`,
        render: (
          <Tabs defaultValue="first">
            <TabsList variant="glass">
              <TabsTrigger value="first" variant="glass">First</TabsTrigger>
              <TabsTrigger value="second" variant="glass">Second</TabsTrigger>
            </TabsList>
            <TabsContent value="first" variant="glass">Glass tab content.</TabsContent>
            <TabsContent value="second" variant="glass">Second panel.</TabsContent>
          </Tabs>
        )
      },
      {
        title: "Liquid + Matte Variants",
        code: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <div className="grid gap-4 md:grid-cols-2">\n      <Tabs defaultValue="liquid-1">\n        <TabsList variant="liquid">\n          <TabsTrigger value="liquid-1" variant="liquid">Liquid A</TabsTrigger>\n          <TabsTrigger value="liquid-2" variant="liquid">Liquid B</TabsTrigger>\n        </TabsList>\n        <TabsContent value="liquid-1" variant="liquid">Liquid tab surface.</TabsContent>\n        <TabsContent value="liquid-2" variant="liquid">Second liquid panel.</TabsContent>\n      </Tabs>\n      <Tabs defaultValue="matte-1">\n        <TabsList variant="matte">\n          <TabsTrigger value="matte-1" variant="matte">Matte A</TabsTrigger>\n          <TabsTrigger value="matte-2" variant="matte">Matte B</TabsTrigger>\n        </TabsList>\n        <TabsContent value="matte-1" variant="matte">Matte tab surface.</TabsContent>\n        <TabsContent value="matte-2" variant="matte">Second matte panel.</TabsContent>\n      </Tabs>\n    </div>\n  )\n}`,
        render: (
          <div className="grid gap-4 md:grid-cols-2">
            <Tabs defaultValue="liquid-1">
              <TabsList variant="liquid">
                <TabsTrigger value="liquid-1" variant="liquid">Liquid A</TabsTrigger>
                <TabsTrigger value="liquid-2" variant="liquid">Liquid B</TabsTrigger>
              </TabsList>
              <TabsContent value="liquid-1" variant="liquid">Liquid tab surface.</TabsContent>
              <TabsContent value="liquid-2" variant="liquid">Second liquid panel.</TabsContent>
            </Tabs>
            <Tabs defaultValue="matte-1">
              <TabsList variant="matte">
                <TabsTrigger value="matte-1" variant="matte">Matte A</TabsTrigger>
                <TabsTrigger value="matte-2" variant="matte">Matte B</TabsTrigger>
              </TabsList>
              <TabsContent value="matte-1" variant="matte">Matte tab surface.</TabsContent>
              <TabsContent value="matte-2" variant="matte">Second matte panel.</TabsContent>
            </Tabs>
          </div>
        )
      }
    ]
  },

  table: {
    badge: "Primitive / Molecule",
    props: [
      {
        title: "Table",
        rows: [
          { prop: "variant", type: '"default" | "glass" | "outline" | "ghost" | "liquid" | "matte"', defaultValue: "default", description: "Visual surface treatment for the container." },
          { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: "md", description: "Text and spacing scale." },
          { prop: "stickyHeader", type: "boolean", defaultValue: "false", description: "Makes `<TableHeader />` stick to the top while scrolling." },
          { prop: "stickyFirstColumn", type: "boolean", defaultValue: "false", description: "Pins the first column while horizontally scrolling." },
          { prop: "striped", type: "boolean", defaultValue: "false", description: "Applies alternating row background treatment." },
          { prop: "interactive", type: "boolean", defaultValue: "true", description: "Enables row hover treatment." },
          { prop: "grid", type: "boolean", defaultValue: "false", description: "Adds vertical grid separators between cells." },
          { prop: "layout", type: '"auto" | "fixed"', defaultValue: "auto", description: "Sets table layout algorithm." },
          { prop: "noWrap", type: "boolean", defaultValue: "false", description: "Forces single-line cell and header content." },
          { prop: "rowDividers", type: "boolean", defaultValue: "true", description: "Toggles horizontal row borders." },
          { prop: "containerClassName", type: "string", description: "Class names for the scroll container wrapper." }
        ]
      },
      {
        title: "TableHeader",
        rows: [
          { prop: "className", type: "string", description: "Additional class names." }
        ]
      },
      {
        title: "TableRow",
        rows: [
          { prop: "tone", type: '"default" | "info" | "success" | "warning" | "danger"', defaultValue: "default", description: "Applies semantic row emphasis." },
          { prop: "className", type: "string", description: "Additional class names." }
        ]
      },
      {
        title: "TableHead",
        rows: [
          { prop: "align", type: '"left" | "center" | "right"', defaultValue: "left", description: "Text alignment for header cells." },
          { prop: "sticky", type: "boolean", defaultValue: "false", description: "Pins a specific header cell to the left." },
          { prop: "className", type: "string", description: "Additional class names." }
        ]
      },
      {
        title: "TableBody",
        rows: [
          { prop: "className", type: "string", description: "Additional class names." }
        ]
      },
      {
        title: "TableCell",
        rows: [
          { prop: "align", type: '"left" | "center" | "right"', defaultValue: "left", description: "Text alignment for body cells." },
          { prop: "truncate", type: "boolean", defaultValue: "false", description: "Applies single-line truncation with ellipsis." },
          { prop: "sticky", type: "boolean", defaultValue: "false", description: "Pins a specific body cell to the left." },
          { prop: "className", type: "string", description: "Additional class names." }
        ]
      }
    ],
    accessibility: {
      summary: [
        "Native `<table>` semantics with proper `<thead>`/`<tbody>` structure.",
        "Use `<th>` for column headers.",
        "Sticky headers preserve semantics because structure remains native."
      ],
      aria: [
        "Native table semantics with `<th scope>`"
      ]
    },
    reducedMotion: {
      description: "Row hover color transitions use motion-safe classes with reduced-motion fallback.",
      affected: ["background-color"]
    },
    examples: [
      {
        title: "Basic",
        code: `import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <Table>\n      <TableHeader>\n        <TableRow>\n          <TableHead>Project</TableHead>\n          <TableHead>Status</TableHead>\n          <TableHead align="right">MRR</TableHead>\n        </TableRow>\n      </TableHeader>\n      <TableBody>\n        <TableRow>\n          <TableCell>Glin UI</TableCell>\n          <TableCell>Shipping</TableCell>\n          <TableCell align="right">$18,400</TableCell>\n        </TableRow>\n        <TableRow>\n          <TableCell>Glin Docs</TableCell>\n          <TableCell>Active</TableCell>\n          <TableCell align="right">$7,920</TableCell>\n        </TableRow>\n      </TableBody>\n    </Table>\n  )\n}`,
        render: (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead align="right">MRR</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Glin UI</TableCell>
                <TableCell>Shipping</TableCell>
                <TableCell align="right">$18,400</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Glin Docs</TableCell>
                <TableCell>Active</TableCell>
                <TableCell align="right">$7,920</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )
      },
      {
        title: "Sticky Header + Striped",
        code: `import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@glinui/ui"\n\nconst rows = [\n  { region: "North America", users: "12,400", conversion: "8.2%" },\n  { region: "Europe", users: "9,280", conversion: "7.5%" },\n  { region: "APAC", users: "15,032", conversion: "6.9%" },\n  { region: "LATAM", users: "4,310", conversion: "5.8%" }\n]\n\nexport function Demo() {\n  return (\n    <Table stickyHeader striped containerClassName="max-h-52">\n      <TableHeader>\n        <TableRow>\n          <TableHead>Region</TableHead>\n          <TableHead align="right">Users</TableHead>\n          <TableHead align="right">Conversion</TableHead>\n        </TableRow>\n      </TableHeader>\n      <TableBody>\n        {rows.map((row) => (\n          <TableRow key={row.region}>\n            <TableCell>{row.region}</TableCell>\n            <TableCell align="right">{row.users}</TableCell>\n            <TableCell align="right">{row.conversion}</TableCell>\n          </TableRow>\n        ))}\n      </TableBody>\n    </Table>\n  )\n}`,
        render: (
          <Table stickyHeader striped containerClassName="max-h-52">
            <TableHeader>
              <TableRow>
                <TableHead>Region</TableHead>
                <TableHead align="right">Users</TableHead>
                <TableHead align="right">Conversion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { region: "North America", users: "12,400", conversion: "8.2%" },
                { region: "Europe", users: "9,280", conversion: "7.5%" },
                { region: "APAC", users: "15,032", conversion: "6.9%" },
                { region: "LATAM", users: "4,310", conversion: "5.8%" },
                { region: "Middle East", users: "2,980", conversion: "6.2%" },
                { region: "Africa", users: "1,740", conversion: "4.7%" }
              ].map((row) => (
                <TableRow key={row.region}>
                  <TableCell>{row.region}</TableCell>
                  <TableCell align="right">{row.users}</TableCell>
                  <TableCell align="right">{row.conversion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      },
      {
        title: "Glass Metric Grid",
        code: `import { Badge, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <Table variant="glass" grid>\n      <TableHeader>\n        <TableRow>\n          <TableHead>Feature</TableHead>\n          <TableHead align="center">Owner</TableHead>\n          <TableHead align="right">Velocity</TableHead>\n          <TableHead align="right">Status</TableHead>\n        </TableRow>\n      </TableHeader>\n      <TableBody>\n        <TableRow>\n          <TableCell truncate>Interactive docs search + semantic indexing</TableCell>\n          <TableCell align="center">Core</TableCell>\n          <TableCell align="right">+18%</TableCell>\n          <TableCell align="right"><Badge variant="glass">On Track</Badge></TableCell>\n        </TableRow>\n        <TableRow>\n          <TableCell truncate>Registry artifact validation pipeline</TableCell>\n          <TableCell align="center">Infra</TableCell>\n          <TableCell align="right">+9%</TableCell>\n          <TableCell align="right"><Badge variant="outline">Monitoring</Badge></TableCell>\n        </TableRow>\n      </TableBody>\n    </Table>\n  )\n}`,
        render: (
          <Table variant="glass" grid>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead align="center">Owner</TableHead>
                <TableHead align="right">Velocity</TableHead>
                <TableHead align="right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell truncate>Interactive docs search + semantic indexing</TableCell>
                <TableCell align="center">Core</TableCell>
                <TableCell align="right">+18%</TableCell>
                <TableCell align="right"><Badge variant="glass">On Track</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell truncate>Registry artifact validation pipeline</TableCell>
                <TableCell align="center">Infra</TableCell>
                <TableCell align="right">+9%</TableCell>
                <TableCell align="right"><Badge variant="outline">Monitoring</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )
      },
      {
        title: "Sticky First Column",
        description: "Keep identifiers visible in horizontally scrollable comparison tables.",
        code: `import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <Table stickyFirstColumn noWrap variant="matte">\n      <TableHeader>\n        <TableRow>\n          <TableHead>Feature</TableHead>\n          <TableHead align="right">Jan</TableHead>\n          <TableHead align="right">Feb</TableHead>\n          <TableHead align="right">Mar</TableHead>\n          <TableHead align="right">Apr</TableHead>\n          <TableHead align="right">May</TableHead>\n        </TableRow>\n      </TableHeader>\n      <TableBody>\n        <TableRow>\n          <TableCell>Active Teams</TableCell>\n          <TableCell align="right">89</TableCell>\n          <TableCell align="right">94</TableCell>\n          <TableCell align="right">102</TableCell>\n          <TableCell align="right">108</TableCell>\n          <TableCell align="right">113</TableCell>\n        </TableRow>\n        <TableRow tone="success">\n          <TableCell>Release Velocity</TableCell>\n          <TableCell align="right">+8%</TableCell>\n          <TableCell align="right">+11%</TableCell>\n          <TableCell align="right">+14%</TableCell>\n          <TableCell align="right">+16%</TableCell>\n          <TableCell align="right">+19%</TableCell>\n        </TableRow>\n      </TableBody>\n    </Table>\n  )\n}`,
        render: (
          <Table stickyFirstColumn noWrap variant="matte">
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead align="right">Jan</TableHead>
                <TableHead align="right">Feb</TableHead>
                <TableHead align="right">Mar</TableHead>
                <TableHead align="right">Apr</TableHead>
                <TableHead align="right">May</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Active Teams</TableCell>
                <TableCell align="right">89</TableCell>
                <TableCell align="right">94</TableCell>
                <TableCell align="right">102</TableCell>
                <TableCell align="right">108</TableCell>
                <TableCell align="right">113</TableCell>
              </TableRow>
              <TableRow tone="success">
                <TableCell>Release Velocity</TableCell>
                <TableCell align="right">+8%</TableCell>
                <TableCell align="right">+11%</TableCell>
                <TableCell align="right">+14%</TableCell>
                <TableCell align="right">+16%</TableCell>
                <TableCell align="right">+19%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )
      }
    ]
  },

  "data-table": {
    badge: "Primitive / Organism",
    props: [
      { prop: "columns", type: "DataTableColumn<T>[]", description: "Column schema with accessor, sorting, visibility, and custom cell rendering." },
      { prop: "data", type: "T[]", description: "Array of row objects." },
      { prop: "searchable", type: "boolean", defaultValue: "true", description: "Enable built-in text filtering." },
      { prop: "selectable", type: "boolean", defaultValue: "false", description: "Adds row-selection checkboxes." },
      { prop: "pageSize", type: "number", defaultValue: "10", description: "Initial page size." },
      { prop: "pageSizeOptions", type: "number[]", defaultValue: "[10, 20, 50]", description: "Page-size choices shown in toolbar." },
      { prop: "variant", type: '"default" | "glass" | "outline" | "ghost" | "liquid" | "matte"', defaultValue: "default", description: "Underlying table surface variant." }
    ],
    accessibility: {
      summary: [
        "Built on semantic table primitives for screen reader compatibility.",
        "Sorting controls are keyboard-focusable buttons in header cells.",
        "Selection checkboxes provide explicit labels."
      ],
      keyboard: [
        { key: "Tab", description: "Move across toolbar, headers, and pagination controls." },
        { key: "Enter / Space", description: "Activate sort, selection, and pagination controls." }
      ],
      aria: [
        '`aria-label` for search and selection controls',
        '`role="checkbox"` for selectable rows',
        "Native table semantics from the base table primitive"
      ]
    },
    reducedMotion: {
      description: "Inherits reduced-motion behavior from Table and action/input primitives.",
      affected: ["background-color", "opacity"]
    },
    examples: [
      {
        title: "Full Featured",
        code: `import { Badge, DataTable } from "@glinui/ui"\n\nconst columns = [\n  { id: "project", header: "Project", accessor: "project" },\n  {\n    id: "status",\n    header: "Status",\n    accessor: "status",\n    cell: ({ value }) => <Badge variant={value === "Active" ? "glass" : "outline"}>{String(value)}</Badge>\n  },\n  { id: "mrr", header: "MRR", accessor: "mrr", align: "right" }\n]\n\nconst data = [\n  { id: "p1", project: "Glin UI", status: "Active", mrr: 18400 },\n  { id: "p2", project: "Glin Docs", status: "Monitoring", mrr: 7920 },\n  { id: "p3", project: "Registry", status: "Active", mrr: 12340 },\n  { id: "p4", project: "CLI", status: "Paused", mrr: 2310 }\n]\n\nexport function Demo() {\n  return (\n    <DataTable\n      columns={columns}\n      data={data}\n      selectable\n      striped\n      stickyHeader\n      grid\n      variant="glass"\n      pageSize={3}\n      getRowId={(row) => row.id}\n    />\n  )\n}`,
        render: (
          <DataTable
            columns={[
              { id: "project", header: "Project", accessor: "project" },
              {
                id: "status",
                header: "Status",
                accessor: "status",
                cell: ({ value }) => (
                  <Badge variant={value === "Active" ? "glass" : "outline"}>{String(value)}</Badge>
                )
              },
              { id: "mrr", header: "MRR", accessor: "mrr", align: "right" }
            ]}
            data={[
              { id: "p1", project: "Glin UI", status: "Active", mrr: 18400 },
              { id: "p2", project: "Glin Docs", status: "Monitoring", mrr: 7920 },
              { id: "p3", project: "Registry", status: "Active", mrr: 12340 },
              { id: "p4", project: "CLI", status: "Paused", mrr: 2310 }
            ]}
            selectable
            striped
            stickyHeader
            grid
            variant="glass"
            pageSize={3}
            getRowId={(row) => String(row.id)}
          />
        )
      }
    ]
  },

  toast: {
    badge: "Primitive / Molecule",
    props: [
      {
        title: "Toaster",
        rows: [
          { prop: "variant", type: '"default" | "glass" | "matte"', defaultValue: "default", description: "Surface treatment for all toasts." },
          { prop: "position", type: '"top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center"', defaultValue: "bottom-right", description: "Position of the toast stack." },
          { prop: "expand", type: "boolean", defaultValue: "false", description: "Expand all toasts by default." },
          { prop: "duration", type: "number", defaultValue: "4000", description: "Default auto-dismiss time in ms." },
          { prop: "visibleToasts", type: "number", defaultValue: "3", description: "Max visible toasts at once." },
          { prop: "closeButton", type: "boolean", defaultValue: "false", description: "Show close button on every toast." },
          { prop: "richColors", type: "boolean", defaultValue: "false", description: "Use Sonner rich colors for semantic types." },
          { prop: "theme", type: '"light" | "dark" | "system"', defaultValue: "system", description: "Color scheme." },
          { prop: "hotkey", type: "string[]", defaultValue: '["altKey", "KeyT"]', description: "Keyboard shortcut to focus toasts." },
          { prop: "dir", type: '"ltr" | "rtl" | "auto"', defaultValue: "auto", description: "Text direction." }
        ]
      },
      {
        title: "toast()",
        rows: [
          { prop: "toast(message, opts?)", type: "function", description: "Show a default toast." },
          { prop: "toast.success(message, opts?)", type: "function", description: "Show a success toast with checkmark icon." },
          { prop: "toast.error(message, opts?)", type: "function", description: "Show an error toast with alert icon." },
          { prop: "toast.warning(message, opts?)", type: "function", description: "Show a warning toast with triangle icon." },
          { prop: "toast.info(message, opts?)", type: "function", description: "Show an info toast with info icon." },
          { prop: "toast.loading(message, opts?)", type: "function", description: "Show a loading toast with spinner." },
          { prop: "toast.promise(promise, opts)", type: "function", description: "Auto loading → success / error based on promise outcome." },
          { prop: "toast.custom(jsx)", type: "function", description: "Render custom JSX as a toast." },
          { prop: "toast.dismiss(id?)", type: "function", description: "Dismiss a specific toast or all toasts." }
        ]
      },
      {
        title: "Toast Options",
        rows: [
          { prop: "description", type: "ReactNode", description: "Secondary text below the title." },
          { prop: "duration", type: "number", defaultValue: "4000", description: "Per-toast auto-dismiss time in ms." },
          { prop: "icon", type: "ReactNode", description: "Custom icon override." },
          { prop: "action", type: "{ label: ReactNode; onClick: () => void }", description: "Action button config." },
          { prop: "cancel", type: "{ label: ReactNode; onClick: () => void }", description: "Cancel button config." },
          { prop: "onDismiss", type: "(toast) => void", description: "Callback when toast is dismissed." },
          { prop: "onAutoClose", type: "(toast) => void", description: "Callback when toast auto-closes." },
          { prop: "dismissible", type: "boolean", defaultValue: "true", description: "Allow swipe/click to dismiss." },
          { prop: "className", type: "string", description: "Per-toast class override." }
        ]
      }
    ],
    accessibility: {
      summary: [
        "Built on Sonner with ARIA live region announcements.",
        "Auto-pause on hover for reading time.",
        "Swipe-to-dismiss with configurable directions.",
        "Keyboard accessible with hotkey support."
      ],
      keyboard: [
        { key: "Escape", description: "Dismiss the focused toast." },
        { key: "Alt+T", description: "Focus the toast region (configurable)." }
      ],
      aria: [
        '`role="status"` on toast region',
        "`aria-live` for live announcements",
        '`aria-label` on close and action buttons'
      ]
    },
    reducedMotion: {
      description: "Slide and opacity transitions respect `prefers-reduced-motion`.",
      affected: ["transform", "opacity"]
    },
    examples: [
      {
        title: "Basic",
        code: `import { Toaster, toast, Button } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <>\n      <Toaster position="bottom-right" />\n      <Button onClick={() => toast("Settings saved", {\n        description: "Your workspace has been updated."\n      })}>\n        Show toast\n      </Button>\n    </>\n  )\n}`,
        render: <ToastDemo />
      },
      {
        title: "Toast Types",
        code: `import { Toaster, toast, Button } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <>\n      <Toaster position="bottom-right" />\n      <div className="flex flex-wrap gap-2">\n        <Button size="sm" onClick={() => toast.success("Saved")}>Success</Button>\n        <Button size="sm" onClick={() => toast.error("Failed")}>Error</Button>\n        <Button size="sm" onClick={() => toast.warning("Careful")}>Warning</Button>\n        <Button size="sm" onClick={() => toast.info("Info")}>Info</Button>\n        <Button size="sm" onClick={() => toast.loading("Uploading...")}>Loading</Button>\n      </div>\n    </>\n  )\n}`,
        render: <ToastTypesDemo />
      },
      {
        title: "Action Button",
        code: `import { Toaster, toast, Button } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <>\n      <Toaster position="bottom-right" />\n      <Button onClick={() => toast("File deleted", {\n        description: "The file has been moved to trash.",\n        action: { label: "Undo", onClick: () => toast.success("Restored") }\n      })}>\n        With action\n      </Button>\n    </>\n  )\n}`,
        render: <ToastActionDemo />
      },
      {
        title: "Promise Toast",
        code: `import { Toaster, toast, Button } from "@glinui/ui"\n\nexport function Demo() {\n  const fetchData = () => new Promise((resolve) => setTimeout(resolve, 2000))\n  return (\n    <>\n      <Toaster position="bottom-right" />\n      <Button onClick={() => toast.promise(fetchData(), {\n        loading: "Generating report...",\n        success: "Report is ready!",\n        error: "Failed to generate report"\n      })}>\n        Promise toast\n      </Button>\n    </>\n  )\n}`,
        render: <ToastPromiseDemo />
      }
    ]
  },

  tree: {
    badge: "Primitive / Molecule",
    props: [
      { prop: "nodes", type: "TreeNode[]", description: "Array of tree data nodes to render." },
      { prop: "variant", type: '"default" | "glass" | "outline" | "ghost"', defaultValue: "default", description: "Visual treatment." },
      { prop: "defaultExpanded", type: "boolean", defaultValue: "true", description: "Expand all folders by default." }
    ],
    accessibility: {
      summary: [
        "Folder nodes are interactive buttons with expand/collapse behavior.",
        "Linked leaf nodes render as anchor elements.",
        "Tree structure is conveyed visually through indentation and icons."
      ],
      keyboard: [
        { key: "Enter / Space", description: "Toggle folder expand/collapse." },
        { key: "Tab", description: "Navigate between interactive nodes." }
      ],
      aria: []
    },
    reducedMotion: {
      description: "Chevron rotation uses CSS transition that respects `prefers-reduced-motion`.",
      affected: ["transform"]
    },
    examples: [
      {
        title: "File Tree",
        description: "Display a project file structure with folders and linked files.",
        code: `import { Tree } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <Tree\n      variant="outline"\n      nodes={[\n        {\n          label: "src",\n          children: [\n            {\n              label: "components",\n              children: [\n                { label: "button.tsx", href: "#" },\n                { label: "input.tsx", href: "#" }\n              ]\n            },\n            { label: "index.ts", href: "#" }\n          ]\n        },\n        { label: "package.json", href: "#" }\n      ]}\n    />\n  )\n}`,
        render: (
          <Tree
            variant="outline"
            nodes={[
              {
                label: "src",
                children: [
                  {
                    label: "components",
                    children: [
                      { label: "button.tsx", href: "#" },
                      { label: "input.tsx", href: "#" }
                    ]
                  },
                  { label: "index.ts", href: "#" }
                ]
              },
              { label: "package.json", href: "#" }
            ]}
          />
        )
      },
      {
        title: "With Badges",
        description: "Use badges to annotate nodes with status or type information.",
        code: `import { Tree } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <Tree\n      variant="default"\n      nodes={[\n        {\n          label: "Components",\n          children: [\n            { label: "button.tsx", href: "#" },\n            { label: "button.test.tsx", href: "#", badge: "test", badgeVariant: "success" }\n          ]\n        },\n        {\n          label: "Hooks",\n          children: [\n            { label: "use-liquid-glass.tsx", href: "#", badge: "new", badgeVariant: "warning" }\n          ]\n        }\n      ]}\n    />\n  )\n}`,
        render: (
          <Tree
            variant="default"
            nodes={[
              {
                label: "Components",
                children: [
                  { label: "button.tsx", href: "#" },
                  { label: "button.test.tsx", href: "#", badge: "test", badgeVariant: "success" }
                ]
              },
              {
                label: "Hooks",
                children: [
                  { label: "use-liquid-glass.tsx", href: "#", badge: "new", badgeVariant: "warning" }
                ]
              }
            ]}
          />
        )
      },
      {
        title: "Glass Variant",
        code: `import { Tree } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <Tree\n      variant="glass"\n      nodes={[\n        {\n          label: "Navigation",\n          children: [\n            { label: "Home", href: "#" },\n            { label: "About", href: "#" },\n            { label: "Contact", href: "#" }\n          ]\n        }\n      ]}\n    />\n  )\n}`,
        render: (
          <Tree
            variant="glass"
            nodes={[
              {
                label: "Navigation",
                children: [
                  { label: "Home", href: "#" },
                  { label: "About", href: "#" },
                  { label: "Contact", href: "#" }
                ]
              }
            ]}
          />
        )
      }
    ]
  },

  tooltip: {
    badge: "Primitive / Atom",
    props: [
      { prop: "sideOffset", type: "number", defaultValue: "6", description: "Distance from trigger in pixels." },
      { prop: "delayDuration", type: "number", defaultValue: "700", description: "Delay before showing (ms)." },
      { prop: "side", type: '"top" | "right" | "bottom" | "left"', description: "Preferred tooltip position." }
    ],
    accessibility: {
      summary: [
        "Built on Radix Tooltip with `role=\"tooltip\"`.",
        "Shows on hover and focus.",
        "TooltipProvider wraps the usage context."
      ],
      keyboard: [
        { key: "Escape", description: "Dismiss the tooltip when focused." }
      ],
      aria: [
        '`role="tooltip"`',
        "`aria-describedby` linking trigger to tooltip content"
      ]
    },
    reducedMotion: {
      description: "Show/hide transitions respect `prefers-reduced-motion`.",
      affected: ["opacity", "transform"]
    },
    examples: [
      {
        title: "Basic",
        code: `import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button } from "@glinui/ui"\n\nexport function Demo() {\n  return (\n    <TooltipProvider delayDuration={100}>\n      <Tooltip>\n        <TooltipTrigger asChild><Button variant="outline">Hover me</Button></TooltipTrigger>\n        <TooltipContent>Contextual help text.</TooltipContent>\n      </Tooltip>\n    </TooltipProvider>\n  )\n}`,
        render: (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild><Button variant="outline">Hover me</Button></TooltipTrigger>
              <TooltipContent>Contextual help text.</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      }
    ]
  }
}
