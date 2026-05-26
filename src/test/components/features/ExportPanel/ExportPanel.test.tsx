import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { ExportPanel } from '../../../../components/features/ExportPanel/ExportPanel'

describe('ExportPanel', () => {
  it('renders the section label', () => {
    render(<ExportPanel onExport={vi.fn()} exportingFormat={null} />)
    expect(screen.getByText('Export')).toBeInTheDocument()
  })

  it('renders all export format buttons', () => {
    render(<ExportPanel onExport={vi.fn()} exportingFormat={null} />)
    ;['PDF', 'PNG', 'JPEG', 'Excel', 'CSV', 'export.latex'].forEach((fmt) => {
      expect(screen.getByRole('button', { name: fmt })).toBeInTheDocument()
    })
  })

  it('calls onExport with correct format on click', async () => {
    const user = userEvent.setup()
    const onExport = vi.fn()
    render(<ExportPanel onExport={onExport} exportingFormat={null} />)
    await user.click(screen.getByRole('button', { name: 'PDF' }))
    expect(onExport).toHaveBeenCalledWith('pdf')
  })

  it('disables only the matching button when that format is exporting', () => {
    render(<ExportPanel onExport={vi.fn()} exportingFormat="pdf" />)
    const pdfBtn = screen.getByRole('button', { name: 'PDF' })
    expect(pdfBtn).toBeDisabled()
    const pngBtn = screen.getByRole('button', { name: 'PNG' })
    expect(pngBtn).not.toBeDisabled()
  })

  it('renders description text', () => {
    render(<ExportPanel onExport={vi.fn()} exportingFormat={null} />)
    expect(screen.getByText(/Export as/)).toBeInTheDocument()
  })

  it('calls onExport with jpeg format', async () => {
    const user = userEvent.setup()
    const onExport = vi.fn()
    render(<ExportPanel onExport={onExport} exportingFormat={null} />)
    await user.click(screen.getByRole('button', { name: /jpeg/i }))
    expect(onExport).toHaveBeenCalledWith('jpeg')
  })

  it('calls onExport with csv format', async () => {
    const user = userEvent.setup()
    const onExport = vi.fn()
    render(<ExportPanel onExport={onExport} exportingFormat={null} />)
    await user.click(screen.getByRole('button', { name: /csv/i }))
    expect(onExport).toHaveBeenCalledWith('csv')
  })
})
