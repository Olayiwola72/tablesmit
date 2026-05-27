import type { RouteObject } from 'react-router-dom'
import { RouteElements, notFoundElement } from '../../components/routing/routeElements'

export const routes = {
  home: { path: '/', label: 'Home', nav: true, element: RouteElements.home },
  about: { path: '/about/', label: 'About', nav: true, element: RouteElements.about },
  blog: { path: '/blog/', label: 'Blog', nav: true, element: RouteElements.blog },
  blogPost: { path: '/blog/:slug/', label: 'Blog Post', nav: false, element: RouteElements.blogPost },
  features: { path: '/features/', label: 'Features', nav: true, element: RouteElements.features },
  featureDetail: { path: '/features/:slug/', label: 'Feature Detail', nav: false, element: RouteElements.featureDetail },
  contact: { path: '/contact/', label: 'Contact', nav: true, element: RouteElements.contact },
  openSource: { path: '/open-source/', label: 'Open Source', nav: true, element: RouteElements.openSource },
  privacy: { path: '/privacy/', label: 'Privacy Policy', nav: false, element: RouteElements.privacy },
  terms: { path: '/terms/', label: 'Terms of Use', nav: false, element: RouteElements.terms },
  changelog: { path: '/changelog/', label: 'Changelog', nav: true, element: RouteElements.changelog },
  testimonials: { path: '/testimonials/', label: 'Testimonials', nav: true, element: RouteElements.testimonials },
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
