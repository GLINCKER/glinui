import { Command } from "commander"
import pc from "picocolors"
import { initCommand } from "./commands/init.js"
import { addCommand } from "./commands/add.js"
import { listCommand } from "./commands/list.js"
import { diffCommand } from "./commands/diff.js"

const pkg = { name: "glinui", version: "0.1.0" }

async function main() {
  const program = new Command()
    .name("glinui")
    .description("Add Glin UI liquid glass components to your project.")
    .version(pkg.version, "-v, --version", "Display the version number")

  program.addCommand(initCommand)
  program.addCommand(addCommand)
  program.addCommand(listCommand)
  program.addCommand(diffCommand)

  program.parse()
}

main().catch((error) => {
  console.error(pc.red("Error:"), error instanceof Error ? error.message : error)
  process.exit(1)
})
