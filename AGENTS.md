# AGENTS.md — Glinr UI

> Glassmorphic component library for React. Read `VISION.md` for full strategy.

## Project

- **Goal**: First production-grade liquid glass UI library for web
- **Stack**: React 19, Next.js 15, Radix UI, Tailwind CSS, pnpm + Turbo
- **Packages**: `@glinr/ui`, `@glinr/tokens`, `@glinr/motion`, `@glinr/registry`
- **Docs**: `apps/docs/` (Next.js)
- **Phases**: `docs-local/PHASES.md` (roadmap + task tracker)

## Commands

```bash
pnpm dev          # Start dev servers
pnpm build        # Build all packages
pnpm typecheck    # TypeScript check
pnpm test         # Run Vitest tests
pnpm lint         # Lint all packages
```

## Rules

- Default to action. Only ask if: breaking public API, adding deps, or truly ambiguous after checking VISION.md + existing code + reference repos
- No `any` types. No inline styles. Tailwind only. Lucide icons only
- Every component needs: glass variant, a11y (Radix), reduced-motion fallback, tests, docs
- Use `forwardRef`, `cva()` for variants, `cn()` for class merging
- Animate only `transform`/`opacity`. Budget 60fps on mid-tier devices
- Use CSS variables from `@glinr/tokens` — never hardcode colors
- Run `pnpm typecheck && pnpm test` before commititng 
- Be continous dont stop after small tasks see whats next in pipeline and keep going updating the status in docs-local and proceeding so we can ship this faster

## Component Pattern

```
1. packages/ui/src/components/<name>.tsx  — forwardRef + cva + cn + glass variant
2. packages/ui/src/index.ts              — export from barrel
3. packages/ui/src/tests/<name>.test.tsx  — render, variants, a11y, disabled, className
4. apps/docs/                            — demo page + metadata
```

## When Stuck

1. Read existing components for patterns
2. Check `docs-local/git/shadcn-ui/`, `magicui/`, `heroui/`
3. Search official docs (Radix, Tailwind, MDN)
4. Check `VISION.md`
5. Only then ask

## Git

```
<type>: <description>
Co-Authored-By: Glinr <bot@glincker.com>
```

Types: feat, fix, perf, refactor, docs, test, chore. One concern per PR.

## Structure

```
open-ui/
├── VISION.md          # Strategy, component catalog, business model
├── AGENTS.md          # This file
├── apps/docs/         # Next.js docs (ui.glinr.com)
├── packages/ui/       # Component library
├── packages/tokens/   # Design tokens (OKLCH, glass, motion)
├── packages/motion/   # Animation presets
├── packages/registry/ # Component metadata for CLI
└── docs-local/        # Planning (not pushed)
    ├── PHASES.md      # Master roadmap
    ├── phases/        # Phase details
    ├── analysis/      # Research
    └── git/           # Reference repos
```

## Clean Room

Reference repos in `docs-local/git/` are for insight only. Rewrite from first principles. No code copying.

