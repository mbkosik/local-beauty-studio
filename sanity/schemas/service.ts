import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Usługa',
  type: 'document',
  orderings: [
    {
      title: 'Kolejność wyświetlania',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Nazwa usługi',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Ikona',
      type: 'string',
      description: 'Nazwa ikony z biblioteki Lucide React (np. "Scissors", "Sparkles", "Star")',
    }),
    defineField({
      name: 'image',
      title: 'Zdjęcie',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Tekst alternatywny',
          type: 'string',
          description: 'Opis zdjęcia dla czytników ekranu i SEO',
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Kolejność',
      type: 'number',
      description: 'Kolejność wyświetlania na stronie — mniejsza liczba oznacza wyżej',
    }),
    defineField({
      name: 'featured',
      title: 'Wyróżniona',
      type: 'boolean',
      description: 'Wyróżnione usługi pojawiają się na stronie głównej',
      initialValue: false,
    }),
  ],
})
