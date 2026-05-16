import { client } from '@/sanity/client'
import { contactSiteSettingsQuery } from '@/sanity/queries'
import { getVariantProps } from '@/lib/color-variant'
import type { SectionContact } from '@/sanity.types'
import { ContactForm } from './ContactForm'

interface ContactSectionProps {
  data: SectionContact
}

export async function ContactSection({ data }: ContactSectionProps) {
  const id = data.anchor?.current ?? undefined
  const settings = await client.fetch(
    contactSiteSettingsQuery,
    {},
    { next: { tags: ['settings'] } }
  )

  return (
    <section id={id} className="py-16 md:py-24" {...getVariantProps(data.colorVariant)}>
      <div className="container mx-auto px-4">
        {(data.heading || data.subheading) && (
          <div className="mb-12 text-center">
            {data.heading && (
              <h2 className="font-heading mb-4 text-3xl font-bold md:text-4xl">{data.heading}</h2>
            )}
            {data.subheading && (
              <p className="text-muted-foreground mx-auto max-w-2xl text-lg">{data.subheading}</p>
            )}
          </div>
        )}

        <ContactForm
          businessName={settings?.businessName ?? ''}
          email={settings?.email ?? ''}
          phone={settings?.phone ?? undefined}
          address={settings?.address ?? undefined}
          body={data.body ?? undefined}
        />
      </div>
    </section>
  )
}
