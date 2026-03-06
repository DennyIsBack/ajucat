'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { newsService } from '@/services/news.service'

const newsSchema = z.object({
  title: z.string().min(5, 'Título deve ter no mínimo 5 caracteres'),
  summary: z.string().optional(),
  content: z.string().min(10, 'Conteúdo deve ter no mínimo 10 caracteres'),
  imageUrl: z.string().url('URL inválida').optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'PUBLISHED']),
})

type NewsFormData = z.infer<typeof newsSchema>

export default function CreateNewsPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsFormData>({
    resolver: zodResolver(newsSchema),
    defaultValues: { status: 'DRAFT' },
  })

  const onSubmit = async (data: NewsFormData) => {
    setError(null)
    try {
      await newsService.create({
        ...data,
        imageUrl: data.imageUrl || undefined,
      })
      router.push('/dashboard/news')
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } }
      setError(axiosError?.response?.data?.message || 'Erro ao criar notícia')
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/dashboard/news"
          className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-primary-800">Nova Notícia</h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-md px-4 py-3 mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="card space-y-4">
          <div>
            <label className="label">Título *</label>
            <input
              type="text"
              className="input-field"
              placeholder="Título da notícia"
              {...register('title')}
            />
            {errors.title && (
              <p className="error-message">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="label">Resumo</label>
            <textarea
              rows={2}
              className="input-field resize-none"
              placeholder="Breve resumo da notícia (opcional)"
              {...register('summary')}
            />
          </div>

          <div>
            <label className="label">Conteúdo *</label>
            <textarea
              rows={12}
              className="input-field resize-y font-mono text-sm"
              placeholder="Conteúdo completo da notícia (suporta HTML básico)"
              {...register('content')}
            />
            {errors.content && (
              <p className="error-message">{errors.content.message}</p>
            )}
          </div>

          <div>
            <label className="label">URL da Imagem</label>
            <input
              type="url"
              className="input-field"
              placeholder="https://exemplo.com/imagem.jpg"
              {...register('imageUrl')}
            />
            {errors.imageUrl && (
              <p className="error-message">{errors.imageUrl.message}</p>
            )}
          </div>

          <div>
            <label className="label">Status</label>
            <select className="input-field" {...register('status')}>
              <option value="DRAFT">Rascunho</option>
              <option value="PUBLISHED">Publicado</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Salvando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save size={18} />
                Salvar Notícia
              </span>
            )}
          </button>
          <Link href="/dashboard/news" className="btn-outline">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
