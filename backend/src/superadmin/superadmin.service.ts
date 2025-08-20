// src/superadmin/superadmin.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaClient, terminal_types, public_terminal_subtypes } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class SuperadminService {
  // === DASHBOARD ===
  async getDashboard() {
    const usersCount = await prisma.user.count();
    const terminalsCount = await prisma.terminal.count();

    const passengerTxCount = await prisma.passengerTransaction.count();
    const goodsTxCount = await prisma.goodsTransaction.count();
    const totalTransactions = passengerTxCount + goodsTxCount;

    const commissions = await prisma.driverCommission.aggregate({
      _sum: { income: true },
    });
    const totalCommission = commissions._sum.income ?? 0;

    const passengerTx = await prisma.passengerTransaction.findMany({
      take: 5,
      orderBy: { created_at: 'desc' },
      include: { customer: true },
    });

    const goodsTx = await prisma.goodsTransaction.findMany({
      take: 5,
      orderBy: { created_at: 'desc' },
      include: { customer: true },
    });

    const allTx = [
      ...passengerTx.map((tx) => ({
        id: `P-${tx.id}`,
        customer: tx.customer.username,
        amount: tx.total_amount,
        date: tx.transaction_date,
        status: tx.payment_status,
      })),
      ...goodsTx.map((tx) => ({
        id: `G-${tx.id}`,
        customer: tx.customer.username,
        amount: tx.total_amount,
        date: tx.transaction_date,
        status: tx.payment_status,
      })),
    ]
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
      .slice(0, 10);

    return {
      stats: {
        users: usersCount,
        terminals: terminalsCount,
        transactions: totalTransactions,
        totalCommission,
      },
      recentTransactions: allTx,
    };
  }

  // === TERMINALS ===
  async getTerminals() {
    return prisma.terminal.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  async createTerminal(data: any) {
    const {
      name,
      terminal_type,
      public_terminal_subtype,
      full_address,
      latitude,
      longitude,
      province_name,
      regency_name,
      district_name,
    } = data ?? {};

    if (!name || !terminal_type || !full_address) {
      throw new BadRequestException('name, terminal_type, full_address wajib diisi');
    }
    if (!province_name || !regency_name || !district_name) {
      throw new BadRequestException('province_name, regency_name, district_name wajib diisi');
    }

    if (!Object.values(terminal_types).includes(terminal_type)) {
      throw new BadRequestException('terminal_type tidak valid');
    }
    if (
      terminal_type === 'Public' &&
      public_terminal_subtype &&
      !Object.values(public_terminal_subtypes).includes(public_terminal_subtype)
    ) {
      throw new BadRequestException('public_terminal_subtype tidak valid');
    }

    return prisma.terminal.create({
      data: {
        name,
        terminal_type,
        public_terminal_subtype:
          terminal_type === 'Public' ? public_terminal_subtype ?? null : null,
        province_name,
        regency_name,
        district_name,
        full_address,
        longitude: longitude ? String(longitude) : '',
        latitude: latitude ? String(latitude) : '',
      },
    });
  }

  // === UPDATE TERMINAL ===
  async updateTerminal(id: number, data: any) {
    return prisma.terminal.update({
      where: { id },
      data,
    });
  }

  // === DELETE TERMINAL ===
  async deleteTerminal(id: number) {
    return prisma.terminal.delete({
      where: { id },
    });
  }

  // === LOKASI ===
  async getProvinces() {
    return prisma.province.findMany({ orderBy: { name: 'asc' } });
  }

  async getRegencies(provinceId: number) {
    return prisma.regency.findMany({
      where: { province_id: provinceId },
      orderBy: { name: 'asc' },
    });
  }

  async getDistricts(regencyId: number) {
    return prisma.district.findMany({
      where: { regency_id: regencyId },
      orderBy: { name: 'asc' },
    });
  }
}
