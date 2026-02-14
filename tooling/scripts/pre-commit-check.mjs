#!/usr/bin/env node

import { execSync } from "node:child_process"

const SKIP = process.env.SKIP_GIT_HOOKS === "1"

function read(command) {
  try {
    return execSync(command, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim()
  } catch {
    return ""
  }
}

function run(command) {
  console.log(`\n> ${command}`)
  execSync(command, { stdio: "inherit" })
}

if (SKIP) {
  console.log("pre-commit: skipped (SKIP_GIT_HOOKS=1)")
  process.exit(0)
}

const isGitRepo = read("git rev-parse --is-inside-work-tree")
if (!isGitRepo) {
  console.log("pre-commit: no git repository detected, skipping.")
  process.exit(0)
}

const stagedRaw = read("git diff --cached --name-only --diff-filter=ACMR")
if (!stagedRaw) {
  console.log("pre-commit: no staged files, skipping.")
  process.exit(0)
}

const stagedFiles = stagedRaw
  .split("\n")
  .map((entry) => entry.trim())
  .filter(Boolean)

const touches = (prefix) => stagedFiles.some((file) => file === prefix || file.startsWith(`${prefix}/`))
const touchesAny = (candidates) => candidates.some((candidate) => stagedFiles.includes(candidate))

const commands = []

if (touches("packages/ui")) {
  commands.push("pnpm --filter @glinr/ui typecheck")
  commands.push("pnpm --filter @glinr/ui test")
}

if (touches("packages/tokens")) {
  commands.push("pnpm --filter @glinr/tokens typecheck")
}

if (touches("packages/motion")) {
  commands.push("pnpm --filter @glinr/motion typecheck")
}

if (touches("packages/registry")) {
  commands.push("pnpm --filter @glinr/registry typecheck")
}

if (touches("apps/docs")) {
  commands.push("pnpm --filter @glinr/docs typecheck")

  const docsBuildSensitive =
    touches("apps/docs/src/app") ||
    touches("apps/docs/src/components") ||
    touchesAny([
      "apps/docs/next.config.ts",
      "apps/docs/mdx-plugins.ts",
      "apps/docs/mdx-components.tsx",
      "apps/docs/package.json",
      "apps/docs/tsconfig.json"
    ])

  if (docsBuildSensitive) {
    commands.push("pnpm --filter @glinr/docs build")
  }
}

const rootConfigChanged = touchesAny([
  "package.json",
  "pnpm-workspace.yaml",
  "turbo.json",
  "tsconfig.base.json"
])

if (rootConfigChanged) {
  commands.push("pnpm typecheck")
}

const uniqueCommands = [...new Set(commands)]

if (uniqueCommands.length === 0) {
  console.log("pre-commit: no code validation required for staged files.")
  process.exit(0)
}

console.log("pre-commit: running scoped validation for staged files:")
uniqueCommands.forEach((command) => console.log(`- ${command}`))

for (const command of uniqueCommands) {
  run(command)
}

console.log("\npre-commit: all scoped checks passed.")
