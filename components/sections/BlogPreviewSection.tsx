import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { PostCard } from '@/components/blog/PostCard'
import { getVariantProps } from '@/lib/color-variant'
import { cleanAnchor } from '@/lib/sanity-utils'
import type { BlogPreviewSectionData } from '@/sanity/custom-types'
import type { BlogPost } from '@/sanity/custom-types'

interface BlogPreviewSectionProps {
  data: BlogPreviewSectionData
}

export function BlogPreviewSection({ data }: BlogPreviewSectionProps) {
  const { anchor, heading, subheading, posts, showViewAll, colorVariant } = data
  const id = cleanAnchor(anchor)

  if (!posts || posts.length === 0) return null

  // Normalize posts from pageQuery shape (slug object, unresolved asset, no category slugs)
  // to the BlogPost shape that PostCard expects (slug string, compatible image, category slugs)
  const normalizedPosts = posts.map((p) => ({
    ...p,
    slug: p.slug?.current ?? null,
    categories: (p.categories ?? []).map((c) => ({ title: c.title, slug: null })),
  })) as unknown as BlogPost[]

  return (
    <section id={id} {...getVariantProps(colorVariant)}>
      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{heading}</h2>
            {subheading && <p className="text-muted-foreground mt-4 text-lg">{subheading}</p>}
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {normalizedPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>

          {showViewAll && (
            <div className="mt-12 flex justify-center">
              <Button variant="outline" asChild>
                <Link href="/blog">Zobacz wszystkie wpisy</Link>
              </Button>
            </div>
          )}
        </div>
      </AnimatedSection>
    </section>
  )
}
