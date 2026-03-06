'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Newspaper,
  FileText,
  ScrollText,
  Users,
  User,
  LogOut,
  Shield,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'
import { RoleName } from '@/types'

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
  roles?: RoleName[]
}

const navItems: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Painel',
    icon: <LayoutDashboard size={18} />,
  },
  {
    href: '/dashboard/news',
    label: 'Notícias',
    icon: <Newspaper size={18} />,
  },
  {
    href: '/dashboard/documents',
    label: 'Documentos',
    icon: <FileText size={18} />,
  },
  {
    href: '/dashboard/circulars',
    label: 'Circulares',
    icon: <ScrollText size={18} />,
  },
  {
    href: '/dashboard/users',
    label: 'Usuários',
    icon: <Users size={18} />,
    roles: ['DIRECTOR', 'ADMIN'],
  },
  {
    href: '/dashboard/profile',
    label: 'Meu Perfil',
    icon: <User size={18} />,
  },
]

const ROLE_HIERARCHY: Record<RoleName, number> = {
  VISITOR: 0,
  MEMBER: 1,
  DIRECTOR: 2,
  ADMIN: 3,
}

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const canAccess = (roles?: RoleName[]) => {
    if (!roles || roles.length === 0) return true
    if (!user) return false
    const userLevel = ROLE_HIERARCHY[user.role] ?? -1
    return roles.some((role) => userLevel >= ROLE_HIERARCHY[role])
  }

  return (
    <aside className="w-64 bg-primary-900 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-primary-800">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center">
            <span className="text-primary-900 font-bold text-xs">AJ</span>
          </div>
          <div>
            <span className="text-white font-bold text-sm block">AJUCAT</span>
            <span className="text-gold-400 text-xs">Dashboard</span>
          </div>
        </Link>
      </div>

      {/* Usuário */}
      {user && (
        <div className="px-4 py-4 border-b border-primary-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary-700 rounded-full flex items-center justify-center">
              <span className="text-gold-300 font-semibold text-sm">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">{user.name}</p>
              <p className="text-neutral-400 text-xs capitalize">
                {user.role === 'ADMIN'
                  ? 'Administrador'
                  : user.role === 'DIRECTOR'
                  ? 'Diretor'
                  : user.role === 'MEMBER'
                  ? 'Membro'
                  : 'Visitante'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navegação */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems
          .filter((item) => canAccess(item.roles))
          .map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors',
                pathname === item.href
                  ? 'bg-primary-700 text-gold-300 font-medium'
                  : 'text-neutral-300 hover:bg-primary-800 hover:text-white'
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
      </nav>

      {/* Rodapé sidebar */}
      <div className="p-3 border-t border-primary-800 space-y-1">
        {user?.role === 'ADMIN' && (
          <Link
            href="/dashboard/audit"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-neutral-400 hover:bg-primary-800 hover:text-white transition-colors"
          >
            <Shield size={18} />
            Auditoria
          </Link>
        )}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-neutral-400 hover:bg-red-900/30 hover:text-red-400 transition-colors"
        >
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </aside>
  )
}
