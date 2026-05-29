import { MousePointer2, Palette } from 'lucide-react'
import { useMemo, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { headerColorSwatches, contentColorSwatches } from '@/config/colorPalette/colorPalette'
import { useTableContext } from '@/context/TableContext'
import { MoreOptionsAccordion } from '../../ui/MoreOptionsAccordion/MoreOptionsAccordion'
import { ColorSwatch } from '../../ui/ColorSwatch/ColorSwatch'
import { FormLabel } from '../../ui/FormLabel/FormLabel'
import { SidebarPanelShell } from '../../ui/SidebarPanelShell/SidebarPanelShell'

export function ColorPanel(): ReactNode {
  const { t } = useTranslation(['common', 'table'])
  const table = useTableContext()

  const featureTags = useMemo(() => {
    return t('colorPanel.rightClickDetails', '').split('\n').filter(Boolean)
  }, [t])

  return (
    <>
    <SidebarPanelShell label={t('panels.colorPicker')}>
      <FormLabel>
        <span className="inline-flex items-center gap-2"><Palette size={15} aria-hidden="true" /> {t('colorPanel.headerColor')}</span>
        <input type="color" name="header-color" value={table.headerColor} onChange={(event) => table.setHeaderColor(event.target.value)} />
      </FormLabel>
      <div className="flex flex-wrap gap-2" aria-label={t('colorPanel.headerColor')}>
        {headerColorSwatches.map((swatch) => (
          <ColorSwatch key={swatch.value} {...swatch} selected={table.headerColor === swatch.value} onClick={() => table.setHeaderColor(swatch.value)} />
        ))}
      </div>
      <FormLabel>
        {t('colorPanel.contentColor')}
        <input type="color" name="content-text-color" value={table.contentColor} onChange={(event) => table.setContentColor(event.target.value)} />
      </FormLabel>
      <div className="flex flex-wrap gap-2" aria-label={t('colorPanel.contentColor')}>
        {contentColorSwatches.map((swatch) => (
          <ColorSwatch key={swatch.value} {...swatch} selected={table.contentColor === swatch.value} onClick={() => table.setContentColor(swatch.value)} />
        ))}
      </div>
      <FormLabel>
        {t('colorPanel.clear')}
        <input type="color" name="row-bg-color" value={table.contentBgColor || '#ffffff'} onChange={(event) => table.setContentBgColor(event.target.value)} />
      </FormLabel>
      {table.contentBgColor ? (
        <button
          type="button"
          className="w-full rounded-sm px-2 py-1.5 text-xs text-text-secondary hover:bg-danger hover:text-white transition-colors"
          onClick={() => table.setContentBgColor('')}
        >
          {t('colorPanel.clear')}
        </button>
      ) : null}
    </SidebarPanelShell>
    <MoreOptionsAccordion icon={MousePointer2} label={t('colorPanel.rightClickHint')}>
      <div className="flex flex-wrap gap-1.5">
        {featureTags.map((line) => (
          <span key={line} className="inline-block rounded-sm bg-surface px-2 py-0.5 text-[11px] text-text-muted">
            {line}
          </span>
        ))}
      </div>
    </MoreOptionsAccordion>
    </>
  )
}

export default ColorPanel
