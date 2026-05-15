import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  category?: string
}

function buildHref(page: number, category?: string): string {
  const params = new URLSearchParams()
  if (category) params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const qs = params.toString()
  return `/blog${qs ? `?${qs}` : ''}`
}

function buildPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | 'ellipsis')[] = [1]

  if (current > 3) pages.push('ellipsis')

  const rangeStart = Math.max(2, current - 1)
  const rangeEnd = Math.min(total - 1, current + 1)

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i)
  }

  if (current < total - 2) pages.push('ellipsis')

  pages.push(total)

  return pages
}

export function BlogPagination({ currentPage, totalPages, category }: BlogPaginationProps) {
  if (totalPages <= 1) return null

  const pages = buildPageNumbers(currentPage, totalPages)

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={buildHref(currentPage - 1, category)}
            aria-disabled={currentPage === 1}
            aria-label="Przejdź do poprzedniej strony"
            className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            text="Poprzednia"
          />
        </PaginationItem>

        {pages.map((page, idx) =>
          page === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink href={buildHref(page, category)} isActive={page === currentPage}>
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href={buildHref(currentPage + 1, category)}
            aria-disabled={currentPage === totalPages}
            aria-label="Przejdź do następnej strony"
            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            text="Następna"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
