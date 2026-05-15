'use client'

import { useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { TestimonialCard } from '@/components/blocks/TestimonialCard'
import { getVariantProps } from '@/lib/color-variant'
import type { TestimonialsSectionData } from '@/sanity/custom-types'

interface TestimonialsSectionProps {
  data: TestimonialsSectionData
  id?: string
}

export function TestimonialsSection({ data, id }: TestimonialsSectionProps) {
  const { heading, testimonials, colorVariant } = data
  const prefersReducedMotion = useReducedMotion()

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [visibleCount, setVisibleCount] = useState(1)

  // Stable plugin instance — creating it in render body causes Embla to hold
  // a reference to the first instance while subsequent renders produce new objects,
  // making reset() calls land on the wrong (detached) instance.
  const autoplayPlugin = useMemo(() => Autoplay({ delay: 4000, stopOnMouseEnter: true }), [])

  useEffect(() => {
    if (!api) return

    let rafId: number | null = null

    // rAF defers the read by one frame so Embla and the browser have time
    // to settle the new layout after a breakpoint change fires reInit.
    const syncVisibleCount = (emblaApi: CarouselApi) => {
      if (!emblaApi) return
      if (rafId !== null) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        setVisibleCount(emblaApi.slidesInView().length)
        setCurrent(emblaApi.selectedScrollSnap())
        rafId = null
      })
    }

    const handleSelect = (emblaApi: CarouselApi) => {
      if (!emblaApi) return
      setCurrent(emblaApi.selectedScrollSnap())
      // Reset the countdown after every slide change (manual or auto) so the
      // next auto-scroll always waits the full delay.
      if (autoplayPlugin.isPlaying()) autoplayPlugin.reset()
    }

    syncVisibleCount(api)
    api.on('select', handleSelect)
    api.on('reInit', syncVisibleCount)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      api.off('select', handleSelect)
      api.off('reInit', syncVisibleCount)
    }
  }, [api, autoplayPlugin])

  if (!testimonials?.length) return null

  const showDots = testimonials.length > 1 && visibleCount < testimonials.length

  return (
    <section id={id} {...getVariantProps(colorVariant)}>
      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {heading && (
            <div className="mb-12 text-center">
              <h2 className="font-heading mb-3 text-3xl font-bold md:text-4xl">{heading}</h2>
            </div>
          )}

          <div className="relative px-12">
            <Carousel
              opts={{ loop: true }}
              plugins={prefersReducedMotion ? [] : [autoplayPlugin]}
              setApi={setApi}
            >
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial._id} className="md:basis-1/2 lg:basis-1/3">
                    <TestimonialCard testimonial={testimonial} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {showDots && (
            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: testimonials.length }, (_, i) => (
                <button
                  key={i}
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Przejdź do opinii ${i + 1}`}
                  aria-current={i === current ? 'true' : undefined}
                  className="p-2"
                >
                  <div
                    className={`h-2 w-2 rounded-full transition-colors ${
                      i === current ? 'bg-primary' : 'bg-muted-foreground/40'
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </AnimatedSection>
    </section>
  )
}
