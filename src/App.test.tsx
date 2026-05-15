import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/')
  })

  it('renders Structra branding in the routed shell', () => {
    render(<App />)

    expect(screen.getAllByRole('img', { name: 'Structra' }).length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: 'Start Building' })).toBeInTheDocument()
  })

  it('places export options above quick presets in the right sidebar', async () => {
    window.history.pushState({}, '', '/app')
    render(<App />)

    const sidebar = await screen.findByLabelText('Table editing controls')
    await within(sidebar).findByRole('heading', { name: 'Export Options' })
    await within(sidebar).findByRole('heading', { name: 'Quick Presets' })
    const headings = within(sidebar)
      .getAllByRole('heading')
      .map((heading) => heading.textContent)

    expect(headings.indexOf('Export Options')).toBeLessThan(
      headings.indexOf('Quick Presets'),
    )
  })

  it('lets users set a column type directly above the table', async () => {
    const user = userEvent.setup()
    window.history.pushState({}, '', '/app')
    render(<App />)

    const columnType = (await screen.findAllByLabelText('Column type 2'))[0]
    await user.selectOptions(columnType, 'currency')

    expect(columnType).toHaveValue('currency')
  })
})
