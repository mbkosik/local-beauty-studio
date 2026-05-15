import Image, { type ImageProps } from 'next/image'
import { type SanityImageSource } from '@sanity/image-url'
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

  // Pass full image object so the builder reads hotspot + crop automatically
  const src = urlFor(image as SanityImageSource)
    .width(width)
    .height(height)
    .fit('crop')
    .auto('format')
    .url()
  const lqip = image.asset.metadata?.lqip
  const blurProps = lqip ? { placeholder: 'blur' as const, blurDataURL: lqip } : {}

  const { fill, ...restProps } = props

  if (fill) {
    return <Image src={src} alt={alt ?? image.alt ?? ''} fill {...blurProps} {...restProps} />
  }

  return (
    <Image
      src={src}
      alt={alt ?? image.alt ?? ''}
      width={width}
      height={height}
      {...blurProps}
      {...restProps}
    />
  )
}
