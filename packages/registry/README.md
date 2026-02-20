# @glinui/registry

Component metadata registry for Glin UI. Used internally by the CLI and docs site to resolve component dependencies, file paths, and install commands.

## Install

```bash
npm install @glinui/registry
```

## Usage

```tsx
import { baseRegistry, getRegistryItem } from "@glinui/registry"

const button = getRegistryItem("button")
// { name: "button", type: "primitive", dependencies: [...], ... }

console.log(baseRegistry.length) // 76 components
```

## Documentation

[glinui.com](https://glinui.com)

## License

MIT
