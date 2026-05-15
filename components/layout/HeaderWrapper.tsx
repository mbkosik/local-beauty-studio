'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { SanityImage, type SanityImageData } from '@/components/shared/SanityImage'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { useScrolled } from '@/hooks/use-scrolled'
import type { NavLink } from '@/sanity/custom-types'

interface HeaderWrapperProps {
  businessName: string | null
  logoLight: SanityImageData | null
  logoDark: SanityImageData | null
  navLinks: NavLink[]
}

export function HeaderWrapper({ businessName, logoLight, logoDark, navLinks }: HeaderWrapperProps) {
  const scrolled = useScrolled()
  const pathname = usePathname()

  const hasLogos = Boolean(logoLight?.asset && logoDark?.asset)

  return (
    <header
      role="banner"
      className={cn(
        'bg-background/80 sticky top-0 z-50 backdrop-blur-md transition-[border-color,box-shadow]',
        scrolled && 'border-border/50 border-b shadow-sm'
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex shrink-0 items-center">
          {hasLogos ? (
            <>
              <SanityImage
                image={logoLight}
                alt={businessName ?? 'Logo'}
                width={160}
                height={40}
                loading="eager"
                fetchPriority="high"
                className="block dark:hidden"
              />
              <SanityImage
                image={logoDark}
                alt={businessName ?? 'Logo'}
                width={160}
                height={40}
                loading="eager"
                fetchPriority="high"
                className="hidden dark:block"
              />
            </>
          ) : (
            <span className="font-heading text-foreground text-xl font-semibold">
              {businessName ?? ''}
            </span>
          )}
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Główna nawigacja">
          {navLinks.map((link) => (
            <Link
              key={link.href ?? link.label}
              href={link.href ?? '#'}
              target={link.openInNewTab ? '_blank' : undefined}
              rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
              aria-current={pathname === link.href ? 'page' : undefined}
              className={cn(
                'hover:text-foreground text-sm transition-colors',
                pathname === link.href ? 'text-foreground font-semibold' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <MobileMenu navLinks={navLinks} />
        </div>
      </div>
    </header>
  )
}
