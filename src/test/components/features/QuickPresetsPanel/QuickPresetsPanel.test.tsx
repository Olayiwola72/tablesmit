import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'
import { TableProvider } from '../../../../context/TableContext'
import { QuickPresetsPanel } from '../../../../components/features/QuickPresetsPanel/QuickPresetsPanel'
import { useTableContext } from '../../../../context/TableContext'

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <TableProvider>{children}</TableProvider>
}

function CaptionReader(): ReactNode {
  const { caption } = useTableContext()
  return <div data-testid="caption">{caption}</div>
}

describe('QuickPresetsPanel', () => {
  it('renders Templates label', () => {
    render(<QuickPresetsPanel />, { wrapper: Wrapper })
    expect(screen.getByText('Templates')).toBeInTheDocument()
  })

  it('renders all preset buttons', async () => {
    render(<QuickPresetsPanel />, { wrapper: Wrapper })
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /research notes/i })).toBeInTheDocument()
    })
    expect(screen.getByRole('button', { name: /feature matrix/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /content tracker/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /budget summary/i })).toBeInTheDocument()
  })

  it('clicking a preset button does not throw', async () => {
    const user = userEvent.setup()
    vi.spyOn(console, 'error').mockImplementation(() => {})
    render(<QuickPresetsPanel />, { wrapper: Wrapper })
    await waitFor(() => screen.getByRole('button', { name: /research notes/i }))
    await user.click(screen.getByRole('button', { name: /research notes/i }))
  })

  it('sets caption when a preset is clicked', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <QuickPresetsPanel />
        <CaptionReader />
      </div>,
      { wrapper: Wrapper },
    )
    await waitFor(() => screen.getByRole('button', { name: /research notes/i }))
    await user.click(screen.getByRole('button', { name: /research notes/i }))
    await waitFor(() => {
      expect(screen.getByTestId('caption')).toHaveTextContent('Research Notes')
    })
  })
})
