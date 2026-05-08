import { defineField, defineType } from 'sanity'
import { colorVariantField } from '../fields/colorVariantField'

export const sectionPricing = defineType({
  name: 'sectionPricing',
  title: 'Sekcja: Cennik',
  type: 'object',
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) {
      return {
        title: 'Sekcja: Cennik',
        subtitle: heading ?? '(bez nagłówka)',
      }
    },
  },
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'anchor',
      title: 'Anchor (link kotwicy)',
      description: 'Unikalny identyfikator sekcji. Używany do linków #anchor.',
      type: 'slug',
      options: {
        source: (_, options) => (options.parent as { heading?: string | null })?.heading ?? '',
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
      name: 'subheading',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Pozycje cennika',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'pricingItem' }] }],
    }),
    colorVariantField,
  ],
})
