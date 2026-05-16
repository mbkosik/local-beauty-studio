import type { PortableTextComponents } from '@portabletext/react'
import { PortableText } from '@portabletext/react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { getVariantProps } from '@/lib/color-variant'
import type { SectionFaq } from '@/sanity.types'

interface FaqSectionProps {
  data: SectionFaq
}

const faqPortableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-muted-foreground text-sm leading-relaxed md:text-base">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1 text-sm md:text-base">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="text-muted-foreground mt-2 list-inside list-decimal space-y-1 text-sm md:text-base">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="text-foreground font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
      >
        {children}
        <span className="sr-only"> (otwiera nową kartę)</span>
      </a>
    ),
  },
}

export function FaqSection({ data }: FaqSectionProps) {
  const { anchor, title, subtitle, items, colorVariant } = data
  const id = anchor?.current ?? undefined

  if (!items?.length) return null

  return (
    <section
      id={id}
      aria-labelledby="faq-title"
      className="py-16 md:py-24"
      {...getVariantProps(colorVariant)}
    >
      <div className="mx-auto max-w-3xl px-4">
        <AnimatedSection>
          <h2 id="faq-title" className="font-heading text-center text-3xl md:text-4xl">
            {title}
          </h2>
          {subtitle && <p className="text-muted-foreground mt-4 text-center text-lg">{subtitle}</p>}

          <Accordion type="single" collapsible className="mt-10 space-y-2 md:mt-12">
            {items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="rounded-lg border px-4">
                <AccordionTrigger className="py-4 text-left text-base font-medium hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="space-y-2 pb-4">
                  {item.answer && (
                    <PortableText value={item.answer} components={faqPortableTextComponents} />
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  )
}
