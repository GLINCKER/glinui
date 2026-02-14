import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
    "../../packages/ui/dist/**/*.{js,mjs}",
    "../../packages/tokens/src/**/*.{css,ts}",
    "../../packages/motion/src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        accent: "var(--color-accent)",
        "accent-foreground": "var(--color-accent-foreground)"
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)"
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        elevated: "var(--shadow-elevated)",
        glass: "var(--shadow-glass)"
      },
      transitionDuration: {
        fast: "var(--motion-fast)",
        normal: "var(--motion-normal)",
        slow: "var(--motion-slow)"
      },
      transitionTimingFunction: {
        standard: "var(--easing-standard)",
        emphasize: "var(--easing-emphasize)"
      }
    }
  },
  plugins: []
}

export default config
