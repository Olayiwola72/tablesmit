import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { describe, expect, it } from 'vitest'
import type { ReactNode } from 'react'
import { TooltipProvider } from '../../../components/ui/Tooltip/Tooltip'
import { brand } from '../../../config/brand/brandConfig'
import { exportFormats } from '../../../config/export/exportConfig'
import { TableMakerPage } from '../../../pages/TableMakerPage/TableMakerPage'

const exportList = exportFormats.map((f) => f.label).join(', ')

const metaDescription = `Build clean, structured tables with full control over headers, formatting, and export. Free, no signup needed. Export to ${exportList}.`

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

  it('sets correct document title', () => {
    render(<TableMakerPage />, { wrapper: Wrapper })
    expect(document.title).toBe(`${brand.name} — Tables, your way.`)
  })

  it('sets correct meta description', () => {
    render(<TableMakerPage />, { wrapper: Wrapper })
    const meta = document.querySelector('meta[name="description"]')
    expect(meta).toHaveAttribute('content', metaDescription)
  })

  it('sets correct canonical URL', () => {
    render(<TableMakerPage />, { wrapper: Wrapper })
    const link = document.querySelector('link[rel="canonical"]')
    expect(link).toHaveAttribute('href', 'https://tablesmit.com/')
  })
})
