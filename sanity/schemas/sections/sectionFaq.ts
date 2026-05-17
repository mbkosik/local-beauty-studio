import { defineField, defineType } from 'sanity'
import { colorVariantField } from '../fields/colorVariantField'
import { isValidLinkHref } from '../validations/linkValidation'

export const sectionFaq = defineType({
  name: 'sectionFaq',
  title: 'Sekcja: FAQ',
  type: 'object',
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({ title, items }) {
      return {
        title: `FAQ: ${title ?? '(bez tytułu)'}`,
        subtitle: `${(items as unknown[])?.length ?? 0} pytań`,
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł sekcji',
      type: 'string',
      description: 'Np. "Często zadawane pytania"',
      validation: (Rule) => Rule.required(),
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
      name: 'subtitle',
      title: 'Podtytuł',
      type: 'text',
    }),
    defineField({
      name: 'items',
      title: 'Pytania i odpowiedzi',
      type: 'array',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          preview: {
            select: { title: 'question' },
            prepare({ title }) {
              return { title: title ?? '(bez pytania)' }
            },
          },
          fields: [
            defineField({
              name: 'question',
              title: 'Pytanie',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Odpowiedź',
              type: 'array',
              validation: (Rule) => Rule.required(),
              of: [
                {
                  type: 'block',
                  styles: [{ title: 'Normal', value: 'normal' }],
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
                            type: 'string',
                            title: 'URL',
                            validation: (Rule) => Rule.custom(isValidLinkHref),
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
          ],
        },
      ],
    }),
    colorVariantField,
  ],
})
