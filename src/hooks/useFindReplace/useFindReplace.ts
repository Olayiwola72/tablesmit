import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CellData } from '../../context/table.types'

export function useFindReplace(cells: CellData[][]) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [matchIndex, setMatchIndex] = useState(0)
  const [replaceText, setReplaceText] = useState('')
  const [replaceMode, setReplaceMode] = useState(false)

  const matches = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    const found: Array<{ row: number; col: number }> = []
    cells.forEach((row, r) =>
      row.forEach((cell, c) => {
        if (cell.value.toLowerCase().includes(q)) found.push({ row: r, col: c })
      }),
    )
    return found
  }, [cells, query])

  const currentMatch = matches[matchIndex] ?? null

  const next = useCallback(
    () => setMatchIndex((i) => (i + 1) % matches.length),
    [matches.length],
  )

  const prev = useCallback(
    () => setMatchIndex((i) => (i - 1 + matches.length) % matches.length),
    [matches.length],
  )

  const replace = useCallback(
    (updateCell: (cellId: string, value: string) => void) => {
      if (!currentMatch) return
      const cellId = `R${currentMatch.row}C${currentMatch.col}`
      const cell = cells[currentMatch.row]?.[currentMatch.col]
      if (!cell) return
      const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const newValue = cell.value.replace(new RegExp(escapedQuery, 'gi'), replaceText)
      updateCell(cellId, newValue)
    },
    [currentMatch, cells, query, replaceText],
  )

  const replaceAll = useCallback(
    (updateCell: (cellId: string, value: string) => void) => {
      if (!query.trim()) return
      const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(escapedQuery, 'gi')
      cells.forEach((row, r) =>
        row.forEach((cell, c) => {
          if (cell.value.toLowerCase().includes(query.toLowerCase())) {
            const newValue = cell.value.replace(regex, replaceText)
            updateCell(`R${r}C${c}`, newValue)
          }
        }),
      )
    },
    [cells, query, replaceText],
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault()
        setReplaceMode(false)
        setIsOpen(true)
        return
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault()
        setReplaceMode(true)
        setIsOpen(true)
        return
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
        setReplaceMode(false)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen])

  return {
    query,
    setQuery,
    replaceText,
    setReplaceText,
    matches,
    currentMatch,
    matchIndex,
    next,
    prev,
    replace,
    replaceAll,
    isOpen,
    setIsOpen,
    replaceMode,
  }
}
