import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { ReactNode } from 'react'
import { TableProvider } from '../../../../context/TableContext'
import { DimensionsPanel } from '../../../../components/features/DimensionsPanel/DimensionsPanel'

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <TableProvider>{children}</TableProvider>
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
})
