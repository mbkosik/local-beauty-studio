'use client'

import { Clock } from 'lucide-react'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { Card, CardContent } from '@/components/ui/card'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import type { SectionPricing } from '@/sanity.types'

interface PricingSectionProps {
  data: SectionPricing
}

const CONTAINER_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const CARD_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function PricingSection({ data }: PricingSectionProps) {
  const { heading, subheading, items } = data
  const prefersReducedMotion = useReducedMotion()

  if (!items?.length) return null

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
          {items.map((item) => (
            <motion.div
              key={item._key}
              variants={prefersReducedMotion ? {} : CARD_VARIANTS}
              className="flex"
            >
              <Card className="flex w-full flex-col">
                <CardContent className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading mb-2 text-xl font-semibold">{item.name}</h3>
                  {item.description && (
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  )}
                  <div className="mt-auto flex items-end justify-between gap-2 pt-4">
                    <span className="text-brand text-2xl font-bold">{item.price}</span>
                    {item.duration && (
                      <span className="text-muted-foreground flex items-center gap-1 text-sm">
                        <Clock size={14} aria-hidden="true" />
                        {item.duration}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
