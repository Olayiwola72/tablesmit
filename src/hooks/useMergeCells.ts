import { useTableContext } from '../context/TableContext'

export function useMergeCells(): Pick<
  ReturnType<typeof useTableContext>,
  'selectedRange' | 'mergedRanges' | 'selectRange' | 'mergeSelection' | 'unmergeSelection'
> {
  const table = useTableContext()
  return {
    selectedRange: table.selectedRange,
    mergedRanges: table.mergedRanges,
    selectRange: table.selectRange,
    mergeSelection: table.mergeSelection,
    unmergeSelection: table.unmergeSelection,
  }
}
