import { ExternalLink, Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { siteConfig } from '../../../config/siteConfig'
import { KEY_ESCAPE } from '../../../constants/keys'
import { Button } from '../../ui/Button/Button'
import { IconButton } from '../../ui/IconButton/IconButton'
import { LanguagePicker } from '../../ui/LanguagePicker/LanguagePicker'
import { Logo } from '../../ui/Logo/Logo'
import { useTheme } from '../../../hooks/useTheme/useTheme'

const { brand, routes } = siteConfig

export function Navbar(): ReactNode {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const logoTheme = theme === 'dark' ? 'dark' : 'light'

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === KEY_ESCAPE) setIsOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto flex h-14 max-w-content items-center justify-between px-4 sm:px-6 md:h-nav lg:px-8">
        <Link to={routes.home} aria-label={`${brand.name} home`} className="flex items-center">
          <Logo variant="icon" theme={logoTheme} className="h-8 w-8 md:hidden" />
          <Logo variant="full" theme={logoTheme} className="hidden h-9 w-[165px] md:block" />
        </Link>

        <nav aria-label={t('aria.openMenu')} className="hidden items-center gap-6 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.label}
              to={siteConfig.routes[item.route]}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-primary"
            >
              {t(`nav.${item.route}`, item.label)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguagePicker />
          <IconButton
            aria-label={t('aria.toggleDarkMode', { mode: theme === 'light' ? 'dark' : 'light' })}
            icon={theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            onClick={toggle}
          />
          <Button asChild variant="ghost" size="sm">
            <a href={brand.githubUrl} target="_blank" rel="noreferrer">
              GitHub <ExternalLink size={14} aria-hidden="true" />
            </a>
          </Button>
        </div>

        <IconButton
          className="md:hidden"
          aria-label={isOpen ? t('aria.closeMenu') : t('aria.openMenu')}
          icon={isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          onClick={() => setIsOpen((value) => !value)}
        />
      </div>

      {isOpen ? (
        <>
          <button
            type="button"
            aria-label={t('aria.closeMenu')}
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <aside className="fixed bottom-0 right-0 top-0 z-50 w-[280px] border-l border-border bg-white p-6 md:hidden">
            <div className="mb-8 flex items-center justify-between">
              <Logo variant="full" theme={logoTheme} className="h-9 w-[165px]" />
              <IconButton
                aria-label={t('aria.closeMenu')}
                icon={<X size={20} aria-hidden="true" />}
                onClick={() => setIsOpen(false)}
              />
            </div>
            <nav className="flex flex-col gap-4" aria-label={t('aria.closeMenu')}>
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.label}
                  to={siteConfig.routes[item.route]}
                  className="text-base font-medium text-text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {t(`nav.${item.route}`, item.label)}
                </Link>
              ))}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border dark:border-slate-700">
                <LanguagePicker align="start" onSelect={() => setIsOpen(false)} />
                <Button variant="ghost" size="sm" onClick={toggle} aria-label={t('aria.toggleDarkMode', { mode: theme === 'light' ? 'dark' : 'light' })}>
                  {theme === 'light' ? <><Moon size={14} /> Dark mode</> : <><Sun size={14} /> Light mode</>}
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <a
                    href={brand.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setIsOpen(false)}
                  >
                    GitHub <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </nav>
          </aside>
        </>
      ) : null}
    </header>
  )
}
