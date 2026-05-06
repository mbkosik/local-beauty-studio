import { defineField, defineType } from 'sanity'

export const sectionHero = defineType({
  name: 'sectionHero',
  title: 'Sekcja: Hero',
  type: 'object',
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) {
      return {
        title: 'Sekcja: Hero',
        subtitle: heading ?? '(bez nagłówka)',
      }
    },
  },
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'primaryCta',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'href',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'secondaryCta',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'href',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'backgroundImage',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
        }),
      ],
    }),
  ],
})
