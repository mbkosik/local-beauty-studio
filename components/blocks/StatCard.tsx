'use client'

import { useEffect, useRef } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react'

export interface StatCardProps {
  value: string
  label: string
}

function parseStat(raw: string): { num: number; suffix: string } {
  const match = raw.match(/(\d+(?:[.,]\d+)?)(.*)/)
  if (!match) return { num: 0, suffix: raw }
  const num = parseFloat(match[1].replace(',', '.'))
  const suffix = match[2].trim() ? ` ${match[2].trim()}` : match[2]
  return { num, suffix }
}

export function StatCard({ value, label }: StatCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { num, suffix } = parseStat(value)

  const count = useMotionValue(0)
  const rounded = useTransform(count, Math.round)

  useEffect(() => {
    if (!inView) return
    if (prefersReducedMotion) {
      count.set(num)
      return
    }
    const controls = animate(count, num, {
      duration: 2,
      ease: (t) => 1 - Math.pow(1 - t, 4),
    })
    return () => controls.stop()
  }, [inView, num, prefersReducedMotion, count])

  return (
    <div
      ref={ref}
      className="bg-muted/50 flex flex-col items-center gap-2 rounded-2xl px-6 py-10 text-center"
    >
      <span className="font-heading text-primary text-4xl font-bold tabular-nums md:text-5xl">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </span>
      <span className="text-muted-foreground text-sm tracking-wider uppercase">{label}</span>
    </div>
  )
}
