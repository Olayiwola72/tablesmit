import type { RouteObject } from 'react-router-dom'
import { routeElements, notFoundElement } from '../../components/routing/routeElements'

export const routes = {
  home: { path: '/', label: 'Home', nav: true, element: routeElements.home },
  about: { path: '/about/', label: 'About', nav: true, element: routeElements.about },
  blog: { path: '/blog/', label: 'Blog', nav: true, element: routeElements.blog },
  blogPost: { path: '/blog/:slug/', label: 'Blog Post', nav: false, element: routeElements.blogPost },
  features: { path: '/features/', label: 'Features', nav: true, element: routeElements.features },
  featureDetail: { path: '/features/:slug/', label: 'Feature Detail', nav: false, element: routeElements.featureDetail },
  contact: { path: '/contact/', label: 'Contact', nav: true, element: routeElements.contact },
  openSource: { path: '/open-source/', label: 'Open Source', nav: true, element: routeElements.openSource },
  privacy: { path: '/privacy/', label: 'Privacy Policy', nav: false, element: routeElements.privacy },
  terms: { path: '/terms/', label: 'Terms of Use', nav: false, element: routeElements.terms },
  changelog: { path: '/changelog/', label: 'Changelog', nav: true, element: routeElements.changelog },
  testimonials: { path: '/testimonials/', label: 'Testimonials', nav: true, element: routeElements.testimonials },
} as const

type Routes = typeof routes
export type RouteKey = keyof Routes

export const routerConfig: RouteObject[] = [
  ...Object.values(routes).map(({ path, element }) => ({ path, element })),
  { path: '*', element: notFoundElement },
]

export type NavItem = { key: RouteKey; label: string; path: string }
export const navItems: NavItem[] = (Object.entries(routes) as [RouteKey, Routes[RouteKey]][])
  .filter(([, r]) => r.nav)
  .map(([key, r]) => ({ key, label: r.label, path: r.path }))
