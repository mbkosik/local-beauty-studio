'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'
import { useMemo } from 'react'
import type { MotionEl, MotionTagName } from '@/types/motion'

interface AnimatedListProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  initialDelay?: number
  as?: MotionTagName
}

interface AnimatedListItemProps {
  children: React.ReactNode
  className?: string
  as?: MotionTagName
}

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

const REDUCED_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
}

export function AnimatedList({
  children,
  className,
  staggerDelay = 0.1,
  initialDelay = 0,
  as: Tag = 'div',
}: AnimatedListProps) {
  const prefersReducedMotion = useReducedMotion()
  const MotionTag = motion[Tag] as unknown as MotionEl

  const containerVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
          delayChildren: prefersReducedMotion ? 0 : initialDelay,
        },
      },
    }),
    [staggerDelay, initialDelay, prefersReducedMotion]
  )

  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </MotionTag>
  )
}

export function AnimatedListItem({ children, className, as: Tag = 'div' }: AnimatedListItemProps) {
  const prefersReducedMotion = useReducedMotion()
  const MotionTag = motion[Tag] as unknown as MotionEl
  const activeVariants = prefersReducedMotion ? REDUCED_ITEM_VARIANTS : ITEM_VARIANTS

  return (
    <MotionTag
      className={className}
      variants={activeVariants}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </MotionTag>
  )
}
