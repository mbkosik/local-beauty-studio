import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Opinia',
  type: 'document',
  fields: [
    defineField({
      name: 'authorName',
      title: 'Imię i nazwisko',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Stanowisko',
      type: 'string',
      description: 'Stanowisko lub rola osoby wystawiającej opinię (np. "Stała klientka")',
    }),
    defineField({
      name: 'company',
      title: 'Firma',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Treść opinii',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Ocena (1–5)',
      type: 'number',
      description: 'Ocena w skali 1–5 gwiazdek',
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: 'photo',
      title: 'Zdjęcie',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Tekst alternatywny',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Wyróżniona',
      type: 'boolean',
      description: 'Wyróżnione opinie pojawiają się w sekcji na stronie głównej',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data publikacji',
      type: 'date',
      description: 'Data wystawienia opinii',
    }),
  ],
})
