import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/live'
import { pageQuery } from '@/sanity/queries'
import { PageBuilder } from '@/components/sections/PageBuilder'

export default async function HomePage() {
  const { data: page } = await sanityFetch({ query: pageQuery, params: { slug: 'home' } })

  if (!page) {
    notFound()
  }

  return <PageBuilder blocks={page.pageBuilder ?? []} />
}
