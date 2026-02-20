import { Command } from "commander"
import prompts from "prompts"
import pc from "picocolors"
import fs from "fs-extra"
import path from "path"
import { fetchRegistryItem, fetchRegistryIndex, getLastRegistryErrorMessage } from "../registry/api.js"

export const addCommand = new Command()
  .name("add")
  .description("Add Glin UI components to your project.")
  .argument("[components...]", "Components to add")
  .option("-y, --yes", "Skip confirmation")
  .option("-o, --overwrite", "Overwrite existing files")
  .option("--cwd <path>", "Working directory", process.cwd())
  .action(async (components: string[], options) => {
    const cwd = path.resolve(options.cwd)

    // Load config
    const configPath = path.join(cwd, "glinui.json")
    if (!await fs.pathExists(configPath)) {
      console.error(pc.red("  No glinui.json found. Run `npx glinui init` first."))
      process.exit(1)
    }

    const config = await fs.readJson(configPath)

    // If no components specified, show interactive picker
    if (!components.length) {
      const index = await fetchRegistryIndex()
      if (!index) {
        const reason = getLastRegistryErrorMessage()
        console.error(pc.red(`  Failed to fetch component registry${reason ? `: ${reason}` : "."}`))
        process.exit(1)
      }

      const response = await prompts({
        type: "multiselect",
        name: "components",
        message: "Which components would you like to add?",
        choices: index.map((item: { name: string; description?: string }) => ({
          title: item.name,
          description: item.description,
          value: item.name,
        })),
        hint: "Space to select, Enter to confirm",
      })

      components = response.components ?? []
    }

    if (!components.length) {
      console.log(pc.yellow("\n  No components selected.\n"))
      return
    }

    console.log(pc.cyan(`\n  Adding ${components.length} component(s)...\n`))

    const componentsDir = path.join(cwd, config.aliases?.components ?? "src/components/ui")
    await fs.ensureDir(componentsDir)

    for (const name of components) {
      try {
        const item = await fetchRegistryItem(name)
        if (!item) {
          const reason = getLastRegistryErrorMessage()
          if (reason?.includes("404")) {
            console.log(pc.yellow(`  ⚠ Component "${name}" not found in registry.`))
          } else {
            console.log(pc.yellow(`  ⚠ Component "${name}" unavailable (${reason ?? "unknown registry error"}).`))
          }
          continue
        }

        for (const file of item.files ?? []) {
          const targetPath = path.join(componentsDir, path.basename(file.path))

          if (await fs.pathExists(targetPath) && !options.overwrite) {
            console.log(pc.yellow(`  ⚠ ${path.basename(file.path)} already exists. Use --overwrite to replace.`))
            continue
          }

          await fs.writeFile(targetPath, file.content, "utf8")
          console.log(pc.green(`  ✓ ${pc.bold(path.relative(cwd, targetPath))}`))
        }

        // Log dependencies
        if (item.dependencies?.length) {
          console.log(pc.dim(`    deps: ${item.dependencies.join(", ")}`))
        }
      } catch (error) {
        console.error(pc.red(`  ✗ Failed to add "${name}": ${error instanceof Error ? error.message : error}`))
      }
    }

    console.log(pc.green(`\n  ✓ Done!\n`))
  })
