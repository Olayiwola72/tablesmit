import { render, renderHook, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { TableProvider, useTableContext } from '../../../context/TableProvider/TableProvider'

describe('TableProvider', () => {
  it('renders children', () => {
    render(
      <TableProvider>
        <div data-testid="child">hello</div>
      </TableProvider>,
    )
    expect(screen.getByTestId('child')).toHaveTextContent('hello')
  })

  it('provides context to children', () => {
    function Consumer(): React.ReactElement {
      const ctx = useTableContext()
      return <div data-testid="rows">{ctx.rows}</div>
    }
    render(
      <TableProvider>
        <Consumer />
      </TableProvider>,
    )
    expect(screen.getByTestId('rows')).toHaveTextContent('5')
  })

  it('throws useTableContext when called outside provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderHook(() => useTableContext())).toThrow('useTableContext must be used inside TableProvider')
    spy.mockRestore()
  })
})
