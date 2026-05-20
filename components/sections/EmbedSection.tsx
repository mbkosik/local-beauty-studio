'use client'

import { useEffect, useRef } from 'react'
import type { SectionEmbed } from '@/sanity.types'

interface EmbedSectionProps {
  data: SectionEmbed & { _key?: string }
}

export function EmbedSection({ data }: EmbedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || !data.embedCode) return

    container.innerHTML = ''

    const temp = document.createElement('div')
    temp.innerHTML = data.embedCode

    const scripts = Array.from(temp.querySelectorAll('script'))
    scripts.forEach((originalScript) => originalScript.remove())

    // Inject non-script HTML (iframes, divs, etc.) via dangerouslySetInnerHTML equivalent
    container.innerHTML = temp.innerHTML

    // Re-create and append each script so the browser executes it
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

  return <div ref={containerRef} />
}
