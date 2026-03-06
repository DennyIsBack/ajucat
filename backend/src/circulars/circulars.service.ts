import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCircularDto } from './dto/create-circular.dto';
import { UpdateCircularDto } from './dto/update-circular.dto';

@Injectable()
export class CircularsService {
  constructor(private prisma: PrismaService) {}

  async create(createCircularDto: CreateCircularDto) {
    return this.prisma.circular.create({
      data: createCircularDto,
    });
  }

  async findAll(page = 1, limit = 20, year?: number) {
    const skip = (page - 1) * limit;
    const where = year ? { year } : {};

    const [circulars, total] = await Promise.all([
      this.prisma.circular.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.circular.count({ where }),
    ]);

    return {
      circulars,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const circular = await this.prisma.circular.findUnique({
      where: { id },
    });

    if (!circular) {
      throw new NotFoundException('Circular não encontrada');
    }

    return circular;
  }

  async update(id: string, updateCircularDto: UpdateCircularDto) {
    await this.findOne(id);
    return this.prisma.circular.update({
      where: { id },
      data: updateCircularDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.circular.delete({ where: { id } });
    return { message: 'Circular removida com sucesso' };
  }
}
