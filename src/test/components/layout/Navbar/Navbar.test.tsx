import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Navbar } from '../../../../components/layout/Navbar/Navbar'

vi.mock('../../../../hooks/useTheme/useTheme', () => ({
  useTheme: () => ({ theme: 'light', toggle: vi.fn() }),
}))

function Wrapper({ children }: { children: ReactNode }): ReactNode {
  return <BrowserRouter>{children}</BrowserRouter>
}

describe('Navbar', () => {
  it('renders the logo', () => {
    render(<Navbar />, { wrapper: Wrapper })
    const logos = screen.getAllByRole('img', { name: 'Tablesmit' })
    expect(logos.length).toBeGreaterThanOrEqual(1)
  })

  it('renders the logo with a link to home', () => {
    render(<Navbar />, { wrapper: Wrapper })
    const links = screen.getAllByRole('link')
    const homeLink = links.find((l) => l.getAttribute('aria-label') === 'Tablesmit home')
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('renders navigation links', () => {
    render(<Navbar />, { wrapper: Wrapper })
    expect(screen.getAllByText('Home').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('About').length).toBeGreaterThanOrEqual(1)
  })

  it('renders the hamburger menu button on mobile', () => {
    render(<Navbar />, { wrapper: Wrapper })
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument()
  })

  it('renders the language selector', () => {
    render(<Navbar />, { wrapper: Wrapper })
    expect(screen.getByRole('button', { name: 'Select language' })).toBeInTheDocument()
  })

  it('renders the dark mode toggle', () => {
    render(<Navbar />, { wrapper: Wrapper })
    expect(screen.getByRole('button', { name: /toggleDarkMode/i })).toBeInTheDocument()
  })

  it('renders the GitHub link', () => {
    render(<Navbar />, { wrapper: Wrapper })
    const githubLinks = screen.getAllByText(/GitHub/)
    expect(githubLinks.length).toBeGreaterThanOrEqual(1)
  })

  it('opens mobile menu when hamburger is clicked', async () => {
    const user = userEvent.setup()
    render(<Navbar />, { wrapper: Wrapper })
    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    const closeButtons = screen.getAllByRole('button', { name: /close menu/i })
    expect(closeButtons.length).toBeGreaterThanOrEqual(1)
  })

  it('closes mobile menu on close button click', async () => {
    const user = userEvent.setup()
    render(<Navbar />, { wrapper: Wrapper })
    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    await user.click(screen.getAllByRole('button', { name: /close menu/i })[0])
    expect(screen.queryByRole('button', { name: /close menu/i })).not.toBeInTheDocument()
  })

  it('closes mobile menu on Escape key press', async () => {
    const user = userEvent.setup()
    render(<Navbar />, { wrapper: Wrapper })
    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('button', { name: /close menu/i })).not.toBeInTheDocument()
  })
})
