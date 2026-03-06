'use client'

import { useState, useEffect, useCallback } from 'react'
import { newsService } from '@/services/news.service'
import { News } from '@/types'

interface UseNewsOptions {
  page?: number
  limit?: number
  publicOnly?: boolean
}

interface NewsState {
  news: News[]
  total: number
  totalPages: number
  isLoading: boolean
  error: string | null
}

export function useNews(options: UseNewsOptions = {}) {
  const { page = 1, limit = 10, publicOnly = false } = options
  const [state, setState] = useState<NewsState>({
    news: [],
    total: 0,
    totalPages: 0,
    isLoading: true,
    error: null,
  })

  const fetchNews = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))
    try {
      const data = publicOnly
        ? await newsService.getPublished(page, limit)
        : await newsService.getAll(page, limit)

      setState({
        news: data.news || [],
        total: data.total || 0,
        totalPages: data.totalPages || 0,
        isLoading: false,
        error: null,
      })
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Erro ao carregar notícias',
      }))
    }
  }, [page, limit, publicOnly])

  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  return { ...state, refetch: fetchNews }
}
