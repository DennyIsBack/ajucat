import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date, pattern = "dd 'de' MMMM 'de' yyyy") {
  return format(new Date(date), pattern, { locale: ptBR })
}

export function formatRelativeDate(date: string | Date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ptBR })
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getRoleLabel(role: string): string {
  const labels: Record<string, string> = {
    VISITOR: 'Visitante',
    MEMBER: 'Membro',
    DIRECTOR: 'Diretor',
    ADMIN: 'Administrador',
  }
  return labels[role] || role
}

export function getRoleBadgeColor(role: string): string {
  const colors: Record<string, string> = {
    VISITOR: 'bg-gray-100 text-gray-800',
    MEMBER: 'bg-blue-100 text-blue-800',
    DIRECTOR: 'bg-purple-100 text-purple-800',
    ADMIN: 'bg-red-100 text-red-800',
  }
  return colors[role] || 'bg-gray-100 text-gray-800'
}

export function getShareUrl(platform: 'facebook' | 'twitter', url: string, title: string): string {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  if (platform === 'facebook') {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
  }

  return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
}
