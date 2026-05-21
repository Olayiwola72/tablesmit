import { memo, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { exportFormats } from '../../../config/export/exportConfig'
import type { ExportFormat } from '../../../services/exportService/export.types'
import { Button } from '../../ui/Button/Button'
import { SectionLabel } from '../../ui/SectionLabel/SectionLabel'

function ExportPanelRaw({
  onExport,
  isExporting,
}: {
  onExport: (format: ExportFormat) => void
  isExporting: boolean
}): ReactNode {
  const { t } = useTranslation()

  return (
    <section>
      <SectionLabel>{t('panels.export')}</SectionLabel>
      <div className="grid grid-cols-2 gap-2">
        {exportFormats.map((item) => (
          <Button key={item.format} variant="secondary" size="sm" isLoading={isExporting} onClick={() => onExport(item.format)}>
            {t(`export.${item.format}`)}
          </Button>
        ))}
      </div>
      <p className="mt-3 text-xs text-text-muted">
        {t('export.exportAs')} {exportFormats.map((e) => t(`export.${e.format}`)).join(', ').replace(/, ([^,]*)$/, ', or $1')}.
      </p>
    </section>
  )
}

const ExportPanel = memo(ExportPanelRaw)
export { ExportPanel }
export default ExportPanel
