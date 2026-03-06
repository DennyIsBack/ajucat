'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/hooks/useAuth'
import api from '@/services/api'
import { User } from '@/types'
import { formatDate, getRoleLabel, getRoleBadgeColor } from '@/lib/utils'
import { UserCheck, UserX, Loader2, Users } from 'lucide-react'

export default function DashboardUsersPage() {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const isAdmin = currentUser?.role === 'ADMIN'

  const fetchUsers = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await api.get('/users', { params: { page, limit: 20 } })
      const data = response.data.data
      setUsers(data.users || [])
      setTotal(data.total || 0)
      setTotalPages(data.totalPages || 0)
    } catch (err) {
      console.error('Erro ao carregar usuários:', err)
    } finally {
      setIsLoading(false)
    }
  }, [page])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleToggleActive = async (id: string) => {
    try {
      await api.patch(`/users/${id}/toggle-active`)
      fetchUsers()
    } catch (err) {
      console.error('Erro ao alterar status do usuário:', err)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-800">Usuários</h1>
          <p className="text-neutral-500 text-sm mt-1">
            {total} {total === 1 ? 'usuário' : 'usuários'} cadastrados
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="animate-spin text-primary-600" size={32} />
        </div>
      ) : users.length === 0 ? (
        <div className="card text-center py-12">
          <Users className="mx-auto text-neutral-300 mb-3" size={48} />
          <p className="text-neutral-400">Nenhum usuário encontrado.</p>
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-neutral-600">
                    Usuário
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-neutral-600">
                    Função
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-neutral-600">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-neutral-600">
                    Cadastro
                  </th>
                  {isAdmin && (
                    <th className="text-right px-4 py-3 font-semibold text-neutral-600">
                      Ações
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-neutral-50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-neutral-800">{u.name}</p>
                        <p className="text-xs text-neutral-400">{u.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`badge ${getRoleBadgeColor(u.role.name)}`}
                      >
                        {getRoleLabel(u.role.name)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`badge ${
                          u.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {u.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-neutral-500">
                      {formatDate(u.createdAt, 'dd/MM/yyyy')}
                    </td>
                    {isAdmin && (
                      <td className="px-4 py-3 text-right">
                        {u.id !== currentUser?.id && (
                          <button
                            onClick={() => handleToggleActive(u.id)}
                            className={`p-1.5 rounded transition-colors ${
                              u.active
                                ? 'text-neutral-400 hover:text-red-600'
                                : 'text-neutral-400 hover:text-green-600'
                            }`}
                            title={u.active ? 'Desativar' : 'Ativar'}
                          >
                            {u.active ? (
                              <UserX size={18} />
                            ) : (
                              <UserCheck size={18} />
                            )}
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
