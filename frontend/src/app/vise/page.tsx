import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Zap, Smartphone, TrendingUp, Code, Eye, Gauge } from 'lucide-react'
import { ViseLayout } from '@/components/layout/ViseLayout'
import { StructuredData, getOrganizationSchema, getServiceSchema, getProductSchema, getFAQSchema } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'Landing Pages SEO Otimizadas | Vise Creative Studio',
  description:
    'Landing pages profissionais e otimizadas para SEO a $400 fixo. Design minimalista, responsivo e com animações. Aumente suas conversões com uma presença online de qualidade.',
  keywords: 'landing page, web design, SEO, conversão, design minimalista',
  openGraph: {
    title: 'Landing Pages SEO Otimizadas | Vise Creative Studio',
    description:
      'Landing pages profissionais e otimizadas para SEO a $400 fixo. Design minimalista, responsivo e com animações.',
    type: 'website',
    url: 'https://vise.com/landing-pages',
  },
}

const services = [
  {
    icon: <Smartphone size={32} />,
    title: 'Design Responsivo',
    description:
      'Layouts que se adaptam perfeitamente a qualquer dispositivo, garantindo uma experiência impecável em mobile, tablet e desktop.',
  },
  {
    icon: <TrendingUp size={32} />,
    title: 'Otimizado para Conversão',
    description:
      'Cada elemento é estrategicamente posicionado para guiar o visitante até a ação desejada, maximizando resultados.',
  },
  {
    icon: <Eye size={32} />,
    title: 'SEO Integrado',
    description:
      'Meta tags, schema.org, sitemap e robots.txt configurados para indexação rápida e melhor visibilidade nos buscadores.',
  },
  {
    icon: <Zap size={32} />,
    title: 'Performance Máxima',
    description:
      'Carregamento ultrarrápido com otimização de imagens, lazy loading e cache inteligente para melhor ranking.',
  },
  {
    icon: <Code size={32} />,
    title: 'Código Limpo',
    description:
      'Desenvolvido com as melhores práticas, Next.js 14+ e TypeScript para manutenção fácil e escalabilidade.',
  },
  {
    icon: <Gauge size={32} />,
    title: 'Analytics Integrado',
    description:
      'Google Analytics e GTM pré-configurados para monitorar tráfego, conversões e comportamento dos visitantes.',
  },
]

const portfolio = [
  {
    id: 1,
    title: 'Agência de Marketing Digital',
    category: 'E-commerce',
    image: 'https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=500&h=300&fit=crop',
    description: 'Landing page para agência de marketing com foco em conversão de leads.',
  },
  {
    id: 2,
    title: 'Consultoria Empresarial',
    category: 'Serviços',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    description: 'Site institucional com formulário de contato e integração com CRM.',
  },
  {
    id: 3,
    title: 'Startup de Tecnologia',
    category: 'SaaS',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    description: 'Landing page com demonstração de produto e pricing interativo.',
  },
  {
    id: 4,
    title: 'Estúdio de Design',
    category: 'Portfólio',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
    description: 'Portfólio visual com galeria de projetos e case studies.',
  },
  {
    id: 5,
    title: 'Imobiliária Premium',
    category: 'Imóveis',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=300&fit=crop',
    description: 'Landing page com busca de imóveis e agendamento de visitas.',
  },
  {
    id: 6,
    title: 'Academia de Fitness',
    category: 'Saúde',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=300&fit=crop',
    description: 'Site com planos de treino, agendamento e integração com pagamento.',
  },
]

const process = [
  {
    step: 1,
    title: 'Briefing & Planejamento',
    description:
      'Entendemos seus objetivos, público-alvo e diferenciais para criar uma estratégia eficaz.',
  },
  {
    step: 2,
    title: 'Design & Prototipagem',
    description:
      'Criamos wireframes e mockups seguindo seu branding e as melhores práticas de UX.',
  },
  {
    step: 3,
    title: 'Desenvolvimento',
    description:
      'Codificamos com Next.js 14+, TypeScript e Tailwind CSS para máxima performance e qualidade.',
  },
  {
    step: 4,
    title: 'Testes & Otimização',
    description:
      'Testamos em todos os navegadores, otimizamos SEO e performance, garantindo excelentes resultados.',
  },
  {
    step: 5,
    title: 'Deploy & Monitoramento',
    description:
      'Fazemos deploy com SSL, configuramos analytics e mantemos monitoramento contínuo de performance.',
  },
]

