'use client'

import { PortableText, type PortableTextBlock } from '@portabletext/react'
import { motion, useReducedMotion } from 'motion/react'
import { getVariantProps } from '@/lib/color-variant'

interface TextMediaSectionProps {
  title?: string | null
  body?: PortableTextBlock[] | null
  mediaPosition?: 'left' | 'right' | null
  mediaSlot: React.ReactNode
  ctaSlot?: React.ReactNode
  id?: string
  colorVariant?: string | null
}

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-muted-foreground leading-relaxed">{children}</p>
    ),
  },
}

export function TextMediaSection({
  title,
  body,
  mediaPosition = 'right',
  mediaSlot,
  ctaSlot,
  id,
  colorVariant,
}: TextMediaSectionProps) {
  const prefersReducedMotion = useReducedMotion()

  const textX = prefersReducedMotion ? 0 : mediaPosition === 'right' ? -40 : 40
  const mediaX = prefersReducedMotion ? 0 : mediaPosition === 'right' ? 40 : -40

  return (
    <section id={id} className="overflow-hidden py-16 md:py-24" {...getVariantProps(colorVariant)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Media — always on top on mobile (first in DOM), position swapped on desktop */}
          <motion.div
            className={mediaPosition === 'right' ? 'lg:order-2' : undefined}
            initial={{ opacity: 0, x: mediaX }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          >
            {mediaSlot}
          </motion.div>

          {/* Text */}
          <motion.div
            className={mediaPosition === 'right' ? 'lg:order-1' : undefined}
            initial={{ opacity: 0, x: textX }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {title && <h2 className="font-heading mb-6 text-3xl font-bold md:text-4xl">{title}</h2>}
            {body && (
              <div className="space-y-4">
                <PortableText value={body} components={portableTextComponents} />
              </div>
            )}
            {ctaSlot}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
