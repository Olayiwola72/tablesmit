import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { OpenSourcePage } from '../../../pages/OpenSourcePage/OpenSourcePage'

describe('OpenSourcePage', () => {
  it('renders heading', () => {
    render(<OpenSourcePage />)
    expect(screen.getByText(/Built in the open/i)).toBeInTheDocument()
  })

  it('renders view on GitHub button', () => {
    render(<OpenSourcePage />)
    const githubLinks = screen.getAllByRole('link', { name: /view on github/i })
    expect(githubLinks.length).toBeGreaterThanOrEqual(1)
  })

  it('renders sponsor cards', () => {
    render(<OpenSourcePage />)
    expect(screen.getByText(/Sponsor monthly on GitHub/i)).toBeInTheDocument()
    expect(screen.getByText(/One-time contribution/i)).toBeInTheDocument()
    expect(screen.getByText(/For teams and organizations/i)).toBeInTheDocument()
  })

  it('renders contributors section', () => {
    render(<OpenSourcePage />)
    expect(screen.getByRole('heading', { name: /contributors/i })).toBeInTheDocument()
  })

  it('renders how to contribute section', () => {
    render(<OpenSourcePage />)
    expect(screen.getByText(/How to contribute/i)).toBeInTheDocument()
  })

  it('renders footer note', () => {
    render(<OpenSourcePage />)
    const notes = screen.getAllByText(/MIT licensed/i)
    expect(notes.length).toBeGreaterThanOrEqual(1)
  })
})
