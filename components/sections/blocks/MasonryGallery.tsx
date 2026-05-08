import { motion, type Variants } from 'motion/react'
import { SanityImage, type SanityImageData } from '@/components/shared/SanityImage'
import { SectionGallery } from '@/sanity.types'

type GalleryImage = NonNullable<SectionGallery['images']>[number]

const TILE_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// Softer than 3/4 + 4/3 — less imposing on mobile while keeping the mosaic feel
const MASONRY_ASPECTS = ['aspect-[4/5]', 'aspect-[3/2]'] as const

// Prevents empty columns: CSS columns with balanced-height items can produce
// e.g. 2+2+0 for 4 images in 3 columns. Cap columns to avoid this.
function getMasonryColumns(count: number): string {
  if (count === 1) return 'columns-1'
  if (count === 2) return 'columns-2'
  if (count === 3) return 'columns-2 sm:columns-3'
  if (count === 4) return 'columns-2'
  return 'columns-2 md:columns-3'
}

interface MasonryGalleryProps {
  images: GalleryImage[]
  prefersReducedMotion: boolean
}

export function MasonryGallery({ images, prefersReducedMotion }: MasonryGalleryProps) {
  return (
    <div className={`gap-3 md:gap-4 ${getMasonryColumns(images.length)}`}>
      {images.map((image, index) => (
        <motion.div
          key={image._key}
          variants={prefersReducedMotion ? {} : TILE_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className={`relative mb-3 break-inside-avoid overflow-hidden rounded-lg md:mb-4 ${MASONRY_ASPECTS[index % 2]}`}
        >
          <SanityImage
            image={image as SanityImageData}
            fill
            width={600}
            height={750}
            sizes="(max-width: 640px) 50vw, 33vw"
            className="object-cover"
          />
        </motion.div>
      ))}
    </div>
  )
}
