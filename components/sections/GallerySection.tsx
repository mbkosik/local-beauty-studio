'use client'

import { useReducedMotion } from 'motion/react'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { getVariantProps } from '@/lib/color-variant'
import { GridGallery } from '@/components/blocks/GridGallery'
import { MasonryGallery } from '@/components/blocks/MasonryGallery'
import { SectionGallery } from '@/sanity.types'

interface GallerySectionProps {
  data: SectionGallery
}

export function GallerySection({ data }: GallerySectionProps) {
  const { anchor, heading, images, colorVariant, layout = 'grid' } = data
  const id = anchor?.current ?? undefined
  const prefersReducedMotion = useReducedMotion() ?? false

  if (!images?.length) return null

  return (
    <section id={id} {...getVariantProps(colorVariant)}>
      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {heading && (
            <h2 className="font-heading mb-12 text-center text-3xl font-bold md:text-4xl">
              {heading}
            </h2>
          )}

          {layout === 'masonry' ? (
            <MasonryGallery images={images} prefersReducedMotion={prefersReducedMotion} />
          ) : (
            <GridGallery images={images} prefersReducedMotion={prefersReducedMotion} />
          )}
        </div>
      </AnimatedSection>
    </section>
  )
}
