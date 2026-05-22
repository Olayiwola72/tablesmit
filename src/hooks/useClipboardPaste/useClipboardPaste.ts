import { useEffect, useState } from 'react'
import type { CellData } from '../../types/table'
import { MAX_COLS, MAX_ROWS } from '../../config/table/tableDefaults'
import { normalizeTableData } from '../../utils/tableUtils/tableUtils'
import { toast, TOAST } from '../../utils/toast/toast'

export function useClipboardPaste(
  setCells: (cells: CellData[][]) => void,
): { pasting: boolean } {
  const [pasting, setPasting] = useState(false)

  useEffect(() => {
    const onPaste = async (event: globalThis.ClipboardEvent): Promise<void> => {
      const target = event.target
      if (target instanceof HTMLElement && target.closest('[contenteditable]')) return

      const items = event.clipboardData?.items
      if (!items) return
      event.preventDefault()

      setPasting(true)
      try {
        const html = items[0]?.type === 'text/html' ? event.clipboardData?.getData('text/html') : null
        const text = event.clipboardData?.getData('text/plain') ?? ''

        let pastedRows: string[][] = []

        if (html) {
          const doc = new DOMParser().parseFromString(html, 'text/html')
          const table = doc.querySelector('table')
          if (table) {
            pastedRows = Array.from(table.rows).map((tr) =>
              Array.from(tr.children).map((td) => (td.textContent ?? '').trim()),
            )
          }
        }

        if (pastedRows.length === 0 && text) {
          const lines = text.split(/\r?\n/).filter(Boolean)
          const delim = lines.some((line) => line.includes('\t')) ? '\t' : ','
          pastedRows = lines.map((line) => line.split(delim).map((v) => v.trim()))
          if (delim === ',' && pastedRows.every((r) => r.length === 1)) pastedRows = []
        }

        if (pastedRows.length > 1 && pastedRows[0]!.length > 1) {
          const r = Math.min(pastedRows.length, MAX_ROWS)
          const c = Math.min(Math.max(...pastedRows.map((row) => row.length)), MAX_COLS)
          const trimmedRows = pastedRows.slice(0, r).map((row) => row.slice(0, c))
          const cellData = normalizeTableData(trimmedRows, r, c)
          setCells(cellData)
          toast.success(TOAST.PASTE_SUCCESS(r, c))
        }
      } catch {
        toast.error(TOAST.PASTE_ERROR)
      } finally {
        setPasting(false)
      }
    }

    document.addEventListener('paste', onPaste)
    return () => document.removeEventListener('paste', onPaste)
  }, [setCells])

  return { pasting }
}
