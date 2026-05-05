import { defineField, defineType } from 'sanity'

export const pricingItem = defineType({
  name: 'pricingItem',
  title: 'Pozycja cennika',
  type: 'document',
  preview: {
    select: { title: 'name', subtitle: 'price' },
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Nazwa usługi',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Cena',
      type: 'string',
      description: 'Dowolny format, np. "120 zł", "120–240 zł"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Czas trwania (minuty)',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
      rows: 2,
    }),
  ],
})
