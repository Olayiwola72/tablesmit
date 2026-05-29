import { useTranslation } from 'react-i18next'
import { useEffect, useRef } from 'react'
import { loadNamespace, type Namespace } from '../../i18n/i18n'

export function usePageTranslation(...namespaces: Namespace[]) {
  const { t, i18n } = useTranslation(['common', ...namespaces])
  const loadedRef = useRef('')

  useEffect(() => {
    const lng = i18n.language?.split('-')[0] ?? 'en'
    const key = `${lng}:${namespaces.join(',')}`
    if (loadedRef.current === key) return
    loadedRef.current = key
    namespaces.forEach((ns) => loadNamespace(lng, ns))
  }, [i18n.language, namespaces])

  return { t }
}
