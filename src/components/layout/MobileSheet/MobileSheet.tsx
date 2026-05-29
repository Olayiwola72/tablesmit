import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { KEY_ESCAPE } from '@/constants/keys'
import { Button } from '../../ui/Button/Button'
import type { MobileSheetProps } from './MobileSheet.types'

export function MobileSheet({ title, open, onClose, children }: MobileSheetProps): ReactNode {
  const { t } = useTranslation()
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === KEY_ESCAPE) onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <>
      <button type="button" aria-label={t('aria.closePanelOverlay')} className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={onClose} />
      <aside className="fixed inset-x-0 bottom-0 z-40 max-h-[80vh] overflow-y-auto rounded-t-md bg-white p-6 shadow-sm dark:bg-slate-900 md:hidden" aria-label={title}>
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={16} aria-hidden="true" /> {t('aria.closePanel')}
          </Button>
        </div>
        {children}
      </aside>
    </>
  )
}

export default MobileSheet
