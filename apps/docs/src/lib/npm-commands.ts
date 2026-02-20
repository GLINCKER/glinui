export type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

export const PACKAGE_MANAGERS: PackageManager[] = ["pnpm", "npm", "yarn", "bun"]

export function buildCommandTabs(code: string): Record<PackageManager, string> | null {
  const trimmed = code.trim()

  // --- pnpm-prefixed commands ---

  if (trimmed.startsWith("pnpm add ")) {
    const args = trimmed.replace("pnpm add ", "")
    return {
      pnpm: trimmed,
      npm: `npm install ${args}`,
      yarn: `yarn add ${args}`,
      bun: `bun add ${args}`
    }
  }

  if (trimmed.startsWith("pnpm dlx ")) {
    const args = trimmed.replace("pnpm dlx ", "")
    return {
      pnpm: trimmed,
      npm: `npx ${args}`,
      yarn: `npx ${args}`,
      bun: `bun x --bun ${args}`
    }
  }

  if (trimmed.startsWith("pnpm create ")) {
    const args = trimmed.replace("pnpm create ", "")
    return {
      pnpm: trimmed,
      npm: `npm create ${args}`,
      yarn: `yarn create ${args}`,
      bun: `bun create ${args}`
    }
  }

  // --- npm-prefixed commands ---

  if (trimmed.startsWith("npm install ")) {
    const args = trimmed.replace("npm install ", "")
    return {
      npm: trimmed,
      pnpm: `pnpm add ${args}`,
      yarn: `yarn add ${args}`,
      bun: `bun add ${args}`
    }
  }

  if (trimmed.startsWith("npx create-")) {
    return {
      npm: trimmed,
      pnpm: trimmed.replace("npx create-", "pnpm create "),
      yarn: trimmed.replace("npx create-", "yarn create "),
      bun: trimmed.replace("npx", "bun x --bun")
    }
  }

  if (trimmed.startsWith("npm create ")) {
    return {
      npm: trimmed,
      pnpm: trimmed.replace("npm create", "pnpm create"),
      yarn: trimmed.replace("npm create", "yarn create"),
      bun: trimmed.replace("npm create", "bun create")
    }
  }

  if (trimmed.startsWith("npx ")) {
    const args = trimmed.replace("npx ", "")
    return {
      npm: trimmed,
      pnpm: `pnpm dlx ${args}`,
      yarn: trimmed,
      bun: `bun x --bun ${args}`
    }
  }

  if (trimmed.startsWith("npm run ")) {
    return {
      npm: trimmed,
      pnpm: trimmed.replace("npm run", "pnpm"),
      yarn: trimmed.replace("npm run", "yarn"),
      bun: trimmed.replace("npm run", "bun")
    }
  }

  // --- yarn/bun-prefixed commands ---

  if (trimmed.startsWith("yarn add ")) {
    const args = trimmed.replace("yarn add ", "")
    return {
      yarn: trimmed,
      pnpm: `pnpm add ${args}`,
      npm: `npm install ${args}`,
      bun: `bun add ${args}`
    }
  }

  if (trimmed.startsWith("bun add ")) {
    const args = trimmed.replace("bun add ", "")
    return {
      bun: trimmed,
      pnpm: `pnpm add ${args}`,
      npm: `npm install ${args}`,
      yarn: `yarn add ${args}`
    }
  }

  return null
}
