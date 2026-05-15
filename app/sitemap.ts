import type { MetadataRoute } from 'next'
import { client } from '@/sanity/client'
import { allPagesSlugsQuery, allPostsSlugsQuery } from '@/sanity/queries'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL!

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, posts] = await Promise.all([
    client.fetch(allPagesSlugsQuery),
    client.fetch(allPostsSlugsQuery),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]

  const pageRoutes: MetadataRoute.Sitemap = (pages ?? [])
    .filter((p: { slug: string | null }) => p.slug)
    .map((p: { slug: string | null }) => ({
      url: `${BASE_URL}/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  const postRoutes: MetadataRoute.Sitemap = (posts ?? [])
    .filter((p: { slug: string | null }) => p.slug)
    .map((p: { slug: string | null }) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  return [...staticRoutes, ...pageRoutes, ...postRoutes]
}
