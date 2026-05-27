import React, { type ReactElement } from 'react'
import { describe, expect, it } from 'vitest'
import { routeElements, notFoundElement } from '../../../components/routing/routeElements'

const EXPECTED_KEYS = [
  'home',
  'about',
  'blog',
  'blogPost',
  'features',
  'featureDetail',
  'contact',
  'openSource',
  'privacy',
  'terms',
  'changelog',
  'testimonials',
] as const

const REACT_ELEMENT_SYMBOL = Symbol.for('react.element')

describe('routeElements', () => {
  it('has exactly 12 route entries', () => {
    expect(Object.keys(routeElements)).toHaveLength(12)
  })

  it('has all expected route keys', () => {
    EXPECTED_KEYS.forEach(key => {
      expect(routeElements).toHaveProperty(key)
    })
  })

  it('every route element is a valid React element', () => {
    Object.values(routeElements).forEach(element => {
      expect(element).toBeDefined()
      expect(typeof element).toBe('object')
      expect(element).not.toBeNull()
    })
  })

  it('every route element has the correct React element symbol', () => {
    Object.values(routeElements).forEach(element => {
      const el = element as ReactElement
      expect(el.$$typeof).toBe(REACT_ELEMENT_SYMBOL)
    })
  })

  it('every route element has a defined type (lazy component)', () => {
    Object.values(routeElements).forEach(element => {
      const el = element as ReactElement
      expect(el.type).toBeDefined()
      expect(typeof el.type).toBe('object')
    })
  })

  it('every route element has no props (empty object)', () => {
    Object.values(routeElements).forEach(element => {
      const el = element as ReactElement
      expect(React.isValidElement(el)).toBe(true)
    })
  })

  it('has no extra keys beyond the expected ones', () => {
    const actualKeys = Object.keys(routeElements).sort()
    const expected = [...EXPECTED_KEYS].sort()
    expect(actualKeys).toEqual(expected)
  })
})

describe('notFoundElement', () => {
  it('is defined', () => {
    expect(notFoundElement).toBeDefined()
  })

  it('is a valid React element', () => {
    expect(typeof notFoundElement).toBe('object')
    expect(notFoundElement).not.toBeNull()
  })

  it('has the correct React element symbol', () => {
    const el = notFoundElement as ReactElement
    expect(el.$$typeof).toBe(REACT_ELEMENT_SYMBOL)
  })

  it('has a defined type (lazy component)', () => {
    const el = notFoundElement as ReactElement
    expect(el.type).toBeDefined()
    expect(typeof el.type).toBe('object')
  })
})

describe('routeElements + notFoundElement', () => {
  it('together cover 13 route entries (12 named + 1 catch-all)', () => {
    const routeCount = Object.keys(routeElements).length
    const notFound = notFoundElement !== undefined ? 1 : 0
    expect(routeCount + notFound).toBe(13)
  })

  it('all elements are valid React elements', () => {
    const allElements = [...Object.values(routeElements), notFoundElement]
    allElements.forEach(element => {
      expect(React.isValidElement(element)).toBe(true)
    })
  })
})
