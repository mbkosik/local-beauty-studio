import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { client, getClient } from '@/sanity/client'
import { pageQuery, allPagesSlugsQuery, siteSettingsQuery } from '@/sanity/queries'
import { PageBuilder } from '@/components/sections/PageBuilder'
import { buildOgImageUrl } from '@/lib/metadata'

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
  const [page, settings] = await Promise.all([
    client.fetch(pageQuery, { slug }, { next: { tags: ['page'] } }),
    client.fetch(siteSettingsQuery, {}, { next: { tags: ['settings'] } }),
  ])

  if (!page) return {}

  const ogImageUrl = buildOgImageUrl(page.seo?.ogImage) ?? buildOgImageUrl(settings?.seo?.ogImage)

  return {
    title: page.seo?.metaTitle ?? page.title ?? undefined,
    description: page.seo?.metaDescription ?? undefined,
    openGraph: {
      title: page.seo?.metaTitle ?? page.title ?? undefined,
      description: page.seo?.metaDescription ?? undefined,
      type: 'website',
      ...(ogImageUrl && {
        images: [{ url: ogImageUrl, width: 1200, height: 630, alt: page.title ?? '' }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: page.seo?.metaTitle ?? page.title ?? undefined,
      description: page.seo?.metaDescription ?? undefined,
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
  }
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { isEnabled: isDraftMode } = await draftMode()
  const sanityClient = getClient(isDraftMode)
  const page = await sanityClient.fetch(pageQuery, { slug }, { next: { tags: ['page'] } })

  if (!page) {
    notFound()
  }

  return <PageBuilder blocks={page.pageBuilder ?? []} />
}
