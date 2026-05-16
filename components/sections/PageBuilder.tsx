import type {
  SectionHero,
  SectionTextImage,
  SectionStats,
  SectionGallery,
  SectionCta,
  SectionContact,
  SectionFaq,
  SectionProcess,
  SectionBadges,
  SectionTextVideo,
  SectionRichText,
} from '@/sanity.types'
import dynamic from 'next/dynamic'
import { HeroSection } from './HeroSection'
import { CtaSection } from './CtaSection'
import { ContactSection } from './ContactSection'
import { ServicesSection } from './ServicesSection'

const TextImageSection = dynamic(() => import('./TextImageSection').then((m) => m.TextImageSection))
const PricingSection = dynamic(() => import('./PricingSection').then((m) => m.PricingSection))
const TestimonialsSection = dynamic(() =>
  import('./TestimonialsSection').then((m) => m.TestimonialsSection)
)
const StatsSection = dynamic(() => import('./StatsSection').then((m) => m.StatsSection))
const GallerySection = dynamic(() => import('./GallerySection').then((m) => m.GallerySection))
const BlogPreviewSection = dynamic(() =>
  import('./BlogPreviewSection').then((m) => m.BlogPreviewSection)
)
const TeamSection = dynamic(() => import('./TeamSection').then((m) => m.TeamSection))
const FaqSection = dynamic(() => import('./FaqSection').then((m) => m.FaqSection))
const ProcessSection = dynamic(() => import('./ProcessSection').then((m) => m.ProcessSection))
const BadgesSection = dynamic(() => import('./BadgesSection').then((m) => m.BadgesSection))
const TextVideoSection = dynamic(() => import('./TextVideoSection').then((m) => m.TextVideoSection))
const RichTextSection = dynamic(() => import('./RichTextSection').then((m) => m.RichTextSection))
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
          case 'sectionProcess':
            return (
              <ProcessSection key={block._key} id={id} data={asSection<SectionProcess>(block)} />
            )
          case 'sectionBadges':
            return <BadgesSection key={block._key} id={id} data={asSection<SectionBadges>(block)} />
          case 'sectionTextVideo':
            return (
              <TextVideoSection
                key={block._key}
                id={id}
                data={asSection<SectionTextVideo>(block)}
              />
            )
          case 'sectionRichText':
            return (
              <RichTextSection key={block._key} id={id} data={asSection<SectionRichText>(block)} />
            )
          default:
            console.warn('[PageBuilder] Unknown block type:', (block as { _type: string })._type)
            return null
        }
      })}
    </>
  )
}
