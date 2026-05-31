import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Ustawienia strony',
  type: 'document',
  fields: [
    defineField({
      name: 'businessName',
      title: 'Nazwa firmy',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Hasło reklamowe',
      type: 'string',
      description: 'Krótki slogan wyświetlany pod nazwą firmy',
    }),
    defineField({
      name: 'logoLight',
      title: 'Logo — wariant jasny (light mode)',
      type: 'image',
      description:
        'Logo z ciemnymi literami / elementami na przezroczystym tle. Wyświetlane gdy strona działa w jasnym motywie.',
      options: { hotspot: false },
      fields: [
        defineField({
          name: 'alt',
          title: 'Tekst alternatywny',
          type: 'string',
          description: 'Opis logo dla czytników ekranu i SEO (np. "Logo Beauty Studio")',
        }),
      ],
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo — wariant ciemny (dark mode)',
      type: 'image',
      description:
        'Logo z białymi / jasnymi literami na przezroczystym tle. Wyświetlane gdy strona działa w ciemnym motywie.',
      options: { hotspot: false },
      fields: [
        defineField({
          name: 'alt',
          title: 'Tekst alternatywny',
          type: 'string',
          description: 'Opis logo dla czytników ekranu i SEO (np. "Logo Beauty Studio")',
        }),
      ],
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description:
        'Ikona strony wyświetlana w zakładce przeglądarki. Zalecany format: PNG, min. 64×64 px, proporcje 1:1.',
      options: { hotspot: false },
    }),
    defineField({
      name: 'email',
      title: 'Adres email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Numer telefonu',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Adres',
      type: 'string',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Link do Google Maps',
      type: 'url',
      description: 'URL do lokalizacji salonu w Google Maps',
    }),
    defineField({
      name: 'social',
      title: 'Media społecznościowe',
      type: 'object',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        }),
        defineField({
          name: 'tiktok',
          title: 'TikTok',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'openingHours',
      title: 'Godziny otwarcia',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'dayRange',
          title: 'Zakres dni',
          fields: [
            defineField({
              name: 'days',
              title: 'Dni',
              type: 'string',
              description: 'np. Poniedziałek – Piątek',
            }),
            defineField({
              name: 'hours',
              title: 'Godziny',
              type: 'string',
              description: 'np. 10:00 – 20:00 lub Nieczynne',
            }),
          ],
          preview: {
            select: { title: 'days', subtitle: 'hours' },
          },
        },
      ],
    }),
    defineField({
      name: 'navLinks',
      title: 'Linki nawigacji',
      type: 'array',
      of: [{ type: 'navLink' }],
    }),
    defineField({
      name: 'footerLinks',
      title: 'Linki w stopce',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'footerLink',
          fields: [
            defineField({ name: 'label', title: 'Etykieta', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'url' } },
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta tytuł',
          type: 'string',
          description: 'Tytuł strony w wynikach wyszukiwania (max 60 znaków)',
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta opis',
          type: 'text',
          description: 'Opis strony w wynikach wyszukiwania (max 160 znaków)',
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: 'ogImage',
          title: 'Obrazek Open Graph',
          type: 'image',
          description: 'Obrazek wyświetlany przy udostępnianiu w mediach społecznościowych',
          options: { hotspot: true },
        }),
      ],
    }),
  ],
})
