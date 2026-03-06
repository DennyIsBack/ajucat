'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, LogIn, User } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/noticias', label: 'Notícias' },
  { href: '/contato', label: 'Contato' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAuthenticated } = useAuth()

  return (
    <header className="bg-primary-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center">
              <span className="text-primary-900 font-bold text-sm">AJ</span>
            </div>
            <div>
              <span className="text-white font-bold text-lg leading-tight block">
                AJUCAT
              </span>
              <span className="text-gold-300 text-xs leading-tight block">
                Associação dos Juízes Católicos
              </span>
            </div>
          </Link>

          {/* Navegação desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'nav-link text-sm',
                  pathname === link.href && 'nav-link-active'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Ações */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm text-gold-300 hover:text-gold-200 transition-colors"
              >
                <User size={16} />
                <span>{user?.name?.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-primary-900 font-semibold text-sm px-4 py-2 rounded-md transition-colors"
              >
                <LogIn size={16} />
                Área do Membro
              </Link>
            )}
          </div>

          {/* Menu mobile */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu mobile expandido */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary-800 border-t border-primary-700">
          <nav className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block py-2 text-sm nav-link',
                  pathname === link.href && 'nav-link-active'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-primary-700">
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-sm text-gold-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={16} />
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 text-sm text-gold-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn size={16} />
                  Área do Membro
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
