'use client'

import { createElement, Fragment } from 'react'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { stegaClean } from '@sanity/client/stega'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { getDynamicIcon } from '@/lib/icon-service'
import { getVariantProps } from '@/lib/color-variant'
import { cleanAnchor } from '@/lib/sanity-utils'
import type { SectionProcess } from '@/sanity.types'

type ProcessStep = {
  icon?: string
  title?: string
  description?: string
}

interface ProcessSectionProps {
  data: SectionProcess
}

function HorizontalLayout({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="flex flex-col items-center justify-center gap-0 md:flex-row">
      {steps.map((step, index) => {
        const Icon = getDynamicIcon(step.icon)
        return (
          <Fragment key={index}>
            <div className="flex max-w-56 flex-col items-center px-4 text-center">
              <div className="bg-primary/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                {Icon &&
                  createElement(Icon, {
                    className: 'w-7 h-7 text-primary',
                    'aria-hidden': 'true',
                  })}
              </div>
              <h3 className="text-sm font-medium md:text-base">{step.title}</h3>
              {step.description && (
                <p className="text-muted-foreground mt-1 text-xs md:text-sm">{step.description}</p>
              )}
            </div>
            {index < steps.length - 1 && (
              <>
                <ArrowRight
                  className="text-muted-foreground/50 mx-2 hidden h-5 w-5 shrink-0 md:block"
                  aria-hidden="true"
                />
                <ArrowDown
                  className="text-muted-foreground/50 my-2 h-5 w-5 shrink-0 md:hidden"
                  aria-hidden="true"
                />
              </>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

function VerticalLayout({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="mx-auto max-w-2xl space-y-0">
      {steps.map((step, index) => {
        const Icon = getDynamicIcon(step.icon)
        return (
          <div key={index} className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                {Icon &&
                  createElement(Icon, {
                    className: 'w-5 h-5 text-primary',
                    'aria-hidden': 'true',
                  })}
              </div>
              {index < steps.length - 1 && (
                <div className="bg-border mt-2 mb-2 min-h-8 w-px flex-1" />
              )}
            </div>
            <div className="pb-8">
              <h3 className="mt-2 text-base leading-tight font-medium md:text-lg">{step.title}</h3>
              {step.description && (
                <p className="text-muted-foreground mt-1 text-sm md:text-base">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function ProcessSection({ data }: ProcessSectionProps) {
  const { anchor, title, subtitle, layout, steps, colorVariant } = data
  const id = cleanAnchor(anchor)

  if (!steps?.length) return null

  return (
    <section
      id={id}
      aria-labelledby="process-title"
      className="py-16 md:py-24"
      {...getVariantProps(colorVariant)}
    >
      <AnimatedSection className="container mx-auto px-4">
        <div className="mb-12 text-center md:mb-16">
          <h2 id="process-title" className="font-heading text-3xl md:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">{subtitle}</p>
          )}
        </div>
        {stegaClean(layout) === 'horizontal' ? (
          <HorizontalLayout steps={steps} />
        ) : (
          <VerticalLayout steps={steps} />
        )}
      </AnimatedSection>
    </section>
  )
}
