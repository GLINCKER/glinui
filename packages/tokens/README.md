# @glinui/tokens

Design tokens for Glin UI. OKLCH color system, glass elevation levels, blur tiers, and shadow primitives.

## Install

```bash
npm install @glinui/tokens
```

## Usage

Import the CSS theme in your app entry:

```tsx
import "@glinui/tokens/theme.css"
```

Use tokens in your Tailwind classes or CSS:

```css
.my-card {
  background: var(--glass-3-surface);
  box-shadow: var(--glass-3-shadow);
  border-top-color: var(--glass-refraction-top);
  backdrop-filter: blur(var(--glass-blur-md));
}
```

## Token Categories

- **Colors** — OKLCH: `--color-background`, `--color-foreground`, `--color-accent`, etc.
- **Glass surfaces** — 5 elevation levels: `--glass-{1-5}-surface`, `--glass-{1-5}-shadow`
- **Blur tiers** — `--glass-blur-sm/md/lg/xl`
- **Shadows** — `--shadow-glass-sm/md/lg`
- **Refraction** — `--glass-refraction-top` for top edge highlight

## Documentation

[glinui.com/docs/tokens](https://glinui.com/docs/tokens)

## License

MIT
