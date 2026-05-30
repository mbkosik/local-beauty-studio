import { stegaClean } from '@sanity/client/stega'

export type ColorVariant = 'light' | 'muted' | 'dark' | 'brand'

export function getVariantProps(variant?: string | null) {
  const v = (stegaClean(variant) ?? 'light') as ColorVariant
  return {
    'data-variant': v,
  } as const
}
