import { type PortableTextBlock } from '@portabletext/react'
import { stegaClean } from '@sanity/client/stega'
import { CtaButton } from '@/components/shared/CtaButton'
import { getEmbedUrl } from '@/lib/video-utils'
import { TextMediaSection } from './TextMediaSection'
import { cleanAnchor } from '@/lib/sanity-utils'
import type { SectionTextVideo } from '@/sanity.types'

interface TextVideoSectionProps {
  data: SectionTextVideo
}

export function TextVideoSection({ data }: TextVideoSectionProps) {
  const {
    anchor,
    title,
    body,
    videoUrl,
    mediaPosition: rawMediaPosition = 'right',
    caption,
    colorVariant,
    cta,
  } = data
  const id = cleanAnchor(anchor)
  const mediaPosition = (stegaClean(rawMediaPosition) ?? 'right') as 'left' | 'right'
  if (!videoUrl) return null

  const embedUrl = getEmbedUrl(stegaClean(videoUrl) ?? videoUrl)
  if (!embedUrl) return null

  return (
    <TextMediaSection
      id={id}
      colorVariant={colorVariant}
      title={title}
      body={body as PortableTextBlock[]}
      mediaPosition={mediaPosition}
      ctaSlot={
        cta?.label && cta?.href ? (
          <div key="cta" className="mt-8">
            <CtaButton
              href={cta.href}
              label={cta.label}
              section="text_video"
              variant="outline"
              size="lg"
            />
          </div>
        ) : undefined
      }
      mediaSlot={
        <>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
            <iframe
              src={embedUrl}
              title={title ?? 'Wideo'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
          {caption && <p className="text-muted-foreground mt-2 text-center text-sm">{caption}</p>}
        </>
      }
    />
  )
}
