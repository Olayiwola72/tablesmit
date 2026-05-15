import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import App from '../App'

describe('App', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/')
  })

  it('renders Structra branding in the routed shell', () => {
    render(<App />)

    expect(screen.getAllByRole('img', { name: 'Structra' }).length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: 'Structra home' })).toBeInTheDocument()
  })

  it('renders export options and templates headings on the table maker page', async () => {
    window.history.pushState({}, '', '/app')
    render(<App />)

    expect(await screen.findByRole('heading', { name: 'Export Options' }, { timeout: 5000 })).toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: 'Templates' }, { timeout: 5000 })).toBeInTheDocument()
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
