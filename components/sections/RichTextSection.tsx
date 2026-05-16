import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/components/shared/portableTextComponents'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { getVariantProps } from '@/lib/color-variant'
import type { SectionRichText } from '@/sanity.types'

interface RichTextSectionProps {
  id?: string
  data: SectionRichText
}

const richTextComponents = {
  ...portableTextComponents,
  types: {},
}

const maxWidthClass: Record<string, string> = {
  narrow: 'max-w-prose',
  normal: 'max-w-3xl',
  wide: 'max-w-5xl',
}

export function RichTextSection({ id, data }: RichTextSectionProps) {
  const { body, maxWidth, colorVariant } = data

  if (!body?.length) return null

  const widthClass = maxWidthClass[maxWidth ?? 'normal'] ?? 'max-w-3xl'

  return (
    <section id={id} className="py-16 md:py-24" {...getVariantProps(colorVariant)}>
      <AnimatedSection>
        <div className={`${widthClass} mx-auto px-4`}>
          <PortableText value={body} components={richTextComponents} />
        </div>
      </AnimatedSection>
    </section>
  )
}
