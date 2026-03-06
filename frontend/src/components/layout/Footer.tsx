import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-950 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sobre */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center">
                <span className="text-primary-900 font-bold text-sm">AJ</span>
              </div>
              <div>
                <span className="text-white font-bold text-lg block">AJUCAT</span>
                <span className="text-gold-400 text-xs">Associação dos Juízes Católicos</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-neutral-400 max-w-sm">
              A AJUCAT reúne magistrados e profissionais do direito comprometidos
              com os valores cristãos, promovendo a justiça, a ética e a fraternidade
              no exercício da magistratura.
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Início' },
                { href: '/sobre', label: 'Sobre a AJUCAT' },
                { href: '/noticias', label: 'Notícias' },
                { href: '/contato', label: 'Contato' },
                { href: '/login', label: 'Área do Membro' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contato
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-neutral-400">
                <Mail size={16} className="text-gold-400 mt-0.5 shrink-0" />
                <span>contato@ajucat.org.br</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-400">
                <Phone size={16} className="text-gold-400 mt-0.5 shrink-0" />
                <span>(00) 0000-0000</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-400">
                <MapPin size={16} className="text-gold-400 mt-0.5 shrink-0" />
                <span>Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-primary-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            © {currentYear} AJUCAT — Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacidade"
              className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              Política de Privacidade
            </Link>
            <Link
              href="/termos"
              className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
