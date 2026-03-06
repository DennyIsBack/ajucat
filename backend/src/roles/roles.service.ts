import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.role.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: { users: { select: { id: true, name: true, email: true } } },
    });

    if (!role) {
      throw new NotFoundException('Role não encontrada');
    }

    return role;
  }

  async updatePermissions(id: string, permissions: Record<string, string[]>) {
    await this.findOne(id);
    return this.prisma.role.update({
      where: { id },
      data: { permissions },
    });
  }
}
