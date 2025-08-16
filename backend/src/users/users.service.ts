import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaClient, user_types } from '@prisma/client';
import * as bcrypt from 'bcrypt';

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

  async create(data: {
    email: string;
    username: string;
    password: string;
    user_type: user_types;
    banned?: boolean;
  }) {
    const hashed = await bcrypt.hash(data.password, 10);
    try {
      const user = await prisma.user.create({
        data: {
          email: data.email,
          username: data.username,
          password: hashed,
          user_type: data.user_type,
          banned: data.banned ?? false,
        },
      });
      const { password, ...safe } = user;
      return safe;
    } catch (e: any) {
      if (e.code === 'P2002') {
        throw new BadRequestException('Email atau username sudah digunakan');
      }
      throw e;
    }
  }

  async update(id: number, data: Partial<{ email: string; username: string; user_type: user_types; banned: boolean }>) {
    await this.findOne(id);
    try {
      const user = await prisma.user.update({
        where: { id },
        data,
      });
      const { password, ...safe } = user;
      return safe;
    } catch (e: any) {
      if (e.code === 'P2002') {
        throw new BadRequestException('Email atau username sudah digunakan');
      }
      throw e;
    }
  }

  async updatePassword(id: number, password: string) {
    await this.findOne(id);
    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id },
      data: { password: hashed },
    });
    return { message: 'Password diupdate' };
  }

  async remove(id: number) {
    await this.findOne(id);
    await prisma.user.delete({ where: { id } });
    return { message: 'User dihapus' };
  }
}
