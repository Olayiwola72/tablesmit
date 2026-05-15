import { ExternalLink, Menu, X } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import logoUrl from '../../../assets/logo.svg'
import { siteConfig } from '../../../config/siteConfig'
import { KEY_ESCAPE } from '../../../constants/keys'
import { Button } from '../../ui/Button'
import { IconButton } from '../../ui/IconButton'

export function Navbar(): ReactNode {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === KEY_ESCAPE) setIsOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <div className="mx-auto flex h-14 max-w-content items-center justify-between px-4 sm:px-6 md:h-nav lg:px-8">
        <Link to={siteConfig.routes.home} aria-label="Structra home" className="flex items-center">
          <img src="/favicon.svg" alt="" className="h-8 w-8 md:hidden" />
          <img src={logoUrl} alt="Structra" className="hidden h-9 w-[165px] md:block" />
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.label}
              to={siteConfig.routes[item.route]}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild size="md">
            <Link to={siteConfig.routes.home}>Start Building</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <a href={siteConfig.brand.githubUrl} target="_blank" rel="noreferrer">
              GitHub <ExternalLink size={14} aria-hidden="true" />
            </a>
          </Button>
        </div>

        <IconButton
          className="md:hidden"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          icon={isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          onClick={() => setIsOpen((value) => !value)}
        />
      </div>

      {isOpen ? (
        <>
          <button
            type="button"
            aria-label="Close menu overlay"
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <aside className="fixed bottom-0 right-0 top-0 z-50 w-[280px] border-l border-border bg-white p-6 md:hidden">
            <div className="mb-8 flex items-center justify-between">
              <img src={logoUrl} alt="Structra" className="h-9 w-[165px]" />
              <IconButton
                aria-label="Close menu"
                icon={<X size={20} aria-hidden="true" />}
                onClick={() => setIsOpen(false)}
              />
            </div>
            <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.label}
                  to={siteConfig.routes[item.route]}
                  className="text-base font-medium text-text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="mt-4">
                <Link to={siteConfig.routes.home} onClick={() => setIsOpen(false)}>
                  Start Building
                </Link>
              </Button>
            </nav>
          </aside>
        </>
      ) : null}
    </header>
  )
}
