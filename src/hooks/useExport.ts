import { useState } from 'react'
import { siteConfig } from '../config/siteConfig'
import { useTableContext } from '../context/TableContext'
import { exportTable } from '../services/exportService'
import type { ExportFormat } from '../types/export.types'

export interface ExportApi {
  isExporting: boolean
  exportAs: (format: ExportFormat, element: HTMLElement | null) => Promise<void>
}

export function useExport(): ExportApi {
  const [isExporting, setIsExporting] = useState(false)
  const { cells, headerStyle, mergedRanges } = useTableContext()

  const exportAs = async (format: ExportFormat, element: HTMLElement | null): Promise<void> => {
    if (!element) return
    setIsExporting(true)
    element.classList.add('is-exporting')
    await new Promise((resolve) => requestAnimationFrame(resolve))

    try {
      await exportTable(element, {
        format,
        filename: siteConfig.exportFileBaseName,
        cells,
        headerStyle,
        mergedRanges,
      } as Parameters<typeof exportTable>[1])
    } finally {
      element.classList.remove('is-exporting')
      setIsExporting(false)
    }
  }

  return { isExporting, exportAs }
}
