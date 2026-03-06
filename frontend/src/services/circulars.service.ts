import api from './api'
import { Circular, CreateCircularFormData } from '@/types'

export const circularsService = {
  async getAll(page = 1, limit = 20, year?: number) {
    const response = await api.get('/circulars', {
      params: { page, limit, year },
    })
    return response.data.data
  },

  async getById(id: string): Promise<Circular> {
    const response = await api.get(`/circulars/${id}`)
    return response.data.data
  },

  async create(data: CreateCircularFormData): Promise<Circular> {
    const response = await api.post('/circulars', data)
    return response.data.data
  },

  async update(id: string, data: Partial<CreateCircularFormData>): Promise<Circular> {
    const response = await api.patch(`/circulars/${id}`, data)
    return response.data.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/circulars/${id}`)
  },
}
