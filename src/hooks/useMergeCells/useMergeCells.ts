import { useSelectedRange, useTableContext } from '../../context/TableContext'

export function useMergeCells() {
  const selectedRange = useSelectedRange()
  const { mergedRanges, selectRange, mergeSelection, unmergeSelection } = useTableContext()
  return { selectedRange, mergedRanges, selectRange, mergeSelection, unmergeSelection }
}
