import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { CtxAlignSubmenuProps } from './CtxAlignSubmenu.types'
import type { TextAlign } from '@/types/table'

const alignIcons: Record<string, ReactNode> = {
  left: <AlignLeft size={14} />,
  center: <AlignCenter size={14} />,
  right: <AlignRight size={14} />,
}

export function CtxAlignSubmenu({ currentAlign, onChange, onClose }: CtxAlignSubmenuProps): ReactNode {
  const { t } = useTranslation()

  const alignLabelMap: Record<string, string> = {
    left: t('contextMenu.alignLeft'),
    center: t('contextMenu.alignCenter'),
    right: t('contextMenu.alignRight'),
  }

  const textAlignValues: TextAlign[] = ['left', 'center', 'right']

  return (
    <div className="border-t border-border px-3 py-2">
      {textAlignValues.map((value) => (
        <button
          key={value}
          type="button"
          className={`flex w-full items-center gap-2 rounded-sm px-2 py-1 text-left text-xs hover:bg-surface ${currentAlign === value ? 'font-semibold text-primary' : 'text-text-primary'}`}
          onClick={() => { onChange(value); onClose() }}
        >
          {alignIcons[value]}
          {alignLabelMap[value]}
        </button>
      ))}
    </div>
  )
}
