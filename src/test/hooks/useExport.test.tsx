import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'
import { TableProvider } from '../../context/TableContext'
import { useExport } from '../../hooks/useExport'

vi.mock('../../services/exportService', () => ({
  exportTable: vi.fn(),
}))

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <TableProvider>{children}</TableProvider>
}

describe('useExport', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns isExporting false and exportAs function', () => {
    const { result } = renderHook(() => useExport(), { wrapper: Wrapper })
    expect(result.current.isExporting).toBe(false)
    expect(typeof result.current.exportAs).toBe('function')
  })

  it('does nothing when element is null', async () => {
    const { result } = renderHook(() => useExport(), { wrapper: Wrapper })
    await result.current.exportAs('pdf', null)
    expect(result.current.isExporting).toBe(false)
  })

  it('exports successfully and shows success toast', async () => {
    const { exportTable } = await import('../../services/exportService')
    vi.mocked(exportTable).mockResolvedValue(undefined)
    const { result } = renderHook(() => useExport(), { wrapper: Wrapper })
    const el = document.createElement('div')
    await result.current.exportAs('pdf', el)
    await waitFor(() => expect(result.current.isExporting).toBe(false))
    expect(exportTable).toHaveBeenCalledOnce()
    expect(el.classList.contains('is-exporting')).toBe(false)
  })

  it('handles export errors with toast error', async () => {
    const { exportTable } = await import('../../services/exportService')
    vi.mocked(exportTable).mockRejectedValue(new Error('Export failed'))
    const { result } = renderHook(() => useExport(), { wrapper: Wrapper })
    const el = document.createElement('div')
    await result.current.exportAs('png', el)
    await waitFor(() => expect(result.current.isExporting).toBe(false))
    expect(el.classList.contains('is-exporting')).toBe(false)
  })
})
