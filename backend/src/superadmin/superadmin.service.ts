import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

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
      include: {
        province: true,
        regency: true,
        district: true,
      },
    });
  }

  async createTerminal(data: any) {
    return prisma.terminal.create({ data });
  }

  async updateTerminal(id: number, data: any) {
    return prisma.terminal.update({
      where: { id },
      data,
    });
  }

  async deleteTerminal(id: number) {
    return prisma.terminal.delete({ where: { id } });
  }

  // === LOKASI ===
  async getProvinces() {
    return prisma.province.findMany();
  }

  async getRegencies(provinceId: number) {
    return prisma.regency.findMany({
      where: { province_id: provinceId },
    });
  }

  async getDistricts(regencyId: number) {
    return prisma.district.findMany({
      where: { regency_id: regencyId },
    });
  }
}
