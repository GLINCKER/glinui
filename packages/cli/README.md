# glinui

CLI for adding Glin UI liquid glass components to your project.

## Quick Start

```bash
npx glinui init
npx glinui add button glass-card input
```

## Commands

### `glinui init`

Initialize Glin UI in your project. Creates `glinui.json` config and scaffolds the `cn()` utility.

```bash
npx glinui init
npx glinui init --yes  # Accept defaults
```

### `glinui add [components...]`

Add components to your project. Fetches source from the registry and writes files to your components directory.

```bash
npx glinui add button
npx glinui add glass-card spotlight-card border-beam
npx glinui add --overwrite button  # Overwrite existing
```

### `glinui list`

List all available components in the registry.

```bash
npx glinui list
npx glinui list --type signature  # Filter by type
```

### `glinui diff [component]`

Show differences between your local component and the registry version.

```bash
npx glinui diff button
```

## Configuration

`glinui.json`:

```json
{
  "$schema": "https://glinui.com/r/schema.json",
  "style": "default",
  "tailwind": {
    "css": "src/app/globals.css"
  },
  "aliases": {
    "components": "src/components/ui",
    "utils": "src/lib/utils"
  }
}
```

## Documentation

[glinui.com/docs/getting-started](https://glinui.com/docs/getting-started)

## License

MIT
