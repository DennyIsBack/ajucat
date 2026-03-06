import { Metadata } from 'next'
import { PublicLayout } from '@/components/layout/PublicLayout'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sobre',
  description:
    'Conheça a história, missão e valores da Associação dos Juízes Católicos (AJUCAT).',
}

export default function SobrePage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-primary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-subtitle text-gold-400">Conheça-nos</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Sobre a AJUCAT
          </h1>
        </div>
      </section>

      {/* Missão */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-primary-800 mb-4">
              Nossa Missão
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-6">
              A Associação dos Juízes Católicos (AJUCAT) tem como missão
              principal promover a integração entre a fé cristã e o exercício
              da magistratura, reunindo magistrados, advogados e profissionais
              do direito que compartilham dos valores do Evangelho.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-6">
              Acreditamos que a fé e a razão não se opõem, mas se complementam,
              e que os princípios cristãos — justiça, misericórdia, verdade e
              amor ao próximo — são fundamentos indispensáveis para uma
              magistratura verdadeiramente humana e justa.
            </p>

            <h2 className="text-2xl font-bold text-primary-800 mb-4 mt-10">
              Nossos Objetivos
            </h2>
            <ul className="space-y-3 text-neutral-600">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-gold-500 rounded-full mt-2 shrink-0" />
                <span>
                  Promover a integração entre os profissionais e acadêmicos que
                  atuam no âmbito do Direito e da Justiça.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-gold-500 rounded-full mt-2 shrink-0" />
                <span>
                  Favorecer o testemunho coletivo da fé cristã no exercício da
                  função jurisdicional.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-gold-500 rounded-full mt-2 shrink-0" />
                <span>
                  Promover a inserção dos membros no processo de transformação
                  social, à luz dos ensinamentos cristãos.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-gold-500 rounded-full mt-2 shrink-0" />
                <span>
                  Defender a dignidade da pessoa humana e os direitos
                  fundamentais em todas as instâncias.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-gold-500 rounded-full mt-2 shrink-0" />
                <span>
                  Fomentar o estudo e a reflexão sobre as relações entre
                  direito, ética e valores cristãos.
                </span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-primary-800 mb-4 mt-10">
              Nossos Princípios
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
              {[
                {
                  title: 'Fé',
                  description:
                    'A fé cristã como fundamento para o exercício responsável da magistratura.',
                },
                {
                  title: 'Caridade',
                  description:
                    'O amor ao próximo como motivação para uma justiça mais humana e compassiva.',
                },
                {
                  title: 'Justiça',
                  description:
                    'O compromisso com a aplicação justa e ética das leis, em harmonia com a lei natural.',
                },
              ].map((principle) => (
                <div
                  key={principle.title}
                  className="bg-primary-50 rounded-lg p-5 border border-primary-100"
                >
                  <h3 className="font-bold text-primary-800 mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/contato" className="btn-primary">
              Entre em Contato
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
