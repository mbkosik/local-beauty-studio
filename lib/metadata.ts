import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from '@/sanity/client'

const builder = createImageUrlBuilder(client)

export function buildOgImageUrl(ogImage: unknown): string | null {
  if (!ogImage || typeof ogImage !== 'object') return null
  try {
    return builder
      .image(ogImage as Parameters<typeof builder.image>[0])
      .width(1200)
      .height(630)
      .url()
  } catch {
    return null
  }
}

export function buildFaviconUrl(favicon: unknown): string | null {
  if (!favicon || typeof favicon !== 'object') return null
  try {
    return builder
      .image(favicon as Parameters<typeof builder.image>[0])
      .width(64)
      .height(64)
      .format('png')
      .url()
  } catch {
    return null
  }
}
