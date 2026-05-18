import { defineField, defineType } from 'sanity'
import { isValidLinkHref } from '../validations/linkValidation'

export const sectionForm = defineType({
  name: 'sectionForm',
  title: 'Sekcja: Formularz',
  type: 'object',
  preview: {
    select: {
      title: 'title',
      formTitle: 'form.title',
    },
    prepare({ title, formTitle }) {
      return {
        title: `Formularz: ${title ?? formTitle ?? '(bez tytułu)'}`,
        subtitle: formTitle ? `formularz: ${formTitle}` : undefined,
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł sekcji',
      type: 'string',
      description: 'Opcjonalny nagłówek widoczny na stronie nad formularzem',
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
      name: 'form',
      title: 'Formularz',
      type: 'reference',
      to: [{ type: 'form' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'asideTitle',
      title: 'Tytuł panelu bocznego',
      type: 'string',
    }),
    defineField({
      name: 'asideBody',
      title: 'Treść panelu bocznego',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normalny', value: 'normal' }],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numerowana', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Pogrubienie', value: 'strong' },
              { title: 'Kursywa', value: 'em' },
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
      name: 'asideBullets',
      title: 'Punkty listy',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
