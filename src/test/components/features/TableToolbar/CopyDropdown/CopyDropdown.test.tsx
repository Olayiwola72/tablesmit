import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CopyDropdown } from '../../../../../components/features/TableToolbar/CopyDropdown/CopyDropdown'

describe('CopyDropdown', () => {
  it('renders the trigger button', () => {
    render(
      <CopyDropdown
        onCopyExcelData={vi.fn()}
        onCopyCsv={vi.fn()}
        onCopyMarkdown={vi.fn()}
        onCopyLatex={vi.fn()}
        onCopyImage={vi.fn()}
        onCopyHtml={vi.fn()}
      />,
    )
    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument()
  })

  it('opens the menu on trigger click', async () => {
    const user = userEvent.setup()
    render(
      <CopyDropdown
        onCopyExcelData={vi.fn()}
        onCopyCsv={vi.fn()}
        onCopyMarkdown={vi.fn()}
        onCopyLatex={vi.fn()}
        onCopyImage={vi.fn()}
        onCopyHtml={vi.fn()}
      />,
    )
    await user.click(screen.getByRole('button', { name: /copy/i }))
    expect(screen.getByText('Copy as Excel Data')).toBeInTheDocument()
    expect(screen.getByText('Copy as CSV')).toBeInTheDocument()
    expect(screen.getByText('Copy as Markdown')).toBeInTheDocument()
    expect(screen.getByText('Copy as LaTeX')).toBeInTheDocument()
    expect(screen.getByText('Copy as Image')).toBeInTheDocument()
    expect(screen.getByText('Copy as HTML')).toBeInTheDocument()
  })

  it('calls onCopyExcelData when Excel Data menu item is clicked', async () => {
    const user = userEvent.setup()
    const onCopyExcelData = vi.fn()
    render(
      <CopyDropdown
        onCopyExcelData={onCopyExcelData}
        onCopyCsv={vi.fn()}
        onCopyMarkdown={vi.fn()}
        onCopyLatex={vi.fn()}
        onCopyImage={vi.fn()}
        onCopyHtml={vi.fn()}
      />,
    )
    await user.click(screen.getByRole('button', { name: /copy/i }))
    await user.click(screen.getByText('Copy as Excel Data'))
    expect(onCopyExcelData).toHaveBeenCalledOnce()
  })

  it('calls onCopyCsv when CSV menu item is clicked', async () => {
    const user = userEvent.setup()
    const onCopyCsv = vi.fn()
    render(
      <CopyDropdown
        onCopyExcelData={vi.fn()}
        onCopyCsv={onCopyCsv}
        onCopyMarkdown={vi.fn()}
        onCopyLatex={vi.fn()}
        onCopyImage={vi.fn()}
        onCopyHtml={vi.fn()}
      />,
    )
    await user.click(screen.getByRole('button', { name: /copy/i }))
    await user.click(screen.getByText('Copy as CSV'))
    expect(onCopyCsv).toHaveBeenCalledOnce()
  })

  it('calls onCopyMarkdown when Markdown menu item is clicked', async () => {
    const user = userEvent.setup()
    const onCopyMarkdown = vi.fn()
    render(
      <CopyDropdown
        onCopyExcelData={vi.fn()}
        onCopyCsv={vi.fn()}
        onCopyMarkdown={onCopyMarkdown}
        onCopyLatex={vi.fn()}
        onCopyImage={vi.fn()}
        onCopyHtml={vi.fn()}
      />,
    )
    await user.click(screen.getByRole('button', { name: /copy/i }))
    await user.click(screen.getByText('Copy as Markdown'))
    expect(onCopyMarkdown).toHaveBeenCalledOnce()
  })

  it('calls onCopyImage when Image menu item is clicked', async () => {
    const user = userEvent.setup()
    const onCopyImage = vi.fn()
    render(
      <CopyDropdown
        onCopyExcelData={vi.fn()}
        onCopyCsv={vi.fn()}
        onCopyMarkdown={vi.fn()}
        onCopyLatex={vi.fn()}
        onCopyImage={onCopyImage}
        onCopyHtml={vi.fn()}
      />,
    )
    await user.click(screen.getByRole('button', { name: /copy/i }))
    await user.click(screen.getByText('Copy as Image'))
    expect(onCopyImage).toHaveBeenCalledOnce()
  })

  it('calls onCopyHtml when HTML menu item is clicked', async () => {
    const user = userEvent.setup()
    const onCopyHtml = vi.fn()
    render(
      <CopyDropdown
        onCopyExcelData={vi.fn()}
        onCopyCsv={vi.fn()}
        onCopyMarkdown={vi.fn()}
        onCopyLatex={vi.fn()}
        onCopyImage={vi.fn()}
        onCopyHtml={onCopyHtml}
      />,
    )
    await user.click(screen.getByRole('button', { name: /copy/i }))
    await user.click(screen.getByText('Copy as HTML'))
    expect(onCopyHtml).toHaveBeenCalledOnce()
  })
})
