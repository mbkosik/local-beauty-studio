import { motion, type Variants } from 'motion/react'
import { SanityImage, type SanityImageData } from '@/components/shared/SanityImage'
import { SectionGallery } from '@/sanity.types'

type GalleryImage = NonNullable<SectionGallery['images']>[number]

const CONTAINER_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const TILE_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

interface GridGalleryProps {
  images: GalleryImage[]
  prefersReducedMotion: boolean
}

export function GridGallery({ images, prefersReducedMotion }: GridGalleryProps) {
  return (
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
            alt={image.alt ?? ''}
            fill
            width={600}
            height={600}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
