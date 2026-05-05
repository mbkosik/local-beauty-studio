import { defineField, defineType } from 'sanity'

export const sectionServices = defineType({
  name: 'sectionServices',
  title: 'Sekcja: Usługi',
  type: 'object',
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) {
      return {
        title: 'Sekcja: Usługi',
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
      name: 'services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      validation: (Rule) => Rule.required().max(3),
    }),
  ],
})
