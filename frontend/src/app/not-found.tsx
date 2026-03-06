'use client'

import Link from 'next/link'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <PublicLayout>
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-8xl font-bold text-primary-200 mb-4">404</div>
          <h1 className="text-2xl font-bold text-primary-800 mb-2">
            Página não encontrada
          </h1>
          <p className="text-neutral-500 mb-8">
            A página que você está procurando não existe ou foi removida.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="btn-primary">
              <Home size={18} />
              Ir para o Início
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-outline"
            >
              <ArrowLeft size={18} />
              Voltar
            </button>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
