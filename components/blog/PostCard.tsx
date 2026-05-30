import Link from 'next/link'
import dayjs from 'dayjs'
import 'dayjs/locale/pl'
import { stegaClean } from '@sanity/client/stega'
import { SanityImage, type SanityImageData } from '@/components/shared/SanityImage'
import type { BlogPost } from '@/sanity/custom-types'
import { DATE_FORMAT_POST } from '@/config/date-formats'

interface PostCardProps {
  post: BlogPost
}

export function PostCard({ post }: PostCardProps) {
  const { title, slug, excerpt, mainImage, publishedAt, categories } = post

  const formattedDate = publishedAt
    ? dayjs(publishedAt).locale('pl').format(DATE_FORMAT_POST)
    : null

  return (
    <Link
      href={`/blog/${stegaClean(slug) ?? slug}`}
      className="group border-border bg-card focus-visible:ring-ring flex flex-col overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus-visible:ring-2 focus-visible:outline-none"
    >
      <div className="bg-muted relative aspect-video overflow-hidden">
        {mainImage ? (
          <SanityImage
            image={mainImage as SanityImageData}
            alt={title ?? ''}
            width={640}
            height={360}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="bg-muted absolute inset-0" aria-hidden="true" />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) =>
              cat.slug ? (
                <span
                  key={cat.slug}
                  className="bg-brand/10 text-brand inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
                >
                  {cat.title}
                </span>
              ) : null
            )}
          </div>
        )}

        <h3 className="text-card-foreground group-hover:text-brand text-lg leading-snug font-semibold transition-colors duration-200">
          {title}
        </h3>

        {excerpt && <p className="text-muted-foreground line-clamp-2 text-sm">{excerpt}</p>}

        {formattedDate && (
          <time
            dateTime={publishedAt ?? undefined}
            className="text-muted-foreground mt-auto pt-2 text-xs"
          >
            {formattedDate}
          </time>
        )}
      </div>
    </Link>
  )
}
