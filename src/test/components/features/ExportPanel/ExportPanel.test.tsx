import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { ExportPanel } from '../../../../components/features/ExportPanel/ExportPanel'
import { TooltipProvider } from '../../../../components/ui/Tooltip/Tooltip'

const renderPanel = (ui: React.ReactElement) =>
  render(<TooltipProvider>{ui}</TooltipProvider>)

const defaultProps = {
  onExport: vi.fn(),
  exportingFormat: null as null,
  exportQuality: 'normal' as const,
  onExportQualityChange: vi.fn(),
}

describe('ExportPanel', () => {
  it('renders the section label', () => {
    renderPanel(<ExportPanel {...defaultProps} />)
    expect(screen.getByText('Export')).toBeInTheDocument()
  })

  it('renders all export format buttons', () => {
    renderPanel(<ExportPanel {...defaultProps} />)
    ;['PDF', 'PNG', 'JPEG', 'Excel', 'CSV', 'export.latex'].forEach((fmt) => {
      expect(screen.getByRole('button', { name: fmt })).toBeInTheDocument()
    })
  })

  it('calls onExport with correct format on click', async () => {
    const user = userEvent.setup()
    const onExport = vi.fn()
    renderPanel(<ExportPanel {...defaultProps} onExport={onExport} />)
    await user.click(screen.getByRole('button', { name: 'PDF' }))
    expect(onExport).toHaveBeenCalledWith('pdf')
  })

  it('disables only the matching button when that format is exporting', () => {
    renderPanel(<ExportPanel {...defaultProps} exportingFormat="pdf" />)
    const pdfBtn = screen.getByRole('button', { name: 'PDF' })
    expect(pdfBtn).toBeDisabled()
    const pngBtn = screen.getByRole('button', { name: 'PNG' })
    expect(pngBtn).not.toBeDisabled()
  })

  it('renders description text', () => {
    renderPanel(<ExportPanel {...defaultProps} />)
    expect(screen.getByText(/Export as/)).toBeInTheDocument()
  })

  it('calls onExport with jpeg format', async () => {
    const user = userEvent.setup()
    const onExport = vi.fn()
    renderPanel(<ExportPanel {...defaultProps} onExport={onExport} />)
    await user.click(screen.getByRole('button', { name: /jpeg/i }))
    expect(onExport).toHaveBeenCalledWith('jpeg')
  })

  it('calls onExport with csv format', async () => {
    const user = userEvent.setup()
    const onExport = vi.fn()
    renderPanel(<ExportPanel {...defaultProps} onExport={onExport} />)
    await user.click(screen.getByRole('button', { name: /csv/i }))
    expect(onExport).toHaveBeenCalledWith('csv')
  })
})

describe('ExportPanel quality toggle', () => {
  it('renders a radiogroup with Normal and High options', () => {
    renderPanel(<ExportPanel {...defaultProps} />)
    const group = screen.getByRole('radiogroup')
    expect(group).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Normal' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'High' })).toBeInTheDocument()
  })

  it('marks the current quality as checked', () => {
    const { rerender: rawRerender } = render(<TooltipProvider><ExportPanel {...defaultProps} exportQuality="normal" /></TooltipProvider>)
    expect(screen.getByRole('radio', { name: 'Normal' })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('radio', { name: 'High' })).toHaveAttribute('aria-checked', 'false')

    rawRerender(<TooltipProvider><ExportPanel {...defaultProps} exportQuality="high" /></TooltipProvider>)
    expect(screen.getByRole('radio', { name: 'High' })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('radio', { name: 'Normal' })).toHaveAttribute('aria-checked', 'false')
  })

  it('calls onExportQualityChange when clicking the other option', async () => {
    const user = userEvent.setup()
    const onExportQualityChange = vi.fn()
    renderPanel(<ExportPanel {...defaultProps} onExportQualityChange={onExportQualityChange} />)
    await user.click(screen.getByRole('radio', { name: 'High' }))
    expect(onExportQualityChange).toHaveBeenCalledWith('high')
  })

  it('calls onExportQualityChange with normal when clicking Normal', async () => {
    const user = userEvent.setup()
    const onExportQualityChange = vi.fn()
    renderPanel(<ExportPanel {...defaultProps} exportQuality="high" onExportQualityChange={onExportQualityChange} />)
    await user.click(screen.getByRole('radio', { name: 'Normal' }))
    expect(onExportQualityChange).toHaveBeenCalledWith('normal')
  })
})
