/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool, defineLocations } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { media } from 'sanity-plugin-media'
import { lucideIconPicker } from 'sanity-plugin-lucide-icon-picker'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemas'
import { structure } from './sanity/structure'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const previewSecret = process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET || ''

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        origin: siteUrl,
        previewMode: {
          enable: `/api/draft/enable?secret=${previewSecret}`,
        },
      },
      resolve: {
        locations: {
          page: defineLocations({
            select: { title: 'title', slug: 'slug.current' },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title ?? 'Untitled',
                  href: doc?.slug === 'home' ? '/' : `/${doc?.slug ?? ''}`,
                },
              ],
            }),
          }),
          post: defineLocations({
            select: { title: 'title', slug: 'slug.current' },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title ?? 'Untitled',
                  href: `/blog/${doc?.slug ?? ''}`,
                },
              ],
            }),
          }),
        },
      },
    }),
    ...(process.env.NODE_ENV === 'development'
      ? [visionTool({ defaultApiVersion: apiVersion })]
      : []),
    media(),
    lucideIconPicker(),
  ],
  releases: { limit: 0 },
})
