'use client'

import { type ComponentPropsWithoutRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { trackEvent } from '@/lib/gtm'

interface CtaButtonProps extends Omit<
  ComponentPropsWithoutRef<typeof Button>,
  'asChild' | 'children'
> {
  href: string
  label: string
  section: string
}

export function CtaButton({ href, label, section, ...buttonProps }: CtaButtonProps) {
  const isExternal = href.startsWith('http')
  const handleClick = () => trackEvent('cta_click', { label, section })

  return (
    <Button asChild {...buttonProps}>
      {isExternal ? (
        <a href={href} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
          {label}
        </a>
      ) : (
        <Link href={href} onClick={handleClick}>
          {label}
        </Link>
      )}
    </Button>
  )
}
