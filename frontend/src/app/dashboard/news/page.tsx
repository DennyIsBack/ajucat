'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useNews } from '@/hooks/useNews'
import { formatDate } from '@/lib/utils'
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react'
import { newsService } from '@/services/news.service'

export default function DashboardNewsPage() {
  const { user } = useAuth()
  const [page, setPage] = useState(1)
  const { news, total, totalPages, isLoading, refetch } = useNews({ page })

  const canManage = user?.role === 'ADMIN' || user?.role === 'DIRECTOR'

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    try {
      if (currentStatus === 'PUBLISHED') {
        await newsService.unpublish(id)
      } else {
        await newsService.publish(id)
      }
      refetch()
    } catch (err) {
      console.error('Erro ao alterar status:', err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta notícia?')) return
    try {
      await newsService.delete(id)
      refetch()
    } catch (err) {
      console.error('Erro ao excluir notícia:', err)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-800">Notícias</h1>
          <p className="text-neutral-500 text-sm mt-1">
            {total} {total === 1 ? 'notícia' : 'notícias'} no total
          </p>
        </div>
        {canManage && (
          <Link href="/dashboard/news/create" className="btn-primary">
            <Plus size={18} />
            Nova Notícia
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="animate-spin text-primary-600" size={32} />
        </div>
      ) : news.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-neutral-400">Nenhuma notícia encontrada.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {news.map((item) => (
            <div
              key={item.id}
              className="card flex items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={
                      item.status === 'PUBLISHED'
                        ? 'badge-published'
                        : 'badge-draft'
                    }
                  >
                    {item.status === 'PUBLISHED' ? 'Publicado' : 'Rascunho'}
                  </span>
                  <span className="text-xs text-neutral-400">
                    {formatDate(item.createdAt)}
                  </span>
                </div>
                <h3 className="font-semibold text-neutral-800 truncate">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-400">
                  Por {item.author.name}
                </p>
              </div>
              {canManage && (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleToggleStatus(item.id, item.status)}
                    className="p-2 text-neutral-400 hover:text-primary-600 transition-colors"
                    title={
                      item.status === 'PUBLISHED' ? 'Despublicar' : 'Publicar'
                    }
                  >
                    {item.status === 'PUBLISHED' ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                  <Link
                    href={`/dashboard/news/${item.id}/edit`}
                    className="p-2 text-neutral-400 hover:text-blue-600 transition-colors"
                    title="Editar"
                  >
                    <Edit size={18} />
                  </Link>
                  {user?.role === 'ADMIN' && (
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
                      title="Excluir"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 text-sm border border-neutral-300 rounded-md disabled:opacity-50 hover:bg-neutral-50"
          >
            Anterior
          </button>
          <span className="text-sm text-neutral-600">
            {page} de {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 text-sm border border-neutral-300 rounded-md disabled:opacity-50 hover:bg-neutral-50"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  )
}
