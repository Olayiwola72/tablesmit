import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useAutoFit } from '../../../hooks/useAutoFit/useAutoFit'

describe('useAutoFit', () => {
  it('returns autoFitColumn and autoFitRow', () => {
    const gridRef = { current: document.createElement('table') }
    const setColumnWidth = vi.fn()
    const setRowHeight = vi.fn()
    const { result } = renderHook(() => useAutoFit(gridRef, setColumnWidth, setRowHeight))
    expect(typeof result.current.autoFitColumn).toBe('function')
    expect(typeof result.current.autoFitRow).toBe('function')
  })

  it('autoFitColumn does nothing when gridRef is null', () => {
    const gridRef = { current: null }
    const setColumnWidth = vi.fn()
    const setRowHeight = vi.fn()
    const { result } = renderHook(() => useAutoFit(gridRef, setColumnWidth, setRowHeight))
    result.current.autoFitColumn(0)
    expect(setColumnWidth).not.toHaveBeenCalled()
  })

  it('autoFitRow does nothing when gridRef is null', () => {
    const gridRef = { current: null }
    const setColumnWidth = vi.fn()
    const setRowHeight = vi.fn()
    const { result } = renderHook(() => useAutoFit(gridRef, setColumnWidth, setRowHeight))
    result.current.autoFitRow(0)
    expect(setRowHeight).not.toHaveBeenCalled()
  })

  it('autoFitRow does nothing when row index is out of bounds', () => {
    const table = document.createElement('table')
    const row = table.insertRow()
    row.insertCell()
    const gridRef = { current: table }
    const setColumnWidth = vi.fn()
    const setRowHeight = vi.fn()
    const { result } = renderHook(() => useAutoFit(gridRef, setColumnWidth, setRowHeight))
    result.current.autoFitRow(5)
    expect(setRowHeight).not.toHaveBeenCalled()
  })
})
