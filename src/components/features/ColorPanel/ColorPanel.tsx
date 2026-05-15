import { Palette } from 'lucide-react'
import type { ReactNode } from 'react'
import { siteConfig } from '../../../config/siteConfig'
import { useTableContext } from '../../../context/TableContext'
import { ColorSwatch } from '../../ui/ColorSwatch'
import { SectionLabel } from '../../ui/SectionLabel'

export function ColorPanel(): ReactNode {
  const table = useTableContext()

  return (
    <section>
      <SectionLabel>Colors</SectionLabel>
      <div className="space-y-4">
        <label className="flex items-center justify-between gap-3 text-sm font-medium text-text-primary">
          <span className="inline-flex items-center gap-2"><Palette size={15} aria-hidden="true" /> Header</span>
          <input type="color" value={table.headerColor} onChange={(event) => table.setHeaderColor(event.target.value)} />
        </label>
        <div className="flex flex-wrap gap-2" aria-label="Header color presets">
          {siteConfig.colors.header.map((swatch) => (
            <ColorSwatch key={swatch.value} {...swatch} selected={table.headerColor === swatch.value} onClick={() => table.setHeaderColor(swatch.value)} />
          ))}
        </div>
        <label className="flex items-center justify-between gap-3 text-sm font-medium text-text-primary">
          Content
          <input type="color" value={table.contentColor} onChange={(event) => table.setContentColor(event.target.value)} />
        </label>
        <div className="flex flex-wrap gap-2" aria-label="Content color presets">
          {siteConfig.colors.content.map((swatch) => (
            <ColorSwatch key={swatch.value} {...swatch} selected={table.contentColor === swatch.value} onClick={() => table.setContentColor(swatch.value)} />
          ))}
        </div>
      </div>
    </section>
  )
}
