import { useState } from 'react'
import { siteConfig } from '../../config/siteConfig'
import { useTableContext } from '../../context/TableContext'
import { importCsv, importExcel } from '../../services/importService/importService'
import { toast, TOAST } from '../../utils/toast/toast'
import type { ImportApi } from './useImport.types'

export function useImport(): ImportApi {
  const [error, setError] = useState<string | null>(null)
  const { setCells } = useTableContext()

  const importFile = async (file: File, kind: 'csv' | 'excel'): Promise<void> => {
    setError(null)
    try {
      const result = kind === 'csv' ? await importCsv(file) : await importExcel(file)
      setCells(result.cells)
      const rows = result.cells.length
      const cols = result.cells[0]?.length ?? 0
      toast.success(TOAST.IMPORT_SUCCESS(rows, cols))
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : siteConfig.messages.importParseError
      setError(message)
      toast.error(TOAST.IMPORT_ERROR)
    }
  }

  return { error, importFile }
}
