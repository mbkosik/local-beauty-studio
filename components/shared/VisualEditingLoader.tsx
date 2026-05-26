'use client'

import { VisualEditing } from '@sanity/visual-editing/react'

import { useMounted } from '@/hooks/use-mounted'

// Presentation Tool embeds the site in an iframe — show overlays only then.
// Prevents blue edit frames from appearing when draft mode cookie persists
// after a previous Studio session.
export function VisualEditingLoader() {
  const mounted = useMounted()
  if (!mounted || window === window.parent) return null
  return <VisualEditing portal={false} />
}
