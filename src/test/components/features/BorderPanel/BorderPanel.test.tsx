import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { ReactNode } from 'react'
import { TableProvider } from '../../../../context/TableProvider'
import { BorderPanel } from '../../../../components/features/BorderPanel/BorderPanel'

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <TableProvider>{children}</TableProvider>
}

describe('BorderPanel', () => {
  it('renders the section label', () => {
    render(<BorderPanel />, { wrapper: Wrapper })
    expect(screen.getByText('Borders')).toBeInTheDocument()
  })

  it('renders the border style select', () => {
    render(<BorderPanel />, { wrapper: Wrapper })
    expect(screen.getByLabelText('Borders')).toBeInTheDocument()
  })

  it('renders border style options', () => {
    render(<BorderPanel />, { wrapper: Wrapper })
    expect(screen.getByText('No Border')).toBeInTheDocument()
    expect(screen.getByText('Solid')).toBeInTheDocument()
    expect(screen.getByText('Dotted')).toBeInTheDocument()
    expect(screen.getByText('Dashed')).toBeInTheDocument()
    expect(screen.getByText('Double')).toBeInTheDocument()
  })

  it('renders border color input by default (default style is solid)', () => {
    render(<BorderPanel />, { wrapper: Wrapper })
    expect(screen.getByText('Border color')).toBeInTheDocument()
  })

  it('changing border style select does not throw', () => {
    render(<BorderPanel />, { wrapper: Wrapper })
    const select = screen.getByLabelText('Borders')
    fireEvent.change(select, { target: { value: 'dashed' } })
    expect(select).toHaveValue('dashed')
  })

  it('changing border color input does not throw', () => {
    render(<BorderPanel />, { wrapper: Wrapper })
    const input = document.querySelector('input[type="color"]')
    expect(input).toBeInTheDocument()
    fireEvent.change(input!, { target: { value: '#ff0000' } })
  })

  it('renders in a section element', () => {
    render(<BorderPanel />, { wrapper: Wrapper })
    expect(document.querySelector('section')).toBeInTheDocument()
  })
})
