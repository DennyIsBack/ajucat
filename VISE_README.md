# Vise Creative Studio - Landing Page Service

## Visão Geral

Este projeto implementa uma landing page profissional para o **Vise Creative Studio**, um serviço de desenvolvimento de landing pages SEO otimizadas com preço fixo de **$400**.

O projeto foi desenvolvido como uma extensão do repositório AJUCAT, utilizando a mesma stack tecnológica (Next.js 14+ no frontend e NestJS no backend).

## Características Principais

### 🎯 Landing Page
- **Design Minimalista**: Interface limpa e profissional
- **Responsivo**: Funciona perfeitamente em mobile, tablet e desktop
- **Animações Suaves**: Transições e efeitos CSS otimizados
- **Performance Máxima**: Otimizações de carregamento e rendering

### 🔍 SEO Otimizado
- **Meta Tags**: Configuradas por página
- **Schema.org**: Dados estruturados para rich snippets
- **Sitemap.xml**: Gerado automaticamente
- **Robots.txt**: Configurado para crawlers
- **Open Graph**: Otimizado para compartilhamento em redes sociais

### 💳 Integração de Pagamento
- **Checkout Seguro**: Formulário com validação inline
- **Stripe Integration**: Pronto para integração com Stripe
- **Confirmação por Email**: Notificações automáticas

### 📱 Integração WhatsApp
- **Botão Flutuante**: Sempre visível para contato rápido
- **Mensagem Pré-preenchida**: Template customizável
- **Links Diretos**: Em toda a página

### 📊 Analytics
- **Google Analytics**: Integrado e configurado
- **Google Tag Manager**: Suporte para eventos customizados
- **Rastreamento de Conversão**: Eventos de compra e formulário

### 📧 Formulário de Contato
- **Validação em Tempo Real**: Feedback imediato ao usuário
- **Notificações por Email**: Admin e cliente recebem confirmação
- **Armazenamento de Leads**: Dados salvos no banco de dados

## Estrutura do Projeto

```
ajucat/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── vise/
│   │   │   │   ├── page.tsx              # Landing page principal
│   │   │   │   ├── checkout/
│   │   │   │   │   └── page.tsx          # Página de checkout
│   │   │   │   └── success/
│   │   │   │       └── page.tsx          # Página de sucesso
│   │   │   └── api/
│   │   │       └── vise/
│   │   │           ├── checkout/
│   │   │           │   └── route.ts      # Endpoint de checkout
│   │   │           └── lead/
│   │   │               └── route.ts      # Endpoint de leads
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   └── ViseLayout.tsx        # Layout com header/footer
│   │   │   ├── analytics/
│   │   │   │   └── GoogleAnalytics.tsx   # Componente GA
│   │   │   └── seo/
│   │   │       └── StructuredData.tsx    # Dados estruturados
│   │   └── lib/
│   │       └── analytics.ts              # Funções de tracking
│   ├── public/
│   │   ├── robots.txt                    # Configuração de crawlers
│   │   └── sitemap.xml                   # Mapa do site
│   └── .env.example                      # Variáveis de ambiente
│
├── backend/
│   ├── src/
│   │   ├── vise/
│   │   │   ├── vise.controller.ts        # Endpoints da API
│   │   │   ├── vise.service.ts           # Lógica de negócio
│   │   │   ├── vise.module.ts            # Módulo NestJS
│   │   │   └── dto/
│   │   │       ├── create-checkout.dto.ts
│   │   │       └── create-lead.dto.ts
│   │   └── mail/
│   │       ├── mail.service.ts           # Serviço de email
│   │       └── mail.module.ts
│   └── prisma/
│       └── schema.prisma                 # Modelos de dados
│
└── VISE_README.md                        # Este arquivo
```

## Tecnologias Utilizadas

### Frontend
- **Next.js 14+**: Framework React com SSR
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Utility-first CSS framework
- **React Hook Form**: Gerenciamento de formulários
- **Zod**: Validação de schemas
- **Lucide React**: Ícones SVG

### Backend
- **NestJS**: Framework Node.js modular
- **Prisma**: ORM para banco de dados
- **Class Validator**: Validação de DTOs
- **Passport**: Autenticação

### Deployment
- **Docker**: Containerização
- **SSL/TLS**: Certificados automáticos
- **Google Analytics**: Monitoramento de tráfego

## Instalação e Configuração

### Pré-requisitos
- Node.js 18+
- Docker (opcional)
- Git

### 1. Clonar o Repositório
```bash
gh repo clone DennyIsBack/ajucat
cd ajucat
```

### 2. Instalar Dependências

**Frontend:**
```bash
cd frontend
pnpm install
```

**Backend:**
```bash
cd ../backend
pnpm install
```

### 3. Configurar Variáveis de Ambiente

