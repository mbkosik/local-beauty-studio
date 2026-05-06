import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { StatCard } from '@/components/blocks/StatCard'
import type { SectionStats } from '@/sanity.types'

interface StatsSectionProps {
  data: SectionStats
  id?: string
}

export function StatsSection({ data, id }: StatsSectionProps) {
  const { heading, items } = data

  return (
    <AnimatedSection as="section" id={id} className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {heading && (
          <h2 className="font-heading mb-12 text-center text-3xl font-bold md:text-4xl">
            {heading}
          </h2>
        )}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items?.map((item) => (
            <StatCard key={item._key} value={item.value ?? '0'} label={item.label ?? ''} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
