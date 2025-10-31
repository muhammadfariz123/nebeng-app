// src/checkout/checkout.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCheckoutDto } from './dto/create-checkout.dto';

const prisma = new PrismaClient();

@Injectable()
export class CheckoutService {
  /**
   * Membuat data checkout baru:
   * - Simpan booking
   * - Simpan payment
   */
  async createCheckout(dto: CreateCheckoutDto) {
    const { userId, tebenganId, totalAmount, bankName } = dto;

    console.log('🧾 Data diterima di service:', dto);

    // Validasi input
    if (!userId || !tebenganId) {
      throw new BadRequestException('userId dan tebenganId wajib diisi.');
    }

    // Pastikan user dan tebengan ada
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new BadRequestException('User tidak ditemukan.');

    const tebengan = await prisma.tebengan.findUnique({ where: { id: tebenganId } });
    if (!tebengan) throw new BadRequestException('Tebengan tidak ditemukan.');

    // 1️⃣ Buat data booking baru
    const booking = await prisma.booking.create({
      data: {
        customerId: userId, // ✅ sesuai schema
        tebenganId,         // ✅ sesuai schema
        status: 'PENDING',
      },
    });

    // 2️⃣ Buat data pembayaran baru
    const payment = await prisma.payment.create({
      data: {
        userId,               // ✅ sesuai schema
        tebenganId,           // ✅ sesuai schema
        bank_name: bankName,  // ✅ sesuai schema
        total_amount: totalAmount,
        payment_status: 'Pending',
      },
    });

    return {
      message: 'Checkout berhasil dibuat ✅',
      booking,
      payment,
    };
  }

  /**
   * Mengambil detail pembayaran berdasarkan ID
   */
  async getPayment(id: number) {
    const payment = await prisma.payment.findUnique({
      where: { id },
      include: {
        user: true,
        tebengan: true,
      },
    });

    if (!payment) throw new BadRequestException('Data pembayaran tidak ditemukan.');

    return payment;
  }

  /**
   * 🔹 Mengambil hanya status pembayaran (Pending | Success | Failed)
   */
  async getPaymentStatus(id: number) {
    const payment = await prisma.payment.findUnique({ where: { id } });

    if (!payment) throw new NotFoundException('Data pembayaran tidak ditemukan.');

    return { status: payment.payment_status };
  }

  /**
   * Update status pembayaran (Pending | Success | Failed)
   */
  async updatePaymentStatus(
    id: number,
    status: 'Pending' | 'Success' | 'Failed',
  ) {
    const payment = await prisma.payment.update({
      where: { id },
      data: { payment_status: status },
    });

    return {
      message: `Status pembayaran diperbarui menjadi ${status} ✅`,
      payment,
    };
  }

  /**
   * 🔹 Mengambil riwayat checkout/pembayaran berdasarkan userId
   *    (sudah disesuaikan dengan kolom tebengan & payment milikmu)
   */
  async getUserHistory(userId: number) {
    const payments = await prisma.payment.findMany({
      where: { userId },
      include: {
        tebengan: true,
        transaction: true,
      },
      orderBy: { id: 'desc' },
    });

    return payments.map((p) => ({
      id: p.id,
      date: new Date(p.created_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      route: p.tebengan
        ? `${p.tebengan.asal} → ${p.tebengan.tujuan}`
        : '-',
      vehicle: p.tebengan?.driverName
        ? `${p.tebengan.driverName} (${p.tebengan.type})`
        : p.tebengan?.type || 'Tidak diketahui',
      price: p.total_amount,
      status:
        p.payment_status === 'Pending'
          ? 'Menunggu Pembayaran'
          : p.payment_status === 'Success'
          ? 'Selesai'
          : 'Dibatalkan',
      type: p.tebengan?.type || 'Barang',
    }));
  }
}
