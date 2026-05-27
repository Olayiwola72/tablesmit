import { describe, expect, it } from 'vitest'
import { brand } from '../../../config/brand/brandConfig'

describe('brand', () => {
  it('uses Tablesmit as the product name', () => {
    expect(brand.name).toBe('Tablesmit')
  })

  it('includes alternateName Tablesmith for SEO coverage', () => {
    expect(brand.alternateName).toBe('Tablesmith')
  })

  it('has a URL', () => {
    expect(brand.url).toBe('https://tablesmit.com')
  })

  it('points to the tablesmit GitHub repository', () => {
    expect(brand.githubUrl).toBe('https://github.com/Olayiwola72/tablesmit')
  })

  it('has a contact email', () => {
    expect(brand.contactEmail).toBe('hello@tablesmit.com')
  })

  it('has a default author', () => {
    expect(brand.defaultAuthor).toBe('Olayiwola Akinnagbe')
  })

  it('has an author Twitter URL', () => {
    expect(brand.authorTwitter).toBe('https://x.com/OlayiwolaAkinn1')
  })
})
