'use client'

import { PortableText, type PortableTextBlock } from '@portabletext/react'
import { motion, useReducedMotion } from 'motion/react'
import { SanityImage, type SanityImageData } from '@/components/shared/SanityImage'
import type { SectionTextImage } from '@/sanity.types'

interface TextImageSectionProps {
  data: SectionTextImage
  id?: string
}

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-muted-foreground leading-relaxed">{children}</p>
    ),
  },
}

export function TextImageSection({ data, id }: TextImageSectionProps) {
  const { heading, body, image, imagePosition = 'right' } = data
  const prefersReducedMotion = useReducedMotion()

  const textX = prefersReducedMotion ? 0 : imagePosition === 'right' ? -40 : 40
  const imageX = prefersReducedMotion ? 0 : imagePosition === 'right' ? 40 : -40

  if (!image?.asset || !body) return null

  return (
    <section id={id} className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Image — always on top on mobile (first in DOM), position swapped on desktop */}
          <motion.div
            className={imagePosition === 'right' ? 'lg:order-2' : undefined}
            initial={{ opacity: 0, x: imageX }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          >
            <div className="relative aspect-4/3 w-full overflow-hidden">
              <SanityImage
                image={image as SanityImageData}
                fill
                width={800}
                height={600}
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className={imagePosition === 'right' ? 'lg:order-1' : undefined}
            initial={{ opacity: 0, x: textX }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {heading && (
              <h2 className="font-heading mb-6 text-3xl font-bold md:text-4xl">{heading}</h2>
            )}
            <div className="space-y-4">
              <PortableText
                value={body as PortableTextBlock[]}
                components={portableTextComponents}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
