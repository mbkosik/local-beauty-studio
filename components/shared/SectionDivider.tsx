import { cn } from '@/lib/utils'

interface SectionDividerProps {
  className?: string
}

export function SectionDivider({ className }: SectionDividerProps) {
  return (
    <div
      className={cn('mx-auto flex max-w-xs items-center', className)}
      aria-hidden="true"
      role="presentation"
    >
      <div className="bg-brand/30 h-px flex-1" />
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        className="fill-brand/50 mx-3 shrink-0"
        aria-hidden="true"
      >
        <path d="M12 12 C10 7.5 6 8 4 12 C6 16 10 16.5 12 12Z" />
        <path d="M12 12 C14 7.5 18 8 20 12 C18 16 14 16.5 12 12Z" />
        <circle cx="12" cy="12" r="1.5" />
      </svg>
      <div className="bg-brand/30 h-px flex-1" />
    </div>
  )
}
