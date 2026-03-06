import api from './api'
import { CreateNewsFormData, News, NewsStatus } from '@/types'

export const newsService = {
  // Público — SSR para SEO
  async getPublished(page = 1, limit = 10) {
    const response = await api.get('/news/public', {
      params: { page, limit },
    })
    return response.data.data
  },

  async getBySlug(slug: string): Promise<News> {
    const response = await api.get(`/news/public/${slug}`)
    return response.data.data
  },

  // Autenticado
  async getAll(page = 1, limit = 10) {
    const response = await api.get('/news', { params: { page, limit } })
    return response.data.data
  },

  async getById(id: string): Promise<News> {
    const response = await api.get(`/news/${id}`)
    return response.data.data
  },

  async create(data: CreateNewsFormData): Promise<News> {
    const response = await api.post('/news', data)
    return response.data.data
  },

  async update(id: string, data: Partial<CreateNewsFormData>): Promise<News> {
    const response = await api.patch(`/news/${id}`, data)
    return response.data.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/news/${id}`)
  },

  async publish(id: string): Promise<News> {
    return this.update(id, { status: 'PUBLISHED' as NewsStatus })
  },

  async unpublish(id: string): Promise<News> {
    return this.update(id, { status: 'DRAFT' as NewsStatus })
  },
}
