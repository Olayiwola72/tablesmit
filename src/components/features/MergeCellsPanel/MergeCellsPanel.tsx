import { Merge } from 'lucide-react'
import type { ReactNode } from 'react'
import { useMergeCells } from '../../../hooks/useMergeCells'
import { normalizeSelection } from '../../../utils/mergeUtils'
import { Button } from '../../ui/Button'
import { SectionLabel } from '../../ui/SectionLabel'

export function MergeCellsPanel(): ReactNode {
  const { selectedRange, mergeSelection, unmergeSelection } = useMergeCells()
  const range = selectedRange ? normalizeSelection(selectedRange) : null

  return (
    <section>
      <SectionLabel>Merge Cells</SectionLabel>
      <p className="mb-3 text-xs text-text-muted">Click a cell, then Shift-click another cell to select a merge range.</p>
      <div className="mb-3 rounded-sm border border-border bg-white px-3 py-2 text-xs text-text-secondary">
        {range ? `R${range.startRow + 1}:C${range.startCol + 1} to R${range.endRow + 1}:C${range.endCol + 1}` : 'No selection'}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button variant="secondary" size="sm" onClick={mergeSelection}>
          <Merge size={14} aria-hidden="true" /> Merge
        </Button>
        <Button variant="ghost" size="sm" onClick={unmergeSelection}>Unmerge</Button>
      </div>
    </section>
  )
}
