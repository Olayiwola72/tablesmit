import { describe, expect, it } from 'vitest'
import { routes, navItems, routerConfig } from '../../../config/routes/routesConfig'

describe('routes', () => {
  it('has a home route', () => {
    expect(routes.home.path).toBe('/')
    expect(routes.home.nav).toBe(true)
    expect(routes.home.label).toBe('Home')
  })

  it('has an about route with trailing slash', () => {
    expect(routes.about.path).toBe('/about/')
    expect(routes.about.nav).toBe(true)
    expect(routes.about.label).toBe('About')
  })

  it('has a blog route with trailing slash', () => {
    expect(routes.blog.path).toBe('/blog/')
    expect(routes.blog.nav).toBe(true)
    expect(routes.blog.label).toBe('Blog')
  })

  it('has a blogPost route with :slug param and trailing slash', () => {
    expect(routes.blogPost.path).toBe('/blog/:slug/')
    expect(routes.blogPost.nav).toBe(false)
    expect(routes.blogPost.label).toBe('Blog Post')
  })

  it('has a features route with trailing slash', () => {
    expect(routes.features.path).toBe('/features/')
    expect(routes.features.nav).toBe(true)
    expect(routes.features.label).toBe('Features')
  })

  it('has a featureDetail route with :slug param and trailing slash', () => {
    expect(routes.featureDetail.path).toBe('/features/:slug/')
    expect(routes.featureDetail.nav).toBe(false)
    expect(routes.featureDetail.label).toBe('Feature Detail')
  })

  it('has a contact route with trailing slash', () => {
    expect(routes.contact.path).toBe('/contact/')
    expect(routes.contact.nav).toBe(true)
    expect(routes.contact.label).toBe('Contact')
  })

  it('has an openSource route with trailing slash', () => {
    expect(routes.openSource.path).toBe('/open-source/')
    expect(routes.openSource.nav).toBe(true)
    expect(routes.openSource.label).toBe('Open Source')
  })

  it('has a privacy route with trailing slash', () => {
    expect(routes.privacy.path).toBe('/privacy/')
    expect(routes.privacy.nav).toBe(false)
    expect(routes.privacy.label).toBe('Privacy Policy')
  })

  it('has a terms route with trailing slash', () => {
    expect(routes.terms.path).toBe('/terms/')
    expect(routes.terms.nav).toBe(false)
    expect(routes.terms.label).toBe('Terms of Use')
  })

  it('has a changelog route with trailing slash', () => {
    expect(routes.changelog.path).toBe('/changelog/')
    expect(routes.changelog.nav).toBe(true)
    expect(routes.changelog.label).toBe('Changelog')
  })

  it('has a testimonials route with trailing slash', () => {
    expect(routes.testimonials.path).toBe('/testimonials/')
    expect(routes.testimonials.nav).toBe(true)
    expect(routes.testimonials.label).toBe('Testimonials')
  })

  it('has exactly 12 routes', () => {
    expect(Object.keys(routes)).toHaveLength(12)
  })

  it('all nav routes have nav: true', () => {
    const navRoutes = ['home', 'about', 'features', 'blog', 'contact', 'openSource', 'changelog', 'testimonials']
    navRoutes.forEach(k => expect(routes[k as keyof typeof routes].nav).toBe(true))
  })

  it('non-nav routes have nav: false', () => {
    const nonNavRoutes = ['blogPost', 'featureDetail', 'privacy', 'terms']
    nonNavRoutes.forEach(k => expect(routes[k as keyof typeof routes].nav).toBe(false))
  })

  it('all routes have a label', () => {
    Object.values(routes).forEach(r => expect(typeof r.label).toBe('string'))
  })

  it('all routes have an element', () => {
    Object.values(routes).forEach(r => expect(r.element).toBeDefined())
  })
})

describe('navItems', () => {
  it('has exactly 8 items', () => {
    expect(navItems).toHaveLength(8)
  })

  it('includes only nav: true routes', () => {
    navItems.forEach(item => expect(item.key in routes).toBe(true))
  })

  it('each item has key, label, and path', () => {
    navItems.forEach(item => {
      expect(typeof item.key).toBe('string')
      expect(typeof item.label).toBe('string')
      expect(typeof item.path).toBe('string')
    })
  })
})

describe('routerConfig', () => {
  it('has 13 entries (12 routes + 1 catch-all)', () => {
    expect(routerConfig).toHaveLength(13)
  })

  it('includes a catch-all route at the end', () => {
    const last = routerConfig[routerConfig.length - 1]
    expect(last.path).toBe('*')
  })

  it('every entry has path and element', () => {
    routerConfig.forEach(entry => {
      expect(typeof entry.path).toBe('string')
      expect(entry.element).toBeDefined()
    })
  })
})
