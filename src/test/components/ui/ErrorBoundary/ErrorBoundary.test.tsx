import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ErrorBoundary } from '../../../../components/ui/ErrorBoundary/ErrorBoundary'

function GoodChild(): React.ReactNode {
  return <div>Everything is fine</div>
}

function BadChild(): React.ReactNode {
  throw new Error('Test error')
}

describe('ErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <GoodChild />
      </ErrorBoundary>,
    )
    expect(screen.getByText('Everything is fine')).toBeInTheDocument()
  })

  it('renders the default fallback when a child throws', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
    render(
      <ErrorBoundary>
        <BadChild />
      </ErrorBoundary>,
    )
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument()
    expect(screen.getByText('Test error')).toBeInTheDocument()
    expect(screen.getByText('Reload the page')).toBeInTheDocument()
  })

  it('renders a custom fallback when provided', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
    render(
      <ErrorBoundary fallback={<div>Custom error UI</div>}>
        <BadChild />
      </ErrorBoundary>,
    )
    expect(screen.getByText('Custom error UI')).toBeInTheDocument()
    expect(screen.queryByText('Something went wrong.')).not.toBeInTheDocument()
  })

  it('calls onError when a child throws', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const onError = vi.fn()
    render(
      <ErrorBoundary onError={onError}>
        <BadChild />
      </ErrorBoundary>,
    )
    expect(onError).toHaveBeenCalledOnce()
    expect(onError).toHaveBeenCalledWith(expect.any(Error), expect.any(Object))
  })
})
