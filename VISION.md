# Glinr UI — Product Vision

## The Bet

Apple moved the entire industry toward liquid glass with visionOS, iOS 26, and macOS Tahoe. Every native app will look like this within 2 years. **There is no dominant glassmorphic component library for the web.** shadcn owns the "clean minimal" space. Magic UI owns "animated effects." Aceternity owns "dark mode showcase." Nobody owns **production-grade liquid glass for React.**

Glinr UI fills that gap.

## Market Position

```
                    Simple ──────────────────── Complex
                    │                              │
  Utility-first ─── │  shadcn/ui                   │ ─── HeroUI
                    │    (copy-paste, minimal)      │    (package, typed)
                    │                              │
  Effect-heavy ──── │  Magic UI                    │ ─── Aceternity
                    │    (motion tricks)            │    (dark showcase)
                    │                              │
  GLASS SYSTEM ──── │  ★ Glinr UI ★               │
                    │    (liquid glass + motion     │
                    │     + production quality)     │
                    │                              │
```

**Our moat:** Not random blur effects. A *coherent design system* built on glass physics — refraction, depth, luminance, surface tension — that ships as accessible, performant components.

## What We Are Building

### Core Product: `@glinr/ui`
Open-source React component library. Glassmorphic-first. Accessible. Performant. Two install paths:
1. **Copy-paste** (shadcn-compatible registry): `npx shadcn@latest add @glinr/glass-card`
2. **Package install**: `pnpm add @glinr/ui`

### Supporting Packages
| Package | Purpose |
|---------|---------|
| `@glinr/tokens` | Design tokens — OKLCH colors, glass blur/opacity, shadows, spacing, motion |
| `@glinr/motion` | Animation presets with perf budgets and reduced-motion fallbacks |
| `@glinr/registry` | Component metadata for CLI/copy-paste distribution |
| `@glinr/cli` | `npx glinr init` / `npx glinr add` — own CLI (future) |

### Documentation: `ui.glinr.com`
Next.js docs site with live demos, copy/paste snippets, API tables, and "glass physics" design guides.

## Component Taxonomy

### Tier 1 — Primitives (Foundation)
Standard UI controls with glass theming. These must be rock-solid, accessible, and boring-reliable.

| Component | Status | Notes |
|-----------|--------|-------|
| Button | DONE | Variants: default, outline, ghost, glass |
| Input | DONE | Sizes, glass surface mode |
| Textarea | DONE | Auto-resize option |
| Select | DONE | Native + custom dropdown |
| Checkbox | DONE | Radix-based |
| RadioGroup | DONE | Radix-based |
| Switch | DONE | Radix-based |
| Modal/Dialog | DONE | Glass overlay + panel |
| Tooltip | DONE | Radix-based |
| Toast | DONE | Radix-based, auto-dismiss |
| Tabs | TODO | Glass indicator animation |
| Accordion | TODO | Smooth expand/collapse |
| Dropdown Menu | TODO | Radix-based, glass panel |
| Popover | TODO | Radix-based |
| Avatar | TODO | Image + fallback |
| Badge | TODO | Status indicators |
| Separator | TODO | Horizontal/vertical |
| Skeleton | TODO | Glass shimmer loading |
| Progress | TODO | Glass fill animation |
| Slider | TODO | Radix-based |
| Sheet/Drawer | TODO | Side panel |
| Command | TODO | Command palette |
| Alert | TODO | Glass notification |
| Card | TODO | Base card container |
| Table | TODO | Data table base |

### Tier 2 — Signature Glass Components
These are the differentiators. The reason people choose Glinr over shadcn.

| Component | Description |
|-----------|-------------|
| GlassCard | Frosted card with depth-aware blur, refraction edge highlights |
| GlassNavbar | Translucent nav that responds to scroll with blur intensity |
| LiquidButton | Button with fluid hover/press morphing animation |
| BlurSpotlight | Ambient glow that follows cursor or focus |
| GlassDock | macOS-style dock with magnification + glass reflections |
| MorphingTabs | Tab indicator that morphs shape between items |
| RevealText | Text that reveals through glass wipe/frosted effect |
| PrismBorder | Animated rainbow refraction border |
| FloatingPanel | Draggable glass panel with depth shadows |
| MagneticCTA | CTA button with magnetic cursor attraction |
| GlassSheet | Bottom/side sheet with frosted glass backdrop |
| DepthCard | Card that tilts with parallax glass layers |
| AuroraBackground | Animated gradient mesh background |
| GlassInput | Input with glass surface, glow-on-focus |
| SpotlightCard | Card with cursor-following spotlight |
| ChromaticText | Text with chromatic aberration effect |
| GlassTooltip | Tooltip with frosted glass + glow arrow |
| ParticleField | Ambient particle system background |
| GlassBreadcrumb | Navigation breadcrumb with glass pill indicators |
| RippleButton | Button with liquid ripple on press |

### Tier 3 — Blocks (Composed Layouts)
Pre-built sections using Tier 1+2 components. These become templates.

