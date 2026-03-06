import api from './api'
import { CreateDocumentFormData, Document } from '@/types'

export const documentsService = {
  async getAll(page = 1, limit = 20, category?: string) {
    const response = await api.get('/documents', {
      params: { page, limit, category },
    })
    return response.data.data
  },

  async getById(id: string): Promise<Document> {
    const response = await api.get(`/documents/${id}`)
    return response.data.data
  },

  async getCategories(): Promise<string[]> {
    const response = await api.get('/documents/categories')
    return response.data.data
  },

  async create(data: CreateDocumentFormData): Promise<Document> {
    const response = await api.post('/documents', data)
    return response.data.data
  },

  async update(id: string, data: Partial<CreateDocumentFormData>): Promise<Document> {
    const response = await api.patch(`/documents/${id}`, data)
    return response.data.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/documents/${id}`)
  },
}
