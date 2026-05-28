import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'
import { TableProvider } from '../../../context/TableContext'
import { useExport } from '../../../hooks/useExport/useExport'
import * as exportService from '../../../services/exportService'

vi.mock('../../../services/exportService', () => ({
  exportTable: vi.fn(),
}))

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <TableProvider>{children}</TableProvider>
}

describe('useExport', () => {
  beforeEach(() => {
    vi.mocked(exportService.exportTable).mockClear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns exportingFormat null and exportAs function', () => {
    const { result } = renderHook(() => useExport(), { wrapper: Wrapper })
    expect(result.current.exportingFormat).toBeNull()
    expect(typeof result.current.exportAs).toBe('function')
  })

  it('returns exportQuality defaulting to normal', () => {
    const { result } = renderHook(() => useExport(), { wrapper: Wrapper })
    expect(result.current.exportQuality).toBe('normal')
  })

  it('setExportQuality updates the quality', () => {
    const { result } = renderHook(() => useExport(), { wrapper: Wrapper })
    act(() => { result.current.setExportQuality('high') })
    expect(result.current.exportQuality).toBe('high')
    act(() => { result.current.setExportQuality('normal') })
    expect(result.current.exportQuality).toBe('normal')
  })

  it('does nothing when element is null', async () => {
    const { result } = renderHook(() => useExport(), { wrapper: Wrapper })
    await result.current.exportAs('pdf', null)
    expect(result.current.exportingFormat).toBeNull()
  })

  it('passes normal quality scale and quality to exportTable', async () => {
    vi.mocked(exportService.exportTable).mockResolvedValue(undefined)
    const { result } = renderHook(() => useExport(), { wrapper: Wrapper })
    const el = document.createElement('div')
    await result.current.exportAs('pdf', el)
    await waitFor(() => expect(result.current.exportingFormat).toBeNull())
    expect(exportService.exportTable).toHaveBeenCalledWith(
      el,
      expect.objectContaining({ scale: 1, quality: 0.8 }),
    )
  })

  it('passes high quality scale and quality to exportTable when set', async () => {
    vi.mocked(exportService.exportTable).mockResolvedValue(undefined)
    const { result } = renderHook(() => useExport(), { wrapper: Wrapper })
    act(() => { result.current.setExportQuality('high') })
    const el = document.createElement('div')
    await result.current.exportAs('pdf', el)
    await waitFor(() => expect(result.current.exportingFormat).toBeNull())
    expect(exportService.exportTable).toHaveBeenCalledWith(
      el,
      expect.objectContaining({ scale: 2, quality: 0.92 }),
    )
  })

  it('exports successfully and shows success toast', async () => {
    vi.mocked(exportService.exportTable).mockResolvedValue(undefined)
    const { result } = renderHook(() => useExport(), { wrapper: Wrapper })
    const el = document.createElement('div')
    await result.current.exportAs('pdf', el)
    await waitFor(() => expect(result.current.exportingFormat).toBeNull())
    expect(exportService.exportTable).toHaveBeenCalledOnce()
    expect(el.classList.contains('is-exporting')).toBe(false)
  })

  it('handles export errors with toast error', async () => {
    vi.mocked(exportService.exportTable).mockRejectedValue(new Error('Export failed'))
    const { result } = renderHook(() => useExport(), { wrapper: Wrapper })
    const el = document.createElement('div')
    await result.current.exportAs('png', el)
    await waitFor(() => expect(result.current.exportingFormat).toBeNull())
    expect(el.classList.contains('is-exporting')).toBe(false)
  })

  it('triggers Excel export on Ctrl+Shift+X when element has data-export-ref', async () => {
    vi.mocked(exportService.exportTable).mockResolvedValue(undefined)
    const tableRef = { current: document.createElement('div') }
    const exportEl = document.createElement('div')
    exportEl.setAttribute('data-export-ref', '')
    tableRef.current.appendChild(exportEl)
    /* Must be connected to the DOM so events bubble to document-level listener */
    document.body.appendChild(tableRef.current)

    renderHook(() => useExport(tableRef), { wrapper: Wrapper })

    /* Dispatch on a real Element so e.target passes instanceof Element */
    act(() => {
      tableRef.current.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'X', code: 'KeyX', ctrlKey: true, shiftKey: true, bubbles: true }),
      )
    })

    await waitFor(() => {
      expect(exportService.exportTable).toHaveBeenCalled()
    })

    document.body.removeChild(tableRef.current)
  })

  it('triggers Excel export on ⌘+Shift+X (Mac)', async () => {
    vi.mocked(exportService.exportTable).mockResolvedValue(undefined)
    const tableRef = { current: document.createElement('div') }
    const exportEl = document.createElement('div')
    exportEl.setAttribute('data-export-ref', '')
    tableRef.current.appendChild(exportEl)
    /* Must be connected to the DOM so events bubble to document-level listener */
    document.body.appendChild(tableRef.current)

    renderHook(() => useExport(tableRef), { wrapper: Wrapper })

    act(() => {
      tableRef.current.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'X', code: 'KeyX', metaKey: true, shiftKey: true, bubbles: true }),
      )
    })

    await waitFor(() => {
      expect(exportService.exportTable).toHaveBeenCalled()
    })

    document.body.removeChild(tableRef.current)
  })

  it('does not export on Ctrl+Shift+X when target is contenteditable', () => {
    vi.mocked(exportService.exportTable).mockResolvedValue(undefined)
    const tableRef = { current: document.createElement('div') }

    renderHook(() => useExport(tableRef), { wrapper: Wrapper })

    const editable = document.createElement('div')
    editable.setAttribute('contenteditable', 'true')
    document.body.appendChild(editable)

    act(() => {
      editable.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'X', code: 'KeyX', ctrlKey: true, shiftKey: true, bubbles: true }),
      )
    })

    expect(exportService.exportTable).not.toHaveBeenCalled()
    document.body.removeChild(editable)
  })
})
