import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Footer } from '../../../../components/layout/Footer/Footer'

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <BrowserRouter>{children}</BrowserRouter>
}

describe('Footer', () => {
  it('renders the brand name and tagline', () => {
    render(<Footer />, { wrapper: Wrapper })
    expect(screen.getByText('Tables, your way.')).toBeInTheDocument()
  })

  it('rendets the logo', () => {
    render(<Footer />, { wrapper: Wrapper })
    expect(screen.getByRole('img', { name: 'Tablesmit' })).toBeInTheDocument()
  })

  it('renders the open source license text', () => {
    render(<Footer />, { wrapper: Wrapper })
    expect(screen.getByText(/open source under MIT/i)).toBeInTheDocument()
  })

  it('renders Product section with links', () => {
    render(<Footer />, { wrapper: Wrapper })
    expect(screen.getByText('Product')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('renders Company section with links', () => {
    render(<Footer />, { wrapper: Wrapper })
    expect(screen.getByText('Company')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders GitHub link as external', () => {
    render(<Footer />, { wrapper: Wrapper })
    const github = screen.getByText('GitHub')
    expect(github.tagName).toBe('A')
    expect(github).toHaveAttribute('href', 'https://github.com/Olayiwola72/tablesmit')
    expect(github).toHaveAttribute('target', '_blank')
  })
})
