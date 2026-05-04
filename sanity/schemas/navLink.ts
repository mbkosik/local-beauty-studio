import { defineField, defineType } from 'sanity'

export const navLink = defineType({
  name: 'navLink',
  title: 'Link nawigacji',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Etykieta',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return true
          if (
            value.startsWith('/') ||
            value.startsWith('#') ||
            value.startsWith('http://') ||
            value.startsWith('https://')
          ) {
            return true
          }
          return 'Link musi zaczynać się od /, #, http:// lub https://'
        }),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Otwórz w nowej karcie',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'href' },
  },
})
