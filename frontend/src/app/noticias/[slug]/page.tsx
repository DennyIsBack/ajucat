import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { newsService } from '@/services/news.service'
import { formatDate } from '@/lib/utils'
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react'
import { ShareButtons } from '@/components/public/ShareButtons'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const news = await newsService.getBySlug(params.slug)
    return {
      title: news.title,
      description: news.summary || news.content.slice(0, 160),
      openGraph: {
        title: news.title,
        description: news.summary || news.content.slice(0, 160),
        type: 'article',
        publishedTime: news.createdAt,
        authors: [news.author.name],
        images: news.imageUrl
          ? [{ url: news.imageUrl, alt: news.title }]
          : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: news.title,
        description: news.summary || news.content.slice(0, 160),
        images: news.imageUrl ? [news.imageUrl] : undefined,
      },
    }
  } catch {
    return { title: 'Notícia não encontrada' }
  }
}

export default async function NewsDetailPage({ params }: Props) {
  let news
  try {
    news = await newsService.getBySlug(params.slug)
  } catch {
    notFound()
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ajucat.org.br'
  const pageUrl = `${appUrl}/noticias/${news.slug}`

  return (
    <PublicLayout>
      <article className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Voltar */}
          <Link
            href="/noticias"
            className="flex items-center gap-2 text-sm text-neutral-500 hover:text-primary-700 mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Voltar para Notícias
          </Link>

          {/* Cabeçalho */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4 leading-tight">
              {news.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                <time>{formatDate(news.createdAt)}</time>
              </span>
              <span className="flex items-center gap-1">
                <User size={14} />
                {news.author.name}
              </span>
            </div>
          </header>

          {/* Imagem de destaque */}
          {news.imageUrl && (
            <div className="aspect-video rounded-xl overflow-hidden mb-8">
              <img
                src={news.imageUrl}
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Resumo */}
          {news.summary && (
            <div className="bg-primary-50 border-l-4 border-primary-600 px-5 py-4 rounded-r-md mb-8">
              <p className="text-primary-800 font-medium italic">{news.summary}</p>
            </div>
          )}

          {/* Conteúdo */}
          <div
            className="prose-ajucat"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

          {/* Compartilhamento */}
          <div className="mt-10 pt-6 border-t border-neutral-200">
            <div className="flex items-center gap-3">
              <Share2 size={18} className="text-neutral-400" />
              <span className="text-sm font-medium text-neutral-600">
                Compartilhar:
              </span>
              <ShareButtons url={pageUrl} title={news.title} />
            </div>
          </div>
        </div>
      </article>
    </PublicLayout>
  )
}
