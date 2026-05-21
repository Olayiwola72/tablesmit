import type { FeaturePage } from './featureService.types'

const featureModules = import.meta.glob<Record<string, unknown>>(
  '../../content/features/*.json',
  { eager: false }
)

function parseFeature(raw: Record<string, unknown>): FeaturePage {
  return {
    slug: String(raw.slug ?? ''),
    metaTitle: String(raw.metaTitle ?? ''),
    metaDescription: String(raw.metaDescription ?? ''),
    heroHeadline: String(raw.heroHeadline ?? ''),
    heroSubtext: String(raw.heroSubtext ?? ''),
    icon: String(raw.icon ?? ''),
    benefits: Array.isArray(raw.benefits)
      ? raw.benefits.map((b: Record<string, unknown>) => ({
          icon: String(b.icon ?? ''),
          heading: String(b.heading ?? ''),
          body: String(b.body ?? ''),
        }))
      : [],
    steps: Array.isArray(raw.steps)
      ? raw.steps.map((s: Record<string, unknown>) => ({
          number: Number(s.number ?? 1),
          heading: String(s.heading ?? ''),
          body: String(s.body ?? ''),
        }))
      : [],
    useCases: Array.isArray(raw.useCases) ? raw.useCases.map(String) : [],
    relatedFeatures: Array.isArray(raw.relatedFeatures)
      ? raw.relatedFeatures.map(String)
      : [],
    relatedPost: raw.relatedPost ? String(raw.relatedPost) : undefined,
  }
}

let cache: FeaturePage[] | null = null

async function ensureLoaded(): Promise<FeaturePage[]> {
  if (cache) return cache
  const entries = Object.entries(featureModules)
  const modules = await Promise.all(entries.map(([, load]) => load()))
  cache = modules.map(m => parseFeature(m as Record<string, unknown>))
  return cache
}

export async function getFeaturesPage(
  page: number,
  perPage: number
): Promise<{ features: FeaturePage[]; total: number }> {
  const all = await ensureLoaded()
  const start = (page - 1) * perPage
  return {
    features: all.slice(start, start + perPage),
    total: all.length,
  }
}

export async function getFeatureBySlug(
  slug: string
): Promise<FeaturePage | undefined> {
  const all = await ensureLoaded()
  return all.find(f => f.slug === slug)
}

export async function getAllFeatures(): Promise<FeaturePage[]> {
  return ensureLoaded()
}
