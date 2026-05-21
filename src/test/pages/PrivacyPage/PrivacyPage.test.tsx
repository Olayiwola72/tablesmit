import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PrivacyPage } from '../../../pages/PrivacyPage/PrivacyPage'

describe('PrivacyPage', () => {
  it('renders heading', () => {
    render(<PrivacyPage />)
    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument()
  })

  it('renders last updated line', () => {
    render(<PrivacyPage />)
    expect(screen.getByText(/Last updated/i)).toBeInTheDocument()
  })

  it('renders what we collect section', () => {
    render(<PrivacyPage />)
    expect(screen.getByText(/What we collect/i)).toBeInTheDocument()
  })

  it('renders what we do not collect section', () => {
    render(<PrivacyPage />)
    expect(screen.getByText(/What we do not collect/i)).toBeInTheDocument()
  })

  it('renders file imports section', () => {
    render(<PrivacyPage />)
    expect(screen.getByText(/File imports/i)).toBeInTheDocument()
  })

  it('renders contact section with email', () => {
    render(<PrivacyPage />)
    expect(screen.getByText(/Contact/i)).toBeInTheDocument()
    expect(screen.getByText('hello@tablesmit.com')).toBeInTheDocument()
  })
})
