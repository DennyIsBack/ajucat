import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'

export const metadata: Metadata = {
  title: {
    default: 'AJUCAT — Associação dos Juízes Católicos',
    template: '%s | AJUCAT',
  },
  description:
    'A AJUCAT é uma associação que reúne magistrados e profissionais do direito comprometidos com os valores cristãos, promovendo a justiça, a ética e a fraternidade no exercício da magistratura.',
  keywords: [
    'AJUCAT',
    'juízes católicos',
    'associação',
    'magistratura',
    'direito',
    'justiça',
    'fé',
  ],
  authors: [{ name: 'AJUCAT' }],
  creator: 'AJUCAT',
  publisher: 'AJUCAT',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'https://ajucat.org.br'
  ),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://ajucat.org.br',
    siteName: 'AJUCAT',
    title: 'AJUCAT — Associação dos Juízes Católicos',
    description:
      'Associação que reúne magistrados e profissionais do direito comprometidos com os valores cristãos.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AJUCAT — Associação dos Juízes Católicos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AJUCAT — Associação dos Juízes Católicos',
    description:
      'Associação que reúne magistrados e profissionais do direito comprometidos com os valores cristãos.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
