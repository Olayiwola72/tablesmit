export interface Step {
  number: number
  heading: string
  body: string
}

export interface FeatureStepsSectionProps {
  steps: Step[]
}
