import { defineField, defineType } from 'sanity'

export const sectionGallery = defineType({
  name: 'sectionGallery',
  title: 'Sekcja: Galeria',
  type: 'object',
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) {
      return {
        title: 'Sekcja: Galeria',
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
      name: 'images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
