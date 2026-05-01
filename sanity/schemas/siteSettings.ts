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
