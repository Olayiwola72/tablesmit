import { ChevronDown, Upload } from 'lucide-react'
import { useCallback, useRef, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { PanelLoader } from '@/components/ui/PanelLoader/PanelLoader'
import { useImport } from '@/hooks/useImport/useImport'
import { toast } from '@/utils/toast/toast'
import { Button } from '@/components/ui/Button/Button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu/DropdownMenu'

export function ImportDropdown(): ReactNode {
  const { t } = useTranslation(['common', 'table'])
  const csvInputRef = useRef<HTMLInputElement>(null)
  const excelInputRef = useRef<HTMLInputElement>(null)
  const latexInputRef = useRef<HTMLInputElement>(null)
  const { error, isImporting, importFile } = useImport()

  const importFromInput = useCallback((kind: 'csv' | 'excel' | 'latex', files: FileList | null): void => {
    const file = files?.[0]
    if (!file) return
    void importFile(file, kind)
  }, [importFile])

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm" isLoading={isImporting} disabled={isImporting}>
            <Upload size={14} aria-hidden="true" /> {t('toolbar.import')} <ChevronDown size={14} aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => csvInputRef.current?.click()}>{t('toolbar.importCsv')}</DropdownMenuItem>
          <DropdownMenuItem onClick={() => excelInputRef.current?.click()}>{t('toolbar.importExcel')}</DropdownMenuItem>
          <DropdownMenuItem onClick={() => latexInputRef.current?.click()}>{t('toolbar.importLatex')}</DropdownMenuItem>
          <DropdownMenuItem onClick={() => toast.info(t('toast.aiWaitlist'))}>{t('aiFeatures.cleanData')}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <input ref={csvInputRef} type="file" accept=".csv,text/csv" className="hidden" onChange={(event) => importFromInput('csv', event.target.files)} />
      <input ref={excelInputRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={(event) => importFromInput('excel', event.target.files)} />
      <input ref={latexInputRef} type="file" accept=".tex" className="hidden" onChange={(event) => importFromInput('latex', event.target.files)} />
      {isImporting ? <PanelLoader /> : null}
      {error ? <p className="shrink-0 text-xs text-danger" aria-live="polite">{error}</p> : null}
    </>
  )
}
