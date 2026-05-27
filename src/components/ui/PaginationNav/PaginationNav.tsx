import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { PaginationNavProps } from './PaginationNav.types'
import { Button } from '../Button/Button'

export function PaginationNav({ currentPage, totalPages, onPageChange }: PaginationNavProps): ReactNode {
  const { t } = useTranslation(['common', 'blog', 'features'])

  if (totalPages <= 1) return null

  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        isDisabled={currentPage <= 1}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        aria-label={t('pagination.prevAria')}
      >
        &larr; {t('pagination.prev')}
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <Button
          key={n}
          variant={n === currentPage ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => onPageChange(n)}
          aria-label={t('pagination.pageAria', { number: n })}
          aria-current={n === currentPage ? 'page' : undefined}
        >
          {n}
        </Button>
      ))}
      <Button
        variant="ghost"
        size="sm"
        isDisabled={currentPage >= totalPages}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        aria-label={t('pagination.nextAria')}
      >
        {t('pagination.next')} &rarr;
      </Button>
    </nav>
  )
}
