import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/live'
import { client } from '@/sanity/client'
import { pageQuery, allPagesSlugsQuery } from '@/sanity/queries'
import { PageBuilder } from '@/components/sections/PageBuilder'

export const revalidate = 3600

export async function generateStaticParams() {
  const pages = await client.fetch(allPagesSlugsQuery)
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

  return <PageBuilder blocks={page.pageBuilder ?? []} />
}
