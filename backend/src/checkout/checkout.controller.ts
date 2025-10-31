// src/checkout/checkout.controller.ts
import { Body, Controller, Post, Get, Param, Patch } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  async create(@Body() dto: CreateCheckoutDto) {
    const result = await this.checkoutService.createCheckout(dto);
    return {
      message: 'Checkout berhasil dibuat ✅',
      booking: result.booking,
      payment: result.payment,
    };
  }

  @Get('payment/:id')
  async getPayment(@Param('id') id: string) {
    return this.checkoutService.getPayment(Number(id));
  }

  // 🔹 Endpoint baru untuk mendapatkan status pembayaran saja
  @Get('payment/:id/status')
  async getPaymentStatus(@Param('id') id: string) {
    return this.checkoutService.getPaymentStatus(Number(id));
  }

  @Patch('payment/:id/status')
  async updatePaymentStatus(
    @Param('id') id: string,
    @Body() body: { status: 'Pending' | 'Success' | 'Failed' },
  ) {
    return this.checkoutService.updatePaymentStatus(Number(id), body.status);
  }

  // 🔹 Endpoint baru untuk menampilkan riwayat pemesanan berdasarkan userId
  @Get('history/:userId')
  async getUserHistory(@Param('userId') userId: string) {
    return this.checkoutService.getUserHistory(Number(userId));
  }
}
