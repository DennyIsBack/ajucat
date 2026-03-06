import { Metadata } from 'next'
import Link from 'next/link'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { newsService } from '@/services/news.service'
import { News } from '@/types'
import { formatDate, truncate } from '@/lib/utils'
import { ArrowRight, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Notícias',
  description: 'Acompanhe as últimas notícias e comunicados da AJUCAT.',
}

async function getNews(): Promise<{ news: News[]; total: number }> {
  try {
    const data = await newsService.getPublished(1, 12)
    return { news: data.news || [], total: data.total || 0 }
  } catch {
    return { news: [], total: 0 }
  }
}

export default async function NoticiasPage() {
  const { news, total } = await getNews()

  return (
    <PublicLayout>
      {/* Hero da seção */}
      <section className="bg-primary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-subtitle text-gold-400">Comunicados</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Notícias da AJUCAT
          </h1>
          <p className="text-neutral-300 mt-2">
            {total} {total === 1 ? 'publicação' : 'publicações'}
          </p>
        </div>
      </section>

      {/* Lista de notícias */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {news.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-neutral-400 text-lg">
                Nenhuma notícia publicada ainda.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow group"
                >
                  {item.imageUrl && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                      <Calendar size={12} />
                      <time>{formatDate(item.createdAt)}</time>
                    </div>
                    <h2 className="font-bold text-primary-800 mb-2 group-hover:text-gold-600 transition-colors line-clamp-2">
                      {item.title}
                    </h2>
                    {item.summary && (
                      <p className="text-sm text-neutral-500 mb-3 line-clamp-3">
                        {item.summary}
                      </p>
                    )}
                    <Link
                      href={`/noticias/${item.slug}`}
                      className="text-primary-700 hover:text-primary-900 text-sm font-medium flex items-center gap-1"
                    >
                      Leia mais <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  )
}
