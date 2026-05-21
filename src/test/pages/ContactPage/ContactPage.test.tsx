import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ContactPage } from '../../../pages/ContactPage/ContactPage'

describe('ContactPage', () => {
  it('renders heading', () => {
    render(<ContactPage />)
    expect(screen.getByText(/Get in touch/i)).toBeInTheDocument()
  })

  it('renders email link', () => {
    render(<ContactPage />)
    expect(screen.getByText('hello@tablesmit.com')).toBeInTheDocument()
  })

  it('renders send message button', () => {
    render(<ContactPage />)
    expect(screen.getByRole('link', { name: /send message/i })).toBeInTheDocument()
  })

  it('renders all four reason cards', () => {
    render(<ContactPage />)
    expect(screen.getByText(/Feature idea/i)).toBeInTheDocument()
    expect(screen.getByText(/Bug or glitch/i)).toBeInTheDocument()
    expect(screen.getByText(/Just saying hi/i)).toBeInTheDocument()
    expect(screen.getByText(/Something else/i)).toBeInTheDocument()
  })

  it('renders built with care section', () => {
    render(<ContactPage />)
    expect(screen.getByText(/Built with care/i)).toBeInTheDocument()
  })
})
