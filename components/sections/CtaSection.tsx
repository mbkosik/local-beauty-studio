'use client'

import Link from 'next/link'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { cn } from '@/lib/utils'
import { getVariantProps, type ColorVariant } from '@/lib/color-variant'
import type { SectionCta } from '@/sanity.types'

interface CtaSectionProps {
  data: SectionCta
}

const BTN_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

const BTN_CONFIG: Record<
  ColorVariant,
  {
    primaryBtn: { variant: 'default' | 'secondary'; className: string }
    secondaryBtn: { variant: 'outline'; className: string }
  }
> = {
  light: {
    primaryBtn: { variant: 'default', className: '' },
    secondaryBtn: { variant: 'outline', className: '' },
  },
  muted: {
    primaryBtn: { variant: 'default', className: '' },
    secondaryBtn: { variant: 'outline', className: '' },
  },
  dark: {
    primaryBtn: { variant: 'secondary', className: '' },
    secondaryBtn: {
      variant: 'outline',
      className: 'border-foreground/40 text-foreground hover:bg-foreground/10',
    },
  },
  brand: {
    primaryBtn: { variant: 'secondary', className: '' },
    secondaryBtn: {
      variant: 'outline',
      className:
        'border-primary-foreground/60 bg-transparent text-primary-foreground hover:bg-primary-foreground/10',
    },
  },
}

function externalProps(href: string) {
  return href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}
}

export function CtaSection({ data }: CtaSectionProps) {
  const { anchor, heading, subheading, primaryCta, secondaryCta, colorVariant } = data
  const id = anchor?.current ?? undefined
  const prefersReducedMotion = useReducedMotion()

  const cfg = BTN_CONFIG[(colorVariant ?? 'light') as ColorVariant]
  const hasPrimary = !!(primaryCta?.label && primaryCta?.href)
  const hasSecondary = !!(secondaryCta?.label && secondaryCta?.href)

  return (
    <section id={id} {...getVariantProps(colorVariant)}>
      <AnimatedSection className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            {heading && (
              <h2 className="font-heading mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className={cn('mb-8 text-lg', 'text-muted-foreground')}>{subheading}</p>
            )}

            {(hasPrimary || hasSecondary) && (
              <motion.div
                className="flex flex-wrap justify-center gap-4"
                variants={prefersReducedMotion ? {} : BTN_VARIANTS}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
              >
                {hasPrimary && (
                  <Button
                    asChild
                    size="lg"
                    variant={cfg.primaryBtn.variant}
                    className={cfg.primaryBtn.className}
                  >
                    <Link href={primaryCta!.href!} {...externalProps(primaryCta!.href!)}>
                      {primaryCta!.label}
                    </Link>
                  </Button>
                )}
                {hasSecondary && (
                  <Button
                    asChild
                    size="lg"
                    variant={cfg.secondaryBtn.variant}
                    className={cfg.secondaryBtn.className}
                  >
                    <Link href={secondaryCta!.href!} {...externalProps(secondaryCta!.href!)}>
                      {secondaryCta!.label}
                    </Link>
                  </Button>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
