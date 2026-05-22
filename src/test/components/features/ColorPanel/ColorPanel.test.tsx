import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { ReactNode } from 'react'
import { TableProvider } from '../../../../context/TableProvider/TableProvider'
import { ColorPanel } from '../../../../components/features/ColorPanel/ColorPanel'

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <TableProvider>{children}</TableProvider>
}

describe('ColorPanel', () => {
  it('renders the section label', () => {
    render(<ColorPanel />, { wrapper: Wrapper })
    expect(screen.getByText('Colors')).toBeInTheDocument()
  })

  it('renders the header color label', () => {
    render(<ColorPanel />, { wrapper: Wrapper })
    const labels = screen.getAllByText('Header color')
    expect(labels.length).toBeGreaterThanOrEqual(1)
  })

  it('renders the content color label', () => {
    render(<ColorPanel />, { wrapper: Wrapper })
    expect(screen.getByText('Content color')).toBeInTheDocument()
  })

  it('renders color swatch buttons', () => {
    render(<ColorPanel />, { wrapper: Wrapper })
    const buttons = document.querySelectorAll('button[aria-pressed]')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('renders color input for header color', () => {
    render(<ColorPanel />, { wrapper: Wrapper })
    const colorInputs = document.querySelectorAll('input[type="color"]')
    expect(colorInputs.length).toBeGreaterThanOrEqual(1)
  })

  it('renders row background color input', () => {
    render(<ColorPanel />, { wrapper: Wrapper })
    expect(screen.getByDisplayValue('#ffffff')).toBeInTheDocument()
  })
})
