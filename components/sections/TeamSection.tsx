import { TeamCard } from '@/components/blocks/TeamCard'
import { getVariantProps } from '@/lib/color-variant'
import type { TeamSectionData } from '@/sanity/custom-types'

interface TeamSectionProps {
  data: TeamSectionData
}

export function TeamSection({ data }: TeamSectionProps) {
  const { anchor, title, subtitle, members, colorVariant } = data
  const id = anchor?.current ?? undefined

  if (!members || members.length === 0) return null

  return (
    <section id={id} className="py-16 md:py-24" {...getVariantProps(colorVariant)}>
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-foreground text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">{subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {members.map((member) => (
            <TeamCard key={member._id} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}
