import { defineField, defineType } from 'sanity'

export const sectionStats = defineType({
  name: 'sectionStats',
  title: 'Sekcja: Statystyki',
  type: 'object',
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) {
      return {
        title: 'Sekcja: Statystyki',
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
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'statItem',
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
          fields: [
            defineField({
              name: 'value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().max(4),
    }),
  ],
})
