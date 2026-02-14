export type RegistryItem = {
  name: string
  namespace: "@glinr"
  type: "primitive" | "signature"
  title: string
  description: string
  docsPath: string
  importPath: string
  dependencies: string[]
  files: string[]
  install: {
    package: string
    registry: string
  }
}

export const baseRegistry: RegistryItem[] = [
  {
    name: "button",
    namespace: "@glinr",
    type: "primitive",
    title: "Button",
    description: "Action control with default, glass, liquid, matte, glow, outline, and ghost variants.",
    docsPath: "/docs/components/button",
    importPath: "@glinr/ui",
    dependencies: ["@glinr/ui"],
    files: [
      "packages/ui/src/components/button.tsx",
      "packages/ui/src/tests/button.test.tsx"
    ],
    install: {
      package: "npm install @glinr/ui @glinr/tokens",
      registry: "pnpm dlx @glinr/cli@latest add button"
    }
  }
]

export function getRegistryItem(name: string) {
  return baseRegistry.find((item) => item.name === name) ?? null
}
