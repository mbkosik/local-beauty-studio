import { defineField, defineType } from 'sanity'
import { colorVariantField } from '../fields/colorVariantField'
import { isValidLinkHref } from '../validations/linkValidation'

export const sectionTextVideo = defineType({
  name: 'sectionTextVideo',
  title: 'Sekcja: Tekst + Wideo',
  type: 'object',
  preview: {
    select: {
      title: 'title',
      mediaPosition: 'mediaPosition',
    },
    prepare({ title, mediaPosition }: { title?: string; mediaPosition?: string }) {
      return {
        title: `TextVideo: ${title ?? 'bez tytułu'} (video ${mediaPosition ?? 'right'})`,
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'string',
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
    defineField({
      name: 'videoUrl',
      title: 'URL wideo',
      description: 'Link do filmu YouTube lub Vimeo, np. https://www.youtube.com/watch?v=...',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mediaPosition',
      title: 'Pozycja wideo',
      type: 'string',
      options: {
        list: [
          { title: 'Wideo po prawej', value: 'right' },
          { title: 'Wideo po lewej', value: 'left' },
        ],
        layout: 'radio',
      },
      initialValue: 'right',
    }),
    defineField({
      name: 'caption',
      title: 'Podpis pod wideo',
      type: 'string',
    }),
    defineField({
      name: 'cta',
      title: 'Przycisk CTA',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Etykieta', type: 'string' }),
        defineField({
          name: 'href',
          title: 'Link',
          type: 'string',
          validation: (Rule) => Rule.custom(isValidLinkHref),
        }),
      ],
    }),
    colorVariantField,
  ],
})
