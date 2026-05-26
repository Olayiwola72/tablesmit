import { useState, useRef, useEffect } from 'react'
import { siteConfig } from '../../config/siteConfig'
import { useTableContext, useTableData } from '../../context/TableContext'
import { exportTable } from '../../services/exportService'
import type { ExportFormat } from '../../services/exportService/export.types'
import { TABLE_THEMES } from '../../config/table/tableThemes'
import { toast, TOAST } from '../../utils/toast/toast'
import { trackEvent } from '../../utils/analytics/analytics'
import type { ExportApi } from './useExport.types'

export function useExport(): ExportApi {
  const [exportingFormat, setExportingFormat] = useState<ExportFormat | null>(null)
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

  const exportAs = async (format: ExportFormat, element: HTMLElement | null, caption?: string, captionTextColor?: string, captionBgColor?: string, captionAlignment?: 'left' | 'center' | 'right', captionItalic?: boolean): Promise<void> => {
    if (!element) return
    setExportingFormat(format)
    element.classList.add('is-exporting')
    await new Promise((resolve) => requestAnimationFrame(resolve))

    const themeConfig = TABLE_THEMES.find((t) => t.id === stylesRef.current.theme)

    try {
      await exportTable(element, {
        format,
        filename: (caption?.trim() ? caption.trim() : siteConfig.exportFileBaseName) + '',
        caption: caption?.trim() || undefined,
        captionTextColor: captionTextColor?.trim() || undefined,
        captionBgColor: captionBgColor?.trim() || undefined,
        captionAlignment,
        captionItalic,
        cells: cellsRef.current,
        headerStyle: styleRef.current,
        mergedRanges: mergedRef.current,
        styles: {
          headerColor: stylesRef.current.headerColor,
          headerTextColor: themeConfig?.headerText ?? '#FFFFFF',
          contentColor: stylesRef.current.contentColor,
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
      trackEvent('table_exported', { format })
      toast.success(TOAST.EXPORT_SUCCESS(format.toUpperCase()))
    } catch {
      toast.error(TOAST.EXPORT_ERROR)
    } finally {
      element.classList.remove('is-exporting')
      setExportingFormat(null)
    }
  }

  return { exportingFormat, exportAs }
}
