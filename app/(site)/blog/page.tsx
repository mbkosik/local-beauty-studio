import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { blogListingQuery, blogCategoriesQuery, siteSettingsQuery } from '@/sanity/queries'
import { buildOgImageUrl } from '@/lib/metadata'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { PostCard } from '@/components/blog/PostCard'
import { CategoryFilter } from '@/components/blog/CategoryFilter'
import { BlogPagination } from '@/components/blog/BlogPagination'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(siteSettingsQuery, {}, { next: { tags: ['settings'] } })
  const ogImageUrl = buildOgImageUrl(settings?.seo?.ogImage)
  const siteName = settings?.businessName ?? 'Beauty Studio'
  const title = 'Blog'
  const description = `Porady, inspiracje i aktualności ze świata urody — ${siteName}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      ...(ogImageUrl && {
        images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
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

const POSTS_PER_PAGE = 9

interface BlogPageProps {
  searchParams: Promise<{ page?: string; category?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const page = Math.max(1, parseInt(params.page ?? '1', 10))
  const category = params.category ?? ''

  const from = (page - 1) * POSTS_PER_PAGE
  const to = page * POSTS_PER_PAGE

  const [listing, categories] = await Promise.all([
    client.fetch(blogListingQuery, { from, to, category }, { next: { tags: ['post'] } }),
    client.fetch(blogCategoriesQuery, {}, { next: { tags: ['post'] } }),
  ])

  const posts = listing?.posts ?? []
  const total = listing?.total ?? 0
  const totalPages = Math.ceil(total / POSTS_PER_PAGE)

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-10 text-center">
          {/* TODO: nagłówki bloga z cmsa ? */}
          <h1 className="font-heading text-foreground text-4xl font-bold tracking-tight md:text-5xl">
            Blog
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Porady, inspiracje i aktualności ze świata urody
          </p>
        </AnimatedSection>

        {categories && categories.length > 0 && (
          <AnimatedSection className="mb-8 flex justify-center" delay={0.1}>
            <CategoryFilter categories={categories} activeCategory={category || undefined} />
          </AnimatedSection>
        )}

        {posts.length === 0 ? (
          <AnimatedSection className="py-16 text-center" delay={0.2}>
            <p className="text-muted-foreground text-lg">Brak wpisów w tej kategorii.</p>
          </AnimatedSection>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {posts.map((post, index) => (
                <AnimatedSection key={post._id} delay={0.1 + index * 0.05}>
                  <PostCard post={post} />
                </AnimatedSection>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12">
                <BlogPagination
                  currentPage={page}
                  totalPages={totalPages}
                  category={category || undefined}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
