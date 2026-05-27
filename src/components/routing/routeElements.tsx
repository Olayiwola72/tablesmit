/* eslint-disable react-refresh/only-export-components */
import { lazy, type ReactNode } from 'react'

const TableMakerPage = lazy(() => import('../../pages/TableMakerPage/TableMakerPage'))
const AboutPage = lazy(() => import('../../pages/AboutPage/AboutPage'))
const BlogListPage = lazy(() => import('../../pages/BlogListPage/BlogListPage'))
const BlogPostPage = lazy(() => import('../../pages/BlogPostPage/BlogPostPage'))
const FeaturesListPage = lazy(() => import('../../pages/FeaturesListPage/FeaturesListPage'))
const FeatureDetailPage = lazy(() => import('../../pages/FeatureDetailPage/FeatureDetailPage'))
const ContactPage = lazy(() => import('../../pages/ContactPage/ContactPage'))
const OpenSourcePage = lazy(() => import('../../pages/OpenSourcePage/OpenSourcePage'))
const PrivacyPage = lazy(() => import('../../pages/PrivacyPage/PrivacyPage'))
const TermsPage = lazy(() => import('../../pages/TermsPage/TermsPage'))
const ChangelogPage = lazy(() => import('../../pages/ChangelogPage/ChangelogPage'))
const TestimonialsPage = lazy(() => import('../../pages/TestimonialsPage/TestimonialsPage'))
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'))

export const routeElements: Record<string, ReactNode> = {
  home: <TableMakerPage />,
  about: <AboutPage />,
  blog: <BlogListPage />,
  blogPost: <BlogPostPage />,
  features: <FeaturesListPage />,
  featureDetail: <FeatureDetailPage />,
  contact: <ContactPage />,
  openSource: <OpenSourcePage />,
  privacy: <PrivacyPage />,
  terms: <TermsPage />,
  changelog: <ChangelogPage />,
  testimonials: <TestimonialsPage />,
} as const

export const notFoundElement = <NotFoundPage /> as ReactNode
