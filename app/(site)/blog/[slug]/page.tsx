import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/client'
import { sanityFetch } from '@/sanity/live'
import {
  postBySlugQuery,
  allPostsSlugsQuery,
  siteSettingsQuery,
  relatedPostsQuery,
  latestPostsQuery,
} from '@/sanity/queries'
import { BlogPostLayout } from '@/components/blog/BlogPostLayout'
import { portableTextComponents } from '@/components/blog/PortableTextComponents'
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

  return (
    <div className="py-16 md:py-24">
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
  )
}
