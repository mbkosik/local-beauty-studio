import { defineField, defineType } from 'sanity'

export const sectionContact = defineType({
  name: 'sectionContact',
  type: 'object',
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
