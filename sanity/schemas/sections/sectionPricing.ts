import { defineField, defineType } from 'sanity'

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
      name: 'subheading',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Pozycje cennika',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'pricingItem' }] }],
    }),
  ],
})
