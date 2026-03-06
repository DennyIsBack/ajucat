// Tipos de roles
export type RoleName = 'VISITOR' | 'MEMBER' | 'DIRECTOR' | 'ADMIN'

// Tipos de status de notícia
export type NewsStatus = 'DRAFT' | 'PUBLISHED'

// Usuário autenticado
export interface AuthUser {
  id: string
  name: string
  email: string
  role: RoleName
}

// Tokens JWT
export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

// Resposta de login
export interface LoginResponse {
  data: {
    user: AuthUser
    accessToken: string
    refreshToken: string
  }
}

// Role
export interface Role {
  id: string
  name: RoleName
  permissions: Record<string, string[]>
  createdAt: string
  updatedAt: string
}

// Usuário completo
export interface User {
  id: string
  name: string
  email: string
  roleId: string
  role: Role
  active: boolean
  createdAt: string
  updatedAt: string
}

// Notícia
export interface News {
  id: string
  title: string
  slug: string
  summary?: string
  content: string
  imageUrl?: string
  status: NewsStatus
  authorId: string
  author: {
    id: string
    name: string
  }
  createdAt: string
  updatedAt: string
}

// Documento
export interface Document {
  id: string
  name: string
  description?: string
  url: string
  category: string
  mimeType?: string
  fileSize?: number
  visibilityRoleId?: string
  createdAt: string
  updatedAt: string
}

// Circular
export interface Circular {
  id: string
  title: string
  description?: string
  fileUrl?: string
  number?: string
  year?: number
  visibilityRoleId?: string
  createdAt: string
  updatedAt: string
}

// Log de auditoria
export interface AuditLog {
  id: string
  action: string
  userId?: string
  user?: {
    id: string
    name: string
    email: string
  }
  entity: string
  entityId?: string
  metadata?: Record<string, unknown>
  ipAddress?: string
  createdAt: string
}

// Resposta paginada genérica
export interface PaginatedResponse<T> {
  data: {
    total: number
    page: number
    limit: number
    totalPages: number
  } & Record<string, T[] | number>
}

// Resposta da API
export interface ApiResponse<T> {
  data: T
  timestamp: string
}

// Erro da API
export interface ApiError {
  statusCode: number
  message: string
  errors?: unknown
  timestamp: string
  path: string
}

// Formulário de login
export interface LoginFormData {
  email: string
  password: string
}

// Formulário de criação de notícia
export interface CreateNewsFormData {
  title: string
  summary?: string
  content: string
  imageUrl?: string
  status: NewsStatus
}

// Formulário de criação de documento
export interface CreateDocumentFormData {
  name: string
  description?: string
  url: string
  category: string
  mimeType?: string
  fileSize?: number
  visibilityRoleId?: string
}

// Formulário de criação de circular
export interface CreateCircularFormData {
  title: string
  description?: string
  fileUrl?: string
  number?: string
  year?: number
  visibilityRoleId?: string
}
