'use client'

import { useEffect, useRef } from 'react'
import { getVariantProps } from '@/lib/color-variant'
import type { SectionEmbed } from '@/sanity.types'

interface EmbedSectionProps {
  data: SectionEmbed & { _key?: string }
}

const maxWidthClass: Record<string, string> = {
  narrow: 'max-w-prose',
  normal: 'max-w-3xl',
  wide: 'max-w-5xl',
}

export function EmbedSection({ data }: EmbedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widthClass = maxWidthClass[data.maxWidth ?? 'normal'] ?? 'max-w-3xl'

  useEffect(() => {
    const container = containerRef.current
    if (!container || !data.embedCode) return

    container.innerHTML = ''

    const temp = document.createElement('div')
    temp.innerHTML = data.embedCode

    const scripts = Array.from(temp.querySelectorAll('script'))
    scripts.forEach((originalScript) => originalScript.remove())

    container.innerHTML = temp.innerHTML

    scripts.forEach((originalScript) => {
      const script = document.createElement('script')
      Array.from(originalScript.attributes).forEach((attr) => {
        script.setAttribute(attr.name, attr.value)
      })
      if (!originalScript.src) {
        script.innerHTML = originalScript.innerHTML
      }
      container.appendChild(script)
    })
  }, [data.embedCode])

  return (
    <section className="py-16 md:py-24" {...getVariantProps(data.colorVariant)}>
      <div className={`${widthClass} mx-auto px-4`}>
        <div ref={containerRef} />
      </div>
    </section>
  )
}
