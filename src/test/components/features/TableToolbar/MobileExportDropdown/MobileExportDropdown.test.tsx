import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { MobileExportDropdown } from '../../../../../components/features/TableToolbar/MobileExportDropdown/MobileExportDropdown'
import type { MobileExportDropdownProps } from '../../../../../components/features/TableToolbar/MobileExportDropdown/MobileExportDropdown.types'

const defaultProps: MobileExportDropdownProps = {
  isExporting: false,
  onExport: vi.fn(),
  tableRef: { current: null },
}

describe('MobileExportDropdown', () => {
  it('renders the trigger button', () => {
    render(<MobileExportDropdown {...defaultProps} />)
    expect(screen.getByRole('button', { name: /export/i })).toBeInTheDocument()
  })

  it('renders export format items in the menu', async () => {
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

  it('calls onExport with PDF when PDF item is clicked', async () => {
    const user = userEvent.setup()
    const onExport = vi.fn()
    render(<MobileExportDropdown {...defaultProps} onExport={onExport} />)
    await user.click(screen.getByRole('button', { name: /export/i }))
    await user.click(screen.getByText('PDF'))
    expect(onExport).toHaveBeenCalledWith('pdf', null)
  })

  it('calls onExport with Excel format', async () => {
    const user = userEvent.setup()
    const onExport = vi.fn()
    render(<MobileExportDropdown {...defaultProps} onExport={onExport} />)
    await user.click(screen.getByRole('button', { name: /export/i }))
    await user.click(screen.getByText('Excel'))
    expect(onExport).toHaveBeenCalledWith('excel', null)
  })

  it('passes tableRef.current to onExport when it exists', async () => {
    const user = userEvent.setup()
    const onExport = vi.fn()
    const div = document.createElement('div')
    render(<MobileExportDropdown
      isExporting={false}
      onExport={onExport}
      tableRef={{ current: div }}
    />)
    await user.click(screen.getByRole('button', { name: /export/i }))
    await user.click(screen.getByText('PDF'))
    expect(onExport).toHaveBeenCalledWith('pdf', div)
  })
})
