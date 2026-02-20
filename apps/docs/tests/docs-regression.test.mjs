import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import test from "node:test"

function read(relativePath) {
  return readFileSync(join(process.cwd(), relativePath), "utf8")
}

test("getting-started keeps framework and registry onboarding sections", () => {
  const file = read("src/app/docs/getting-started/page.tsx")

  assert.match(file, /Framework Setup/)
  assert.match(file, /Registry Workflow/)
  assert.match(file, /Add from Registry/)
  assert.match(file, /Forms Accessibility/)
})

test("docs overview route exists and is wired into docs navigation", () => {
  const page = read("src/app/docs/page.tsx")
  const sidebar = read("src/components/layout/docs-sidebar.tsx")
  const topbar = read("src/components/layout/docs-topbar.tsx")
  const palette = read("src/components/layout/command-palette.tsx")
  const shell = read("src/components/layout/docs-shell.tsx")

  assert.match(page, /Documentation Overview/)
  assert.match(page, /Docs Home/)
  assert.match(sidebar, /\/docs/)
  assert.match(topbar, /Documentation Overview/)
  assert.match(palette, /docs-home/)
  assert.match(shell, /href="\/docs"/)
})

test("forms accessibility page exists with labeling contract guidance", () => {
  const file = read("src/app/docs/forms-accessibility/page.tsx")

  assert.match(file, /Forms Accessibility/)
  assert.match(file, /Labeling Contract/)
  assert.match(file, /Placeholder text is hint content only/)
  assert.match(file, /aria-label/)
})

test("forms accessibility component links use canonical docs route helper", () => {
  const file = read("src/app/docs/forms-accessibility/page.tsx")

  assert.match(file, /buildComponentHref\("input", DEFAULT_DOCS_IMPLEMENTATION\)/)
  assert.match(file, /buildComponentHref\("textarea", DEFAULT_DOCS_IMPLEMENTATION\)/)
  assert.match(file, /buildComponentHref\("select", DEFAULT_DOCS_IMPLEMENTATION\)/)
})

test("forms accessibility route is wired into docs navigation", () => {
  const sidebar = read("src/components/layout/docs-sidebar.tsx")
  const topbar = read("src/components/layout/docs-topbar.tsx")
  const palette = read("src/components/layout/command-palette.tsx")

  assert.match(sidebar, /\/docs\/forms-accessibility/)
  assert.match(topbar, /Forms Accessibility/)
  assert.match(palette, /forms-accessibility/)
})

test("form recipes route is wired into docs navigation", () => {
  const sidebar = read("src/components/layout/docs-sidebar.tsx")
  const topbar = read("src/components/layout/docs-topbar.tsx")
  const palette = read("src/components/layout/command-palette.tsx")
  const shell = read("src/components/layout/docs-shell.tsx")

  assert.match(sidebar, /\/docs\/forms-recipes/)
  assert.match(topbar, /Form Recipes/)
  assert.match(palette, /forms-recipes/)
  assert.match(shell, /\/docs\/forms-recipes/)
})

test("accessibility QA routes are wired into docs navigation", () => {
  const sidebar = read("src/components/layout/docs-sidebar.tsx")
  const topbar = read("src/components/layout/docs-topbar.tsx")
  const palette = read("src/components/layout/command-palette.tsx")
  const shell = read("src/components/layout/docs-shell.tsx")

  assert.match(sidebar, /\/docs\/accessibility/)
  assert.match(sidebar, /\/docs\/screen-reader-testing/)
  assert.match(sidebar, /\/docs\/focus-management/)
  assert.match(sidebar, /\/docs\/color-contrast/)
  assert.match(topbar, /Accessibility Hub/)
  assert.match(palette, /accessibility/)
  assert.match(topbar, /Screen Reader Testing/)
  assert.match(topbar, /Focus Management/)
  assert.match(topbar, /Color Contrast/)
  assert.match(palette, /screen-reader-testing/)
  assert.match(palette, /focus-management/)
  assert.match(palette, /color-contrast/)
  assert.match(shell, /\/docs\/screen-reader-testing/)
  assert.match(shell, /\/docs\/focus-management/)
  assert.match(shell, /\/docs\/color-contrast/)
})

