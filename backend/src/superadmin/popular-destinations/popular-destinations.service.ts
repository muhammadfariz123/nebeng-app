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

  // menerima title, destination_img, dan maps_url (nullable)
  async create(data: { title: string; destination_img: string; maps_url?: string | null }) {
    return this.prisma.popularDestination.create({
      data: {
        title: data.title,
        destination_img: data.destination_img,
        maps_url: data.maps_url ?? null,
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
