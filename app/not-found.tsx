import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p
        className="text-primary text-[8rem] leading-none font-bold md:text-[12rem]"
        style={{ fontFamily: 'var(--font-heading)' }}
        aria-hidden="true"
      >
        404
      </p>

      <h1
        className="text-foreground mt-4 text-3xl font-semibold md:text-4xl"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Strona nie istnieje
      </h1>

      <p className="text-muted-foreground mt-4 max-w-md text-base">
        Nie możemy znaleźć strony, której szukasz. Mogła zostać przeniesiona, usunięta lub adres URL
        jest nieprawidłowy.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild>
          <Link href="/">Wróć na stronę główną</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/blog">Przejdź do bloga</Link>
        </Button>
      </div>
    </div>
  )
}
