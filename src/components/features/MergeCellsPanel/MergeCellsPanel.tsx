import { Merge } from 'lucide-react'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useMergeCells } from '../../../hooks/useMergeCells'
import { normalizeSelection } from '../../../utils/mergeUtils'
import { Button } from '../../ui/Button'
import { SectionLabel } from '../../ui/SectionLabel'

export function MergeCellsPanel(): ReactNode {
  const { t } = useTranslation()
  const { selectedRange, mergedRanges, mergeSelection, unmergeSelection } = useMergeCells()
  const range = selectedRange ? normalizeSelection(selectedRange) : null
  const prevMergedCount = useRef(mergedRanges.length)
  const announceRef = useRef<HTMLParagraphElement>(null)

  const handleMerge = (): void => {
    if (!range) return
    if (range.startRow === range.endRow && range.startCol === range.endCol) {
      if (announceRef.current) announceRef.current.textContent = t('table.cannotMergeSingleCell')
      return
    }
    prevMergedCount.current = mergedRanges.length
    mergeSelection()
    if (announceRef.current) announceRef.current.textContent = t('table.cellsMerged')
  }

  const handleUnmerge = (): void => {
    if (!range) return
    const wasMerged = mergedRanges.some(
      (r) => range.startRow >= r.startRow && range.startRow <= r.endRow &&
             range.startCol >= r.startCol && range.startCol <= r.endCol,
    )
    prevMergedCount.current = mergedRanges.length
    unmergeSelection()
    if (announceRef.current) {
      announceRef.current.textContent = wasMerged ? t('table.cellsUnmerged') : t('table.noMergeFound')
    }
  }

  return (
    <section>
      <SectionLabel>{t('table.mergeCells')}</SectionLabel>
      <p className="mb-3 text-xs text-text-muted">{t('table.selectCellsToMerge')}</p>
      <div className="mb-3 rounded-sm border border-border bg-white px-3 py-2 text-xs text-text-secondary" aria-live="polite" aria-atomic="true">
        {range ? t('table.selectedRange', { range: `R${range.startRow + 1}:C${range.startCol + 1} to R${range.endRow + 1}:C${range.endCol + 1}` }) : t('table.noSelection')}
      </div>
      <p ref={announceRef} className="sr-only" aria-live="assertive" aria-atomic="true" />
      <div className="grid grid-cols-2 gap-2">
        <Button variant="secondary" size="sm" onClick={handleMerge}>
          <Merge size={14} aria-hidden="true" /> {t('toolbar.merge')}
        </Button>
        <Button variant="ghost" size="sm" onClick={handleUnmerge}>{t('toolbar.unmerge')}</Button>
      </div>
    </section>
  )
}
