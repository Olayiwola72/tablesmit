import { useState, useRef, useEffect, useCallback, type RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import { EXPORT_QUALITY_PRESETS, defaultExportQuality, exportFileBaseName } from '../../config/export/exportConfig'
import { useTableContext, useTableData } from '../../context/TableContext'
import { exportTable } from '../../services/exportService'
import type { ExportFormat } from '../../services/exportService/export.types'
import type { ExportQuality } from '../../config/export/exportConfig.types'
import { TABLE_THEMES } from '../../config/table/tableThemes/tableThemes'
import { toast } from '../../utils/toast/toast'
import { trackEvent } from '../../utils/analytics/analytics'
import type { ExportApi } from './useExport.types'

export function useExport(tableRef?: RefObject<HTMLDivElement | null>): ExportApi {
  const [exportingFormat, setExportingFormat] = useState<ExportFormat | null>(null)
  const [exportQuality, setExportQuality] = useState<ExportQuality>(defaultExportQuality)
  const { t } = useTranslation(['common', 'table'])
  const { cells } = useTableData()
  const {
    headerStyle, mergedRanges, headerColor, contentColor, borderColor,
    columnWidths, theme, borderStyle,
    rowColors, columnColors, columnTextAlign, cellColors, cellTextAlign,
  } = useTableContext()

  const cellsRef = useRef(cells)
  const styleRef = useRef(headerStyle)
  const mergedRef = useRef(mergedRanges)
  const qualityRef = useRef(exportQuality)
  const stylesRef = useRef({
    headerColor, contentColor, borderColor, columnWidths, theme, borderStyle,
    rowColors, columnColors, columnTextAlign, cellColors, cellTextAlign,
  })

  useEffect(() => { cellsRef.current = cells }, [cells])
  useEffect(() => { styleRef.current = headerStyle }, [headerStyle])
  useEffect(() => { mergedRef.current = mergedRanges }, [mergedRanges])
  useEffect(() => { qualityRef.current = exportQuality }, [exportQuality])
  useEffect(() => {
    stylesRef.current = {
      headerColor, contentColor, borderColor, columnWidths, theme, borderStyle,
      rowColors, columnColors, columnTextAlign, cellColors, cellTextAlign,
    }
  }, [
    headerColor, contentColor, borderColor, columnWidths, theme, borderStyle,
    rowColors, columnColors, columnTextAlign, cellColors, cellTextAlign,
  ])

  const exportAs = useCallback(async (format: ExportFormat, element: HTMLElement | null, caption?: string, captionTextColor?: string, captionBgColor?: string, captionAlignment?: 'left' | 'center' | 'right', captionItalic?: boolean): Promise<void> => {
    if (!element) return
    setExportingFormat(format)
    element.classList.add('is-exporting')
    await new Promise((resolve) => requestAnimationFrame(resolve))

    const themeConfig = TABLE_THEMES.find((t) => t.id === stylesRef.current.theme)
    const qualityPreset = EXPORT_QUALITY_PRESETS[qualityRef.current]

    try {
      await exportTable(element, {
        format,
        scale: qualityPreset.scale,
        quality: qualityPreset.jpegQuality,
        filename: (caption?.trim() ? caption.trim() : exportFileBaseName) + '',
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
      toast.success(t('toast.exportSuccess', { format: format.toUpperCase() }))
    } catch {
      toast.error(t('toast.exportError'))
    } finally {
      element.classList.remove('is-exporting')
      setExportingFormat(null)
    }
  }, [t])

  const exportAsRef = useRef(exportAs)
  useEffect(() => { exportAsRef.current = exportAs }, [exportAs])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent): void => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'X' || e.key === 'x')) {
        const target = e.target
        if (!(target instanceof Element)) return
        if (target.closest('[contenteditable]') || target.closest('input') || target.closest('textarea') || target.closest('select')) return
        e.preventDefault()
        const el = document.querySelector<HTMLElement>('[data-export-ref]')
        if (el) void exportAsRef.current('excel', el)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [tableRef])

  return { exportingFormat, exportQuality, setExportQuality, exportAs }
}