export default function ViseLandingPage() {
  return (
    <>
      <StructuredData data={getOrganizationSchema()} />
      <StructuredData data={getServiceSchema()} />
      <StructuredData data={getProductSchema()} />
      <StructuredData data={getFAQSchema()} />
      <ViseLayout>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold-400 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute -bottom-8 right-10 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="text-gold-400 font-semibold mb-4 animate-fade-in">
              Vise Creative Studio
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-slide-up">
              Landing Pages SEO Otimizadas a{' '}
              <span className="text-gold-400">$400 Fixo</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-200 mb-8 leading-relaxed max-w-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Design minimalista, responsivo e com animações suaves. Seu site será indexado rapidamente nos buscadores e convertará visitantes em clientes.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link href="#pricing" className="bg-gold-400 hover:bg-gold-500 text-primary-900 font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center gap-2">
                Comprar Agora
                <ArrowRight size={20} />
              </Link>
              <Link href="#portfolio" className="border-2 border-white hover:bg-white hover:text-primary-900 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300">
                Ver Portfólio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold-400 font-semibold mb-2">O Que Incluímos</p>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
              Tudo que você precisa
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Cada landing page inclui todos os recursos necessários para sucesso online, sem custos adicionais.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-8 rounded-xl border border-neutral-200 hover:border-gold-400 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gold-50 rounded-lg flex items-center justify-center text-gold-600 mb-4 group-hover:bg-gold-100 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold-400 font-semibold mb-2">Nosso Processo</p>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
              Do Briefing ao Deploy
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Um processo estruturado e transparente que garante resultados excepcionais.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-xl border border-neutral-200 h-full">
                  <div className="w-10 h-10 bg-gold-400 text-white rounded-full flex items-center justify-center font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-primary-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-gold-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfólio */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold-400 font-semibold mb-2">Nossos Trabalhos</p>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
              Portfólio de Projetos
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Veja alguns dos projetos que desenvolvemos com sucesso para nossos clientes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((project) => (
              <div
                key={project.id}
                className="group rounded-xl overflow-hidden border border-neutral-200 hover:border-gold-400 hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-video bg-neutral-200 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gold-600 font-semibold mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-lg font-bold text-primary-900 mb-2 group-hover:text-gold-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold-400 font-semibold mb-2">Preço Transparente</p>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
              $400 Fixo
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Sem surpresas. Sem custos adicionais. Tudo incluído em um preço justo e acessível.
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gold-400 p-8 md:p-12 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <h3 className="text-3xl font-bold text-primary-900 mb-2">
                  Landing Page Profissional
                </h3>
                <p className="text-2xl font-bold text-gold-600 mb-8">$400</p>
                <ul className="space-y-4">
                  {[
                    'Design responsivo e minimalista',
                    'Otimizado para SEO',
                    'Meta tags e schema.org',
                    'Sitemap e robots.txt',
                    'Animações suaves',
                    'Formulário de contato',
                    'Integração WhatsApp',
                    'Google Analytics/GTM',
                    'SSL e HTTPS',
                    'Performance otimizada',
                    'Deploy em produção',
                    'Suporte por 30 dias',
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-gold-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-primary-900 mb-4">
                    Próximos Passos
                  </h4>
                  <ol className="space-y-3 text-neutral-700 mb-8">
                    <li className="flex gap-3">
                      <span className="font-bold text-gold-600">1.</span>
                      <span>Você nos envia seu briefing</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-gold-600">2.</span>
                      <span>Desenvolvemos sua landing page</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-gold-600">3.</span>
                      <span>Revisões e ajustes finais</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-gold-600">4.</span>
                      <span>Deploy e entrega</span>
                    </li>
                  </ol>
                </div>
                <Link
                  href="/vise/checkout"
                  className="w-full bg-gold-400 hover:bg-gold-500 text-primary-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 text-center text-lg"
                >
                  Comprar Agora por $400
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para sua landing page?
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Entre em contato conosco ou compre agora. Responderemos em até 24 horas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/vise/checkout"
              className="bg-gold-400 hover:bg-gold-500 text-primary-900 font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center gap-2"
            >
              Comprar Agora
              <ArrowRight size={20} />
            </Link>
            <a
              href="https://wa.me/54996184974?text=Olá%20Vise%20Creative%20Studio!%20Gostaria%20de%20saber%20mais%20sobre%20as%20landing%20pages."
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white hover:bg-white hover:text-primary-900 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
      </ViseLayout>
    </>
  )
}
