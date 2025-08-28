import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, vehicle_types } from '@prisma/client';

const prisma = new PrismaClient();

// ✅ hanya boleh Car & Motorbike
const ALLOWED_PASSENGER_VEHICLES = [vehicle_types.Car, vehicle_types.Motorbike];

@Injectable()
export class PassengerPricingService {
  async list() {
    return prisma.passengerPricing.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        departure_terminal: true,
        arrival_terminal: true,
      },
    });
  }

  async create(body: any) {
    const {
      vehicle_type,
      departure_terminal_id,
      arrival_terminal_id,
      price_per_seat,
      commission_percentage,
    } = body ?? {};

    if (!vehicle_type || !departure_terminal_id || !arrival_terminal_id || !price_per_seat || !commission_percentage) {
      throw new BadRequestException('Semua field wajib diisi');
    }

    // ✅ validasi agar hanya Car & Motorbike
    if (!ALLOWED_PASSENGER_VEHICLES.includes(vehicle_type)) {
      throw new BadRequestException('vehicle_type hanya boleh Car atau Motorbike');
    }

    const dep = await prisma.terminal.findUnique({ where: { id: Number(departure_terminal_id) } });
    const arr = await prisma.terminal.findUnique({ where: { id: Number(arrival_terminal_id) } });
    if (!dep || !arr) throw new BadRequestException('Terminal asal/tujuan tidak valid');

    return prisma.passengerPricing.create({
      data: {
        vehicle_type,
        departure_terminal_id: Number(departure_terminal_id),
        arrival_terminal_id: Number(arrival_terminal_id),
        price_per_seat: Number(price_per_seat),
        commission_percentage: Number(commission_percentage),
      },
    });
  }

  async update(id: number, body: any) {
    const exists = await prisma.passengerPricing.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Pricing tidak ditemukan');

    const data: any = {};

    if (body.vehicle_type) {
      if (!ALLOWED_PASSENGER_VEHICLES.includes(body.vehicle_type)) {
        throw new BadRequestException('vehicle_type hanya boleh Car atau Motorbike');
      }
      data.vehicle_type = body.vehicle_type;
    }

    if (body.departure_terminal_id) {
      const dep = await prisma.terminal.findUnique({ where: { id: Number(body.departure_terminal_id) } });
      if (!dep) throw new BadRequestException('Terminal asal tidak valid');
      data.departure_terminal_id = Number(body.departure_terminal_id);
    }

    if (body.arrival_terminal_id) {
      const arr = await prisma.terminal.findUnique({ where: { id: Number(body.arrival_terminal_id) } });
      if (!arr) throw new BadRequestException('Terminal tujuan tidak valid');
      data.arrival_terminal_id = Number(body.arrival_terminal_id);
    }

    if (body.price_per_seat !== undefined) data.price_per_seat = Number(body.price_per_seat);
    if (body.commission_percentage !== undefined) data.commission_percentage = Number(body.commission_percentage);

    return prisma.passengerPricing.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return prisma.passengerPricing.delete({ where: { id } });
  }
}
