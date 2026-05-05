'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/shared/AnimatedSection'

interface SiteErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function SiteError({ error, reset }: SiteErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <AnimatedSection
      as="div"
      className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center"
    >
      <p
        className="text-primary text-[6rem] leading-none font-bold md:text-[8rem]"
        style={{ fontFamily: 'var(--font-heading)' }}
        aria-hidden="true"
      >
        ✦
      </p>

      <h1
        className="text-foreground mt-4 text-3xl font-semibold md:text-4xl"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Coś poszło nie tak
      </h1>

      <p className="text-muted-foreground mt-4 max-w-md text-base">
        Wystąpił nieoczekiwany błąd. Możesz spróbować ponownie lub wrócić na stronę główną.
      </p>

      {error.digest && (
        <p className="text-muted-foreground mt-2 font-mono text-xs">ID błędu: {error.digest}</p>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button onClick={reset}>Spróbuj ponownie</Button>
        <Button asChild variant="outline">
          <Link href="/">Wróć na stronę główną</Link>
        </Button>
      </div>
    </AnimatedSection>
  )
}
