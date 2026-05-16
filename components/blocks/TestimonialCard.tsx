import { Star } from 'lucide-react'
import { SanityImage } from '@/components/shared/SanityImage'
import type { TestimonialsSectionData } from '@/sanity/custom-types'

export type TestimonialItem = NonNullable<TestimonialsSectionData['testimonials']>[number]

interface TestimonialCardProps {
  testimonial: TestimonialItem
}

function getInitials(name: string | null): string {
  if (!name) return '?'
  return name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

function StarRating({ rating }: { rating: number | null }) {
  return (
    <div role="img" className="flex gap-0.5" aria-label={`Ocena: ${rating ?? 0} na 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={16}
          aria-hidden="true"
          className={i < (rating ?? 0) ? 'fill-primary text-primary' : 'text-muted-foreground'}
        />
      ))}
    </div>
  )
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { authorName, position, company, content, rating, photo } = testimonial

  const byline = position && company ? `${position} · ${company}` : (position ?? company ?? null)

  return (
    <div className="bg-card border-border flex h-full flex-col gap-4 rounded-xl border p-6 shadow-sm">
      <StarRating rating={rating} />

      {content && <p className="text-muted-foreground flex-1 italic">&ldquo;{content}&rdquo;</p>}

      <div className="flex items-center gap-3">
        {photo?.asset ? (
          <div className="relative size-12 shrink-0 overflow-hidden rounded-full">
            <SanityImage
              image={photo}
              alt={authorName ?? ''}
              width={48}
              height={48}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="bg-primary/20 text-primary flex size-12 shrink-0 items-center justify-center rounded-full font-semibold">
            {getInitials(authorName)}
          </div>
        )}

        <div>
          {authorName && <p className="font-semibold">{authorName}</p>}
          {byline && <p className="text-muted-foreground text-sm">{byline}</p>}
        </div>
      </div>
    </div>
  )
}
