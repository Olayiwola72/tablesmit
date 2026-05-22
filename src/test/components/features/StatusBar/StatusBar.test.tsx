import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StatusBar } from '../../../../components/features/StatusBar/StatusBar'

describe('StatusBar', () => {
  it('renders total cells count', () => {
    render(<StatusBar rows={5} cols={4} />)
    expect(screen.getByText('5 × 4 table')).toBeInTheDocument()
  })

  it('renders auto-fit tip', () => {
    render(<StatusBar rows={3} cols={3} />)
    expect(screen.getByText(/auto.?fit/i)).toBeInTheDocument()
  })

  it('renders keyboard hint', () => {
    render(<StatusBar rows={3} cols={3} />)
    expect(screen.getByText('Ctrl+/ for shortcuts')).toBeInTheDocument()
  })

  it('has data-print-hide attribute', () => {
    const { container } = render(<StatusBar rows={3} cols={3} />)
    expect(container.querySelector('[data-print-hide]')).toBeInTheDocument()
  })
})
