'use client'

import { useState } from 'react'
import { Share2, Link, Check } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { FacebookIcon } from '@/components/icons/FacebookIcon'
import { XIcon } from '@/components/icons/XIcon'

const COPY_DURATION_MS = 4000

interface ShareButtonsProps {
  title: string
  slug: string
  excerpt?: string
}

export function ShareButtons({ title, slug, excerpt }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`

  async function handleNativeShare() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url, text: excerpt })
      } catch {
        // user cancelled or share failed — silent
      }
    }
  }

  async function handleCopyLink() {
    await navigator.clipboard.writeText(url)
    toast.success('Link skopiowany!', { duration: COPY_DURATION_MS })
    setCopied(true)
    setTimeout(() => setCopied(false), COPY_DURATION_MS)
  }

  function openPopup(shareUrl: string) {
    window.open(shareUrl, '_blank', 'width=600,height=400,noopener,noreferrer')
  }

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-muted-foreground text-sm font-medium">Udostępnij:</span>

      {/* Mobile native share — rendered but hidden via CSS when share API unavailable,
          actual availability checked in handler to avoid SSR mismatch */}
      <Button
        variant="outline"
        size="sm"
        className="gap-2 md:hidden"
        onClick={handleNativeShare}
        aria-label="Udostępnij artykuł"
      >
        <Share2 size={16} aria-hidden="true" />
        Udostępnij
      </Button>

      {/* Desktop fallback buttons — always present on md+ */}
      <div className="hidden items-center gap-2 md:flex">
        <Button
          variant="outline"
          size="icon"
          onClick={() => openPopup(facebookUrl)}
          aria-label="Udostępnij na Facebook"
        >
          <FacebookIcon size={16} />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => openPopup(xUrl)}
          aria-label="Udostępnij na X (Twitter)"
        >
          <XIcon size={16} />
        </Button>
      </div>

      {/* Copy link always visible (mobile too) */}
      <Button variant="outline" size="icon" onClick={handleCopyLink} aria-label="Kopiuj link">
        {copied ? <Check size={16} aria-hidden="true" /> : <Link size={16} aria-hidden="true" />}
      </Button>
    </div>
  )
}
