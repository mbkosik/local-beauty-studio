import { defineField, defineType } from 'sanity'

export const sectionServices = defineType({
  name: 'sectionServices',
  title: 'Sekcja: Usługi',
  type: 'object',
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) {
      return {
        title: 'Sekcja: Usługi',
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
      name: 'anchor',
      title: 'Anchor (link kotwicy)',
      description: 'Unikalny identyfikator sekcji. Używany do linków #anchor.',
      type: 'slug',
      options: {
        source: (_, options) => (options.parent as { heading?: string | null })?.heading ?? '',
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/ł/g, 'l')
            .replace(/Ł/g, 'L')
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, ''),
      },
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
