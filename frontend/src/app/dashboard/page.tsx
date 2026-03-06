'use client'

import { useAuth } from '@/hooks/useAuth'
import { Newspaper, FileText, ScrollText, Users } from 'lucide-react'
import Link from 'next/link'

const stats = [
  {
    label: 'Notícias',
    icon: <Newspaper size={24} />,
    href: '/dashboard/news',
    color: 'bg-blue-500',
  },
  {
    label: 'Documentos',
    icon: <FileText size={24} />,
    href: '/dashboard/documents',
    color: 'bg-green-500',
  },
  {
    label: 'Circulares',
    icon: <ScrollText size={24} />,
    href: '/dashboard/circulars',
    color: 'bg-purple-500',
  },
  {
    label: 'Usuários',
    icon: <Users size={24} />,
    href: '/dashboard/users',
    color: 'bg-orange-500',
  },
]

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="animate-fade-in">
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary-800">
          Bem-vindo, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="text-neutral-500 mt-1">
          Painel de controle da AJUCAT
        </p>
      </div>

      {/* Cards de navegação */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className="card hover:shadow-md transition-shadow group"
          >
            <div
              className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}
            >
              {stat.icon}
            </div>
            <p className="font-semibold text-neutral-700">{stat.label}</p>
            <p className="text-sm text-neutral-400 mt-1">Gerenciar →</p>
          </Link>
        ))}
      </div>

      {/* Informações do usuário */}
      <div className="card">
        <h2 className="text-lg font-semibold text-primary-800 mb-4">
          Suas Informações
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Nome</p>
            <p className="font-medium text-neutral-700">{user?.name}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">E-mail</p>
            <p className="font-medium text-neutral-700">{user?.email}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Função</p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              {user?.role === 'ADMIN'
                ? 'Administrador'
                : user?.role === 'DIRECTOR'
                ? 'Diretor'
                : user?.role === 'MEMBER'
                ? 'Membro'
                : 'Visitante'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
