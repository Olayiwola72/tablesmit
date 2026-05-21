import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PageLoader } from '../../../../components/ui/PageLoader/PageLoader'

describe('PageLoader', () => {
  it('renders the loading indicator', () => {
    render(<PageLoader />)
    expect(screen.getByRole('img', { name: 'Tablesmit' })).toBeInTheDocument()
  })

  it('renders the loading text', () => {
    render(<PageLoader />)
    expect(screen.getByText('loading')).toBeInTheDocument()
  })

  it('renders with animate-pulse class', () => {
    render(<PageLoader />)
    const text = screen.getByText('loading')
    expect(text.className).toContain('animate-pulse')
  })
})
