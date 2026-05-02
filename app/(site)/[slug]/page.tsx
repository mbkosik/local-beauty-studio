import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/live'
import { pageQuery, latestPostsQuery, allPagesSlugsQuery } from '@/sanity/queries'
import { PageBuilder } from '@/components/sections/PageBuilder'

export const revalidate = 3600

export async function generateStaticParams() {
  const { data: pages } = await sanityFetch({ query: allPagesSlugsQuery })
  return (pages ?? []).map((page: { slug: string | null }) => ({ slug: page.slug ?? '' }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { data: page } = await sanityFetch({ query: pageQuery, params: { slug } })

  if (!page) return {}

  return {
    title: page.seo?.metaTitle ?? page.title ?? undefined,
    description: page.seo?.metaDescription ?? undefined,
  }
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data: page } = await sanityFetch({ query: pageQuery, params: { slug } })

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
