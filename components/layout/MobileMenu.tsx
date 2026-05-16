'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useMounted } from '@/hooks/use-mounted'
import type { NavLink } from '@/sanity/custom-types'

interface MobileMenuProps {
  navLinks: NavLink[]
}

export function MobileMenu({ navLinks }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const mounted = useMounted()
  const pathname = usePathname()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const focusGuard = useRef(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen])

  useEffect(() => {
    if (!focusGuard.current) {
      focusGuard.current = true
      return
    }
    if (!isOpen) triggerRef.current?.focus()
  }, [isOpen])

  const close = () => setIsOpen(false)

  const portal = mounted
    ? createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="bg-background/60 fixed inset-0 z-40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={close}
              />
              <motion.div
                id="mobile-menu"
                className="border-border bg-background fixed top-16 right-0 left-0 z-50 border-b shadow-lg"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <nav className="container flex flex-col gap-1 py-4" aria-label="Nawigacja mobilna">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href ?? link.label}
                      href={link.href ?? '#'}
                      onClick={close}
                      target={link.openInNewTab ? '_blank' : undefined}
                      rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                      aria-current={pathname === link.href ? 'page' : undefined}
                      className={cn(
                        'hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors',
                        pathname === link.href
                          ? 'text-foreground font-semibold'
                          : 'text-muted-foreground'
                      )}
                    >
                      {link.label}
                      {link.openInNewTab && <span className="sr-only"> (otwiera nową kartę)</span>}
                    </Link>
                  ))}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )
    : null

  return (
    <>
      <Button
        ref={triggerRef}
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? 'Zamknij menu' : 'Otwórz menu'}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
      {portal}
    </>
  )
}
