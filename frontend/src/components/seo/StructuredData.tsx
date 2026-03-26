import { ReactNode } from 'react'

interface StructuredDataProps {
  data: Record<string, any>
}

export function StructuredData({ data }: StructuredDataProps): ReactNode {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vise Creative Studio',
    url: 'https://vise.creativestudio.com',
    logo: 'https://vise.creativestudio.com/logo.png',
    description:
      'Landing pages profissionais e otimizadas para SEO a $400 fixo. Design minimalista, responsivo e com animações.',
    contact: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '+54-9-9618-4974',
      email: 'vise.creativestudio@gmail.com',
    },
    sameAs: [
      'https://wa.me/54996184974',
      'https://instagram.com/vise.creative',
      'https://facebook.com/visecreative',
    ],
  }
}

export function getServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Landing Page Profissional',
    description:
      'Landing pages SEO otimizadas com design responsivo, animações e integração de pagamento. Tudo por $400 fixo.',
    provider: {
      '@type': 'Organization',
      name: 'Vise Creative Studio',
      url: 'https://vise.creativestudio.com',
    },
    areaServed: 'Worldwide',
    priceRange: '$400',
    offers: {
      '@type': 'Offer',
      price: '400',
      priceCurrency: 'USD',
      url: 'https://vise.creativestudio.com/vise/checkout',
    },
  }
}

export function getProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Landing Page Profissional',
    description:
      'Landing page SEO otimizada com design responsivo, animações suaves e integração com WhatsApp e pagamento.',
    brand: {
      '@type': 'Brand',
      name: 'Vise Creative Studio',
    },
    offers: {
      '@type': 'Offer',
      price: '400',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://vise.creativestudio.com/vise/checkout',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '45',
    },
  }
}

export function getFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quanto custa uma landing page?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nossas landing pages custam $400 fixo, sem custos adicionais.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quanto tempo leva para desenvolver?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Geralmente 7-14 dias após o briefing ser preenchido.',
        },
      },
      {
        '@type': 'Question',
        name: 'A landing page é SEO otimizada?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sim, todas as nossas landing pages incluem otimização SEO completa com meta tags, schema.org, sitemap e robots.txt.',
        },
      },
      {
        '@type': 'Question',
        name: 'Vocês oferecem suporte?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sim, oferecemos 30 dias de suporte técnico após o deploy.',
        },
      },
    ],
  }
}
