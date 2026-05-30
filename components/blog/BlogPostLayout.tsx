import dayjs from 'dayjs'
import 'dayjs/locale/pl'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import { stegaClean } from '@sanity/client/stega'
import { SanityImage, type SanityImageData } from '@/components/shared/SanityImage'
import type { SinglePost } from '@/sanity/custom-types'
import { DATE_FORMAT_POST } from '@/config/date-formats'
import { ShareButtons } from '@/components/blog/ShareButtons'

interface BlogPostLayoutProps {
  post: SinglePost
  readingTime: number
  children: React.ReactNode
}

export function BlogPostLayout({ post, readingTime, children }: BlogPostLayoutProps) {
  const { title, mainImage, publishedAt, categories, author } = post

  const formattedDate = publishedAt
    ? dayjs(publishedAt).locale('pl').format(DATE_FORMAT_POST)
    : null

  return (
    <article>
      <header className="mb-4">
        {categories && categories.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {categories.map((cat) => {
              const catSlug = stegaClean(cat.slug?.current)
              return catSlug ? (
                <Link
                  key={catSlug}
                  href={`/blog?category=${catSlug}`}
                  className="bg-brand/10 text-brand hover:bg-brand/20 inline-block rounded-full px-3 py-1 text-sm font-medium transition-colors"
                >
                  {cat.title}
                </Link>
              ) : null
            })}
          </div>
        )}

        <h1 className="font-heading text-foreground mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          {title}
        </h1>

        {post.excerpt && (
          <p className="text-muted-foreground mb-6 text-xl leading-relaxed">{post.excerpt}</p>
        )}

        <div className="border-border flex items-center gap-3 border-b pb-8">
          {author?.photo && (
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <SanityImage
                image={author.photo as SanityImageData}
                alt={author.name ?? ''}
                width={80}
                height={80}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            {author?.name && <p className="text-foreground text-sm font-medium">{author.name}</p>}
            <div className="text-muted-foreground flex items-center gap-3 text-sm">
              {formattedDate && <time dateTime={publishedAt ?? undefined}>{formattedDate}</time>}
              {formattedDate && (
                <span aria-hidden="true" className="text-border">
                  ·
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock size={14} aria-hidden="true" />
                {readingTime} min czytania
              </span>
            </div>
          </div>
        </div>

        <div className="my-4">
          <ShareButtons
            title={post.title ?? ''}
            slug={stegaClean(post.slug?.current) ?? ''}
            excerpt={post.excerpt ?? undefined}
          />
        </div>

        {mainImage && (
          <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl">
            <SanityImage
              image={mainImage as SanityImageData}
              alt={title ?? ''}
              width={1200}
              height={675}
              fill
              preload
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        )}
      </header>

      {children}
    </article>
  )
}
