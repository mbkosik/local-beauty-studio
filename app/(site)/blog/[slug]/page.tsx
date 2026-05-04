import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/client'
import { sanityFetch } from '@/sanity/live'
import { postBySlugQuery, allPostsSlugsQuery, siteSettingsQuery } from '@/sanity/queries'
import { BlogPostLayout } from '@/components/blog/BlogPostLayout'
import { portableTextComponents } from '@/components/blog/PortableTextComponents'
import { estimateReadingTime } from '@/lib/readingTime'

export const revalidate = 3600

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(allPostsSlugsQuery)
  return slugs.filter((item) => item.slug != null).map((item) => ({ slug: item.slug as string }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const [{ data: post }, { data: settings }] = await Promise.all([
    sanityFetch({ query: postBySlugQuery, params: { slug } }),
    sanityFetch({ query: siteSettingsQuery }),
  ])

  if (!post) return {}

  const title = post.seo?.metaTitle ?? post.title ?? 'Blog'
  const description = post.seo?.metaDescription ?? post.excerpt ?? undefined
  const siteName = settings?.businessName ?? undefined

  return {
    title: siteName ? `${title} | ${siteName}` : title,
    description,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const { data: post } = await sanityFetch({ query: postBySlugQuery, params: { slug } })

  if (!post) notFound()

  const readingTime = estimateReadingTime(post.body ?? [])

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BlogPostLayout post={post} readingTime={readingTime}>
          <div className="text-foreground mx-auto max-w-3xl">
            {post.body && <PortableText value={post.body} components={portableTextComponents} />}
          </div>
        </BlogPostLayout>
      </div>
    </div>
  )
}
