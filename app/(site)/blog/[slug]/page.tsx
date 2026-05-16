import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/client'
import {
  postBySlugQuery,
  allPostsSlugsQuery,
  siteSettingsQuery,
  relatedPostsQuery,
  latestPostsQuery,
} from '@/sanity/queries'
import { buildOgImageUrl } from '@/lib/metadata'
import { JsonLd } from '@/components/shared/JsonLd'
import { BlogPostLayout } from '@/components/blog/BlogPostLayout'
import { portableTextComponents } from '@/components/shared/portableTextComponents'
import { PostCard } from '@/components/blog/PostCard'
import { PostCta } from '@/components/blog/PostCta'
import { estimateReadingTime } from '@/lib/readingTime'
import type { BlogPost } from '@/sanity/custom-types'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(allPostsSlugsQuery)
  return slugs.filter((item) => item.slug != null).map((item) => ({ slug: item.slug as string }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const [post, settings] = await Promise.all([
    client.fetch(postBySlugQuery, { slug }, { next: { tags: ['post'] } }),
    client.fetch(siteSettingsQuery, {}, { next: { tags: ['settings'] } }),
  ])

  if (!post) return {}

  const description = post.seo?.metaDescription ?? post.excerpt ?? undefined
  const ogImageUrl = buildOgImageUrl(post.seo?.ogImage) ?? buildOgImageUrl(settings?.seo?.ogImage)

  return {
    title: post.seo?.metaTitle ?? post.title ?? 'Blog',
    description,
    openGraph: {
      title: post.seo?.metaTitle ?? post.title ?? undefined,
      description,
      type: 'article',
      publishedTime: post.publishedAt ?? undefined,
      ...(ogImageUrl && {
        images: [{ url: ogImageUrl, width: 1200, height: 630, alt: post.title ?? '' }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo?.metaTitle ?? post.title ?? undefined,
      description,
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const [post, settings] = await Promise.all([
    client.fetch(postBySlugQuery, { slug }, { next: { tags: ['post'] } }),
    client.fetch(siteSettingsQuery, {}, { next: { tags: ['settings'] } }),
  ])

  if (!post) notFound()

  const readingTime = estimateReadingTime(post.body ?? [])

  const categoryIds = post.categories?.map((c) => c._id) ?? []
  const related = await client.fetch(relatedPostsQuery, { slug, categoryIds })

  const relatedPosts: BlogPost[] = (related ?? []).map((p) => p as unknown as BlogPost)

  if (relatedPosts.length < 2) {
    const excludeSlugs = [
      slug,
      ...relatedPosts.map((p) => p.slug).filter((s): s is string => s !== null),
    ]
    const fallback = await client.fetch(latestPostsQuery, {
      limit: 2 - relatedPosts.length,
      excludeSlugs,
    })
    for (const p of fallback ?? []) {
      relatedPosts.push(p as unknown as BlogPost)
    }
  }

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL!

  const blogPostingData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt ?? undefined,
    datePublished: post.publishedAt ?? undefined,
    author: post.author?.name
      ? {
          '@type': 'Person',
          name: post.author.name,
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: settings?.businessName ?? 'Beauty Studio',
    },
    url: `${BASE_URL}/blog/${slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${slug}`,
    },
    image: post.mainImage?.asset?.url ?? undefined,
  }

  return (
    <>
      <JsonLd data={blogPostingData} />
      <div className="py-8 md:py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BlogPostLayout post={post} readingTime={readingTime}>
            <div className="text-foreground mx-auto max-w-3xl">
              {post.body && <PortableText value={post.body} components={portableTextComponents} />}
              {post.cta?.buttonLabel && <PostCta cta={post.cta} />}
            </div>
          </BlogPostLayout>

          {relatedPosts.length > 0 && (
            <section className="border-border mt-16 border-t pt-12">
              <h2 className="font-heading text-foreground mb-8 text-2xl font-bold">
                Powiązane artykuły
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {relatedPosts.map((relatedPost) => (
                  <PostCard key={relatedPost._id} post={relatedPost} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  )
}