**Frontend** (`.env.local`):
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_VISE_SITE_URL=https://vise.creativestudio.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Backend** (`.env`):
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/ajucat
ADMIN_EMAIL=vise.creativestudio@gmail.com
SENDGRID_API_KEY=SG.XXXXXXXXXX
```

### 4. Executar Localmente

**Frontend:**
```bash
cd frontend
pnpm dev
# Acesse http://localhost:3000/vise
```

**Backend:**
```bash
cd backend
pnpm start:dev
# API disponível em http://localhost:3001
```

## Endpoints da API

### Checkout
**POST** `/api/vise/checkout`

Request:
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "+55 11 99999-9999",
  "company": "Empresa XYZ",
  "projectDescription": "Preciso de uma landing page para meu negócio...",
  "amount": 40000
}
```

Response:
```json
{
  "success": true,
  "message": "Pedido criado com sucesso",
  "orderId": "uuid-here"
}
```

### Leads
**POST** `/api/vise/lead`

Request:
```json
{
  "name": "Maria Santos",
  "email": "maria@example.com",
  "phone": "+55 11 88888-8888",
  "message": "Gostaria de saber mais sobre seus serviços..."
}
```

Response:
```json
{
  "success": true,
  "message": "Lead criado com sucesso",
  "leadId": "uuid-here"
}
```

## SEO e Performance

### Otimizações Implementadas

1. **Meta Tags**: Título, descrição e keywords customizados
2. **Open Graph**: Imagens e descrições para redes sociais
3. **Structured Data**: Schema.org para Organization, Service e Product
4. **Sitemap**: Gerado automaticamente com prioridades
5. **Robots.txt**: Configurado para otimizar crawling
6. **Image Optimization**: WebP e AVIF com lazy loading
7. **CSS Minification**: Tailwind CSS otimizado
8. **Code Splitting**: Chunks automáticos do Next.js
9. **Caching**: Headers de cache para assets estáticos
10. **Compression**: Gzip e Brotli automáticos

### Métricas Esperadas

- **Lighthouse Score**: 90+
- **Core Web Vitals**: Verde
- **Time to First Byte**: < 600ms
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## Animações

### Animações Implementadas

1. **Fade In**: Elementos aparecem com fade
2. **Slide Up**: Elementos deslizam para cima
3. **Hover Effects**: Transições em botões e cards
4. **Scroll Animations**: Efeitos ao scrollar

### Configuração de Animações

As animações estão definidas em `tailwind.config.ts`:

```typescript
animation: {
  'fade-in': 'fadeIn 0.5s ease-in-out',
  'slide-up': 'slideUp 0.5s ease-out',
}
```

## Responsividade

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Testes de Responsividade
```bash
# Chrome DevTools
# Firefox Responsive Design Mode
# Safari Responsive Design Mode
```

## Integração com Stripe (Próximas Etapas)

Para implementar pagamento com Stripe:

1. Instalar `stripe` package:
```bash
pnpm add stripe
```

2. Adicionar variáveis de ambiente:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

3. Criar webhook para confirmar pagamentos:
```typescript
// backend/src/stripe/stripe.webhook.ts
```

## Integração com Email (SendGrid/Mailgun)

Para implementar envio de emails:

1. Instalar provider:
```bash
pnpm add @sendgrid/mail
# ou
pnpm add mailgun.js
```

2. Implementar em `mail.service.ts`

3. Configurar templates de email

## Monitoramento e Analytics

### Google Analytics
- Rastreamento de pageviews
- Eventos de conversão
- Funis de checkout
- Comportamento do usuário

### Configurar GA:
1. Criar propriedade no Google Analytics 4
2. Adicionar ID em `.env.local`
3. Verificar dados em tempo real

## Deployment

### Opções de Deploy

1. **Vercel** (Recomendado para Frontend)
```bash
vercel deploy
```

2. **Docker** (Para Backend)
```bash
docker build -t vise-backend .
docker run -p 3001:3001 vise-backend
```

3. **AWS/GCP/Azure**
- Usar Docker Compose
- Configurar CI/CD pipeline

## Suporte e Manutenção

### Suporte por 30 Dias
- Correção de bugs
- Ajustes de design
- Otimizações de performance
- Suporte técnico

### Após 30 Dias
- Plano de manutenção mensal
- Atualizações de segurança
- Monitoramento contínuo

## Licença

Este projeto é parte do repositório AJUCAT e segue a mesma licença.

## Contato

- **Email**: vise.creativestudio@gmail.com
- **WhatsApp**: +54 9 9618-4974
- **Website**: https://vise.creativestudio.com

## Roadmap

- [ ] Integração com Stripe Payment
- [ ] Dashboard de administração
- [ ] Mais templates de landing page
- [ ] Integração com CRM
- [ ] Análise avançada de conversão
- [ ] A/B Testing integrado
- [ ] Suporte multilíngue
