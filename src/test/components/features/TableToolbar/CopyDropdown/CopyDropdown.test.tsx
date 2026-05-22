import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CopyDropdown } from '../../../../../components/features/TableToolbar/CopyDropdown/CopyDropdown'

const defaultProps = {
  onCopyExcelData: vi.fn(),
  onCopyCsv: vi.fn(),
  onCopyMarkdown: vi.fn(),
  onCopyImage: vi.fn(),
}

describe('CopyDropdown', () => {
  it('renders the Copy trigger button', () => {
    render(<CopyDropdown {...defaultProps} />)
    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument()
  })

  it('opens dropdown and renders all copy options', async () => {
    const user = userEvent.setup()
    render(<CopyDropdown {...defaultProps} />)
    await user.click(screen.getByRole('button', { name: /copy/i }))
    expect(screen.getByText('Copy as Excel Data')).toBeInTheDocument()
    expect(screen.getByText('Copy as CSV')).toBeInTheDocument()
    expect(screen.getByText('Copy as Markdown')).toBeInTheDocument()
    expect(screen.getByText('Copy as Image')).toBeInTheDocument()
  })

  it('calls onCopyExcelData when Excel option is clicked', async () => {
    const user = userEvent.setup()
    const onCopyExcelData = vi.fn()
    render(<CopyDropdown {...defaultProps} onCopyExcelData={onCopyExcelData} />)
    await user.click(screen.getByRole('button', { name: /copy/i }))
    await user.click(screen.getByText('Copy as Excel Data'))
    expect(onCopyExcelData).toHaveBeenCalledOnce()
  })

  it('calls onCopyCsv when CSV option is clicked', async () => {
    const user = userEvent.setup()
    const onCopyCsv = vi.fn()
    render(<CopyDropdown {...defaultProps} onCopyCsv={onCopyCsv} />)
    await user.click(screen.getByRole('button', { name: /copy/i }))
    await user.click(screen.getByText('Copy as CSV'))
    expect(onCopyCsv).toHaveBeenCalledOnce()
  })

  it('calls onCopyMarkdown when Markdown option is clicked', async () => {
    const user = userEvent.setup()
    const onCopyMarkdown = vi.fn()
    render(<CopyDropdown {...defaultProps} onCopyMarkdown={onCopyMarkdown} />)
    await user.click(screen.getByRole('button', { name: /copy/i }))
    await user.click(screen.getByText('Copy as Markdown'))
    expect(onCopyMarkdown).toHaveBeenCalledOnce()
  })

  it('calls onCopyImage when Image option is clicked', async () => {
    const user = userEvent.setup()
    const onCopyImage = vi.fn()
    render(<CopyDropdown {...defaultProps} onCopyImage={onCopyImage} />)
    await user.click(screen.getByRole('button', { name: /copy/i }))
    await user.click(screen.getByText('Copy as Image'))
    expect(onCopyImage).toHaveBeenCalledOnce()
  })
})
