import { ChevronDown, ChevronUp, Search, X } from 'lucide-react'
import { memo, type ReactNode } from 'react'

export interface FindReplaceProps {
  query: string
  setQuery: (value: string) => void
  replaceText: string
  setReplaceText: (value: string) => void
  matchIndex: number
  totalMatches: number
  onNext: () => void
  onPrev: () => void
  onReplace: () => void
  onReplaceAll: () => void
  onClose: () => void
  replaceMode: boolean
}

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
  return (
    <div className="w-72 rounded-md border border-border bg-white p-3 shadow-sm">
      <div className="flex items-center gap-2">
        <Search size={14} className="shrink-0 text-text-muted" aria-hidden="true" />
        <input
          type="text"
          name="find-query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find..."
          className="w-full rounded-sm border border-border px-2 py-1 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          autoFocus
        />
        <button
          onClick={onPrev}
          className="rounded-sm p-1 text-text-secondary hover:bg-surface hover:text-text-primary"
          aria-label="Previous match"
        >
          <ChevronUp size={14} />
        </button>
        <button
          onClick={onNext}
          className="rounded-sm p-1 text-text-secondary hover:bg-surface hover:text-text-primary"
          aria-label="Next match"
        >
          <ChevronDown size={14} />
        </button>
        <button
          onClick={onClose}
          className="rounded-sm p-1 text-text-secondary hover:bg-surface hover:text-text-primary"
          aria-label="Close search"
        >
          <X size={14} />
        </button>
      </div>
      <div className="mt-1 text-xs text-text-muted">
        {totalMatches > 0 ? `${matchIndex + 1} of ${totalMatches} matches` : 'No matches'}
      </div>
      {replaceMode && (
        <div className="mt-2 border-t border-border pt-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="find-replace"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              placeholder="Replace with..."
              className="w-full rounded-sm border border-border px-2 py-1 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={onReplace}
              className="rounded-sm bg-primary px-2 py-1 text-xs font-medium text-white hover:bg-primary-hover"
              aria-label="Replace"
            >
              R
            </button>
            <button
              onClick={onReplaceAll}
              className="rounded-sm border border-border px-2 py-1 text-xs font-medium text-text-primary hover:bg-surface"
              aria-label="Replace all"
            >
              All
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export const FindReplace = memo(FindReplaceRaw)
