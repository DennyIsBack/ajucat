'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

const contactSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  subject: z.string().min(5, 'Assunto deve ter no mínimo 5 caracteres'),
  message: z.string().min(20, 'Mensagem deve ter no mínimo 20 caracteres'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContatoPage() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    // TODO: integrar com endpoint de contato do backend
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Contato enviado:', data)
    setSubmitted(true)
    reset()
  }

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-primary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-subtitle text-gold-400">Fale Conosco</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Contato</h1>
        </div>
      </section>

      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Informações */}
            <div>
              <h2 className="text-xl font-bold text-primary-800 mb-6">
                Informações de Contato
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="text-gold-500 mt-0.5 shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-neutral-700 text-sm">E-mail</p>
                    <p className="text-neutral-500 text-sm">contato@ajucat.org.br</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="text-gold-500 mt-0.5 shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-neutral-700 text-sm">Telefone</p>
                    <p className="text-neutral-500 text-sm">(00) 0000-0000</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="text-gold-500 mt-0.5 shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-neutral-700 text-sm">Localização</p>
                    <p className="text-neutral-500 text-sm">Brasil</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulário */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <CheckCircle className="text-green-500 mx-auto mb-3" size={48} />
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    Mensagem enviada!
                  </h3>
                  <p className="text-green-600">
                    Obrigado pelo contato. Retornaremos em breve.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-sm text-green-700 underline"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8">
                  <h2 className="text-xl font-bold text-primary-800 mb-6">
                    Envie uma Mensagem
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label">Nome *</label>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="Seu nome completo"
                          {...register('name')}
                        />
                        {errors.name && (
                          <p className="error-message">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="label">E-mail *</label>
                        <input
                          type="email"
                          className="input-field"
                          placeholder="seu@email.com"
                          {...register('email')}
                        />
                        {errors.email && (
                          <p className="error-message">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="label">Assunto *</label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="Assunto da mensagem"
                        {...register('subject')}
                      />
                      {errors.subject && (
                        <p className="error-message">{errors.subject.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="label">Mensagem *</label>
                      <textarea
                        rows={5}
                        className="input-field resize-none"
                        placeholder="Escreva sua mensagem..."
                        {...register('message')}
                      />
                      {errors.message && (
                        <p className="error-message">{errors.message.message}</p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Enviando...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send size={16} />
                          Enviar Mensagem
                        </span>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
