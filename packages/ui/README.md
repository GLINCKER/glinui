# @glinui/ui

Liquid Glass component library for React. 76 components with glassmorphic variants, built on Radix UI and Tailwind CSS.

## Install

```bash
npm install @glinui/ui @glinui/tokens
```

## Usage

```tsx
import { Button, GlassCard, Input } from "@glinui/ui"

export function Example() {
  return (
    <GlassCard>
      <Input variant="glass" placeholder="Email" />
      <Button variant="glass">Submit</Button>
    </GlassCard>
  )
}
```

## Features

- 76 components (primitives + signature effects)
- Glass, liquid, matte, glow, and outline variants
- Built on Radix UI for accessibility
- Tailwind CSS styling with design tokens
- Reduced-motion fallbacks
- React 18/19 compatible

## CLI

Add individual components to your project:

```bash
npx glinui add button glass-card input
```

## Documentation

[glinui.com](https://glinui.com)

## License

MIT
