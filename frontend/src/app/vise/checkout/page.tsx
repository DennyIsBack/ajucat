'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ViseLayout } from '@/components/layout/ViseLayout'
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const checkoutSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  company: z.string().optional(),
  projectDescription: z.string().min(10, 'Descreva seu projeto com pelo menos 10 caracteres'),
  cardName: z.string().min(3, 'Nome no cartão inválido'),
  cardNumber: z.string().regex(/^\d{16}$/, 'Número do cartão deve ter 16 dígitos'),
  cardExpiry: z.string().regex(/^\d{2}\/\d{2}$/, 'Formato: MM/YY'),
  cardCvc: z.string().regex(/^\d{3,4}$/, 'CVC deve ter 3 ou 4 dígitos'),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  })

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Simulate API call to backend for payment processing
      const response = await fetch('/api/vise/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          amount: 40000, // $400 in cents
        }),
      })

      if (!response.ok) {
        throw new Error('Erro ao processar pagamento')
      }

      const result = await response.json()

      // Success
      setSubmitStatus('success')
      reset()

      // Redirect to success page after 2 seconds
      setTimeout(() => {
        window.location.href = '/vise/success'
      }, 2000)
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Erro ao processar pagamento. Tente novamente.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ViseLayout>
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Link
            href="/vise"
            className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-900 mb-8 font-medium"
          >
            <ArrowLeft size={20} />
            Voltar
          </Link>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h1 className="text-4xl font-bold text-primary-900 mb-2">
              Checkout
            </h1>
            <p className="text-neutral-600 mb-8">
              Complete seus dados para processar o pagamento de sua landing page.
            </p>

            {submitStatus === 'success' && (
              <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h3 className="font-bold text-green-900">Pagamento Processado!</h3>
                  <p className="text-green-800 text-sm">
                    Você será redirecionado em breve. Verifique seu email para confirmação.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h3 className="font-bold text-red-900">Erro no Pagamento</h3>
                  <p className="text-red-800 text-sm">{errorMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Informações Pessoais */}
              <div>
                <h2 className="text-xl font-bold text-primary-900 mb-4">
                  Informações Pessoais
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      {...register('name')}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                      placeholder="Seu nome"
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                      placeholder="seu@email.com"
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                      placeholder="+55 11 99999-9999"
                      disabled={isSubmitting}
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Empresa (Opcional)
                    </label>
                    <input
                      type="text"
                      {...register('company')}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                      placeholder="Sua empresa"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>

              {/* Descrição do Projeto */}
              <div>
                <h2 className="text-xl font-bold text-primary-900 mb-4">
                  Sobre seu Projeto
                </h2>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Descreva seu projeto *
                </label>
                <textarea
                  {...register('projectDescription')}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none"
                  rows={4}
                  placeholder="Conte-nos sobre seu projeto, público-alvo e objetivos..."
                  disabled={isSubmitting}
                />
                {errors.projectDescription && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.projectDescription.message}
                  </p>
                )}
              </div>

              {/* Informações de Pagamento */}
              <div>
                <h2 className="text-xl font-bold text-primary-900 mb-4">
                  Informações de Pagamento
                </h2>
                <div className="bg-neutral-50 p-4 rounded-lg mb-4 border border-neutral-200">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-700">Landing Page Profissional</span>
                    <span className="font-bold text-lg text-gold-600">$400.00</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Nome no Cartão *
                  </label>
                  <input
                    type="text"
                    {...register('cardName')}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                    placeholder="NOME SOBRENOME"
                    disabled={isSubmitting}
                  />
                  {errors.cardName && (
                    <p className="text-red-600 text-sm mt-1">{errors.cardName.message}</p>
                  )}
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Número do Cartão *
                  </label>
                  <input
                    type="text"
                    {...register('cardNumber')}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                    placeholder="1234 5678 9012 3456"
                    maxLength={16}
                    disabled={isSubmitting}
                  />
                  {errors.cardNumber && (
                    <p className="text-red-600 text-sm mt-1">{errors.cardNumber.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Validade (MM/YY) *
                    </label>
                    <input
                      type="text"
                      {...register('cardExpiry')}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                      placeholder="12/25"
                      maxLength={5}
                      disabled={isSubmitting}
                    />
                    {errors.cardExpiry && (
                      <p className="text-red-600 text-sm mt-1">{errors.cardExpiry.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      CVC *
                    </label>
                    <input
                      type="text"
                      {...register('cardCvc')}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
                      placeholder="123"
                      maxLength={4}
                      disabled={isSubmitting}
                    />
                    {errors.cardCvc && (
                      <p className="text-red-600 text-sm mt-1">{errors.cardCvc.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Botão de Envio */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold-400 hover:bg-gold-500 disabled:bg-neutral-400 text-primary-900 font-bold py-3 px-8 rounded-lg transition-all duration-300 text-lg"
              >
                {isSubmitting ? 'Processando...' : 'Pagar $400'}
              </button>

              <p className="text-center text-sm text-neutral-600">
                Ao clicar em "Pagar", você concorda com nossos{' '}
                <a href="#" className="text-gold-600 hover:text-gold-700">
                  Termos de Serviço
                </a>{' '}
                e{' '}
                <a href="#" className="text-gold-600 hover:text-gold-700">
                  Política de Privacidade
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </ViseLayout>
  )
}
