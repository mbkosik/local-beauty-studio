import { defineField, defineType } from 'sanity'
import { colorVariantField } from '../fields/colorVariantField'

export const sectionBadges = defineType({
  name: 'sectionBadges',
  title: 'Sekcja: Odznaki / Logotypy',
  type: 'object',
  preview: {
    select: {
      badges: 'badges',
    },
    prepare({ badges }) {
      return {
        title: `Badges: ${(badges as unknown[])?.length ?? 0} pozycji`,
      }
    },
  },
  fields: [
    defineField({
      name: 'label',
      title: 'Etykieta',
      type: 'string',
      description: 'Krótki tekst przed badgeami, np. "Zaufały nam:" lub "Pracujemy na produktach:"',
    }),
    defineField({
      name: 'anchor',
      title: 'Anchor (link kotwicy)',
      description: 'Unikalny identyfikator sekcji. Używany do linków #anchor.',
      type: 'slug',
      options: {
        source: () => 'badges',
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/ł/g, 'l')
            .replace(/Ł/g, 'L')
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, ''),
      },
    }),
    defineField({
      name: 'badges',
      title: 'Logotypy / Odznaki',
      type: 'array',
      validation: (Rule) => Rule.required().min(1).max(6),
      of: [
        {
          type: 'object',
          preview: {
            select: { title: 'alt' },
          },
          fields: [
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              options: { hotspot: false },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Tekst alternatywny',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Link (opcjonalny)',
              type: 'url',
            }),
            defineField({
              name: 'label',
              title: 'Podpis (opcjonalny)',
              type: 'string',
              description: 'Nazwa wyświetlana pod logo',
            }),
          ],
        },
      ],
    }),
    colorVariantField,
  ],
})
