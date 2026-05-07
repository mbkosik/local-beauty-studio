import { type PortableTextBlock } from '@portabletext/react'
import { SanityImage, type SanityImageData } from '@/components/shared/SanityImage'
import { TextMediaSection } from './TextMediaSection'
import type { SectionTextImage } from '@/sanity.types'

interface TextImageSectionProps {
  data: SectionTextImage
  id?: string
}

export function TextImageSection({ data, id }: TextImageSectionProps) {
  const { heading, body, image, mediaPosition = 'right' } = data
  if (!image?.asset || !body) return null

  return (
    <TextMediaSection
      id={id}
      title={heading}
      body={body as PortableTextBlock[]}
      mediaPosition={mediaPosition as 'left' | 'right'}
      mediaSlot={
        <div className="relative aspect-4/3 w-full overflow-hidden">
          <SanityImage
            image={image as SanityImageData}
            fill
            width={800}
            height={600}
            className="object-cover"
          />
        </div>
      }
    />
  )
}
