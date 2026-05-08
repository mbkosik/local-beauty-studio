import { notFound } from 'next/navigation'
import { client } from '@/sanity/client'
import { pageQuery } from '@/sanity/queries'
import { PageBuilder } from '@/components/sections/PageBuilder'

export default async function HomePage() {
  const page = await client.fetch(pageQuery, { slug: 'home' }, { next: { tags: ['page'] } })

  if (!page) {
    notFound()
  }

  return <PageBuilder blocks={page.pageBuilder ?? []} />
}
