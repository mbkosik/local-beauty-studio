'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { MotionEl, MotionTagName } from '@/types/motion'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: MotionTagName
}

const VARIANTS: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const REDUCED_VARIANTS: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion()
  const MotionTag = motion[Tag] as unknown as MotionEl
  const activeVariants = prefersReducedMotion ? REDUCED_VARIANTS : VARIANTS

  return (
    <MotionTag
      className={className}
      variants={activeVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
    >
      {children}
    </MotionTag>
  )
}
