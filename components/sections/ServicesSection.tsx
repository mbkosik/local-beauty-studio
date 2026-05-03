'use client'

import { createElement } from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { SanityImage, type SanityImageData } from '@/components/shared/SanityImage'
import { getDynamicIcon } from '@/lib/icon-service'
import { ServicesSectionData } from '@/sanity/custom-types'

interface ServicesSectionProps {
  data: ServicesSectionData
}

const CONTAINER_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const CARD_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function ServicesSection({ data }: ServicesSectionProps) {
  const { heading, subheading, services } = data
  const prefersReducedMotion = useReducedMotion()

  if (!services?.length) return null

  return (
    <AnimatedSection as="section" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {(heading || subheading) && (
          <div className="mb-12 text-center">
            {heading && (
              <h2 className="font-heading mb-3 text-3xl font-bold md:text-4xl">{heading}</h2>
            )}
            {subheading && (
              <p className="text-muted-foreground mx-auto max-w-2xl text-lg">{subheading}</p>
            )}
          </div>
        )}

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={prefersReducedMotion ? {} : CONTAINER_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {services.map((service) => {
            const Icon = getDynamicIcon(service.icon)
            return (
              <motion.div
                key={service._id}
                variants={prefersReducedMotion ? {} : CARD_VARIANTS}
                className="flex"
              >
                <Card className="w-full py-0">
                  {service.image?.asset && (
                    <CardHeader className="p-0">
                      <div className="relative aspect-4/3">
                        <SanityImage
                          image={service.image as SanityImageData}
                          fill
                          width={600}
                          height={450}
                          className="object-cover"
                        />
                      </div>
                    </CardHeader>
                  )}
                  <CardContent className="flex flex-1 flex-col p-5">
                    {Icon &&
                      createElement(Icon, {
                        size: 20,
                        className: 'text-brand mb-2',
                        'aria-hidden': 'true',
                      })}
                    <h3 className="font-heading mb-2 text-xl font-semibold">{service.title}</h3>
                    {service.description && (
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {service.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
