import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { CheckCircle2 } from 'lucide-react'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { cleanAnchor } from '@/lib/sanity-utils'
import type { FormSectionData } from '@/sanity/custom-types'
import { DynamicForm } from './DynamicForm'
import type { Form as SanityForm } from '@/sanity.types'

interface FormSectionProps {
  data: FormSectionData
  id?: string
}

const asideBodyComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-muted-foreground mb-4 leading-relaxed last:mb-0">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1 text-sm">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="text-muted-foreground mt-2 list-inside list-decimal space-y-1 text-sm">
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
    link: ({ value, children }) => {
      const href = (value?.href as string) ?? '#'
      const isTelOrMailto = href.startsWith('tel:') || href.startsWith('mailto:')
      const isExternal =
        !isTelOrMailto && ((value?.blank as boolean) === true || href.startsWith('http'))
      return (
        <a
          href={href}
          className="text-primary underline-offset-4 hover:underline"
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
          {isExternal && <span className="sr-only"> (otwiera nową kartę)</span>}
        </a>
      )
    },
  },
}

export function FormSection({ data, id }: FormSectionProps) {
  const { anchor, title, asideTitle, asideBody, asideBullets, form } = data
  const sectionId = id ?? cleanAnchor(anchor)

  if (!form) return null

  const hasAside = !!(
    asideTitle ||
    (asideBody && asideBody.length > 0) ||
    (asideBullets && asideBullets.length > 0)
  )

  const dynamicFormProps = {
    fields: (form.fields ?? []) as NonNullable<SanityForm['fields']>,
    formId: form._id,
    successMessage: form.successMessage ?? 'Dziękujemy! Wiadomość została wysłana.',
    hasConfirmation: !!form.confirmationSubject,
  }

  return (
    <AnimatedSection as="section" id={sectionId} className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="font-heading mb-10 text-center text-3xl font-bold md:text-4xl">{title}</h2>
        )}

        {hasAside ? (
          <div className="grid gap-12 lg:grid-cols-[55fr_45fr]">
            <DynamicForm {...dynamicFormProps} />
            <aside className="hidden lg:block">
              {asideTitle && (
                <h3 className="font-heading mb-4 text-2xl font-semibold">{asideTitle}</h3>
              )}
              {asideBody && asideBody.length > 0 && (
                <PortableText value={asideBody} components={asideBodyComponents} />
              )}
              {asideBullets && asideBullets.length > 0 && (
                <ul className="mt-6 space-y-3">
                  {asideBullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2
                        className="text-primary mt-0.5 shrink-0"
                        size={18}
                        aria-hidden="true"
                      />
                      <span className="text-muted-foreground">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </aside>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl">
            <DynamicForm {...dynamicFormProps} />
          </div>
        )}
      </div>
    </AnimatedSection>
  )
}
