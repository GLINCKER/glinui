import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    include: ["src/tests/e2e.smoke.ts"]
  }
})
