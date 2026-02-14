import "./globals.css"

import type { ReactNode } from "react"

import { DocsShell } from "@/components/layout/docs-shell"
import { DocsDirectionProvider } from "@/lib/docs-direction"
import { ThemeProvider } from "next-themes"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <DocsDirectionProvider>
            <DocsShell>{children}</DocsShell>
          </DocsDirectionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
