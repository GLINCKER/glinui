import type { NextConfig } from "next"
import createMDX from "@next/mdx"
import { rehypeAutolinkHeadings, rehypeSlugifyHeadings } from "./mdx-plugins"

const defaultImplementation = process.env.NEXT_PUBLIC_DEFAULT_UI_IMPL === "base" ? "base" : "radix"

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/docs/components/:name((?!radix|base)[^/]+)",
        destination: `/docs/components/${defaultImplementation}/:name`,
        permanent: false
      }
    ]
  }
}

const withMDX = createMDX({
  options: {
    rehypePlugins: [rehypeSlugifyHeadings, rehypeAutolinkHeadings]
  }
})

export default withMDX(nextConfig)
