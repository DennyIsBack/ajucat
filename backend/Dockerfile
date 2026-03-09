# ─── Estágio base ─────────────────────────────────────────────────────────────
FROM node:22-alpine AS base
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./

# ─── Estágio de dependências ───────────────────────────────────────────────────
FROM base AS deps
RUN pnpm install --frozen-lockfile

# ─── Estágio de desenvolvimento ────────────────────────────────────────────────
FROM base AS development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm exec prisma generate
EXPOSE 3001
CMD ["pnpm", "run", "start:dev"]

# ─── Estágio de build ─────────────────────────────────────────────────────────
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm exec prisma generate
RUN pnpm run build

# ─── Estágio de produção ──────────────────────────────────────────────────────
FROM node:22-alpine AS production
RUN npm install -g pnpm
WORKDIR /app

# Copiar apenas o necessário para produção
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma

# Criar usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs && \
    chown -R nestjs:nodejs /app

USER nestjs

EXPOSE 3001

# Executar migrações e iniciar aplicação
CMD ["sh", "-c", "pnpm exec prisma migrate deploy && if [ \"$RUN_DB_SEED\" = \"true\" ]; then pnpm db:seed; fi && node dist/src/main.js"]
