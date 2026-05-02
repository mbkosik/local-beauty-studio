import type { PageQueryResult, LatestPostsQueryResult } from '@/sanity.types'

import { HeroSection } from './HeroSection'
import { TextImageSection } from './TextImageSection'
import { ServicesSection } from './ServicesSection'
import { PricingSection } from './PricingSection'
import { TestimonialsSection } from './TestimonialsSection'
import { StatsSection } from './StatsSection'
import { GallerySection } from './GallerySection'
import { BlogPreviewSection } from './BlogPreviewSection'
import { CtaSection } from './CtaSection'
import { ContactSection } from './ContactSection'

type PageBuilderBlock = NonNullable<NonNullable<PageQueryResult>['pageBuilder']>[number]

type ExtraData = {
  latestPosts?: LatestPostsQueryResult | null
}

type Props = {
  blocks: PageBuilderBlock[]
  extraData?: ExtraData
}

export function PageBuilder({ blocks, extraData }: Props) {
  return (
    <>
      {blocks.map((block) => {
        switch (block._type) {
          case 'sectionHero':
            return <HeroSection key={block._key} data={block} />
          case 'sectionTextImage':
            return <TextImageSection key={block._key} data={block} />
          case 'sectionServices':
            return <ServicesSection key={block._key} data={block} />
          case 'sectionPricing':
            return <PricingSection key={block._key} data={block} />
          case 'sectionTestimonials':
            return <TestimonialsSection key={block._key} data={block} />
          case 'sectionStats':
            return <StatsSection key={block._key} data={block} />
          case 'sectionGallery':
            return <GallerySection key={block._key} data={block} />
          case 'sectionBlogPreview':
            return (
              <BlogPreviewSection key={block._key} data={block} posts={extraData?.latestPosts} />
            )
          case 'sectionCta':
            return <CtaSection key={block._key} data={block} />
          case 'sectionContact':
            return <ContactSection key={block._key} data={block} />
          default:
            console.warn('[PageBuilder] Unknown block type:', (block as { _type: string })._type)
            return null
        }
      })}
    </>
  )
}
