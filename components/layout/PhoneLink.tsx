'use client'

import { Phone } from 'lucide-react'
import { trackEvent } from '@/lib/gtm'

interface PhoneLinkProps {
  phone: string
}

export function PhoneLink({ phone }: PhoneLinkProps) {
  return (
    <a
      href={`tel:${phone.replace(/\s/g, '')}`}
      className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
      onClick={() => trackEvent('phone_click')}
    >
      <Phone size={15} aria-hidden="true" />
      {phone}
    </a>
  )
}
