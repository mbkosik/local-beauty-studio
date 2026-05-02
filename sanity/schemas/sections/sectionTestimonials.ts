import { defineField, defineType } from 'sanity'

export const sectionTestimonials = defineType({
  name: 'sectionTestimonials',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'testimonials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
