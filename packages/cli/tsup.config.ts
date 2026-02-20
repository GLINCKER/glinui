import { defineConfig } from "tsup"

export default defineConfig({
  clean: true,
  dts: true,
  entry: [
    "src/index.ts",
    "src/registry/index.ts"
  ],
  format: ["esm"],
  minify: true,
  sourcemap: true,
  banner: {
    js: "#!/usr/bin/env node"
  },
  external: ["commander", "prompts", "picocolors", "fs-extra", "node-fetch", "zod"]
})
