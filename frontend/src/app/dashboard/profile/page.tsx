'use client'

import { useAuth } from '@/hooks/useAuth'
import { getRoleLabel } from '@/lib/utils'
import { User, Mail, Shield } from 'lucide-react'

export default function ProfilePage() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-800 mb-6">Meu Perfil</h1>

      <div className="max-w-2xl space-y-6">
        {/* Avatar e nome */}
        <div className="card flex items-center gap-6">
          <div className="w-20 h-20 bg-primary-700 rounded-full flex items-center justify-center shrink-0">
            <span className="text-gold-300 font-bold text-2xl">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary-800">{user.name}</h2>
            <p className="text-neutral-500">{user.email}</p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mt-2">
              {getRoleLabel(user.role)}
            </span>
          </div>
        </div>

        {/* Detalhes */}
        <div className="card">
          <h3 className="font-semibold text-neutral-700 mb-4">
            Informações da Conta
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="text-neutral-400 shrink-0" size={18} />
              <div>
                <p className="text-xs text-neutral-400">Nome completo</p>
                <p className="font-medium text-neutral-700">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-neutral-400 shrink-0" size={18} />
              <div>
                <p className="text-xs text-neutral-400">E-mail</p>
                <p className="font-medium text-neutral-700">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="text-neutral-400 shrink-0" size={18} />
              <div>
                <p className="text-xs text-neutral-400">Função</p>
                <p className="font-medium text-neutral-700">
                  {getRoleLabel(user.role)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Permissões */}
        <div className="card">
          <h3 className="font-semibold text-neutral-700 mb-4">
            Nível de Acesso
          </h3>
          <div className="space-y-2">
            {[
              {
                label: 'Visualizar notícias públicas',
                allowed: true,
              },
              {
                label: 'Acessar área de membros',
                allowed: ['MEMBER', 'DIRECTOR', 'ADMIN'].includes(user.role),
              },
              {
                label: 'Gerenciar notícias e documentos',
                allowed: ['DIRECTOR', 'ADMIN'].includes(user.role),
              },
              {
                label: 'Gerenciar usuários',
                allowed: user.role === 'ADMIN',
              },
            ].map((permission) => (
              <div
                key={permission.label}
                className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0"
              >
                <span className="text-sm text-neutral-600">
                  {permission.label}
                </span>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    permission.allowed
                      ? 'bg-green-100 text-green-700'
                      : 'bg-neutral-100 text-neutral-400'
                  }`}
                >
                  {permission.allowed ? 'Permitido' : 'Restrito'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
