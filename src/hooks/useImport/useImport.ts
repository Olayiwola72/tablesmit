import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTableContext } from '../../context/TableContext'
import { importCsv, importExcel } from '../../services/importService'
import { toast } from '../../utils/toast/toast'
import { trackEvent } from '../../utils/analytics/analytics'
import type { ImportApi } from './useImport.types'

export function useImport(): ImportApi {
  const { t } = useTranslation()
  const [error, setError] = useState<string | null>(null)
  const [isImporting, setIsImporting] = useState(false)
  const { setCells, setHeaderColor, setHeaderStyle, setCellColor, setCaption, setContentColor, setBorderColor, setCaptionTextColor, setCaptionBgColor } = useTableContext()

  const importFile = async (file: File, kind: 'csv' | 'excel'): Promise<void> => {
    setError(null)
    setIsImporting(true)
    try {
      const result = kind === 'csv' ? await importCsv(file) : await importExcel(file)
      setCells(result.cells, result.mergedRanges)

      if (result.caption) setCaption(result.caption)
      if (result.captionTextColor) setCaptionTextColor(result.captionTextColor)
      if (result.captionBgColor) setCaptionBgColor(result.captionBgColor)
      if (result.headerColor) setHeaderColor(result.headerColor)
      if (result.headerStyle) setHeaderStyle(result.headerStyle)
      if (result.contentColor) setContentColor(result.contentColor)
      if (result.borderColor) setBorderColor(result.borderColor)
      if (result.cellColors) {
        for (const [cellId, color] of Object.entries(result.cellColors)) {
          setCellColor(cellId, color)
        }
      }
      const rows = result.cells.length
      const cols = result.cells[0]?.length ?? 0
      trackEvent('table_imported', { source: kind, rows, cols })
      toast.success(t('toast.importSuccess', { rows, cols }))
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : null
      setError(message)
      toast.error(message ?? t('toast.importError'))
    } finally {
      setIsImporting(false)
    }
  }

  return { error, isImporting, importFile }
}
