import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { ReactNode } from 'react'
import { TooltipProvider } from '../../../components/ui/Tooltip/Tooltip'
import { TableMakerPage } from '../../../pages/TableMakerPage/TableMakerPage'

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <TooltipProvider>{children}</TooltipProvider>
}

describe('TableMakerPage', () => {
  it('renders the table maker page', () => {
    render(<TableMakerPage />, { wrapper: Wrapper })
    expect(screen.getByText('Tables built for analytical writing.')).toBeInTheDocument()
  })
})
