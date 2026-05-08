import { defineField, defineType } from 'sanity'
import { colorVariantField } from '../fields/colorVariantField'

export const sectionTeam = defineType({
  name: 'sectionTeam',
  title: 'Sekcja: Nasz zespół',
  type: 'object',
  preview: {
    select: {
      title: 'title',
      members: 'members',
    },
    prepare({ title, members }) {
      return {
        title: `Zespół: ${title ?? '(bez tytułu)'}`,
        subtitle: `${(members as unknown[])?.length ?? 0} osób`,
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł sekcji',
      type: 'string',
      description: 'Np. "Nasz zespół"',
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
      name: 'members',
      title: 'Członkowie zespołu',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    colorVariantField,
  ],
})
