import { defineField, defineType } from 'sanity'

export const sectionTextImage = defineType({
  name: 'sectionTextImage',
  title: 'Sekcja: Tekst i zdjęcie',
  type: 'object',
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) {
      return {
        title: 'Sekcja: Tekst i zdjęcie',
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
      name: 'body',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imagePosition',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'right',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
