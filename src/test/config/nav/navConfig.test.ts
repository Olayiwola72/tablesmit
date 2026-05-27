import { describe, expect, it } from 'vitest'
import { navItems, routes } from '../../../config/routes/routesConfig'

describe('navItems', () => {
  it('has exactly 8 items', () => {
    expect(navItems).toHaveLength(8)
  })

  it('contains only routes marked nav: true', () => {
    navItems.forEach(item => expect(routes[item.key].nav).toBe(true))
  })

  it('all items have a matching route in routes', () => {
    navItems.forEach(item => expect(routes[item.key]).toBeDefined())
  })

  it('contains the expected nav route keys', () => {
    const keys = navItems.map(i => i.key).sort()
    expect(keys).toEqual(['about', 'blog', 'changelog', 'contact', 'features', 'home', 'openSource', 'testimonials'])
  })
})
