import type { ReactNode } from 'react'
import { siteConfig } from '../../../config/siteConfig'
import type { ExportFormat } from '../../../types/export.types'
import { Button } from '../../ui/Button'
import { SectionLabel } from '../../ui/SectionLabel'

export function ExportPanel({
  onExport,
  isExporting,
}: {
  onExport: (format: ExportFormat) => void
  isExporting: boolean
}): ReactNode {
  return (
    <section>
      <SectionLabel>Export Options</SectionLabel>
      <div className="grid grid-cols-2 gap-2">
        {siteConfig.exports.map((item) => (
          <Button key={item.format} variant="secondary" size="sm" isLoading={isExporting} onClick={() => onExport(item.format)}>
            {item.label}
          </Button>
        ))}
      </div>
      <p className="mt-3 text-xs text-text-muted">Export the finished table as PDF, PNG, JPEG, or Excel.</p>
    </section>
  )
}
