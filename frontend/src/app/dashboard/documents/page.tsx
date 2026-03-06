'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { documentsService } from '@/services/documents.service'
import { Document } from '@/types'
import { formatDate, formatFileSize } from '@/lib/utils'
import { Plus, Download, Trash2, FileText, Loader2 } from 'lucide-react'

export default function DashboardDocumentsPage() {
  const { user } = useAuth()
  const [documents, setDocuments] = useState<Document[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [categories, setCategories] = useState<string[]>([])

  const canManage = user?.role === 'ADMIN' || user?.role === 'DIRECTOR'

  const fetchDocuments = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await documentsService.getAll(
        page,
        20,
        selectedCategory || undefined
      )
      setDocuments(data.documents || [])
      setTotal(data.total || 0)
      setTotalPages(data.totalPages || 0)
    } catch (err) {
      console.error('Erro ao carregar documentos:', err)
    } finally {
      setIsLoading(false)
    }
  }, [page, selectedCategory])

  useEffect(() => {
    fetchDocuments()
  }, [fetchDocuments])

  useEffect(() => {
    documentsService.getCategories().then(setCategories).catch(console.error)
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este documento?')) return
    try {
      await documentsService.delete(id)
      fetchDocuments()
    } catch (err) {
      console.error('Erro ao excluir documento:', err)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-800">Documentos</h1>
          <p className="text-neutral-500 text-sm mt-1">
            {total} {total === 1 ? 'documento' : 'documentos'}
          </p>
        </div>
        {canManage && (
          <Link href="/dashboard/documents/create" className="btn-primary">
            <Plus size={18} />
            Novo Documento
          </Link>
        )}
      </div>

      {/* Filtro por categoria */}
      {categories.length > 0 && (
        <div className="mb-4">
          <select
            className="input-field max-w-xs"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value)
              setPage(1)
            }}
          >
            <option value="">Todas as categorias</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="animate-spin text-primary-600" size={32} />
        </div>
      ) : documents.length === 0 ? (
        <div className="card text-center py-12">
          <FileText className="mx-auto text-neutral-300 mb-3" size={48} />
          <p className="text-neutral-400">Nenhum documento encontrado.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="card flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                  <FileText className="text-primary-600" size={20} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-neutral-800 truncate">
                    {doc.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-neutral-400">
                    <span className="bg-neutral-100 px-2 py-0.5 rounded">
                      {doc.category}
                    </span>
                    {doc.fileSize && (
                      <span>{formatFileSize(doc.fileSize)}</span>
                    )}
                    <span>{formatDate(doc.createdAt)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-neutral-400 hover:text-primary-600 transition-colors"
                  title="Baixar"
                >
                  <Download size={18} />
                </a>
                {canManage && user?.role === 'ADMIN' && (
                  <button
                    onClick={() => handleDelete(doc.id)}
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
