export type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

export const PACKAGE_MANAGERS: PackageManager[] = ["pnpm", "npm", "yarn", "bun"]

export function buildCommandTabs(code: string): Record<PackageManager, string> | null {
  const trimmed = code.trim()

  if (trimmed.startsWith("npm install ")) {
    return {
      npm: trimmed,
      pnpm: trimmed.replace("npm install", "pnpm add"),
      yarn: trimmed.replace("npm install", "yarn add"),
      bun: trimmed.replace("npm install", "bun add")
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
    return {
      npm: trimmed,
      pnpm: trimmed.replace("npx", "pnpm dlx"),
      yarn: trimmed,
      bun: trimmed.replace("npx", "bun x --bun")
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

  return null
}
