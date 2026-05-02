import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/live'
import { pageQuery, latestPostsQuery } from '@/sanity/queries'
import { PageBuilder } from '@/components/sections/PageBuilder'

export const revalidate = 3600

export default async function HomePage() {
  const { data: page } = await sanityFetch({ query: pageQuery, params: { slug: 'home' } })

  if (!page) {
    notFound()
  }

  const hasBlogPreview =
    page.pageBuilder?.some((block) => block._type === 'sectionBlogPreview') ?? false

  const latestPosts = hasBlogPreview
    ? (await sanityFetch({ query: latestPostsQuery, params: { limit: 3 } })).data
    : null

  return <PageBuilder blocks={page.pageBuilder ?? []} extraData={{ latestPosts }} />
}
