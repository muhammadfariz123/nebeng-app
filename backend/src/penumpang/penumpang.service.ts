// src/penumpang/penumpang.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class PenumpangService {
  // 🔹 Simpan data penumpang ke database
  async createMany(tebenganId: number, passengers: any[]) {
    if (!tebenganId || passengers.length === 0) {
      throw new Error('Data tidak lengkap');
    }

    const result = await prisma.penumpang.createMany({
      data: passengers.map((p) => ({
        nama: p.name,
        idType: p.idType,
        idNumber: p.idNumber,
        tebenganId,
      })),
    });

    return result;
  }

  // 🔹 Ambil penumpang berdasarkan tebenganId
  async findByTebengan(tebenganId: number) {
    return await prisma.penumpang.findMany({
      where: { tebenganId },
    });
  }
}
