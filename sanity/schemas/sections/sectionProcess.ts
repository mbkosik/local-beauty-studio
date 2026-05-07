import { defineField, defineType } from 'sanity'

export const sectionProcess = defineType({
  name: 'sectionProcess',
  title: 'Sekcja: Proces',
  type: 'object',
  preview: {
    select: {
      title: 'title',
      layout: 'layout',
      steps: 'steps',
    },
    prepare({ title, layout, steps }) {
      return {
        title: `Proces: ${title ?? '(bez tytułu)'} (${layout ?? 'horizontal'})`,
        subtitle: `${(steps as unknown[])?.length ?? 0} kroków`,
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł sekcji',
      type: 'string',
      description: 'Np. "Jak przebiega wizyta?"',
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
      name: 'layout',
      title: 'Układ',
      type: 'string',
      initialValue: 'horizontal',
      options: {
        list: [
          { title: 'Poziomo (z strzałkami)', value: 'horizontal' },
          { title: 'Pionowo (timeline)', value: 'vertical' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'steps',
      title: 'Kroki',
      type: 'array',
      validation: (Rule) => Rule.required().min(2).max(8),
      of: [
        {
          type: 'object',
          preview: {
            select: { title: 'title', subtitle: 'icon' },
          },
          fields: [
            defineField({
              name: 'icon',
              title: 'Ikona',
              type: 'lucide-icon',
            }),
            defineField({
              name: 'title',
              title: 'Tytuł kroku',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Opis kroku',
              type: 'text',
            }),
          ],
        },
      ],
    }),
  ],
})
