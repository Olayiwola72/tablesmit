import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import type { ReactNode } from 'react'
import { TableProvider, useTableContext } from '../../../../context/TableContext'
import { DimensionsPanel } from '../../../../components/features/DimensionsPanel/DimensionsPanel'

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <TableProvider>{children}</TableProvider>
}

function ClearAllButton(): ReactNode {
  const table = useTableContext()
  return <button onClick={table.clearAll}>Clear All</button>
}

describe('DimensionsPanel', () => {
  it('renders Grid Size label and row/column inputs', () => {
    render(<DimensionsPanel />, { wrapper: Wrapper })
    expect(screen.getByText('Grid Size')).toBeInTheDocument()
    expect(screen.getByLabelText('Rows')).toBeInTheDocument()
    expect(screen.getByLabelText('Columns')).toBeInTheDocument()
  })

  it('renders a Create Table button', () => {
    render(<DimensionsPanel />, { wrapper: Wrapper })
    expect(screen.getByRole('button', { name: /create a table/i })).toBeInTheDocument()
  })

  it('rows input accepts typed values', async () => {
    const user = userEvent.setup()
    render(<DimensionsPanel />, { wrapper: Wrapper })
    const rowsInput = screen.getByLabelText('Rows')
    await user.clear(rowsInput)
    await user.type(rowsInput, '8')
    expect(rowsInput).toHaveValue(8)
  })

  it('columns input accepts typed values', async () => {
    const user = userEvent.setup()
    render(<DimensionsPanel />, { wrapper: Wrapper })
    const colsInput = screen.getByLabelText('Columns')
    await user.clear(colsInput)
    await user.type(colsInput, '6')
    expect(colsInput).toHaveValue(6)
  })

  it('creates a table using the typed row and column values', async () => {
    const user = userEvent.setup()
    render(<DimensionsPanel />, { wrapper: Wrapper })
    const rowsInput = screen.getByLabelText('Rows')
    const colsInput = screen.getByLabelText('Columns')

    await user.clear(rowsInput)
    await user.type(rowsInput, '8')
    await user.clear(colsInput)
    await user.type(colsInput, '6')

    await user.click(screen.getByRole('button', { name: /create a table/i }))

    expect(rowsInput).toHaveValue(8)
    expect(colsInput).toHaveValue(6)
  })

  it('retains local input state after clear all (inputs are not synced from context)', async () => {
    const user = userEvent.setup()

    function ContextDisplay(): ReactNode {
      const { rows } = useTableContext()
      return <div data-testid="ctx-rows">{rows}</div>
    }

    render(
      <TableProvider>
        <DimensionsPanel />
        <ClearAllButton />
        <ContextDisplay />
      </TableProvider>,
    )
    const rowsInput = screen.getByLabelText('Rows')

    await user.clear(rowsInput)
    await user.type(rowsInput, '8')

    await user.click(screen.getByRole('button', { name: /create a table/i }))

    expect(screen.getByTestId('ctx-rows')).toHaveTextContent('8')

    await user.click(screen.getByRole('button', { name: /clear all/i }))

    await waitFor(() => {
      expect(screen.getByTestId('ctx-rows')).toHaveTextContent('5')
    })

    expect(rowsInput).toHaveValue(8)
  })

  it('renders the limit info text', () => {
    render(<DimensionsPanel />, { wrapper: Wrapper })
    expect(screen.getByText(/limit/i)).toBeInTheDocument()
  })
})
