import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ExportPanel } from '../../../../components/features/ExportPanel/ExportPanel'

describe('ExportPanel', () => {
  it('renders Export label', () => {
    render(<ExportPanel onExport={vi.fn()} isExporting={false} />)
    expect(screen.getByText('Export')).toBeInTheDocument()
  })

  it('renders all six export format buttons', () => {
    render(<ExportPanel onExport={vi.fn()} isExporting={false} />)
    expect(screen.getByRole('button', { name: /pdf/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /png/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /jpeg/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /excel/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /csv/i })).toBeInTheDocument()
  })

  it('calls onExport with the format when clicked', async () => {
    const user = userEvent.setup()
    const onExport = vi.fn()
    render(<ExportPanel onExport={onExport} isExporting={false} />)
    await user.click(screen.getByRole('button', { name: /pdf/i }))
    expect(onExport).toHaveBeenCalledWith('pdf')
  })

  it('calls onExport with jpeg format', async () => {
    const user = userEvent.setup()
    const onExport = vi.fn()
    render(<ExportPanel onExport={onExport} isExporting={false} />)
    await user.click(screen.getByRole('button', { name: /jpeg/i }))
    expect(onExport).toHaveBeenCalledWith('jpeg')
  })

  it('calls onExport with csv format', async () => {
    const user = userEvent.setup()
    const onExport = vi.fn()
    render(<ExportPanel onExport={onExport} isExporting={false} />)
    await user.click(screen.getByRole('button', { name: /csv/i }))
    expect(onExport).toHaveBeenCalledWith('csv')
  })
})
