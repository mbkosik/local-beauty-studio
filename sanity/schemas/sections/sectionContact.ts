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
  ],
})
