import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TebenganService {
  constructor(private prisma: PrismaService) {}

  // ✅ CREATE Tebengan
  async create(data: any) {
    return this.prisma.tebengan.create({
      data: {
        asal: data.asal,
        tujuan: data.tujuan,
        waktu: new Date(data.waktu),
        harga: Number(data.harga),
        type: data.type,
        driverId: Number(data.driverId),
        driverName: data.driverName, // ✅ Tambahkan agar nama driver tersimpan
      },
      include: {
        driver: {
          select: {
            id: true,
            username: true,
            email: true,
            user_type: true,
          },
        },
      },
    });
  }

  // ✅ GET ALL Tebengan
  async findAll(type?: string) {
    const filter = type ? { type } : {};
    return this.prisma.tebengan.findMany({
      where: filter,
      include: {
        driver: {
          select: {
            id: true,
            username: true,
            email: true,
            user_type: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ✅ GET ONE Tebengan
  async findOne(id: number) {
    return this.prisma.tebengan.findUnique({
      where: { id },
      include: {
        driver: {
          select: {
            id: true,
            username: true,
            email: true,
            user_type: true,
          },
        },
      },
    });
  }
}
