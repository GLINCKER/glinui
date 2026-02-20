import type { NextConfig } from "next"
import createMDX from "@next/mdx"
import { rehypeAutolinkHeadings, rehypeSlugifyHeadings } from "./mdx-plugins"

const nextConfig: NextConfig = {
  output: "export",
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  trailingSlash: false,
  transpilePackages: ["@glinui/ui", "@glinui/registry", "@glinui/tokens", "@glinui/motion"]
}

const withMDX = createMDX({
  options: {
    rehypePlugins: [rehypeSlugifyHeadings, rehypeAutolinkHeadings]
  }
})

export default withMDX(nextConfig)
