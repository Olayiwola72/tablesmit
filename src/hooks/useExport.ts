import { useState, useRef, useEffect } from 'react'
import { siteConfig } from '../config/siteConfig'
import { useTableContext, useTableData } from '../context/TableContext'
import { exportTable } from '../services/exportService'
import type { ExportFormat } from '../types/export.types'
import { toast, TOAST } from '../utils/toast'

export interface ExportApi {
  isExporting: boolean
  exportAs: (format: ExportFormat, element: HTMLElement | null, customFilename?: string) => Promise<void>
}

export function useExport(): ExportApi {
  const [isExporting, setIsExporting] = useState(false)
  const { cells } = useTableData()
  const { headerStyle, mergedRanges } = useTableContext()

  const cellsRef = useRef(cells)
  const styleRef = useRef(headerStyle)
  const mergedRef = useRef(mergedRanges)

  useEffect(() => { cellsRef.current = cells }, [cells])
  useEffect(() => { styleRef.current = headerStyle }, [headerStyle])
  useEffect(() => { mergedRef.current = mergedRanges }, [mergedRanges])

  const exportAs = async (format: ExportFormat, element: HTMLElement | null, customFilename?: string): Promise<void> => {
    if (!element) return
    setIsExporting(true)
    element.classList.add('is-exporting')
    await new Promise((resolve) => requestAnimationFrame(resolve))

    try {
      await exportTable(element, {
        format,
        filename: (customFilename?.trim() ? customFilename.trim() : siteConfig.exportFileBaseName) + '',
        cells: cellsRef.current,
        headerStyle: styleRef.current,
        mergedRanges: mergedRef.current,
      })
      toast.success(TOAST.EXPORT_SUCCESS(format.toUpperCase()))
    } catch {
      toast.error(TOAST.EXPORT_ERROR)
    } finally {
      element.classList.remove('is-exporting')
      setIsExporting(false)
    }
  }

  return { isExporting, exportAs }
}
