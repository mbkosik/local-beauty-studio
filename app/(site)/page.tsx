import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { pageQuery, siteSettingsQuery } from '@/sanity/queries'
import { PageBuilder } from '@/components/sections/PageBuilder'
import { buildOgImageUrl } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    client.fetch(pageQuery, { slug: 'home' }, { next: { tags: ['page'] } }),
    client.fetch(siteSettingsQuery, {}, { next: { tags: ['settings'] } }),
  ])

  const siteName = settings?.businessName ?? 'Beauty Studio'
  const title = page?.seo?.metaTitle ?? settings?.seo?.metaTitle ?? siteName
  const description = page?.seo?.metaDescription ?? settings?.seo?.metaDescription ?? undefined
  const ogImageUrl = buildOgImageUrl(page?.seo?.ogImage) ?? buildOgImageUrl(settings?.seo?.ogImage)

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      ...(ogImageUrl && {
        images: [{ url: ogImageUrl, width: 1200, height: 630, alt: siteName }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
  }
}

export default async function HomePage() {
  const page = await client.fetch(pageQuery, { slug: 'home' }, { next: { tags: ['page'] } })

  if (!page) {
    notFound()
  }

  return <PageBuilder blocks={page.pageBuilder ?? []} />
}
