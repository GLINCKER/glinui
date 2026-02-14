#!/usr/bin/env node

import { execSync } from "node:child_process"

function run(command) {
  execSync(command, { stdio: "inherit" })
}

try {
  execSync("git rev-parse --is-inside-work-tree", { stdio: "ignore" })
} catch {
  console.log("hooks:install: no git repository detected, skipping.")
  process.exit(0)
}

try {
  run("git config core.hooksPath .githooks")
  console.log("hooks:install: configured core.hooksPath to .githooks")
} catch (error) {
  console.error("hooks:install: failed to configure git hooks.")
  if (error instanceof Error) {
    console.error(error.message)
  }
  process.exit(1)
}
