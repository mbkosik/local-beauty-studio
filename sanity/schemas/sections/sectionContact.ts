import { defineField, defineType } from 'sanity'

export const sectionContact = defineType({
  name: 'sectionContact',
  title: 'Sekcja: Kontakt',
  type: 'object',
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) {
      return {
        title: 'Sekcja: Kontakt',
        subtitle: heading ?? '(bez nagłówka)',
      }
    },
  },
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      initialValue: 'Kontakt',
    }),
    defineField({
      name: 'subheading',
      type: 'string',
    }),
  ],
})
