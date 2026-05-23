import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import App from '../App'

describe('App', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/')
  })

  it('renders Tablesmit branding in the routed shell', () => {
    render(<App />)

    expect(screen.getAllByRole('img', { name: 'Tablesmit' }).length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: 'Tablesmit home' })).toBeInTheDocument()
  })

  it('renders export options on the table maker page', async () => {
    window.history.pushState({}, '', '/')
    render(<App />)

    expect(await screen.findByRole('heading', { name: 'Export' }, { timeout: 15000 })).toBeInTheDocument()
  })

  it('lets users set a column type directly above the table', async () => {
    const user = userEvent.setup()
    window.history.pushState({}, '', '/')
    render(<App />)

    const columnType = (await screen.findAllByLabelText(/column type 2/i))[0]
    await user.selectOptions(columnType, 'currency')

    expect(columnType).toHaveValue('currency')
  })
})
