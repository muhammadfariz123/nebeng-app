import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  // List semua notifikasi (opsional filter by is_read/user_id)
  async findAll(opts?: { user_id?: number; is_read?: boolean }) {
    const where: any = {};
    if (opts?.user_id !== undefined) where.user_id = opts.user_id;
    if (opts?.is_read !== undefined) where.is_read = opts.is_read;

    return this.prisma.notification.findMany({
      where,
      orderBy: { created_at: 'desc' },
    });
  }

  // Buat notifikasi
  async create(user_id: number, message: string) {
    return this.prisma.notification.create({
      data: {
        user_id,
        message,
      },
    });
  }

  // Tandai satu notifikasi sebagai read
  async markRead(id: number) {
    const exists = await this.prisma.notification.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Notification not found');
    return this.prisma.notification.update({ where: { id }, data: { is_read: true } });
  }

  // Tandai satu notifikasi sebagai unread
  async markUnread(id: number) {
    const exists = await this.prisma.notification.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Notification not found');
    return this.prisma.notification.update({ where: { id }, data: { is_read: false } });
  }

  // Hapus notifikasi
  async remove(id: number) {
    const exists = await this.prisma.notification.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Notification not found');
    await this.prisma.notification.delete({ where: { id } });
    return { ok: true };
  }

  // Tandai semua notifikasi (opsional untuk user tertentu) sebagai read
  async markAllRead(user_id?: number) {
    const where = user_id ? { user_id } : {};
    await this.prisma.notification.updateMany({
      where,
      data: { is_read: true },
    });
    return { ok: true };
  }
}
