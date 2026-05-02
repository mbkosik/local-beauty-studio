import Image, { type ImageProps } from 'next/image'
import { urlFor } from '@/sanity/image'

export type SanityImageData = {
  alt?: string | null
  asset?: {
    _id?: string | null
    _ref?: string | null
    url?: string | null
    metadata?: {
      dimensions?: {
        width?: number | null
        height?: number | null
        aspectRatio?: number | null
      } | null
      lqip?: string | null
    } | null
  } | null
  hotspot?: { x?: number | null; y?: number | null } | null
  crop?: {
    top?: number | null
    bottom?: number | null
    left?: number | null
    right?: number | null
  } | null
}

interface SanityImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  image: SanityImageData | null | undefined
  alt?: string
  width: number
  height: number
}

export function SanityImage({ image, alt, width, height, ...props }: SanityImageProps) {
  if (!image?.asset) return null

  // urlFor handles both _ref (reference) and _id (dereferenced) asset formats
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const src = urlFor(image as any)
    .width(width)
    .height(height)
    .auto('format')
    .url()

  return <Image src={src} alt={alt ?? image.alt ?? ''} width={width} height={height} {...props} />
}
