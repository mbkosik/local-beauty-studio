import { stegaClean } from '@sanity/client/stega'

export function cleanAnchor(anchor?: { current?: string | null } | null): string | undefined {
  return stegaClean(anchor?.current) ?? undefined
}