| Block | Description |
|-------|-------------|
| HeroSection | Glass hero with CTA, gradient mesh bg |
| PricingTable | Glass cards with feature comparison |
| AuthForm | Login/signup with glass panel |
| DashboardShell | Glass sidebar + header + content |
| FeatureGrid | Glass cards in responsive grid |
| TestimonialCarousel | Glass cards with avatar + quote |
| StatsRow | Animated counters in glass cards |
| FooterSection | Glass footer with link columns |
| NavigationMenu | Full glass nav with dropdowns |
| CommandCenter | Glass command palette (cmd+k) |
| NotificationStack | Stacked glass toast notifications |
| SettingsPanel | Glass form sections |
| OnboardingStepper | Multi-step glass wizard |
| FileUpload | Drop zone with glass surface |
| DataTable | Sortable, filterable glass table |

### Tier 4 — Full Templates (Monetization)
Complete page templates sold as pro content.

| Template | Target |
|----------|--------|
| SaaS Landing Page | Startup marketing sites |
| Dashboard | Admin panels |
| Portfolio | Developer/designer portfolios |
| Documentation | Product docs |
| E-commerce | Product pages |
| Blog | Content sites |
| Waitlist | Launch pages |
| Changelog | Product updates |

## Design Language — "Glass Physics"

The design system is built on real optical principles, not arbitrary blur values:

### Surface Model
- **Background blur** — simulates frosted glass depth (4px, 12px, 24px levels)
- **Surface opacity** — how transparent the "glass" is (0.02 to 0.15)
- **Border luminance** — subtle edge highlight simulating light refraction
- **Shadow depth** — elevation creates parallax shadow offset

### Color System (OKLCH)
- Perceptually uniform — colors stay balanced across light/dark
- Glass-optimized — designed to look correct *through* blur layers
- Semantic tokens — background, surface, accent, border (not arbitrary hex)

### Motion Language
- **Durations**: fast (120ms), normal (220ms), slow (360ms)
- **Easing**: standard (natural decel), emphasize (slight overshoot for glass bounce)
- **Budget**: All animations must maintain 60fps on mid-tier hardware
- **Reduced motion**: Every animation has a graceful static fallback

## Distribution Strategy

### Phase A: shadcn Registry Compatibility
Register as a shadcn namespace so users can immediately `npx shadcn@latest add @glinr/glass-card`. This bootstraps adoption through the existing shadcn ecosystem.

### Phase B: Own CLI
`npx glinr init` / `npx glinr add` — full control over the install experience, theming presets, and pro component gating.

### Phase C: Package Install
`pnpm add @glinr/ui` for teams who want a traditional dependency. Tree-shakeable, typed, versioned.

## Business Model

### Free (OSS Core)
- All Tier 1 primitives
- All Tier 2 signature components
- Basic tokens and motion presets
- Documentation and examples

### Pro (Paid)
- Tier 3 blocks (pre-built sections)
- Tier 4 full page templates
- Premium theme packs (different glass styles)
- Priority support and Discord access
- Commercial license for agencies

### Revenue Targets
- **Phase 1**: Build community (0 revenue, pure OSS)
- **Phase 2**: Launch pro templates ($29-99 per template)
- **Phase 3**: Template bundles ($199-499)
- **Phase 4**: Enterprise/agency licensing

## Success Metrics

### Adoption (First 6 Months)
- 1,000+ GitHub stars
- 500+ weekly npm downloads
- 50+ components shipped
- Active Discord/community

### Revenue (Month 6-12)
- First template sales
- $1K+ MRR from pro content
- 3+ paying agency customers

### Brand (Year 1)
- "Glinr" recognized as the glassmorphic UI option for React
- Conference talk or blog post feature
- Contributor community forming

## Technical North Star

1. **Accessibility is non-negotiable** — Every component passes WCAG 2.1 AA. Radix UI for behavior, custom glass styling on top.
2. **Performance is a feature** — Glass effects are GPU-heavy. We budget for them. Every component has a lightweight fallback mode.
3. **Developer experience wins** — TypeScript-first. Excellent prop types. Copy-paste and package install. Docs that make adoption effortless.
4. **Themeable by default** — CSS custom properties + tokens. Swap the glass intensity, color palette, or motion style without forking components.
5. **Progressive enhancement** — Works without JS for basic rendering. Animations enhance, never gate functionality.

## Competitive Intelligence — What To Watch

| Competitor | Watch For | Our Response |
|-----------|-----------|-------------|
| shadcn/ui | Adding glass/frost themes | Go deeper on glass physics, not just blur |
| Magic UI | Adding more production components | Focus on quality + system coherence |
| Aceternity | Open-sourcing more | Ship faster, better docs |
| Apple | New HIG glass patterns | Adopt immediately into token system |
| Tailwind | v4 changes | Stay compatible, use new features early |
| Radix | New primitives | Adopt and glass-theme them |

## The One-Line Pitch

**"Liquid Glass Components for React — the design system Apple's web never shipped."**
