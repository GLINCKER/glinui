import { baseRegistry, getRegistryItem } from "@glinr/registry"

export { baseRegistry, getRegistryItem }

export function getDocsTitle(component: string) {
  const item = getRegistryItem(component)
  return item?.title ?? null
}

export function getDocsDescription(component: string) {
  const item = getRegistryItem(component)
  return item?.description ?? null
}
