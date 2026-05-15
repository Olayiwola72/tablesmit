import { Palette } from 'lucide-react'
import type { ReactNode } from 'react'
import { headerColorSwatches, contentColorSwatches } from '../../../config/colorPalette'
import { siteConfig } from '../../../config/siteConfig'
import { useTableContext } from '../../../context/TableContext'
import { ColorSwatch } from '../../ui/ColorSwatch'
import { SectionLabel } from '../../ui/SectionLabel'

export function ColorPanel(): ReactNode {
  const table = useTableContext()

  return (
    <section>
      <SectionLabel>{siteConfig.labels.colors}</SectionLabel>
      <div className="space-y-4">
        <label className="flex items-center justify-between gap-3 text-sm font-medium text-text-primary">
          <span className="inline-flex items-center gap-2"><Palette size={15} aria-hidden="true" /> {siteConfig.labels.header}</span>
          <input type="color" value={table.headerColor} onChange={(event) => table.setHeaderColor(event.target.value)} />
        </label>
        <div className="flex flex-wrap gap-2" aria-label="Header color presets">
          {headerColorSwatches.map((swatch) => (
            <ColorSwatch key={swatch.value} {...swatch} selected={table.headerColor === swatch.value} onClick={() => table.setHeaderColor(swatch.value)} />
          ))}
        </div>
        <label className="flex items-center justify-between gap-3 text-sm font-medium text-text-primary">
          {siteConfig.labels.content} text
          <input type="color" value={table.contentColor} onChange={(event) => table.setContentColor(event.target.value)} />
        </label>
        <div className="flex flex-wrap gap-2" aria-label="Content color presets">
          {contentColorSwatches.map((swatch) => (
            <ColorSwatch key={swatch.value} {...swatch} selected={table.contentColor === swatch.value} onClick={() => table.setContentColor(swatch.value)} />
          ))}
        </div>
        <label className="flex items-center justify-between gap-3 text-sm font-medium text-text-primary">
          Row background
          <input type="color" value={table.contentBgColor || '#ffffff'} onChange={(event) => table.setContentBgColor(event.target.value)} />
        </label>
        {table.contentBgColor ? (
          <button
            type="button"
            className="w-full rounded-sm px-2 py-1.5 text-xs text-text-secondary hover:bg-danger hover:text-white transition-colors"
            onClick={() => table.setContentBgColor('')}
          >
            Remove row background
          </button>
        ) : null}
      </div>
    </section>
  )
}
