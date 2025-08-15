import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, user_types } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async findAll() {
    return prisma.user.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: number) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User tidak ditemukan');
    return user;
  }

  async update(id: number, data: Partial<{ username: string; email: string; user_type: user_types; banned: boolean }>) {
    await this.findOne(id);
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return prisma.user.delete({ where: { id } });
  }
}
