// src/superadmin/goods-pricing.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, transport_types } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class GoodsPricingService {
  async list() {
    return prisma.goodsPricing.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        departure_terminal: true,
        arrival_terminal: true,
      },
    });
  }

  async create(body: any) {
    const {
      transport_type,
      departure_terminal_id,
      arrival_terminal_id,
      price_per_kg,
      commission_percentage,
    } = body ?? {};

    if (
      !transport_type ||
      departure_terminal_id === undefined ||
      arrival_terminal_id === undefined ||
      price_per_kg === undefined ||
      commission_percentage === undefined
    ) {
      throw new BadRequestException('Semua field wajib diisi');
    }

    if (!Object.values(transport_types).includes(transport_type)) {
      throw new BadRequestException('transport_type tidak valid');
    }

    const dep = await prisma.terminal.findUnique({
      where: { id: Number(departure_terminal_id) },
    });
    const arr = await prisma.terminal.findUnique({
      where: { id: Number(arrival_terminal_id) },
    });
    if (!dep || !arr) {
      throw new BadRequestException('Terminal asal/tujuan tidak valid');
    }

    return prisma.goodsPricing.create({
      data: {
        transport_type,
        departure_terminal_id: Number(departure_terminal_id),
        arrival_terminal_id: Number(arrival_terminal_id),
        price_per_kg: Number(price_per_kg),
        commission_percentage: Number(commission_percentage),
      },
    });
  }

  async update(id: number, body: any) {
    const exists = await prisma.goodsPricing.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException('Goods pricing tidak ditemukan');
    }

    const data: any = {};

    if (body.transport_type !== undefined) {
      if (!Object.values(transport_types).includes(body.transport_type)) {
        throw new BadRequestException('transport_type tidak valid');
      }
      data.transport_type = body.transport_type;
    }

    if (body.departure_terminal_id !== undefined) {
      const dep = await prisma.terminal.findUnique({
        where: { id: Number(body.departure_terminal_id) },
      });
      if (!dep) throw new BadRequestException('Terminal asal tidak valid');
      data.departure_terminal_id = Number(body.departure_terminal_id);
    }

    if (body.arrival_terminal_id !== undefined) {
      const arr = await prisma.terminal.findUnique({
        where: { id: Number(body.arrival_terminal_id) },
      });
      if (!arr) throw new BadRequestException('Terminal tujuan tidak valid');
      data.arrival_terminal_id = Number(body.arrival_terminal_id);
    }

    if (body.price_per_kg !== undefined) {
      data.price_per_kg = Number(body.price_per_kg);
    }

    if (body.commission_percentage !== undefined) {
      data.commission_percentage = Number(body.commission_percentage);
    }

    return prisma.goodsPricing.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return prisma.goodsPricing.delete({ where: { id } });
  }
}
