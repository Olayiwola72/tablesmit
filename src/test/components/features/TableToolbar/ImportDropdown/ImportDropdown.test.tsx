import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ImportDropdown } from '../../../../../components/features/TableToolbar/ImportDropdown/ImportDropdown'
import { useImport } from '../../../../../hooks/useImport/useImport'
import * as toastModule from '../../../../../utils/toast/toast'

vi.mock('../../../../../hooks/useImport/useImport', () => ({
  useImport: vi.fn(),
}))

beforeEach(() => {
  vi.mocked(useImport).mockReturnValue({ error: null, importFile: vi.fn() })
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ImportDropdown', () => {
  it('renders the trigger button', () => {
    render(<ImportDropdown />)
    expect(screen.getByRole('button', { name: /import/i })).toBeInTheDocument()
  })

  it('opens the menu on trigger click', async () => {
    const user = userEvent.setup()
    render(<ImportDropdown />)
    await user.click(screen.getByRole('button', { name: /import/i }))
    expect(screen.getByText('Import from CSV')).toBeInTheDocument()
    expect(screen.getByText('Import from Excel')).toBeInTheDocument()
  })

  it('shows "coming soon" toast when "Clean messy data" is clicked', async () => {
    const toastSpy = vi.spyOn(toastModule.toast, 'info')
    const user = userEvent.setup()
    render(<ImportDropdown />)
    await user.click(screen.getByRole('button', { name: /import/i }))
    await user.click(screen.getByText('Clean messy data'))
    expect(toastSpy).toHaveBeenCalledOnce()
  })

  it.each([
    { accept: '.csv,text/csv', kind: 'csv' },
    { accept: '.xlsx,.xls',    kind: 'excel' },
    { accept: '.tex',          kind: 'latex' },
  ])('renders hidden file input for %s', ({ accept }) => {
    render(<ImportDropdown />)
    const input = document.querySelector<HTMLInputElement>(`input[accept="${accept}"]`)
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('hidden')
    expect(input!.type).toBe('file')
  })

  it('resets file input value after onChange fires', () => {
    render(<ImportDropdown />)
    const input = document.querySelector<HTMLInputElement>('input[accept=".csv,text/csv"]')!
    expect(input).toBeInTheDocument()

    input.dispatchEvent(new Event('change', { bubbles: true }))

    expect(input.value).toBe('')
  })

  it('shows error message when useImport returns an error', () => {
    vi.mocked(useImport).mockReturnValueOnce({ error: 'Could not read file.', importFile: vi.fn() })
    render(<ImportDropdown />)
    expect(screen.getByText('Could not read file.')).toBeInTheDocument()
  })
})
