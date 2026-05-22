import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { MobileExportDropdown } from '../../../../../components/features/TableToolbar/MobileExportDropdown/MobileExportDropdown'

const defaultProps = {
  isExporting: false,
  onExport: vi.fn(),
}

describe('MobileExportDropdown', () => {
  it('renders the Export trigger button', () => {
    render(<MobileExportDropdown {...defaultProps} />)
    expect(screen.getByRole('button', { name: /export/i })).toBeInTheDocument()
  })

  it('opens dropdown and renders all export formats', async () => {
    const user = userEvent.setup()
    render(<MobileExportDropdown {...defaultProps} />)
    await user.click(screen.getByRole('button', { name: /export/i }))
    expect(screen.getByText('PDF')).toBeInTheDocument()
    expect(screen.getByText('PNG')).toBeInTheDocument()
    expect(screen.getByText('JPEG')).toBeInTheDocument()
    expect(screen.getByText('Excel')).toBeInTheDocument()
    expect(screen.getByText('CSV')).toBeInTheDocument()
    expect(screen.getByText('LaTeX')).toBeInTheDocument()
  })

  it('calls onExport with pdf when PDF is clicked', async () => {
    const user = userEvent.setup()
    const onExport = vi.fn()
    render(<MobileExportDropdown {...defaultProps} onExport={onExport} />)
    await user.click(screen.getByRole('button', { name: /export/i }))
    await user.click(screen.getByText('PDF'))
    expect(onExport).toHaveBeenCalledWith('pdf')
  })

  it('calls onExport with csv when CSV is clicked', async () => {
    const user = userEvent.setup()
    const onExport = vi.fn()
    render(<MobileExportDropdown {...defaultProps} onExport={onExport} />)
    await user.click(screen.getByRole('button', { name: /export/i }))
    await user.click(screen.getByText('CSV'))
    expect(onExport).toHaveBeenCalledWith('csv')
  })

  it('calls onExport with excel when Excel is clicked', async () => {
    const user = userEvent.setup()
    const onExport = vi.fn()
    render(<MobileExportDropdown {...defaultProps} onExport={onExport} />)
    await user.click(screen.getByRole('button', { name: /export/i }))
    await user.click(screen.getByText('Excel'))
    expect(onExport).toHaveBeenCalledWith('excel')
  })

  it('shows loading state when isExporting is true', () => {
    render(<MobileExportDropdown {...defaultProps} isExporting={true} />)
    const button = screen.getByRole('button', { name: /export/i })
    expect(button).toHaveAttribute('aria-busy', 'true')
  })
})
