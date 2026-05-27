import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import type { ReactNode } from 'react'
import { TableProvider } from '../../../../context/TableContext'
import { ThemePicker } from '../../../../components/features/ThemePicker/ThemePicker'
import { TABLE_THEMES } from '../../../../config/table/tableThemes/tableThemes'

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <TableProvider>{children}</TableProvider>
}

describe('ThemePicker', () => {
  it('renders the section label', () => {
    render(<ThemePicker />, { wrapper: Wrapper })
    expect(screen.getByText('Theme')).toBeInTheDocument()
  })

  it('renders all 6 theme options', () => {
    render(<ThemePicker />, { wrapper: Wrapper })
    const buttons = screen.getAllByRole('button', { name: /Select table theme/i })
    expect(buttons).toHaveLength(TABLE_THEMES.length)
  })

  it('highlights the default theme as selected initially', () => {
    render(<ThemePicker />, { wrapper: Wrapper })
    const defaultBtn = screen.getByText('Default')
    const parent = defaultBtn.closest('button')
    expect(parent).toHaveAttribute('aria-pressed', 'true')
  })

  it('calls setTheme when a theme card is clicked', async () => {
    const user = userEvent.setup()
    render(<ThemePicker />, { wrapper: Wrapper })
    const minimalBtn = screen.getByText('Minimal').closest('button')!
    await user.click(minimalBtn)
    expect(minimalBtn).toHaveAttribute('aria-pressed', 'true')
  })

  it('updates selected theme on subsequent clicks', async () => {
    const user = userEvent.setup()
    render(<ThemePicker />, { wrapper: Wrapper })
    const strippedBtn = screen.getByText('Striped').closest('button')!
    await user.click(strippedBtn)
    expect(strippedBtn).toHaveAttribute('aria-pressed', 'true')
    const defaultBtn = screen.getByText('Default').closest('button')!
    expect(defaultBtn).toHaveAttribute('aria-pressed', 'false')
  })
})
