'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { circularsService } from '@/services/circulars.service'
import { Circular } from '@/types'
import { formatDate } from '@/lib/utils'
import { Plus, Download, Trash2, ScrollText, Loader2 } from 'lucide-react'

export default function DashboardCircularsPage() {
  const { user } = useAuth()
  const [circulars, setCirculars] = useState<Circular[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const canManage = user?.role === 'ADMIN' || user?.role === 'DIRECTOR'

  const fetchCirculars = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await circularsService.getAll(page, 20)
      setCirculars(data.circulars || [])
      setTotal(data.total || 0)
      setTotalPages(data.totalPages || 0)
    } catch (err) {
      console.error('Erro ao carregar circulares:', err)
    } finally {
      setIsLoading(false)
    }
  }, [page])

  useEffect(() => {
    fetchCirculars()
  }, [fetchCirculars])

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta circular?')) return
    try {
      await circularsService.delete(id)
      fetchCirculars()
    } catch (err) {
      console.error('Erro ao excluir circular:', err)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-800">Circulares</h1>
          <p className="text-neutral-500 text-sm mt-1">
            {total} {total === 1 ? 'circular' : 'circulares'} — acesso restrito a membros
          </p>
        </div>
        {canManage && (
          <Link href="/dashboard/circulars/create" className="btn-primary">
            <Plus size={18} />
            Nova Circular
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="animate-spin text-primary-600" size={32} />
        </div>
      ) : circulars.length === 0 ? (
        <div className="card text-center py-12">
          <ScrollText className="mx-auto text-neutral-300 mb-3" size={48} />
          <p className="text-neutral-400">Nenhuma circular encontrada.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {circulars.map((circular) => (
            <div
              key={circular.id}
              className="card flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
                  <ScrollText className="text-purple-600" size={20} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-neutral-800 truncate">
                    {circular.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-neutral-400">
                    {circular.number && (
                      <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded">
                        Nº {circular.number}/{circular.year}
                      </span>
                    )}
                    <span>{formatDate(circular.createdAt)}</span>
                  </div>
                  {circular.description && (
                    <p className="text-sm text-neutral-500 mt-1 truncate">
                      {circular.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {circular.fileUrl && (
                  <a
                    href={circular.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-neutral-400 hover:text-primary-600 transition-colors"
                    title="Baixar"
                  >
                    <Download size={18} />
                  </a>
                )}
                {canManage && user?.role === 'ADMIN' && (
                  <button
                    onClick={() => handleDelete(circular.id)}
                    className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
                    title="Excluir"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
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
