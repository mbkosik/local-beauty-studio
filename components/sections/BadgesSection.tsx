import { SectionBadges } from '@/sanity.types'
import { SanityImage, SanityImageData } from '@/components/shared/SanityImage'
import { getVariantProps } from '@/lib/color-variant'

interface BadgesSectionProps {
  id?: string
  data: SectionBadges
}

export function BadgesSection({ id, data }: BadgesSectionProps) {
  const { label, badges, colorVariant } = data

  if (!badges?.length) return null

  const visibleBadges = badges.slice(0, 6)

  return (
    <section id={id} className="border-border/50 border-y py-8" {...getVariantProps(colorVariant)}>
      <div className="container mx-auto px-4">
        {label && (
          <p className="text-muted-foreground mb-6 text-center text-sm font-medium tracking-wider uppercase">
            {label}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {visibleBadges.map((badge, index) => (
            <div key={badge._key ?? index} className="flex flex-col items-center gap-2">
              {badge.url ? (
                <a
                  href={badge.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={badge.alt || badge.label || 'Odznaka'}
                  className="opacity-60 grayscale transition-opacity duration-300 hover:opacity-100 hover:grayscale-0"
                >
                  <SanityImage
                    image={badge.logo as SanityImageData}
                    alt={badge.alt ?? ''}
                    width={120}
                    height={48}
                    className="h-10 w-auto object-contain"
                  />
                </a>
              ) : (
                <div className="opacity-60 grayscale">
                  <SanityImage
                    image={badge.logo as SanityImageData}
                    alt={badge.alt ?? ''}
                    width={120}
                    height={48}
                    className="h-10 w-auto object-contain"
                  />
                </div>
              )}
              {badge.label && <span className="text-muted-foreground text-xs">{badge.label}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
