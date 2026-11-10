import { site } from '#shared/data/site'
import { services } from '#shared/data/services'

interface SeoInput {
  title: string
  description: string
  path: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
}

export function useSiteUrl() {
  return useRuntimeConfig().public.siteUrl as string
}

export function absolute(path: string) {
  const base = useSiteUrl()
  if (/^https?:\/\//.test(path)) return path
  return `${base}${path}`
}

export function useSeo(input: SeoInput) {
  const url = absolute(input.path)
  const image = absolute(input.image || '/og/jurere-beaute.jpg')
  useSeoMeta({
    title: input.title,
    description: input.description,
    ogTitle: input.title,
    ogDescription: input.description,
    ogType: input.type || 'website',
    ogUrl: url,
    ogImage: image,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: input.imageAlt || 'Jurerê Beauté, salão de beleza em Jurerê Internacional',
    ogLocale: 'pt_BR',
    ogSiteName: site.name,
    twitterCard: 'summary_large_image',
    twitterTitle: input.title,
    twitterDescription: input.description,
    twitterImage: image,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  })
  useHead({
    link: [
      { rel: 'canonical', href: url },
      { rel: 'alternate', hreflang: 'pt-BR', href: url },
    ],
  })
}

export function useJsonLd(data: Record<string, unknown> | Record<string, unknown>[]) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(Array.isArray(data) ? { '@context': 'https://schema.org', '@graph': data } : { '@context': 'https://schema.org', ...data }),
      },
    ],
  })
}

/** Entidade principal do negócio (usada em todas as páginas via @id). */
export function salonSchema() {
  const base = useSiteUrl()
  return {
    '@type': ['HairSalon', 'BeautySalon', 'NailSalon'],
    '@id': `${base}/#salao`,
    name: site.name,
    alternateName: ['Jurerê Beauté Salão de Beleza', 'Salão de Beleza Jurerê Beauté', 'Jurere Beaute'],
    description: site.description,
    url: `${base}/`,
    telephone: site.phone,
    image: [`${base}/og/jurere-beaute.jpg`, `${base}/images/morena-iluminada-tons-quentes-1-1080.webp`, `${base}/images/mechas-efeito-natural-1-1080.webp`],
    logo: `${base}/brand/jurere-beaute-selo-512.png`,
    priceRange: '$$$',
    currenciesAccepted: 'BRL',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.googleMaps,
    areaServed: [
      { '@type': 'Place', name: 'Jurerê Internacional' },
      { '@type': 'City', name: 'Florianópolis' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: site.hours.days.map((d) => `https://schema.org/${d}`),
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: [site.instagram, site.googleMaps],
    brand: site.brands.map((b) => ({ '@type': 'Brand', name: b })),
    amenityFeature: site.amenities.map((a) => ({ '@type': 'LocationFeatureSpecification', name: a, value: true })),
    potentialAction: {
      '@type': 'ReserveAction',
      target: { '@type': 'EntryPoint', urlTemplate: `https://wa.me/${site.whatsapp}`, inLanguage: 'pt-BR' },
      result: { '@type': 'Reservation', name: 'Agendamento pelo WhatsApp' },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços do Jurerê Beauté',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, url: `${base}/servicos/${s.slug}` },
      })),
    },
  }
}

export function websiteSchema() {
  const base = useSiteUrl()
  return {
    '@type': 'WebSite',
    '@id': `${base}/#site`,
    url: `${base}/`,
    name: site.name,
    inLanguage: 'pt-BR',
    publisher: { '@id': `${base}/#salao` },
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absolute(it.path),
    })),
  }
}

export function faqSchema(list: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: list.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}
