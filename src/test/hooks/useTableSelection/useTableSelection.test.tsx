import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { ReactNode } from 'react'
import { TableProvider } from '../../../context/TableContext'
import { useTableSelection } from '../../../hooks/useTableSelection/useTableSelection'

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <TableProvider>{children}</TableProvider>
}

describe('useTableSelection', () => {
  it('returns a selectCell function', () => {
    const { result } = renderHook(() => useTableSelection(), { wrapper: Wrapper })
    expect(typeof result.current.selectCell).toBe('function')
  })
})
