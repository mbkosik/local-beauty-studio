import { defineArrayMember, defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  orderings: [
    {
      title: 'Data publikacji (najnowsze)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Zajawka',
      type: 'text',
      description: 'Krótki opis posta wyświetlany na listingu i w kartach (max 200 znaków)',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'mainImage',
      title: 'Zdjęcie główne',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Tekst alternatywny',
          type: 'string',
          description: 'Opis zdjęcia dla czytników ekranu i SEO',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Treść',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            decorators: [
              { title: 'Pogrubienie', value: 'strong' },
              { title: 'Kursywa', value: 'em' },
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (Rule) => Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
                  }),
                  defineField({
                    name: 'blank',
                    title: 'Otwórz w nowej karcie',
                    type: 'boolean',
                    initialValue: false,
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Tekst alternatywny',
              type: 'string',
              description: 'Opis zdjęcia dla czytników ekranu i SEO',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{ type: 'person' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Kategorie',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'category' }] })],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data publikacji',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Wyróżniony',
      type: 'boolean',
      description: 'Wyróżnione posty pojawiają się w sekcji na stronie głównej',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta tytuł',
          type: 'string',
          description: 'Tytuł posta w wynikach wyszukiwania (max 60 znaków)',
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta opis',
          type: 'text',
          description: 'Opis posta w wynikach wyszukiwania (max 160 znaków)',
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: 'ogImage',
          title: 'Obrazek Open Graph',
          type: 'image',
          description: 'Obrazek wyświetlany przy udostępnianiu w mediach społecznościowych',
          options: { hotspot: true },
        }),
      ],
    }),
  ],
})
