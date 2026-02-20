#!/usr/bin/env node

import { execSync } from "node:child_process"

function run(command) {
  console.log(`\n> ${command}`)
  execSync(command, { stdio: "inherit" })
}

const commands = [
  "pnpm --filter @glinui/docs preregistry",
  "pnpm --filter glinui build",
  "pnpm --filter glinui test",
  "pnpm --filter glinui test:e2e",
  "node tooling/scripts/validate-publish.mjs"
]

for (const command of commands) {
  run(command)
}

console.log("\npublish-readiness: all checks passed.")
