import { defineField, defineType } from 'sanity'

export const sectionBlogPreview = defineType({
  name: 'sectionBlogPreview',
  type: 'object',
  title: 'Sekcja: Podgląd bloga',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Nagłówek',
      validation: (Rule) => Rule.required(),
      initialValue: 'Aktualności i porady',
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
  ],
})
