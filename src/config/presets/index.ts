import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { PresetDefinition } from '../../types/ui.types'

const localePresetLoaders: Record<string, () => Promise<{ default: PresetDefinition[] }>> = {
  en: () => import('./en'),
  fr: () => import('./fr'),
  es: () => import('./es'),
  pt: () => import('./pt'),
  de: () => import('./de'),
  no: () => import('./no'),
  ja: () => import('./ja'),
  ar: () => import('./ar'),
}

export function usePresets(): PresetDefinition[] {
  const { i18n } = useTranslation()
  const [presets, setPresets] = useState<PresetDefinition[]>([])

  useEffect(() => {
    const lang = i18n.language?.split('-')[0] ?? 'en'
    const loader = localePresetLoaders[lang] ?? localePresetLoaders.en

    let cancelled = false
    loader().then((mod) => {
      if (!cancelled) {
        setPresets(mod.default)
      }
    })
    return () => { cancelled = true }
  }, [i18n.language])

  return presets
}
