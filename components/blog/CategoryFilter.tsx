import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { BlogCategory } from '@/sanity/custom-types'

interface CategoryFilterProps {
  categories: BlogCategory[]
  activeCategory?: string
}

export function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  const allActive = !activeCategory

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtruj po kategorii">
      <Link
        href="/blog"
        className={cn(
          'focus-visible:ring-ring inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none',
          allActive
            ? 'border-brand bg-brand text-brand-foreground hover:bg-brand-hover'
            : 'border-border bg-background text-foreground hover:bg-accent'
        )}
        aria-current={allActive ? 'true' : undefined}
      >
        Wszystkie
      </Link>

      {categories.map((cat) => {
        if (!cat.slug) return null
        const isActive = activeCategory === cat.slug
        return (
          <Link
            key={cat._id}
            href={`/blog?category=${cat.slug}`}
            className={cn(
              'focus-visible:ring-ring inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none',
              isActive
                ? 'border-brand bg-brand text-brand-foreground hover:bg-brand-hover'
                : 'border-border bg-background text-foreground hover:bg-accent'
            )}
            aria-current={isActive ? 'true' : undefined}
          >
            {cat.title}
          </Link>
        )
      })}
    </div>
  )
}
