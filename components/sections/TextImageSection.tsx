import { type PortableTextBlock } from '@portabletext/react'
import { SanityImage, type SanityImageData } from '@/components/shared/SanityImage'
import { Button } from '@/components/ui/button'
import { TextMediaSection } from './TextMediaSection'
import type { SectionTextImage } from '@/sanity.types'

interface TextImageSectionProps {
  data: SectionTextImage
  id?: string
}

export function TextImageSection({ data, id }: TextImageSectionProps) {
  const { heading, body, image, mediaPosition = 'right', colorVariant, cta } = data
  if (!image?.asset || !body) return null

  return (
    <TextMediaSection
      id={id}
      colorVariant={colorVariant}
      title={heading}
      body={body as PortableTextBlock[]}
      mediaPosition={mediaPosition as 'left' | 'right'}
      ctaSlot={
        cta?.label && cta?.href ? (
          <div key="cta" className="mt-8">
            <Button asChild variant="outline" size="lg">
              <a href={cta.href}>{cta.label}</a>
            </Button>
          </div>
        ) : undefined
      }
      mediaSlot={
        <div className="image-frame mx-auto w-full max-w-md lg:max-w-full">
          <div className="relative aspect-4/3 w-full overflow-hidden">
            <SanityImage
              image={image as SanityImageData}
              fill
              width={800}
              height={600}
              className="object-cover"
            />
          </div>
        </div>
      }
    />
  )
}
