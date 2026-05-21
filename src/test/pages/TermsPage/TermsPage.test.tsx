import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TermsPage } from '../../../pages/TermsPage/TermsPage'

describe('TermsPage', () => {
  it('renders heading', () => {
    render(<TermsPage />)
    expect(screen.getByText(/Terms of Use/i)).toBeInTheDocument()
  })

  it('renders last updated line', () => {
    render(<TermsPage />)
    expect(screen.getByText(/Last updated/i)).toBeInTheDocument()
  })

  it('renders the service section', () => {
    render(<TermsPage />)
    expect(screen.getByText(/The service/i)).toBeInTheDocument()
  })

  it('renders your content section', () => {
    render(<TermsPage />)
    expect(screen.getByText(/Your content/i)).toBeInTheDocument()
  })

  it('renders open source section', () => {
    render(<TermsPage />)
    expect(screen.getByText(/Open source/i)).toBeInTheDocument()
  })

  it('renders contact email', () => {
    render(<TermsPage />)
    expect(screen.getByText('hello@tablesmit.com')).toBeInTheDocument()
  })
})
