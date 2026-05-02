import type { MotionProps } from 'motion/react'

export type MotionTagName =
  | 'div'
  | 'section'
  | 'article'
  | 'main'
  | 'aside'
  | 'header'
  | 'footer'
  | 'nav'
  | 'ul'
  | 'ol'
  | 'li'
  | 'span'
  | 'p'

export type MotionEl = React.ComponentType<MotionProps & React.HTMLAttributes<HTMLElement>>
