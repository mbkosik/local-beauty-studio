import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { pageQuery, allPagesSlugsQuery } from '@/sanity/queries'
import { PageBuilder } from '@/components/sections/PageBuilder'

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
  const page = await client.fetch(pageQuery, { slug }, { next: { tags: ['page'] } })

  if (!page) return {}

  return {
    title: page.seo?.metaTitle ?? page.title ?? undefined,
    description: page.seo?.metaDescription ?? undefined,
  }
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await client.fetch(pageQuery, { slug }, { next: { tags: ['page'] } })

  if (!page) {
    notFound()
  }

  return <PageBuilder blocks={page.pageBuilder ?? []} />
}
