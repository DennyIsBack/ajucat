'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

interface ViseLayoutProps {
  children: ReactNode
}

export function ViseLayout({ children }: ViseLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/vise" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              V
            </div>
            <span className="font-bold text-primary-900 hidden sm:inline">
              Vise Creative Studio
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <a
              href="#portfolio"
              className="text-neutral-700 hover:text-gold-600 font-medium transition-colors"
            >
              Portfólio
            </a>
            <a
              href="#pricing"
              className="text-neutral-700 hover:text-gold-600 font-medium transition-colors"
            >
              Preço
            </a>
            <a
              href="https://wa.me/54996184974?text=Olá%20Vise%20Creative%20Studio!%20Gostaria%20de%20saber%20mais%20sobre%20as%20landing%20pages."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-400 hover:bg-gold-500 text-primary-900 font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2"
            >
              <MessageCircle size={18} />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/54996184974?text=Olá%20Vise%20Creative%20Studio!%20Gostaria%20de%20saber%20mais%20sobre%20as%20landing%20pages."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-30 animate-bounce"
        title="Abrir WhatsApp"
      >
        <MessageCircle size={28} />
      </a>

      {/* Footer */}
      <footer className="bg-primary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Vise Creative Studio</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Landing pages profissionais e otimizadas para SEO. Transformamos ideias em presença online de sucesso.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/vise" className="text-neutral-400 hover:text-gold-400 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#portfolio" className="text-neutral-400 hover:text-gold-400 transition-colors">
                    Portfólio
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-neutral-400 hover:text-gold-400 transition-colors">
                    Preço
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="mailto:vise.creativestudio@gmail.com"
                    className="text-neutral-400 hover:text-gold-400 transition-colors"
                  >
                    vise.creativestudio@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+54996184974"
                    className="text-neutral-400 hover:text-gold-400 transition-colors"
                  >
                    +54 9 9618-4974
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/54996184974"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-gold-400 transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Tecnologias</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-neutral-400">Next.js 14+</li>
                <li className="text-neutral-400">TypeScript</li>
                <li className="text-neutral-400">Tailwind CSS</li>
                <li className="text-neutral-400">SEO Otimizado</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-neutral-400 text-sm">
                © 2026 Vise Creative Studio. Todos os direitos reservados.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-neutral-400 hover:text-gold-400 transition-colors"
                >
                  Política de Privacidade
                </a>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-gold-400 transition-colors"
                >
                  Termos de Serviço
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
