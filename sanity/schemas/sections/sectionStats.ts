import { defineField, defineType } from 'sanity'

export const sectionStats = defineType({
  name: 'sectionStats',
  type: 'object',
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
      validation: (Rule) => Rule.required(),
    }),
  ],
})
