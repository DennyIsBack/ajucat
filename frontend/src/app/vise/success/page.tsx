'use client'

import Link from 'next/link'
import { ViseLayout } from '@/components/layout/ViseLayout'
import { CheckCircle, ArrowRight, Mail } from 'lucide-react'

export default function SuccessPage() {
  return (
    <ViseLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-neutral-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="text-green-600" size={48} />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-primary-900 mb-4">
              Pagamento Confirmado!
            </h1>

            {/* Message */}
            <p className="text-lg text-neutral-600 mb-8">
              Obrigado por sua compra. Seu pedido foi processado com sucesso.
            </p>

            {/* Order Details */}
            <div className="bg-neutral-50 rounded-lg p-6 mb-8 text-left">
              <h2 className="font-bold text-primary-900 mb-4">Detalhes do Pedido</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-700">Serviço</span>
                  <span className="font-bold text-primary-900">Landing Page Profissional</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-700">Valor</span>
                  <span className="font-bold text-gold-600">$400.00</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-neutral-200">
                  <span className="text-neutral-700">Total</span>
                  <span className="font-bold text-lg text-primary-900">$400.00</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Mail size={20} />
                Próximos Passos
              </h3>
              <ol className="space-y-3 text-blue-900 text-sm">
                <li className="flex gap-3">
                  <span className="font-bold flex-shrink-0">1.</span>
                  <span>Você receberá um email de confirmação em breve com os detalhes do pedido.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold flex-shrink-0">2.</span>
                  <span>Entraremos em contato em até 24 horas para discutir os detalhes do seu projeto.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold flex-shrink-0">3.</span>
                  <span>Você receberá um briefing para preencher com informações sobre seu projeto.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold flex-shrink-0">4.</span>
                  <span>Começaremos o desenvolvimento de sua landing page.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold flex-shrink-0">5.</span>
                  <span>Após conclusão, faremos revisões e ajustes conforme sua solicitação.</span>
                </li>
              </ol>
            </div>

            {/* Contact Info */}
            <div className="bg-neutral-50 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-primary-900 mb-4">Dúvidas?</h3>
              <p className="text-neutral-700 mb-4">
                Entre em contato conosco através dos canais abaixo:
              </p>
              <div className="space-y-2">
                <p>
                  <span className="text-neutral-700">Email: </span>
                  <a
                    href="mailto:vise.creativestudio@gmail.com"
                    className="text-gold-600 hover:text-gold-700 font-medium"
                  >
                    vise.creativestudio@gmail.com
                  </a>
                </p>
                <p>
                  <span className="text-neutral-700">Telefone: </span>
                  <a
                    href="tel:+54996184974"
                    className="text-gold-600 hover:text-gold-700 font-medium"
                  >
                    +54 9 9618-4974
                  </a>
                </p>
                <p>
                  <span className="text-neutral-700">WhatsApp: </span>
                  <a
                    href="https://wa.me/54996184974"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-600 hover:text-gold-700 font-medium"
                  >
                    Clique aqui para abrir
                  </a>
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/vise"
                className="bg-primary-900 hover:bg-primary-800 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                Voltar para Home
                <ArrowRight size={20} />
              </Link>
              <a
                href="https://wa.me/54996184974?text=Olá%20Vise!%20Acabei%20de%20fazer%20meu%20pedido%20e%20gostaria%20de%20começar%20a%20trabalhar%20na%20minha%20landing%20page."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                Conversar no WhatsApp
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </ViseLayout>
  )
}
