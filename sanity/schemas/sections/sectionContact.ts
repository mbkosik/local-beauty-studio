import { defineField, defineType } from 'sanity'
import { colorVariantField } from '../fields/colorVariantField'

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
    defineField({
      name: 'body',
      title: 'Treść boczna (prawa kolumna)',
      description: 'Tekst wyświetlany obok formularza. Obsługuje pogrubienie, kursywę i linki.',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normalny', value: 'normal' }],
          lists: [],
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
      name: 'privacyNotice',
      title: 'Klauzula przy formularzu',
      description:
        'Opcjonalny tekst klauzuli wyświetlany pod polami formularza, nad przyciskiem wysyłki.',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normalny', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Pogrubienie', value: 'strong' },
              { title: 'Kursywa', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'string',
                    title: 'URL',
                    description:
                      'Pełny URL (https://...), ścieżka względna (/polityka-prywatnosci), tel:+48123456789 lub mailto:info@salon.pl',
                    validation: (Rule) =>
                      Rule.custom((value: string | undefined) => {
                        if (!value) return 'URL jest wymagany'
                        if (
                          value.startsWith('/') ||
                          value.startsWith('#') ||
                          value.startsWith('tel:') ||
                          value.startsWith('mailto:')
                        )
                          return true
                        try {
                          new URL(value)
                          return true
                        } catch {
                          return 'Wpisz pełny URL (https://...), ścieżkę względną (/strona), tel:... lub mailto:...'
                        }
                      }),
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
    colorVariantField,
  ],
})