test("top nav and footer keep core docs route links", () => {
  const shell = read("src/components/layout/docs-shell.tsx")
  const coreRoutes = [
    "/docs",
    "/docs/getting-started",
    "/docs/components",
    "/docs/accessibility",
    "/docs/api-metadata",
    "/docs/forms-accessibility",
    "/docs/forms-recipes",
    "/docs/screen-reader-testing",
    "/docs/focus-management",
    "/docs/color-contrast",
    "/docs/tokens",
    "/docs/motion",
    "/docs/glass-physics"
  ]

  for (const route of coreRoutes) {
    assert.match(shell, new RegExp(route.replace(/\//g, "\\/")))
  }
})

test("core docs routes have source files", () => {
  const routeFiles = [
    "src/app/robots.ts",
    "src/app/sitemap.ts",
    "src/lib/docs-metadata.ts",
    "src/app/docs/page.tsx",
    "src/app/docs/getting-started/page.tsx",
    "src/app/docs/api-metadata/page.tsx",
    "src/app/docs/accessibility/page.tsx",
    "src/app/docs/forms-accessibility/page.tsx",
    "src/app/docs/forms-recipes/page.tsx",
    "src/app/docs/screen-reader-testing/page.tsx",
    "src/app/docs/focus-management/page.tsx",
    "src/app/docs/color-contrast/page.tsx",
    "src/app/docs/tokens/page.tsx",
    "src/app/docs/motion/page.tsx",
    "src/app/docs/glass-physics/page.tsx",
    "src/app/docs/components/page.tsx"
  ]

  for (const file of routeFiles) {
    assert.ok(existsSync(join(process.cwd(), file)), `${file} should exist`)
  }
})

test("top-level docs pages export route metadata via shared helper", () => {
  const routes = [
    { file: "src/app/docs/page.tsx", path: "/docs" },
    { file: "src/app/docs/getting-started/page.tsx", path: "/docs/getting-started" },
    { file: "src/app/docs/components/page.tsx", path: "/docs/components" },
    { file: "src/app/docs/accessibility/page.tsx", path: "/docs/accessibility" },
    { file: "src/app/docs/forms-accessibility/page.tsx", path: "/docs/forms-accessibility" },
    { file: "src/app/docs/forms-recipes/page.tsx", path: "/docs/forms-recipes" },
    { file: "src/app/docs/screen-reader-testing/page.tsx", path: "/docs/screen-reader-testing" },
    { file: "src/app/docs/focus-management/page.tsx", path: "/docs/focus-management" },
    { file: "src/app/docs/color-contrast/page.tsx", path: "/docs/color-contrast" },
    { file: "src/app/docs/tokens/page.tsx", path: "/docs/tokens" },
    { file: "src/app/docs/motion/page.tsx", path: "/docs/motion" },
    { file: "src/app/docs/glass-physics/page.tsx", path: "/docs/glass-physics" },
    { file: "src/app/docs/api-metadata/page.tsx", path: "/docs/api-metadata" }
  ]

  for (const route of routes) {
    const file = read(route.file)
    assert.match(file, /export const metadata: Metadata = createDocsMetadata\(/)
    assert.match(file, new RegExp(`path: "${route.path.replace(/\//g, "\\/")}"`))
  }
})

test("global layout keeps enriched SEO metadata", () => {
  const layout = read("src/app/layout.tsx")

  assert.match(layout, /applicationName/)
  assert.match(layout, /openGraph/)
  assert.match(layout, /twitter/)
  assert.match(layout, /manifest/)
  assert.match(layout, /robots:/)
  assert.match(layout, /getGlobalStructuredData|SoftwareApplication/)
})

test("signature routes link directly and have docs pages", () => {
  const sidebar = read("src/components/layout/docs-sidebar.tsx")
  const routeLib = read("src/lib/docs-route.ts")
  assert.match(sidebar, /buildComponentHref\(id, implementation\)/)
  assert.match(routeLib, /generatedRegistryByName/)
  assert.match(routeLib, /registryItem\?\.type === "signature"/)

  const signatures = [
    "animated-gradient",
    "border-beam",
    "dot-pattern",
    "glass-card",
    "glass-navbar",
    "liquid-button",
    "magnetic-cta",
    "marquee",
    "meteor-shower",
    "number-ticker",
    "pulsating-button",
    "ripple",
    "shimmer-button",
    "spotlight-card",
    "text-reveal"
  ]

  for (const id of signatures) {
    assert.ok(
      existsSync(join(process.cwd(), `src/app/docs/components/${id}/page.mdx`)),
      `src/app/docs/components/${id}/page.mdx should exist`
    )
  }
})

test("data table docs keep server-data pattern section", () => {
  const file = read("src/app/docs/components/data-table/page.mdx")

  assert.match(file, /Server Data Pattern/)
  assert.match(file, /Use this pattern when your API owns filtering, sorting, and pagination/)
})

test("form component docs keep explicit placeholder-label guidance", () => {
  const input = read("src/app/docs/components/input/page.mdx")
  const textarea = read("src/app/docs/components/textarea/page.mdx")
  const select = read("src/app/docs/components/select/page.mdx")

  assert.match(input, /Placeholder text is not a label/)
  assert.match(textarea, /Placeholder text is not a substitute for labeling/)
  assert.match(select, /Placeholder text should not be used as the sole accessible label/)
})

test("accessibility guide pages keep core QA guidance", () => {
  const hub = read("src/app/docs/accessibility/page.tsx")
  const sr = read("src/app/docs/screen-reader-testing/page.tsx")
  const focus = read("src/app/docs/focus-management/page.tsx")
  const contrast = read("src/app/docs/color-contrast/page.tsx")

  assert.match(hub, /Accessibility Hub/)
  assert.match(hub, /Forms Accessibility/)
  assert.match(hub, /Color Contrast/)

  assert.match(sr, /Screen Reader Testing/)
  assert.match(sr, /Release Checklist/)
  assert.match(sr, /aria-live/)

  assert.match(focus, /Focus Management Patterns/)
  assert.match(focus, /Modal Focus Restore Pattern/)
  assert.match(focus, /Skip Link Pattern/)

  assert.match(contrast, /Color Contrast Validation/)
  assert.match(contrast, /Contrast Checklist/)
  assert.match(contrast, /WCAG/)
})

test("api metadata route is wired into docs navigation", () => {
  const sidebar = read("src/components/layout/docs-sidebar.tsx")
  const topbar = read("src/components/layout/docs-topbar.tsx")
  const palette = read("src/components/layout/command-palette.tsx")
  const shell = read("src/components/layout/docs-shell.tsx")
  const gettingStarted = read("src/app/docs/getting-started/page.tsx")
  const page = read("src/app/docs/api-metadata/page.tsx")

  assert.match(sidebar, /\/docs\/api-metadata/)
  assert.match(topbar, /API Metadata/)
  assert.match(palette, /api-metadata/)
  assert.match(shell, /\/docs\/api-metadata/)
  assert.match(gettingStarted, /\/docs\/api-metadata/)
  assert.match(page, /API Metadata Index/)
  assert.match(page, /generatedApiMetadata/)
  assert.match(page, /Primary Props Type/)
})

test("implementation component route redirects signature components to direct docs pages", () => {
  const file = read("src/app/docs/components/[implementation]/[component]/page.tsx")

  assert.match(file, /generatedRegistryByName/)
  assert.match(file, /registryItem\?\.type === "signature"/)
  assert.match(file, /redirect\(registryItem\.docsPath\)/)
  assert.match(file, /createDocsMetadata/)
  assert.match(file, /canonicalPath/)
  assert.match(file, /index: false/)
})

test("component docs layout renders generated api snapshot section", () => {
  const layout = read("src/components/docs/component-doc-layout.tsx")
  const reference = read("src/components/docs/generated-api-reference.tsx")
  const structuredData = read("src/lib/structured-data.ts")

  assert.match(layout, /GeneratedApiReference/)
  assert.match(layout, /application\/ld\+json/)
  assert.match(layout, /getComponentStructuredData/)
  assert.match(reference, /Generated API Snapshot/)
  assert.match(reference, /Default/)
  assert.match(reference, /Description/)
  assert.match(reference, /pnpm --filter @glinui\/docs api:generate/)
  assert.match(structuredData, /TechArticle/)
  assert.match(structuredData, /SoftwareSourceCode/)
  assert.match(structuredData, /BreadcrumbList/)
  assert.match(structuredData, /buildComponentHref\(componentId, DEFAULT_DOCS_IMPLEMENTATION\)/)
})

test("components index includes signature and beta discovery sections", () => {
  const file = read("src/app/docs/components/page.tsx")

  assert.match(file, /Signature Components/)
  assert.match(file, /Beta Primitive Focus/)
  assert.match(file, /Component Catalog/)
})

test("primitives metadata is sourced from generated registry manifest", () => {
  const primitives = read("src/lib/primitives.ts")

  assert.match(primitives, /generatedComponentTitles/)
  assert.match(primitives, /generatedComponentDescriptions/)
  assert.match(primitives, /from "\.\/generated-registry-metadata"/)
})

test("docs scripts keep combined metadata generation hooks", () => {
  const packageJson = read("package.json")

  assert.match(packageJson, /"metadata:generate"/)
  assert.match(packageJson, /"registry:generate"/)
  assert.match(packageJson, /"prebuild": "rm -rf \.next && pnpm metadata:generate && pnpm preregistry"/)
  assert.match(packageJson, /"pretest": "pnpm metadata:generate && pnpm preregistry"/)
})

test("sitemap is generated from registry metadata", () => {
  const sitemap = read("src/app/sitemap.ts")
  const robots = read("src/app/robots.ts")

  assert.match(sitemap, /generatedRegistryItems/)
  assert.match(sitemap, /DEFAULT_DOCS_IMPLEMENTATION/)
  assert.match(sitemap, /changeFrequency/)
  assert.match(sitemap, /priority/)
  assert.match(robots, /sitemap:/)
  assert.match(robots, /host:/)
})

test("seo comparison and intent routes are wired into docs navigation and sitemap", () => {
  const sidebar = read("src/components/layout/docs-sidebar.tsx")
  const topbar = read("src/components/layout/docs-topbar.tsx")
  const palette = read("src/components/layout/command-palette.tsx")
  const shell = read("src/components/layout/docs-shell.tsx")
  const sitemap = read("src/app/sitemap.ts")
  const shadcn = read("src/app/docs/shadcn-alternative/page.tsx")
  const magic = read("src/app/docs/magicui-alternative/page.tsx")
  const radix = read("src/app/docs/radix-ui-components/page.tsx")
  const glassmorphism = read("src/app/docs/glassmorphism-react-components/page.tsx")

  const seoRoutes = [
    "/docs/shadcn-alternative",
    "/docs/magicui-alternative",
    "/docs/radix-ui-components",
    "/docs/glassmorphism-react-components"
  ]

  for (const route of seoRoutes) {
    assert.match(sidebar, new RegExp(route.replace(/\//g, "\\/")))
    assert.match(palette, new RegExp(route.replace(/\//g, "\\/")))
    assert.match(shell, new RegExp(route.replace(/\//g, "\\/")))
    assert.match(sitemap, new RegExp(route.replace(/\//g, "\\/")))
  }

  assert.match(topbar, /Glin UI vs shadcn\/ui/)
  assert.match(topbar, /Glin UI vs Magic UI/)
  assert.match(topbar, /Radix UI Components/)
  assert.match(topbar, /Glassmorphism React/)
  assert.match(shadcn, /FAQPage/)
  assert.match(shadcn, /BreadcrumbList/)
  assert.match(magic, /FAQPage/)
  assert.match(magic, /BreadcrumbList/)
  assert.match(radix, /FAQPage/)
  assert.match(radix, /BreadcrumbList/)
  assert.match(glassmorphism, /FAQPage/)
  assert.match(glassmorphism, /BreadcrumbList/)
})
