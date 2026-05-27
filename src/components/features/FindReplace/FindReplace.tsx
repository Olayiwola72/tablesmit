import { ChevronDown, ChevronUp, Search, X } from 'lucide-react'
import { memo, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { FindReplaceProps } from './FindReplace.types'

function FindReplaceRaw({
  query,
  setQuery,
  replaceText,
  setReplaceText,
  matchIndex,
  totalMatches,
  onNext,
  onPrev,
  onReplace,
  onReplaceAll,
  onClose,
  replaceMode,
}: FindReplaceProps): ReactNode {
  const { t } = useTranslation(['common', 'table'])

  return (
    <div className="w-72 rounded-md border border-border bg-white p-3 shadow-sm">
      <div className="flex items-center gap-2">
        <Search size={14} className="shrink-0 text-text-muted" aria-hidden="true" />
        <input
          type="text"
          name="find-query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('table.search')}
          className="w-full rounded-sm border border-border px-2 py-1 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          autoFocus
        />
        <button
          onClick={onPrev}
          className="rounded-sm p-1 text-text-secondary hover:bg-surface hover:text-text-primary"
          aria-label={t('table.previousMatch')}
        >
          <ChevronUp size={14} />
        </button>
        <button
          onClick={onNext}
          className="rounded-sm p-1 text-text-secondary hover:bg-surface hover:text-text-primary"
          aria-label={t('table.nextMatch')}
        >
          <ChevronDown size={14} />
        </button>
        <button
          onClick={onClose}
          className="rounded-sm p-1 text-text-secondary hover:bg-surface hover:text-text-primary"
          aria-label={t('aria.closeMenu')}
        >
          <X size={14} />
        </button>
      </div>
      <div className="mt-1 text-xs text-text-muted">
        {totalMatches > 0
          ? t('table.matchCount', { current: matchIndex + 1, total: totalMatches })
          : t('table.noMatches')}
      </div>
      {replaceMode && (
        <div className="mt-2 border-t border-border pt-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="find-replace"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              placeholder={t('table.replaceWith')}
              className="w-full rounded-sm border border-border px-2 py-1 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={onReplace}
              className="rounded-sm bg-primary px-2 py-1 text-xs font-medium text-white hover:bg-primary-hover"
              aria-label={t('table.replaceOne')}
            >
              {t('table.replaceOne')}
            </button>
            <button
              onClick={onReplaceAll}
              className="rounded-sm border border-border px-2 py-1 text-xs font-medium text-text-primary hover:bg-surface"
              aria-label={t('table.replaceAll')}
            >
              {t('table.replaceAll')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export const FindReplace = memo(FindReplaceRaw)
