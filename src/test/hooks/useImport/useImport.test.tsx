import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'
import { TableProvider } from '../../../context/TableContext'
import { useImport } from '../../../hooks/useImport/useImport'
import * as importService from '../../../services/importService/importService'

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <TableProvider>{children}</TableProvider>
}

describe('useImport', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('starts with no error', () => {
    const { result } = renderHook(() => useImport(), { wrapper: Wrapper })
    expect(result.current.error).toBeNull()
  })

  it('sets an error for oversized CSV files', async () => {
    const { result } = renderHook(() => useImport(), { wrapper: Wrapper })
    const large = new ArrayBuffer(6 * 1024 * 1024)
    const file = new File([large], 'test.csv', { type: 'text/csv' })
    await act(() => result.current.importFile(file, 'csv'))
    await waitFor(() => expect(result.current.error).toBeTruthy())
  })

  it('sets error when importService throws', async () => {
    vi.spyOn(importService, 'importCsv').mockRejectedValue(new Error('Parse error'))
    const { result } = renderHook(() => useImport(), { wrapper: Wrapper })
    const file = new File(['tiny'], 'test.csv', { type: 'text/csv' })
    await act(() => result.current.importFile(file, 'csv'))
    await waitFor(() => expect(result.current.error).toBeTruthy())
  })
})
