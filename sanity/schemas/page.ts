import { defineField, defineType } from 'sanity'

export const page = defineType({
  name: 'page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) =>
        Rule.required().custom(async (slug, context) => {
          if (!slug?.current) return true
          const client = context.getClient({ apiVersion: '2024-01-01' })
          const count = await client.fetch<number>(
            `count(*[_type == "page" && slug.current == $slug && _id != $id])`,
            { slug: slug.current, id: context.document?._id ?? '' }
          )
          return count === 0 || 'Ten slug jest już zajęty'
        }),
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      of: [
        { type: 'sectionHero' },
        { type: 'sectionTextImage' },
        { type: 'sectionServices' },
        { type: 'sectionPricing' },
        { type: 'sectionTestimonials' },
        { type: 'sectionStats' },
        { type: 'sectionGallery' },
        { type: 'sectionBlogPreview' },
        { type: 'sectionCta' },
        { type: 'sectionContact' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          type: 'string',
        }),
        defineField({
          name: 'metaDescription',
          type: 'text',
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: 'ogImage',
          type: 'image',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
})
