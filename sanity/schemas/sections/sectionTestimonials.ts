import { defineField, defineType } from 'sanity'

export const sectionTestimonials = defineType({
  name: 'sectionTestimonials',
  title: 'Sekcja: Opinie klientów',
  type: 'object',
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) {
      return {
        title: 'Sekcja: Opinie klientów',
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
      name: 'testimonials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
