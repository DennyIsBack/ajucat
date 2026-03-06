import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsStatus, RoleName } from '@prisma/client';

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async create(createNewsDto: CreateNewsDto, authorId: string) {
    const baseSlug = slugify(createNewsDto.title);
    const timestamp = Date.now();
    const slug = `${baseSlug}-${timestamp}`;

    return this.prisma.news.create({
      data: {
        ...createNewsDto,
        slug,
        authorId,
      },
      include: {
        author: { select: { id: true, name: true } },
      },
    });
  }

  async findAll(page = 1, limit = 10, status?: NewsStatus) {
    const skip = (page - 1) * limit;
    const where = status ? { status } : {};

    const [news, total] = await Promise.all([
      this.prisma.news.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: { select: { id: true, name: true } },
        },
      }),
      this.prisma.news.count({ where }),
    ]);

    return {
      news,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findPublished(page = 1, limit = 10) {
    return this.findAll(page, limit, NewsStatus.PUBLISHED);
  }

  async findOne(id: string) {
    const news = await this.prisma.news.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, name: true } },
      },
    });

    if (!news) {
      throw new NotFoundException('Notícia não encontrada');
    }

    return news;
  }

  async findBySlug(slug: string) {
    const news = await this.prisma.news.findUnique({
      where: { slug },
      include: {
        author: { select: { id: true, name: true } },
      },
    });

    if (!news) {
      throw new NotFoundException('Notícia não encontrada');
    }

    return news;
  }

  async update(id: string, updateNewsDto: UpdateNewsDto, userId: string, userRole: string) {
    const news = await this.findOne(id);

    if (userRole !== RoleName.ADMIN && userRole !== RoleName.DIRECTOR && news.authorId !== userId) {
      throw new ForbiddenException('Você não tem permissão para editar esta notícia');
    }

    return this.prisma.news.update({
      where: { id },
      data: updateNewsDto,
      include: {
        author: { select: { id: true, name: true } },
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.news.delete({ where: { id } });
    return { message: 'Notícia removida com sucesso' };
  }
}
