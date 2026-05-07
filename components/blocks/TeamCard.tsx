'use client'

import { useState, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { SanityImage, type SanityImageData } from '@/components/shared/SanityImage'
import { InstagramIcon } from '@/components/icons/InstagramIcon'
import { FacebookIcon } from '@/components/icons/FacebookIcon'
import { LinkedInIcon } from '@/components/icons/LinkedInIcon'
import { cn } from '@/lib/utils'
import type { TeamSectionData } from '@/sanity/custom-types'

export type TeamMember = NonNullable<TeamSectionData['members']>[number]

interface TeamCardProps {
  member: TeamMember
}

export function TeamCard({ member }: TeamCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const isTouchRef = useRef(false)
  const prefersReducedMotion = useReducedMotion()

  const { name, role, bio, photo, socialMedia } = member

  const handleTouchStart = () => {
    isTouchRef.current = true
  }

  const handleMouseEnter = () => {
    if (!isTouchRef.current) setIsFlipped(true)
  }

  const handleMouseLeave = () => {
    if (!isTouchRef.current) setIsFlipped(false)
  }

  const handleClick = () => {
    setIsFlipped((prev) => !prev)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsFlipped((prev) => !prev)
    }
  }

  return (
    <div
      style={{ perspective: '1000px' }}
      className="h-80 cursor-pointer"
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}
      aria-label={`Poznaj ${name ?? ''}`}
      onTouchStart={handleTouchStart}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div
        className={cn(
          'relative h-full w-full',
          'transform-3d',
          prefersReducedMotion
            ? 'transition-opacity duration-300'
            : 'transition-transform duration-500',
          !prefersReducedMotion && isFlipped && 'transform-[rotateY(180deg)]'
        )}
      >
        {/* FRONT */}
        <div
          className={cn(
            'absolute inset-0 overflow-hidden rounded-xl backface-hidden',
            prefersReducedMotion && 'transition-opacity duration-300',
            prefersReducedMotion && isFlipped && 'opacity-0'
          )}
        >
          {photo && (
            <SanityImage
              image={photo as SanityImageData}
              alt={name ?? ''}
              width={400}
              height={320}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute right-0 bottom-0 left-0 p-4 text-white">
            <p className="font-heading text-lg leading-tight font-semibold">{name}</p>
            <p className="text-sm text-white/80">{role}</p>
          </div>
        </div>

        {/* BACK */}
        <div
          className={cn(
            'bg-card absolute inset-0 flex flex-col items-center justify-center rounded-xl p-6 text-center',
            prefersReducedMotion
              ? 'transition-opacity duration-300'
              : 'transform-[rotateY(180deg)] backface-hidden',
            prefersReducedMotion && (isFlipped ? 'opacity-100' : 'opacity-0')
          )}
        >
          <p className="font-heading text-foreground text-lg font-semibold">{name}</p>
          <p className="text-brand mb-3 text-sm font-medium">{role}</p>
          {bio && <p className="text-muted-foreground mb-4 line-clamp-4 text-sm">{bio}</p>}

          {socialMedia && (
            <div className="flex items-center gap-3">
              {socialMedia.instagram && (
                <a
                  href={socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={`${name} na Instagramie`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <InstagramIcon size={18} />
                </a>
              )}
              {socialMedia.facebook && (
                <a
                  href={socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={`${name} na Facebooku`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FacebookIcon size={18} />
                </a>
              )}
              {socialMedia.linkedin && (
                <a
                  href={socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={`${name} na LinkedIn`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <LinkedInIcon size={18} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
