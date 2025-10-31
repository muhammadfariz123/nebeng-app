import { Injectable, BadRequestException } from '@nestjs/common';
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
        userId,             // ✅ sesuai schema
        tebenganId,         // ✅ sesuai schema
        bank_name: bankName, // ✅ sesuai schema
        total_amount: totalAmount, // ✅ sesuai schema
        payment_status: 'Pending', // ✅ sesuai schema
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
   * Update status pembayaran (Pending | Success | Failed)
   */
  async updatePaymentStatus(
    id: number,
    status: 'Pending' | 'Success' | 'Failed',
  ) {
    const payment = await prisma.payment.update({
      where: { id },
      data: { payment_status: status }, // ✅ sesuai schema
    });

    return {
      message: `Status pembayaran diperbarui menjadi ${status} ✅`,
      payment,
    };
  }
}
