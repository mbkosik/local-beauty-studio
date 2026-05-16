import { type PortableTextBlock } from '@portabletext/react'
import { Button } from '@/components/ui/button'
import { getEmbedUrl } from '@/lib/video-utils'
import { TextMediaSection } from './TextMediaSection'
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
    mediaPosition = 'right',
    caption,
    colorVariant,
    cta,
  } = data
  const id = anchor?.current ?? undefined
  if (!videoUrl) return null

  const embedUrl = getEmbedUrl(videoUrl)
  if (!embedUrl) return null

  return (
    <TextMediaSection
      id={id}
      colorVariant={colorVariant}
      title={title}
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
