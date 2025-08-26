import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class PopularDestinationsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.popularDestination.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  async create(title: string, filePath: string) {
    return this.prisma.popularDestination.create({
      data: {
        title,
        destination_img: filePath,
      },
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.popularDestination.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Destination not found');
    await this.prisma.popularDestination.delete({ where: { id } });
    return { ok: true };
  }
}
