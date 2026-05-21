export interface FeatureBenefit {
  icon: string
  heading: string
  body: string
}

export interface FeatureStep {
  number: number
  heading: string
  body: string
}

export interface FeaturePage {
  slug: string
  metaTitle: string
  metaDescription: string
  heroHeadline: string
  heroSubtext: string
  icon: string
  benefits: FeatureBenefit[]
  steps: FeatureStep[]
  useCases: string[]
  relatedFeatures: string[]
  relatedPost?: string
}
