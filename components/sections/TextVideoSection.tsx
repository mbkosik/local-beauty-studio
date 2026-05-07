import { type PortableTextBlock } from '@portabletext/react'
import { getEmbedUrl } from '@/lib/video-utils'
import { TextMediaSection } from './TextMediaSection'
import type { SectionTextVideo } from '@/sanity.types'

interface TextVideoSectionProps {
  data: SectionTextVideo
  id?: string
}

export function TextVideoSection({ data, id }: TextVideoSectionProps) {
  const { title, body, videoUrl, mediaPosition = 'right', caption } = data
  if (!videoUrl) return null

  const embedUrl = getEmbedUrl(videoUrl)
  if (!embedUrl) return null

  return (
    <TextMediaSection
      id={id}
      title={title}
      body={body as PortableTextBlock[]}
      mediaPosition={mediaPosition as 'left' | 'right'}
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
