import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { client, getClient } from '@/sanity/client'
import { pageQuery, siteSettingsQuery } from '@/sanity/queries'
import { PageBuilder } from '@/components/sections/PageBuilder'
import { JsonLd } from '@/components/shared/JsonLd'
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
  const { isEnabled: isDraftMode } = await draftMode()
  const sanityClient = getClient(isDraftMode)

  const [page, settings] = await Promise.all([
    sanityClient.fetch(pageQuery, { slug: 'home' }, { next: { tags: ['page'] } }),
    sanityClient.fetch(siteSettingsQuery, {}, { next: { tags: ['settings'] } }),
  ])

  if (!page) {
    notFound()
  }

  const localBusinessData = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: settings?.businessName,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    telephone: settings?.phone ?? undefined,
    email: settings?.email ?? undefined,
    address: settings?.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: settings.address,
        }
      : undefined,
    openingHoursSpecification: undefined,
  }

  return (
    <>
      <JsonLd data={localBusinessData} />
      <PageBuilder blocks={page.pageBuilder ?? []} />
    </>
  )
}
