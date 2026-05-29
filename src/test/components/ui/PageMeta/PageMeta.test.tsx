import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { PageMeta } from '../../../../components/ui/PageMeta/PageMeta'

function renderPageMeta(props: Parameters<typeof PageMeta>[0]): void {
  render(
    <HelmetProvider>
      <PageMeta {...props} />
    </HelmetProvider>,
  )
}

describe('PageMeta', () => {
  beforeEach(() => {
    document.title = ''
    document.querySelector('meta[name="description"]')?.remove()
    document.querySelector('meta[property="og:title"]')?.remove()
    document.querySelector('meta[property="og:description"]')?.remove()
    document.querySelector('meta[property="og:url"]')?.remove()
    document.querySelector('link[rel="canonical"]')?.remove()
  })

  afterEach(() => {
    document.title = ''
  })

  it('sets title and description from explicit props', () => {
    renderPageMeta({ title: 'Test Title', description: 'Test description' })
    expect(document.title).toBe('Test Title')
    expect(
      document.querySelector('meta[name="description"]')?.getAttribute('content'),
    ).toBe('Test description')
  })

  it('sets og:title and og:description from explicit props', () => {
    renderPageMeta({ title: 'Test Title', description: 'Test desc' })
    expect(
      document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
    ).toBe('Test Title')
    expect(
      document.querySelector('meta[property="og:description"]')?.getAttribute('content'),
    ).toBe('Test desc')
  })

  it('generates og:url and canonical from routeKey', () => {
    renderPageMeta({
      title: 'Test',
      description: 'Test',
      routeKey: 'about',
    })
    const expected = 'https://tablesmit.com/about/'
    expect(
      document.querySelector('meta[property="og:url"]')?.getAttribute('content'),
    ).toBe(expected)
    expect(
      document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
    ).toBe(expected)
  })

  it('does not render og:url or canonical when routeKey is omitted', () => {
    renderPageMeta({ title: 'Test', description: 'Test' })
    expect(document.querySelector('meta[property="og:url"]')).toBeNull()
    expect(document.querySelector('link[rel="canonical"]')).toBeNull()
  })

  it('renders children inside Helmet', () => {
    render(
      <HelmetProvider>
        <PageMeta title="Test" description="Test">
          <script data-testid="jsonld" type="application/ld+json">{'{"key":"value"}'}</script>
        </PageMeta>
      </HelmetProvider>,
    )
    const script = document.querySelector('script[data-testid="jsonld"]')
    expect(script).toBeInTheDocument()
    expect(script?.getAttribute('type')).toBe('application/ld+json')
  })

  it('uses metaKey to derive title and description from i18n', () => {
    renderPageMeta({ metaKey: 'about', routeKey: 'about' })
    expect(document.title).toBeTruthy()
    expect(
      document.querySelector('meta[name="description"]')?.getAttribute('content'),
    ).toBeTruthy()
  })

  it('explicit title overrides metaKey-derived title', () => {
    renderPageMeta({ metaKey: 'about', title: 'Override Title', description: 'Override desc' })
    expect(document.title).toBe('Override Title')
  })

  it('ogTitle and ogDescription override defaults', () => {
    renderPageMeta({
      title: 'Title',
      description: 'Desc',
      ogTitle: 'OG Title',
      ogDescription: 'OG Desc',
    })
    expect(
      document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
    ).toBe('OG Title')
    expect(
      document.querySelector('meta[property="og:description"]')?.getAttribute('content'),
    ).toBe('OG Desc')
  })

  it('explicit ogUrl overrides routeKey-derived URL', () => {
    renderPageMeta({
      title: 'Test',
      description: 'Test',
      routeKey: 'about',
      ogUrl: 'https://custom.example.com/',
    })
    expect(
      document.querySelector('meta[property="og:url"]')?.getAttribute('content'),
    ).toBe('https://custom.example.com/')
  })

  it('explicit canonicalUrl overrides routeKey-derived canonical', () => {
    renderPageMeta({
      title: 'Test',
      description: 'Test',
      routeKey: 'about',
      canonicalUrl: 'https://custom.example.com/',
    })
    expect(
      document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
    ).toBe('https://custom.example.com/')
  })
})
