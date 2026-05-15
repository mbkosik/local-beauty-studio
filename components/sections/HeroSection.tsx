'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { SanityImage, type SanityImageData } from '@/components/shared/SanityImage'
import { cn } from '@/lib/utils'
import type { SectionHero } from '@/sanity.types'

interface HeroSectionProps {
  data: SectionHero
  id?: string
}

export function HeroSection({ data, id }: HeroSectionProps) {
  const {
    heading,
    subheading,
    primaryCta,
    secondaryCta,
    backgroundImage,
    mediaType,
    videoUrl,
    videoPoster,
  } = data
  const reducedMotion = useReducedMotion()
  const isVideo = mediaType === 'video' && !!videoUrl
  const hasImage = !isVideo && !!backgroundImage?.asset
  const hasMedia = isVideo || hasImage
  const [posterVisible, setPosterVisible] = useState(true)

  const fadeUp = (delay = 0) => ({
    initial: reducedMotion ? (false as const) : { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
  })

  return (
    // colorVariant not applied — hero uses media background
    <section
      id={id}
      aria-label="Baner główny"
      className={cn('relative min-h-svh', !hasMedia && 'bg-brand/20')}
    >
      {hasMedia && (
        <>
          <div aria-hidden="true" className="absolute inset-0">
            {isVideo ? (
              <>
                {videoPoster?.asset && posterVisible && (
                  <SanityImage
                    image={videoPoster as unknown as SanityImageData}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover"
                    loading="eager"
                    fetchPriority="high"
                    width={1920}
                    height={1080}
                  />
                )}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  onCanPlay={() => setPosterVisible(false)}
                  className="absolute inset-0 h-full w-full object-cover"
                >
                  <source src={videoUrl} type="video/mp4" />
                </video>
              </>
            ) : (
              <SanityImage
                image={backgroundImage as unknown as SanityImageData}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
                loading="eager"
                fetchPriority="high"
                width={1920}
                height={1080}
              />
            )}
          </div>
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-transparent" />
        </>
      )}

      <div className="relative z-10 flex min-h-svh flex-col items-center justify-center px-4">
        <div className="mx-auto w-full max-w-3xl rounded-2xl bg-black/10 px-8 py-12 text-center backdrop-blur-[2px]">
          <motion.div {...fadeUp(0)}>
            <h1 className="font-heading text-4xl font-bold text-white md:text-6xl lg:text-7xl">
              {heading}
            </h1>
          </motion.div>

          {subheading && (
            <motion.div {...fadeUp(0.15)}>
              <p className="font-body mt-4 text-lg font-light text-white/85 md:text-xl">
                {subheading}
              </p>
            </motion.div>
          )}

          {primaryCta?.label && primaryCta?.href && (
            <motion.div {...fadeUp(0.25)}>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link href={primaryCta.href}>{primaryCta.label}</Link>
                </Button>
                {secondaryCta?.label && secondaryCta?.href && (
                  <Button
                    asChild
                    variant="ghost"
                    size="lg"
                    className="border border-white/40 text-white hover:bg-white/10 hover:text-white"
                  >
                    <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
