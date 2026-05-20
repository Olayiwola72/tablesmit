import { useState, useRef, useEffect } from 'react'
import { siteConfig } from '../config/siteConfig'
import { useTableContext, useTableData } from '../context/TableContext'
import { exportTable } from '../services/exportService'
import type { ExportFormat } from '../types/export.types'
import { TABLE_THEMES } from '../config/tableThemes'
import { toast, TOAST } from '../utils/toast'

export interface ExportApi {
  isExporting: boolean
  exportAs: (format: ExportFormat, element: HTMLElement | null, customFilename?: string) => Promise<void>
}

export function useExport(): ExportApi {
  const [isExporting, setIsExporting] = useState(false)
  const { cells } = useTableData()
  const {
    headerStyle, mergedRanges, headerColor, contentColor, borderColor,
    columnWidths, theme, borderStyle,
    rowColors, columnColors, columnTextAlign, cellColors, cellTextAlign,
  } = useTableContext()

  const cellsRef = useRef(cells)
  const styleRef = useRef(headerStyle)
  const mergedRef = useRef(mergedRanges)
  const stylesRef = useRef({
    headerColor, contentColor, borderColor, columnWidths, theme, borderStyle,
    rowColors, columnColors, columnTextAlign, cellColors, cellTextAlign,
  })

  useEffect(() => { cellsRef.current = cells }, [cells])
  useEffect(() => { styleRef.current = headerStyle }, [headerStyle])
  useEffect(() => { mergedRef.current = mergedRanges }, [mergedRanges])
  useEffect(() => {
    stylesRef.current = {
      headerColor, contentColor, borderColor, columnWidths, theme, borderStyle,
      rowColors, columnColors, columnTextAlign, cellColors, cellTextAlign,
    }
  }, [
    headerColor, contentColor, borderColor, columnWidths, theme, borderStyle,
    rowColors, columnColors, columnTextAlign, cellColors, cellTextAlign,
  ])

  const exportAs = async (format: ExportFormat, element: HTMLElement | null, caption?: string): Promise<void> => {
    if (!element) return
    setIsExporting(true)
    element.classList.add('is-exporting')
    await new Promise((resolve) => requestAnimationFrame(resolve))

    const themeConfig = TABLE_THEMES.find((t) => t.id === stylesRef.current.theme)

    try {
      await exportTable(element, {
        format,
        filename: (caption?.trim() ? caption.trim() : siteConfig.exportFileBaseName) + '',
        caption: caption?.trim() || undefined,
        cells: cellsRef.current,
        headerStyle: styleRef.current,
        mergedRanges: mergedRef.current,
        styles: {
          headerColor: stylesRef.current.headerColor,
          headerTextColor: themeConfig?.headerText ?? '#FFFFFF',
          borderColor: stylesRef.current.borderColor,
          columnWidths: stylesRef.current.columnWidths,
          altRowBg: themeConfig?.altRowBg ?? '#FFFFFF',
          contentBgColor: stylesRef.current.contentColor,
          rowColors: stylesRef.current.rowColors,
          columnColors: stylesRef.current.columnColors,
          cellColors: stylesRef.current.cellColors,
          columnTextAlign: stylesRef.current.columnTextAlign,
          cellTextAlign: stylesRef.current.cellTextAlign,
          borderStyle: stylesRef.current.borderStyle,
        },
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
