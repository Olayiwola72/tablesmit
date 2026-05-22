import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'
import { TableProvider } from '../../../context/TableProvider/TableProvider'
import { useTableData } from '../../../context/TableDataContext/TableDataContext'

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <TableProvider>{children}</TableProvider>
}

describe('useTableData', () => {
  it('returns cells value when used inside TableProvider', () => {
    const { result } = renderHook(() => useTableData(), { wrapper: Wrapper })
    expect(result.current.cells).toHaveLength(5)
    expect(result.current.cells[0]).toHaveLength(5)
  })

  it('throws when used outside TableProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderHook(() => useTableData())).toThrow('useTableData must be used inside TableProvider')
    spy.mockRestore()
  })
})
