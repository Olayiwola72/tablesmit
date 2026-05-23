import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { describe, expect, it } from 'vitest'
import type { ReactNode } from 'react'
import { TooltipProvider } from '../../../components/ui/Tooltip/Tooltip'
import { TableMakerPage } from '../../../pages/TableMakerPage/TableMakerPage'

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return (
    <HelmetProvider>
      <MemoryRouter>
        <TooltipProvider>{children}</TooltipProvider>
      </MemoryRouter>
    </HelmetProvider>
  )
}

describe('TableMakerPage', () => {
  it('renders the table maker page', () => {
    render(<TableMakerPage />, { wrapper: Wrapper })
    expect(screen.getByText('Tables built for analytical writing.')).toBeInTheDocument()
  })
})
