import { defineField, defineType } from 'sanity'
import { colorVariantField } from '../fields/colorVariantField'

export const sectionRichText = defineType({
  name: 'sectionRichText',
  title: 'Sekcja: Tekst formatowany',
  type: 'object',
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return {
        title: `Tekst: ${title ?? '(bez tytułu)'}`,
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł sekcji (wewnętrzny)',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'anchor',
      title: 'Anchor (link kotwicy)',
      description: 'Unikalny identyfikator sekcji. Używany do linków #anchor.',
      type: 'slug',
      options: {
        source: (_, options) => (options.parent as { title?: string | null })?.title ?? '',
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
      name: 'body',
      title: 'Treść',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              defineField({
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true }),
                  }),
                  defineField({
                    name: 'blank',
                    type: 'boolean',
                    title: 'Otwórz w nowej karcie',
                    initialValue: false,
                  }),
                ],
              }),
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'maxWidth',
      title: 'Szerokość treści',
      type: 'string',
      options: {
        list: [
          { title: 'Wąski (65ch)', value: 'narrow' },
          { title: 'Normalny', value: 'normal' },
          { title: 'Szeroki', value: 'wide' },
        ],
        layout: 'radio',
      },
      initialValue: 'normal',
    }),
    colorVariantField,
  ],
})
