import { defineField, defineType } from 'sanity'

export const sectionEmbed = defineType({
  name: 'sectionEmbed',
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
  ],
  preview: {
    prepare() {
      return { title: 'Własny skrypt' }
    },
  },
})
