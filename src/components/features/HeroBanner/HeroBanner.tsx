import type { ReactNode } from 'react'
import { usePageTranslation } from '@/hooks/usePageTranslation/usePageTranslation'
import { exportFormats } from '@/config/export/exportConfig'
import { BulletItem } from '../../ui/BulletItem/BulletItem'

export function HeroBanner(): ReactNode {
  const { t } = usePageTranslation('home')

  return (
    <section className="border-b border-border bg-white px-6 py-5 text-center sm:py-7 dark:border-slate-700 dark:bg-slate-900" data-print-hide>
      <h1 className="text-xl font-bold text-text-primary sm:text-2xl">
        {t('hero.headline')}
      </h1>
      <p className="mx-auto mt-1 max-w-lg text-sm text-text-secondary">
        {t('hero.subtext')}
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-text-muted sm:text-sm">
        <BulletItem>{t('hero.customHeaders')}</BulletItem>
        <BulletItem>{t('hero.columnTypes')}</BulletItem>
        <BulletItem>{t('hero.mergeCells')}</BulletItem>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary/60" aria-hidden="true" />
          {exportFormats.map((f) => f.label).join(', ')}
        </span>
      </div>
    </section>
  )
}
