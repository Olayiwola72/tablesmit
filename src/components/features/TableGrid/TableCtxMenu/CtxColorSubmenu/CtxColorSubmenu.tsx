import type { ReactNode } from 'react'
import type { CtxColorSubmenuProps } from './CtxColorSubmenu.types'

const colorPresets = [
  '#FFE4E1', '#FFF0D9', '#FFFACD', '#E8F5E9', '#E3F2FD', '#F3E5F5',
  '#FFCDD2', '#FFE0B2', '#FFF9C4', '#C8E6C9', '#BBDEFB', '#E1BEE7',
  '#FF5722', '#FF9800', '#FFEB3B', '#4CAF50', '#2196F3', '#9C27B0',
]

export function CtxColorSubmenu({ current, onChange, onClose, customLabel, removeColorLabel }: CtxColorSubmenuProps): ReactNode {
  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-1">
        {colorPresets.map((c) => (
          <button
            key={c}
            type="button"
            aria-label={c}
            className={`h-6 w-6 rounded-sm border border-border cursor-pointer transition-transform hover:scale-110 ${current === c ? 'ring-2 ring-primary ring-offset-1' : ''}`}
            style={{ backgroundColor: c }}
            onClick={() => { onChange(c); onClose() }}
          />
        ))}
      </div>
      <label className="flex items-center justify-between gap-2 text-xs text-text-secondary">
        <span>{customLabel}</span>
        <input
          type="color"
          name="ctx-custom-color"
          value={current || '#ffffff'}
          className="h-7 w-10 cursor-pointer rounded-sm border border-border"
          onChange={(event) => { onChange(event.target.value); onClose() }}
        />
      </label>
      {current ? (
        <button
          type="button"
          className="mt-1 w-full rounded-sm px-2 py-1 text-xs text-text-secondary hover:bg-danger hover:text-white transition-colors"
          onClick={() => { onChange(''); onClose() }}
        >
          {removeColorLabel}
        </button>
      ) : null}
    </div>
  )
}
