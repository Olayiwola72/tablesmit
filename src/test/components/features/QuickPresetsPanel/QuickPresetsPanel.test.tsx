import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { ReactNode } from 'react'
import { TableProvider } from '../../../../context/TableContext'
import { QuickPresetsPanel } from '../../../../components/features/QuickPresetsPanel/QuickPresetsPanel'

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <TableProvider>{children}</TableProvider>
}

describe('QuickPresetsPanel', () => {
  it('renders Templates label', () => {
    render(<QuickPresetsPanel />, { wrapper: Wrapper })
    expect(screen.getByText('Templates')).toBeInTheDocument()
  })

  it('renders all preset buttons', () => {
    render(<QuickPresetsPanel />, { wrapper: Wrapper })
    expect(screen.getByRole('button', { name: /research notes/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /feature matrix/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /content tracker/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /budget summary/i })).toBeInTheDocument()
  })
})
