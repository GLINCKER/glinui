import { generatedRegistryByName } from "@/lib/generated-registry-metadata"
import { DEFAULT_DOCS_IMPLEMENTATION } from "@/lib/docs-config"
import { buildComponentHref } from "@/lib/docs-route"
import { SITE_URL, SITE_NAME } from "@/lib/seo"
import type { ComponentId } from "@/lib/primitives"

type StructuredDataInput = {
  componentId: ComponentId
  title: string
  description: string
}

function absoluteUrl(path: string) {
  return `${SITE_URL}${path}`
}

export function getComponentStructuredData({
  componentId,
  title,
  description
}: StructuredDataInput) {
  const registryItem = generatedRegistryByName[componentId as keyof typeof generatedRegistryByName]
  const canonicalPath = buildComponentHref(componentId, DEFAULT_DOCS_IMPLEMENTATION)
  const canonicalUrl = absoluteUrl(canonicalPath)
  const componentKind = registryItem?.type === "signature" ? "Signature" : "Primitive"

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: `${title} Component`,
        description,
        url: canonicalUrl,
        mainEntityOfPage: canonicalUrl,
        author: {
          "@type": "Organization",
          name: "GLINR Studios"
        },
        publisher: {
          "@type": "Organization",
          name: "GLINR Studios"
        },
        about: [
          `${SITE_NAME} ${componentKind} Component`,
          "React UI",
          "Tailwind CSS",
          "Radix UI"
        ]
      },
      {
        "@type": "SoftwareSourceCode",
        name: `${title} (${componentKind})`,
        codeRepository: "https://github.com/GLINCKER/glinui",
        programmingLanguage: "TypeScript",
        runtimePlatform: "React",
        url: canonicalUrl,
        description
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl("/")
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Components",
            item: absoluteUrl("/docs/components")
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: canonicalUrl
          }
        ]
      }
    ]
  }
}
