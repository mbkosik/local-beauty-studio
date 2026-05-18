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
        Rule.custom(async (slug, context) => {
          if (!slug?.current) return true

          const { document, getClient } = context
          const client = getClient({ apiVersion: '2024-01-01' })

          const id = document?._id ?? ''
          // Usuń prefix "drafts." żeby dostać base ID
          const baseId = id.replace(/^drafts\./, '')

          const query = `*[
      _type == "page" &&
      slug.current == $slug &&
      _id != $id &&
      _id != $draftId
    ][0]._id`

          const existing = await client.fetch(query, {
            slug: slug.current,
            id: baseId,
            draftId: `drafts.${baseId}`,
          })

          return existing ? 'Ten slug jest już zajęty.' : true
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
        { type: 'sectionTeam' },
        { type: 'sectionFaq' },
        { type: 'sectionProcess' },
        { type: 'sectionBadges' },
        { type: 'sectionTextVideo' },
        { type: 'sectionRichText' },
        { type: 'sectionForm' },
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
