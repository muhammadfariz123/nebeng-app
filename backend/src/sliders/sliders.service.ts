import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SlidersService {
  constructor(private prisma: PrismaService) {}

  // Get all sliders
  async findAll() {
    return this.prisma.slider.findMany();
  }

  // Create new slider
  async create(data: { slider_img: string; is_active?: boolean }) {
    return this.prisma.slider.create({ data });
  }

  // Toggle aktif / nonaktif
  async toggle(id: number) {
    const slider = await this.prisma.slider.findUnique({
      where: { id },
    });

    // ✅ Handle jika slider tidak ditemukan
    if (!slider) {
      throw new NotFoundException(`Slider dengan id ${id} tidak ditemukan`);
    }

    return this.prisma.slider.update({
      where: { id },
      data: { is_active: !slider.is_active },
    });
  }

  // Delete slider
  async remove(id: number) {
    // ✅ Tambahkan pengecekan agar lebih aman
    const slider = await this.prisma.slider.findUnique({ where: { id } });
    if (!slider) {
      throw new NotFoundException(`Slider dengan id ${id} tidak ditemukan`);
    }

    return this.prisma.slider.delete({ where: { id } });
  }
}
