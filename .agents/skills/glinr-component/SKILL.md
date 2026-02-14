---
name: glinr-component
description: Use when implementing, updating, or debugging Glinr UI components. Covers glass-themed React components with Radix UI, Tailwind CSS, cva variants, and accessibility.
---

# Glinr Component Builder

You are building components for Glinr UI — a glassmorphic component library.

## Implementation Steps

1. **Check** if Radix UI has a primitive for this component (use it for behavior)
2. **Create** `packages/ui/src/components/<name>.tsx`:
   - `"use client"` directive
   - `forwardRef` pattern
   - `cva()` with variants: default, glass, outline, ghost
   - `cn()` for class merging
   - Size variants: sm, md, lg
   - Glass variant must use: `backdrop-blur-md bg-surface/80 border border-white/10`
   - Focus ring: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent`
3. **Export** from `packages/ui/src/index.ts`
4. **Test** in `packages/ui/src/tests/<name>.test.tsx`:
   - Renders without error
   - Each variant renders
   - Accessibility (role, keyboard)
   - Disabled state
   - className forwarding
5. **Document** — add to docs app primitives list + demo page
6. **Verify** — `pnpm typecheck && pnpm test`

## Glass Tokens (CSS Variables)

```
--glass-blur-sm: 4px    --glass-blur-md: 12px    --glass-blur-lg: 24px
--glass-surface: rgba(255,255,255,0.02)
--glass-border: rgba(255,255,255,0.08)
```

## Key Files

- Existing components: `packages/ui/src/components/`
- Tokens: `packages/tokens/src/`
- Motion: `packages/motion/src/`
- Test setup: `packages/ui/src/tests/setup.ts`
- Docs primitives list: `apps/docs/src/lib/primitives.ts`
