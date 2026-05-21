import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import type { ReactNode } from 'react'
import { TableProvider } from '../../../../context/TableProvider'
import { HeaderOptionsPanel } from '../../../../components/features/HeaderOptionsPanel/HeaderOptionsPanel'

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <TableProvider>{children}</TableProvider>
}

describe('HeaderOptionsPanel', () => {
  it('renders the section label', () => {
    render(<HeaderOptionsPanel />, { wrapper: Wrapper })
    expect(screen.getByText('Header Definitions')).toBeInTheDocument()
  })

  it('renders the header style select', () => {
    render(<HeaderOptionsPanel />, { wrapper: Wrapper })
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders header style options', () => {
    render(<HeaderOptionsPanel />, { wrapper: Wrapper })
    expect(screen.getByText('None')).toBeInTheDocument()
    expect(screen.getByText('First Row')).toBeInTheDocument()
    expect(screen.getByText('First Column')).toBeInTheDocument()
    expect(screen.getByText('Both')).toBeInTheDocument()
  })

  it('shows the current header style', () => {
    render(<HeaderOptionsPanel />, { wrapper: Wrapper })
    expect(screen.getByText(/Current:/)).toBeInTheDocument()
  })

  it('renders freeze row checkbox', () => {
    render(<HeaderOptionsPanel />, { wrapper: Wrapper })
    const checkbox = screen.getByRole('checkbox', { name: /freeze header row/i })
    expect(checkbox).toBeInTheDocument()
  })

  it('renders freeze column checkbox', () => {
    render(<HeaderOptionsPanel />, { wrapper: Wrapper })
    expect(screen.getByRole('checkbox', { name: /freeze first column/i })).toBeInTheDocument()
  })

  it('freeze row checkbox is unchecked by default', () => {
    render(<HeaderOptionsPanel />, { wrapper: Wrapper })
    expect(screen.getByRole('checkbox', { name: /freeze header row/i })).not.toBeChecked()
  })

  it('freeze column checkbox is unchecked by default', () => {
    render(<HeaderOptionsPanel />, { wrapper: Wrapper })
    expect(screen.getByRole('checkbox', { name: /freeze first column/i })).not.toBeChecked()
  })

  it('checking freeze row checks the checkbox', async () => {
    const user = userEvent.setup()
    render(<HeaderOptionsPanel />, { wrapper: Wrapper })
    const checkbox = screen.getByRole('checkbox', { name: /freeze header row/i })
    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('unchecking freeze row unchecks the checkbox', async () => {
    const user = userEvent.setup()
    render(<HeaderOptionsPanel />, { wrapper: Wrapper })
    const checkbox = screen.getByRole('checkbox', { name: /freeze header row/i })
    await user.click(checkbox)
    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('checking freeze column checks the checkbox', async () => {
    const user = userEvent.setup()
    render(<HeaderOptionsPanel />, { wrapper: Wrapper })
    const checkbox = screen.getByRole('checkbox', { name: /freeze first column/i })
    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('changing header style select does not throw', async () => {
    const user = userEvent.setup()
    render(<HeaderOptionsPanel />, { wrapper: Wrapper })
    const select = screen.getByRole('combobox')
    await user.selectOptions(select, 'first-column')
    expect(select).toHaveValue('first-column')
  })
})
