import { defineField, defineType } from 'sanity'
import { colorVariantField } from '../fields/colorVariantField'

export const sectionEmbed = defineType({
  name: 'sectionEmbed',
  title: 'Sekcja: Własny skrypt',
  type: 'object',
  fields: [
    defineField({
      name: 'embedCode',
      title: 'Kod HTML / skrypt',
      description:
        '⚠️ Wklejaj wyłącznie kod z zaufanych źródeł. Kod jest renderowany bez filtrowania i może wpłynąć na działanie strony.',
      type: 'text',
      validation: (Rule) => Rule.required(),
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
  preview: {
    prepare() {
      return { title: 'Własny skrypt' }
    },
  },
})
