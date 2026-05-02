'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMounted } from '@/hooks/use-mounted'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useMounted()

  // resolvedTheme is undefined before next-themes initialises on client
  if (!mounted) return <div className="h-[1.2rem] w-[1.2rem]" />

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label={resolvedTheme === 'dark' ? 'Włącz jasny motyw' : 'Włącz ciemny motyw'}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  )
}
