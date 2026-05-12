export type ColorVariant = 'light' | 'muted' | 'dark' | 'brand'

export function getVariantProps(variant?: string | null) {
  const v = (variant ?? 'light') as ColorVariant
  return {
    'data-variant': v,
  } as const
}
