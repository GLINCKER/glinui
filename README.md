<p align="center">
  <img src="apps/docs/public/glinui-logo.svg" width="80" alt="Glin UI" />
</p>

<h1 align="center">Glin UI</h1>

<p align="center">
  <strong>Glassmorphic component library for React</strong><br />
  Apple Liquid Glass design system &middot; 35+ components &middot; Tailwind CSS &middot; Radix primitives
</p>

<p align="center">
  <a href="https://glinui.com/docs/getting-started">Documentation</a> &middot;
  <a href="https://glinui.com/docs/components">Components</a> &middot;
  <a href="https://glinui.com/docs/tokens">Design Tokens</a> &middot;
  <a href="https://glinui.com/docs/glass-physics">Glass Physics</a>
</p>

---

## What is Glin UI?

Glin UI is a glassmorphic React component library built on the Apple Liquid Glass design language. Every component ships with multiple surface variants &mdash; glass, liquid, matte, glow &mdash; alongside semantic color variants and full dark mode support.

**Key features:**

- **7 surface variants** per component &mdash; default, glass, liquid, matte, glow, outline, ghost
- **Semantic variants** &mdash; success, warning, destructive, info with auto-icons
- **Apple Liquid Glass system** &mdash; `feDisplacementMap` SVG refraction with CSS fallback
- **5 glass elevation levels** &mdash; blur + surface opacity + shadow, all tokenized
- **Accessible** &mdash; Built on Radix UI primitives with WCAG AA contrast
- **Reduced motion** &mdash; All animations respect `prefers-reduced-motion`
- **Copy-paste ready** &mdash; Every variant's Tailwind classes documented for direct use

## Quick Start

```bash
# Install
pnpm add @glinui/ui @glinui/tokens

# Or use the registry CLI
pnpm dlx @glinui/cli@latest add button
```

```tsx
import { Button } from "@glinui/ui"

export default function App() {
  return (
    <div className="flex gap-3">
      <Button>Default</Button>
      <Button variant="glass">Glass</Button>
      <Button variant="liquid">Liquid</Button>
      <Button variant="glow">Glow</Button>
    </div>
  )
}
```

## Components

### Primitives (Atoms)

| Component | Variants | Key Features |
|-----------|----------|-------------|
| **Accordion** | default, glass, outline, ghost, separated | CSS height animations, Radix-based |
| **Alert** | default, glass, liquid, matte, glow + semantic | Icon support, auto-colored |
| **Avatar** | default, glass, liquid, matte, glow | Status dots, AvatarGroup with overflow |
| **Badge** | default, glass, liquid, matte, glow + semantic | 3 sizes, rounded-full |
| **Button** | default, glass, liquid, matte, glow, outline, ghost | Hover lift, shimmer, press squish |
| **Card** | default, glass, outline, ghost | Header/Content/Footer composition |
| **Checkbox** | default | Radix-based, indeterminate support |
| **Command** | default | Keyboard-driven search palette |
| **Dropdown Menu** | default | Radix-based, keyboard navigation |
| **Input** | default, glass, outline, ghost, underline, filled | Focus animations |
| **Modal** | default | Radix Dialog with glass overlay |
| **Popover** | default | Anchored floating panel |
| **Progress** | default, glass | Tokenized sizes |
| **Radio Group** | default | Radix-based |
| **Select** | default | Radix-based with glass surface |
| **Separator** | default, glass, gradient, dashed, dotted | Label/icon support |
| **Sheet** | top, right, bottom, left | Slide panel with overlay |
| **Skeleton** | default, glass | Reduced motion fallback |
| **Slider** | default | Glass thumb/track |
| **Switch** | default | Radix-based |
| **Table** | default | Composable header/body/row/cell |
| **Tabs** | default | Radix-based |
| **Textarea** | default | Multi-line input |
| **Toast** | default, glass, matte + semantic | Sonner-powered, promise toasts |
| **Tooltip** | default | Radix-based |
| **Tree** | default, glass, outline, ghost | File tree, badges, links |

### Signature (Glass) Components

| Component | Description |
|-----------|------------|
| **Glass Card** | Depth-aware blur with refraction edges |
| **Glass Navbar** | Scroll-responsive translucent nav |
| **Liquid Button** | Fluid hover lift with radial shine |
| **Spotlight Card** | Cursor-tracked radial spotlight |
| **Magnetic CTA** | Subtle cursor-attraction on hover |

## Design Tokens

The entire visual system is tokenized via CSS custom properties:

```css
/* Glass surfaces */
--glass-{1-5}-surface    /* 5 elevation levels */
--glass-{1-5}-blur       /* Paired blur values */
--glass-refraction-top   /* Top border refraction */

/* Shadows */
--shadow-glass-sm/md/lg  /* Depth-matched shadows */

/* Motion */
--motion-fast/normal/slow   /* Duration tokens */
--easing-standard/spring    /* Timing functions */
```

See the full [token reference](https://glinui.com/docs/tokens).

## Monorepo Structure

```
glinui/
  apps/
    docs/              Next.js 15 docs site
  packages/
    ui/                35+ React components
    tokens/            CSS design tokens (glass, color, motion)
    motion/            Animation utilities
    registry/          Component metadata & CLI
    tsconfig/          Shared TypeScript config
```

## Development

```bash
# Install dependencies
pnpm install

# Start docs dev server
pnpm dev

# Run all checks
pnpm typecheck      # TypeScript
pnpm test           # Vitest (80+ tests)
pnpm build          # Production build
```

## Tech Stack

- **React 19** + **Next.js 15** (App Router)
- **Tailwind CSS v4** with CSS custom properties
- **Radix UI** for accessible primitives
- **class-variance-authority** for variant composition
- **Sonner** for toast notifications
- **Lucide** for iconography
- **Vitest** + Testing Library for testing
- **pnpm** + **Turborepo** for monorepo management

## Contributing

We welcome contributions. Please open an issue first to discuss changes.

```bash
# Fork & clone
git clone https://github.com/GLINCKER/glinui.git
cd glinui
pnpm install
pnpm dev
```

## License

MIT License. See [LICENSE](LICENSE) for details.

---

<p align="center">
  Built by <a href="https://glincker.com">Glincker</a>
</p>
