import { Metadata } from 'next'
import Link from 'next/link'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { ArrowRight, BookOpen, Scale, Users, FileText } from 'lucide-react'
import { newsService } from '@/services/news.service'
import { News } from '@/types'
import { formatDate, truncate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'AJUCAT — Associação dos Juízes Católicos',
  description:
    'A AJUCAT reúne magistrados e profissionais do direito comprometidos com os valores cristãos.',
}

// SSR para SEO
async function getLatestNews(): Promise<News[]> {
  try {
    const data = await newsService.getPublished(1, 3)
    return data.news || []
  } catch {
    return []
  }
}

const pillars = [
  {
    icon: <Scale size={32} />,
    title: 'Justiça',
    description:
      'Comprometidos com a aplicação justa e ética das leis, em harmonia com os princípios cristãos.',
  },
  {
    icon: <BookOpen size={32} />,
    title: 'Fé',
    description:
      'A fé cristã como fundamento para o exercício responsável e humano da magistratura.',
  },
  {
    icon: <Users size={32} />,
    title: 'Fraternidade',
    description:
      'Promovendo a união e o apoio mútuo entre os magistrados e profissionais do direito.',
  },
  {
    icon: <FileText size={32} />,
    title: 'Ética',
    description:
      'Defendendo os mais elevados padrões éticos no exercício da função jurisdicional.',
  },
]

export default async function HomePage() {
  const latestNews = await getLatestNews()

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative bg-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="section-subtitle text-gold-400 mb-4">
              Associação dos Juízes Católicos
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Justiça, Fé e{' '}
              <span className="text-gold-400">Fraternidade</span>
            </h1>
            <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
              A AJUCAT reúne magistrados e profissionais do direito comprometidos
              com os valores cristãos, promovendo a ética, a justiça e a
              fraternidade no exercício da magistratura.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/sobre" className="btn-secondary">
                Conheça a AJUCAT
                <ArrowRight size={18} />
              </Link>
              <Link href="/noticias" className="btn-outline border-white text-white hover:bg-white hover:text-primary-900">
                Ver Notícias
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pilares */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-subtitle">Nossos Valores</p>
            <h2 className="section-title">Os Pilares da AJUCAT</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              Fundada sobre princípios sólidos, a AJUCAT orienta sua atuação
              pelos valores que unem fé e direito.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="text-center p-6 rounded-lg border border-neutral-100 hover:border-gold-300 hover:shadow-md transition-all group"
              >
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-700 group-hover:bg-gold-50 group-hover:text-gold-600 transition-colors">
                  {pillar.icon}
                </div>
                <h3 className="font-bold text-primary-800 mb-2">{pillar.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-subtitle">Quem Somos</p>
              <h2 className="section-title">Sobre a AJUCAT</h2>
              <p className="text-neutral-600 mb-4 leading-relaxed">
                A Associação dos Juízes Católicos (AJUCAT) é uma entidade que
                reúne magistrados, advogados e demais profissionais do direito
                que compartilham dos valores da fé cristã.
              </p>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                Nossa missão é promover a integração entre fé e direito,
                incentivando o testemunho cristão no exercício da magistratura
                e contribuindo para uma justiça mais humana e fraterna.
              </p>
              <Link href="/sobre" className="btn-primary">
                Saiba Mais
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="bg-primary-900 rounded-xl p-8 text-white">
              <blockquote className="text-lg italic text-neutral-200 leading-relaxed mb-4">
                &ldquo;A justiça sem a misericórdia é crueldade; a misericórdia
                sem a justiça é a mãe da dissolução.&rdquo;
              </blockquote>
              <cite className="text-gold-400 text-sm font-medium">
                — Santo Tomás de Aquino
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* Últimas Notícias */}
      {latestNews.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="section-subtitle">Fique Informado</p>
                <h2 className="section-title">Últimas Notícias</h2>
              </div>
              <Link
                href="/noticias"
                className="text-primary-700 hover:text-primary-900 text-sm font-medium flex items-center gap-1"
              >
                Ver todas <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestNews.map((news) => (
                <article
                  key={news.id}
                  className="card hover:shadow-md transition-shadow group"
                >
                  {news.imageUrl && (
                    <div className="aspect-video bg-neutral-100 rounded-md mb-4 overflow-hidden">
                      <img
                        src={news.imageUrl}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <time className="text-xs text-neutral-400">
                    {formatDate(news.createdAt)}
                  </time>
                  <h3 className="font-bold text-primary-800 mt-1 mb-2 group-hover:text-gold-600 transition-colors">
                    {news.title}
                  </h3>
                  {news.summary && (
                    <p className="text-sm text-neutral-500 mb-3">
                      {truncate(news.summary, 120)}
                    </p>
                  )}
                  <Link
                    href={`/noticias/${news.slug}`}
                    className="text-primary-700 hover:text-primary-900 text-sm font-medium flex items-center gap-1"
                  >
                    Leia mais <ArrowRight size={14} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Faça Parte da AJUCAT
          </h2>
          <p className="text-neutral-300 mb-8 text-lg">
            Junte-se a magistrados e profissionais do direito comprometidos
            com os valores cristãos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contato" className="btn-secondary">
              Entre em Contato
            </Link>
            <Link href="/login" className="btn-outline border-white text-white hover:bg-white hover:text-primary-900">
              Área do Membro
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
