import { defineField, defineType } from 'sanity'
import { colorVariantField } from '../fields/colorVariantField'

export const sectionBlogPreview = defineType({
  name: 'sectionBlogPreview',
  title: 'Sekcja: Aktualności',
  type: 'object',
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) {
      return {
        title: 'Sekcja: Aktualności',
        subtitle: heading ?? '(bez nagłówka)',
      }
    },
  },
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Nagłówek',
      validation: (Rule) => Rule.required(),
      initialValue: 'Aktualności i porady',
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
      title: 'Podtytuł',
    }),
    defineField({
      name: 'mode',
      type: 'string',
      title: 'Tryb wyboru postów',
      options: {
        list: [
          { title: 'Najnowsze', value: 'latest' },
          { title: 'Wybrane ręcznie', value: 'manual' },
        ],
        layout: 'radio',
      },
      initialValue: 'latest',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'posts',
      type: 'array',
      title: 'Wybrane posty',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      validation: (Rule) => Rule.max(3),
      hidden: ({ parent }) => parent?.mode !== 'manual',
    }),
    defineField({
      name: 'showViewAll',
      type: 'boolean',
      title: 'Pokaż link "Zobacz wszystkie"',
      initialValue: false,
    }),
    colorVariantField,
  ],
})
