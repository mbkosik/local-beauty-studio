import { defineField, defineType } from 'sanity'

export const sectionBlogPreview = defineType({
  name: 'sectionBlogPreview',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      initialValue: 'Aktualności',
    }),
    defineField({
      name: 'count',
      type: 'number',
      initialValue: 3,
      validation: (Rule) => Rule.min(1).max(6),
    }),
  ],
})
