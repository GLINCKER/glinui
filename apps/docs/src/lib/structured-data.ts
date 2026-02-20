import { generatedRegistryByName } from "@/lib/generated-registry-metadata"
import { DEFAULT_DOCS_IMPLEMENTATION } from "@/lib/docs-config"
import { buildComponentHref } from "@/lib/docs-route"
import {
  ORGANIZATION_GITHUB_URL,
  ORGANIZATION_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  createAbsoluteUrl
} from "@/lib/seo"
import type { ComponentId } from "@/lib/primitives"

type StructuredDataInput = {
  componentId: ComponentId
  title: string
  description: string
}

export function getComponentStructuredData({
  componentId,
  title,
  description
}: StructuredDataInput) {
  const registryItem = generatedRegistryByName[componentId as keyof typeof generatedRegistryByName]
  const canonicalPath = buildComponentHref(componentId, DEFAULT_DOCS_IMPLEMENTATION)
  const canonicalUrl = createAbsoluteUrl(canonicalPath)
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
          name: ORGANIZATION_NAME
        },
        publisher: {
          "@type": "Organization",
          name: ORGANIZATION_NAME
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
            item: createAbsoluteUrl("/")
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Components",
            item: createAbsoluteUrl("/docs/components")
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

export function getGlobalStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": createAbsoluteUrl("/#organization"),
        name: ORGANIZATION_NAME,
        url: createAbsoluteUrl("/"),
        sameAs: [ORGANIZATION_GITHUB_URL]
      },
      {
        "@type": "WebSite",
        "@id": createAbsoluteUrl("/#website"),
        name: SITE_NAME,
        url: createAbsoluteUrl("/"),
        description: SITE_DESCRIPTION,
        publisher: {
          "@id": createAbsoluteUrl("/#organization")
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${createAbsoluteUrl("/docs/components")}?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": createAbsoluteUrl("/#application"),
        name: SITE_NAME,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        description: SITE_DESCRIPTION,
        url: createAbsoluteUrl("/"),
        creator: {
          "@id": createAbsoluteUrl("/#organization")
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD"
        }
      }
    ]
  }
}
