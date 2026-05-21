import { describe, expect, it } from 'vitest'
import { brandHomeAriaLabel, siteConfig } from '../../../config/siteConfig'

describe('siteConfig', () => {
  it('uses Tablesmit as the product name', () => {
    expect(siteConfig.brand.name).toBe('Tablesmit')
  })

  it('points to the tablesmit GitHub repository', () => {
    expect(siteConfig.brand.githubUrl).toBe('https://github.com/Olayiwola72/tablesmit')
  })

  it('uses tablesmit-table as the default export basename', () => {
    expect(siteConfig.exportFileBaseName).toBe('tablesmit-table')
  })

  it('includes North Star hero copy', () => {
    expect(siteConfig.copy.heroHeadlineLine2).toBe('analytical writing.')
    expect(siteConfig.copy.heroSubtext).toContain('minimalist table builder')
  })

  it('lists what Tablesmit is not', () => {
    expect(siteConfig.copy.whatWeAreNotHeading).toBe('What Tablesmit Is Not')
    expect(siteConfig.copy.whatWeAreNot).toContain('Not a spreadsheet.')
  })
})

describe('brandHomeAriaLabel', () => {
  it('returns an accessible home label', () => {
    expect(brandHomeAriaLabel()).toBe('Tablesmit home')
  })
})
