import { defineField, defineType } from 'sanity'

export const sectionServices = defineType({
  name: 'sectionServices',
  type: 'object',
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
