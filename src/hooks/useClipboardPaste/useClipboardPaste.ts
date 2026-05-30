import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { CellData } from '../../types/table/cell.types'
import type { MergeRange } from '../../utils/mergeUtils/mergeUtils.types'
import type { CellsStyleMeta } from '../../context/TableReducer/TableReducer.types'
import { handlePasteData } from '../../services/clipboardParser'
import { toast } from '../../utils/toast/toast'

export { handlePasteData } from '../../services/clipboardParser'
export { parseClipboardContent } from '../../services/clipboardParser'
export type { PasteStyleMeta, PasteResult } from '../../services/clipboardParser'
export { setCopyBuffer } from '../../services/clipboardParser'

export function useClipboardPaste(
  setCells: (cells: CellData[][], mergedRanges?: MergeRange[], styles?: CellsStyleMeta) => void,
): { pasting: boolean } {
  const [pasting, setPasting] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const onPaste = async (event: globalThis.ClipboardEvent): Promise<void> => {
      const target = event.target

      // Always skip textareas/inputs — native paste is better for form fields
      if (target instanceof HTMLElement && (target.closest('textarea') || target.closest('input'))) return

      const items = event.clipboardData?.items
      if (!items) return

      // Check if clipboard has HTML table content
      let hasHtml = false
      for (const item of items) {
        if (item.type === 'text/html') { hasHtml = true; break }
      }

      const inContentEditable = target instanceof HTMLElement && !!target.closest('[contenteditable]')

      // Read plain text early so we can check for LaTeX before deciding to intercept
      const text = event.clipboardData?.getData('text/plain') ?? ''
      const hasLatex = text.includes('\\begin{tabular}') || text.includes('\\begin{table}')

      // Inside contentEditable: only intercept if clipboard has HTML table data or LaTeX
      // Otherwise let the cell's native paste handler deal with plain text
      if (inContentEditable && !hasHtml && !hasLatex) return

      event.preventDefault()

      setPasting(true)
      try {
        const html = hasHtml ? event.clipboardData?.getData('text/html') ?? null : null

        const result = await handlePasteData(text, html, setCells)
        if (result) {
          toast.success(t('toast.pasteSuccess', { rows: result.rowCount, cols: result.colCount }))
        }
      } catch {
        toast.error(t('toast.pasteError'))
      } finally {
        setPasting(false)
      }
    }

    document.addEventListener('paste', onPaste)
    return () => document.removeEventListener('paste', onPaste)
  }, [setCells, t])

  return { pasting }
}
