import { memo, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { EXPORT_QUALITY_PRESETS, exportFormats } from '@/config/export/exportConfig'
import type { ExportQuality } from '@/config/export/exportConfig.types'
import { Button } from '../../ui/Button/Button'
import { SectionLabel } from '../../ui/SectionLabel/SectionLabel'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/Tooltip/Tooltip'
import type { ExportPanelProps } from './ExportPanel.types'

const QUALITY_LABEL_KEYS: Record<string, string> = {
  normal: 'export.qualityNormal',
  high: 'export.qualityHigh',
}

const QUALITY_TOOLTIP_KEYS: Record<string, string> = {
  normal: 'export.qualityNormalDescription',
  high: 'export.qualityHighDescription',
}

function ExportPanelRaw({
  onExport,
  exportingFormat,
  exportQuality,
  onExportQualityChange,
}: ExportPanelProps): ReactNode {
  const { t } = useTranslation(['common', 'table'])
  const presets = Object.values(EXPORT_QUALITY_PRESETS)

  return (
    <section>
      <SectionLabel>{t('panels.export')}</SectionLabel>

      <div className="mb-3 flex rounded-md border border-border p-0.5" role="radiogroup" aria-label={t('export.qualityLabel')}>
        {presets.map((preset) => (
          <Tooltip key={preset.quality}>
            <TooltipTrigger asChild>
              <button
                role="radio"
                aria-checked={exportQuality === preset.quality}
                className={`flex-1 rounded-sm px-2 py-1 text-xs font-medium transition-colors duration-150 ${
                  exportQuality === preset.quality
                    ? 'bg-primary text-text-inverse'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                onClick={() => onExportQualityChange(preset.quality as ExportQuality)}
              >
                {t(QUALITY_LABEL_KEYS[preset.quality])}
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {t(QUALITY_TOOLTIP_KEYS[preset.quality])}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {exportFormats.map((item) => (
          <Button key={item.format} variant="secondary" size="sm" isLoading={exportingFormat === item.format} onClick={() => onExport(item.format)}>
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
