import type {
  SectionHero,
  SectionTextImage,
  SectionStats,
  SectionGallery,
  SectionCta,
  SectionContact,
  SectionFaq,
} from '@/sanity.types'
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
import { TeamSection } from './TeamSection'
import { FaqSection } from './FaqSection'
import {
  PageBlock,
  ServicesSectionData,
  TestimonialsSectionData,
  BlogPreviewSectionData,
  PricingSectionData,
  TeamSectionData,
} from '@/sanity/custom-types'

type Props = {
  blocks: PageBlock[]
}

// GROQ query results use `null` for absent fields; standalone schema types use `undefined`.
// The switch already narrows _type, so these casts are safe.
const asSection = <T,>(block: unknown) => block as T

export function PageBuilder({ blocks }: Props) {
  return (
    <>
      {blocks.map((block) => {
        const id = block.anchor?.current ?? undefined
        switch (block._type) {
          case 'sectionHero':
            return <HeroSection key={block._key} id={id} data={asSection<SectionHero>(block)} />
          case 'sectionTextImage':
            return (
              <TextImageSection
                key={block._key}
                id={id}
                data={asSection<SectionTextImage>(block)}
              />
            )
          case 'sectionServices':
            return (
              <ServicesSection
                key={block._key}
                id={id}
                data={asSection<ServicesSectionData>(block)}
              />
            )
          case 'sectionPricing':
            return (
              <PricingSection
                key={block._key}
                id={id}
                data={asSection<PricingSectionData>(block)}
              />
            )
          case 'sectionTestimonials':
            return (
              <TestimonialsSection
                key={block._key}
                id={id}
                data={asSection<TestimonialsSectionData>(block)}
              />
            )
          case 'sectionStats':
            return <StatsSection key={block._key} id={id} data={asSection<SectionStats>(block)} />
          case 'sectionGallery':
            return (
              <GallerySection key={block._key} id={id} data={asSection<SectionGallery>(block)} />
            )
          case 'sectionBlogPreview':
            return (
              <BlogPreviewSection
                key={block._key}
                id={id}
                data={asSection<BlogPreviewSectionData>(block)}
              />
            )
          case 'sectionCta':
            return <CtaSection key={block._key} id={id} data={asSection<SectionCta>(block)} />
          case 'sectionContact':
            return (
              <ContactSection key={block._key} id={id} data={asSection<SectionContact>(block)} />
            )
          case 'sectionTeam':
            return <TeamSection key={block._key} id={id} data={asSection<TeamSectionData>(block)} />
          case 'sectionFaq':
            return <FaqSection key={block._key} id={id} data={asSection<SectionFaq>(block)} />
          default:
            console.warn('[PageBuilder] Unknown block type:', (block as { _type: string })._type)
            return null
        }
      })}
    </>
  )
}
