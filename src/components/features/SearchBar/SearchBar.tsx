import { useRef, useCallback, type ReactNode, type KeyboardEvent, type ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, X } from 'lucide-react'
import type { SearchBarProps } from './SearchBar.types'

export function SearchBar({
  query,
  onQueryChange,
  totalResults,
  totalItems,
  placeholder,
}: SearchBarProps): ReactNode {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => onQueryChange(e.target.value),
    [onQueryChange],
  )

  const handleClear = useCallback(() => {
    onQueryChange('')
    inputRef.current?.focus()
  }, [onQueryChange])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        handleClear()
        inputRef.current?.blur()
      }
    },
    [handleClear],
  )

  const hasQuery = query.trim().length > 0

  return (
    <div className="mb-8" role="search" aria-label={t('search.ariaLabel')}>
      <div className="relative mx-auto max-w-md">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="text"
          role="searchbox"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder ?? t('search.placeholder')}
          aria-label={t('search.ariaLabel')}
          className="w-full rounded-md border border-border bg-white py-2 pl-9 pr-8 text-sm text-text-primary placeholder:text-text-muted focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        {hasQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
            aria-label={t('search.clear')}
          >
            <X size={16} />
          </button>
        )}
      </div>
      {hasQuery && (
        <p className="mt-2 text-center text-xs text-text-muted">
          {totalResults === 0
            ? t('search.noResults')
            : t('search.resultsCount', { count: totalResults, total: totalItems ?? totalResults })}
        </p>
      )}
    </div>
  )
}
