import { Palette } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { headerColorSwatches, contentColorSwatches } from '../../../config/colorPalette/colorPalette'
import { useTableContext } from '../../../context/TableContext'
import { ColorSwatch } from '../../ui/ColorSwatch/ColorSwatch'
import { SectionLabel } from '../../ui/SectionLabel/SectionLabel'

export function ColorPanel(): ReactNode {
  const { t } = useTranslation()
  const table = useTableContext()

  return (
    <section>
      <SectionLabel>{t('panels.colorPicker')}</SectionLabel>
      <div className="space-y-4">
        <label className="flex items-center justify-between gap-3 text-sm font-medium text-text-primary">
          <span className="inline-flex items-center gap-2"><Palette size={15} aria-hidden="true" /> {t('colorPanel.headerColor')}</span>
          <input type="color" name="header-color" value={table.headerColor} onChange={(event) => table.setHeaderColor(event.target.value)} />
        </label>
        <div className="flex flex-wrap gap-2" aria-label={t('colorPanel.headerColor')}>
          {headerColorSwatches.map((swatch) => (
            <ColorSwatch key={swatch.value} {...swatch} selected={table.headerColor === swatch.value} onClick={() => table.setHeaderColor(swatch.value)} />
          ))}
        </div>
        <label className="flex items-center justify-between gap-3 text-sm font-medium text-text-primary">
          {t('colorPanel.contentColor')}
          <input type="color" name="content-text-color" value={table.contentColor} onChange={(event) => table.setContentColor(event.target.value)} />
        </label>
        <div className="flex flex-wrap gap-2" aria-label={t('colorPanel.contentColor')}>
          {contentColorSwatches.map((swatch) => (
            <ColorSwatch key={swatch.value} {...swatch} selected={table.contentColor === swatch.value} onClick={() => table.setContentColor(swatch.value)} />
          ))}
        </div>
        <label className="flex items-center justify-between gap-3 text-sm font-medium text-text-primary">
          {t('colorPanel.noColor')}
          <input type="color" name="row-bg-color" value={table.contentBgColor || '#ffffff'} onChange={(event) => table.setContentBgColor(event.target.value)} />
        </label>
        {table.contentBgColor ? (
          <button
            type="button"
            className="w-full rounded-sm px-2 py-1.5 text-xs text-text-secondary hover:bg-danger hover:text-white transition-colors"
            onClick={() => table.setContentBgColor('')}
          >
            {t('colorPanel.noColor')}
          </button>
        ) : null}
      </div>
    </section>
  )
}

export default ColorPanel
