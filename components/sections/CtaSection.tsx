'use client'

import Link from 'next/link'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { cn } from '@/lib/utils'
import type { SectionCta } from '@/sanity.types'

interface CtaSectionProps {
  data: SectionCta
  id?: string
}

const BTN_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

const VARIANT_CONFIG = {
  brand: {
    section: 'bg-primary',
    heading: 'text-primary-foreground',
    subheading: 'text-primary-foreground/80',
    primaryBtn: { variant: 'secondary' as const, className: '' },
    secondaryBtn: {
      variant: 'outline' as const,
      className:
        'border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground',
    },
  },
  dark: {
    section: 'bg-foreground dark:bg-background dark:border dark:border-border',
    heading: 'text-background dark:text-foreground',
    subheading: 'text-background/80 dark:text-foreground/70',
    primaryBtn: { variant: 'secondary' as const, className: '' },
    secondaryBtn: {
      variant: 'outline' as const,
      className:
        'border-background bg-transparent text-background hover:bg-background/10 hover:text-background dark:border-foreground dark:text-foreground dark:hover:bg-foreground/10 dark:hover:text-foreground',
    },
  },
  light: {
    section: 'bg-muted',
    heading: 'text-foreground',
    subheading: 'text-muted-foreground',
    primaryBtn: { variant: 'default' as const, className: '' },
    secondaryBtn: { variant: 'outline' as const, className: '' },
  },
} satisfies Record<
  NonNullable<SectionCta['variant']>,
  {
    section: string
    heading: string
    subheading: string
    primaryBtn: { variant: 'default' | 'secondary'; className: string }
    secondaryBtn: { variant: 'outline'; className: string }
  }
>

function externalProps(href: string) {
  return href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}
}

export function CtaSection({ data, id }: CtaSectionProps) {
  const { heading, subheading, primaryCta, secondaryCta, variant = 'brand' } = data
  const prefersReducedMotion = useReducedMotion()

  const cfg = VARIANT_CONFIG[variant]
  const hasPrimary = !!(primaryCta?.label && primaryCta?.href)
  const hasSecondary = !!(secondaryCta?.label && secondaryCta?.href)

  return (
    <AnimatedSection as="section" id={id} className={cn('py-20 lg:py-28', cfg.section)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {heading && (
            <h2
              className={cn(
                'font-heading mb-4 text-3xl font-bold md:text-4xl lg:text-5xl',
                cfg.heading
              )}
            >
              {heading}
            </h2>
          )}
          {subheading && <p className={cn('mb-8 text-lg', cfg.subheading)}>{subheading}</p>}

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
  )
}
