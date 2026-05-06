'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { SanityImage, type SanityImageData } from '@/components/shared/SanityImage'
import { SectionGallery } from '@/sanity.types'

interface GallerySectionProps {
  data: SectionGallery
  id?: string
}

const CONTAINER_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const TILE_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function GallerySection({ data, id }: GallerySectionProps) {
  const { heading, images } = data
  const prefersReducedMotion = useReducedMotion()

  if (!images?.length) return null

  return (
    <AnimatedSection as="section" id={id} className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {heading && (
          <h2 className="font-heading mb-12 text-center text-3xl font-bold md:text-4xl">
            {heading}
          </h2>
        )}

        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={prefersReducedMotion ? {} : CONTAINER_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {images.map((image) => (
            <motion.div
              key={image._key}
              variants={prefersReducedMotion ? {} : TILE_VARIANTS}
              className="relative aspect-square overflow-hidden rounded-lg"
            >
              <SanityImage
                image={image as SanityImageData}
                fill
                width={600}
                height={600}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
