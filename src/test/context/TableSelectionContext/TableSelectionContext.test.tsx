import { renderHook } from '@testing-library/react'
import { act } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { ReactNode } from 'react'
import { TableProvider, useTableContext } from '../../../context/TableProvider/TableProvider'
import { useSelectedRange } from '../../../context/TableSelectionContext/TableSelectionContext'

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <TableProvider>{children}</TableProvider>
}

describe('useSelectedRange', () => {
  it('returns null when no selection has been made', () => {
    const { result } = renderHook(() => useSelectedRange(), { wrapper: Wrapper })
    expect(result.current).toBeNull()
  })

  it('returns selection after selectRange', () => {
    const { result } = renderHook(
      () => ({ selectedRange: useSelectedRange(), selectRange: useTableContext().selectRange }),
      { wrapper: Wrapper },
    )
    act(() => result.current.selectRange({ startRow: 0, startCol: 0, endRow: 2, endCol: 2 }))
    expect(result.current.selectedRange).toEqual({ startRow: 0, startCol: 0, endRow: 2, endCol: 2 })
  })
})
