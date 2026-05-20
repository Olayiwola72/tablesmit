import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { FindReplace } from '../../../../components/features/FindReplace/FindReplace'

const defaultProps = {
  query: '',
  setQuery: vi.fn(),
  replaceText: '',
  setReplaceText: vi.fn(),
  matchIndex: 0,
  totalMatches: 0,
  onNext: vi.fn(),
  onPrev: vi.fn(),
  onReplace: vi.fn(),
  onReplaceAll: vi.fn(),
  onClose: vi.fn(),
  replaceMode: false,
}

describe('FindReplace', () => {
  it('renders placeholder text in search input', () => {
    render(<FindReplace {...defaultProps} />)
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
  })

  it('shows "No matches" when totalMatches is 0', () => {
    render(<FindReplace {...defaultProps} />)
    expect(screen.getByText('No matches')).toBeInTheDocument()
  })

  it('shows match count when totalMatches > 0', () => {
    render(<FindReplace {...defaultProps} totalMatches={5} matchIndex={2} />)
    expect(screen.getByText('3 of 5 matches')).toBeInTheDocument()
  })

  it('renders navigation and close buttons', () => {
    render(<FindReplace {...defaultProps} />)
    expect(screen.getByLabelText('Previous match')).toBeInTheDocument()
    expect(screen.getByLabelText('Next match')).toBeInTheDocument()
    expect(screen.getByLabelText('Close search')).toBeInTheDocument()
  })

  it('calls onNext when next button is clicked', () => {
    const onNext = vi.fn()
    render(<FindReplace {...defaultProps} onNext={onNext} />)
    fireEvent.click(screen.getByLabelText('Next match'))
    expect(onNext).toHaveBeenCalledOnce()
  })

  it('calls onPrev when previous button is clicked', () => {
    const onPrev = vi.fn()
    render(<FindReplace {...defaultProps} onPrev={onPrev} />)
    fireEvent.click(screen.getByLabelText('Previous match'))
    expect(onPrev).toHaveBeenCalledOnce()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(<FindReplace {...defaultProps} onClose={onClose} />)
    fireEvent.click(screen.getByLabelText('Close', { exact: false }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('shows replace section when replaceMode is true', () => {
    render(<FindReplace {...defaultProps} replaceMode={true} />)
    expect(screen.getByPlaceholderText('Replace with')).toBeInTheDocument()
    expect(screen.getByLabelText('Replace')).toBeInTheDocument()
    expect(screen.getByLabelText(/Replace all/i)).toBeInTheDocument()
  })

  it('does not show replace section when replaceMode is false', () => {
    render(<FindReplace {...defaultProps} replaceMode={false} />)
    expect(screen.queryByPlaceholderText('Replace with')).not.toBeInTheDocument()
  })

  it('calls onReplace when replace button is clicked', () => {
    const onReplace = vi.fn()
    render(<FindReplace {...defaultProps} replaceMode={true} onReplace={onReplace} />)
    fireEvent.click(screen.getByLabelText('Replace'))
    expect(onReplace).toHaveBeenCalledOnce()
  })

  it('calls onReplaceAll when replace all button is clicked', () => {
    const onReplaceAll = vi.fn()
    render(<FindReplace {...defaultProps} replaceMode={true} onReplaceAll={onReplaceAll} />)
    fireEvent.click(screen.getByLabelText(/Replace all/i))
    expect(onReplaceAll).toHaveBeenCalledOnce()
  })

  it('calls setQuery when search input changes', () => {
    const setQuery = vi.fn()
    render(<FindReplace {...defaultProps} setQuery={setQuery} />)
    fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'test' } })
    expect(setQuery).toHaveBeenCalledWith('test')
  })

  it('calls setReplaceText when replace input changes', () => {
    const setReplaceText = vi.fn()
    render(<FindReplace {...defaultProps} replaceMode={true} setReplaceText={setReplaceText} />)
    fireEvent.change(screen.getByPlaceholderText('Replace with'), { target: { value: 'new' } })
    expect(setReplaceText).toHaveBeenCalledWith('new')
  })
})
