import { Command } from "commander"
import pc from "picocolors"
import { fetchRegistryIndex, getLastRegistryErrorMessage } from "../registry/api.js"

function pad(value: string, width: number) {
  if (value.length >= width) return value
  return `${value}${" ".repeat(width - value.length)}`
}

function truncate(value: string, width: number) {
  if (value.length <= width) return value
  if (width <= 1) return value.slice(0, width)
  return `${value.slice(0, width - 1)}…`
}

export const listCommand = new Command()
  .name("list")
  .description("List all components available in the Glin UI registry.")
  .action(async () => {
    const index = await fetchRegistryIndex()
    if (!index?.length) {
      const reason = getLastRegistryErrorMessage()
      console.error(pc.red(`  Failed to fetch registry index${reason ? `: ${reason}` : "."}`))
      process.exit(1)
    }

    const rows = [...index].sort((a, b) => a.name.localeCompare(b.name))
    const terminalWidth = process.stdout.columns ?? 120

    const nameWidth = Math.max(16, ...rows.map((row) => row.name.length))
    const typeWidth = Math.max(10, ...rows.map((row) => row.type.length))
    const descriptionWidth = Math.max(20, terminalWidth - nameWidth - typeWidth - 8)

    console.log("")
    console.log(`${pc.bold(pad("Name", nameWidth))}  ${pc.bold(pad("Type", typeWidth))}  ${pc.bold("Description")}`)
    console.log(pc.dim(`${"-".repeat(nameWidth)}  ${"-".repeat(typeWidth)}  ${"-".repeat(descriptionWidth)}`))

    for (const item of rows) {
      const description = truncate(item.description ?? "", descriptionWidth)
      const typeColor = item.type === "signature" ? pc.magenta : pc.cyan
      console.log(`${pc.white(pad(item.name, nameWidth))}  ${typeColor(pad(item.type, typeWidth))}  ${pc.dim(description)}`)
    }

    console.log(pc.dim(`\n${rows.length} components\n`))
  })
