import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PageWrapper } from '../../../../components/layout/PageWrapper/PageWrapper'

describe('PageWrapper', () => {
  it('renders children', () => {
    render(<PageWrapper><h1>Content</h1></PageWrapper>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders as a main element', () => {
    render(<PageWrapper>Test</PageWrapper>)
    expect(screen.getByText('Test').tagName).toBe('MAIN')
  })

  it('has bg-white class', () => {
    render(<PageWrapper>Test</PageWrapper>)
    expect(screen.getByText('Test').className).toContain('bg-white')
  })

  it('forwards className', () => {
    render(<PageWrapper className="custom-cls">Test</PageWrapper>)
    expect(screen.getByText('Test').className).toContain('custom-cls')
  })
})
