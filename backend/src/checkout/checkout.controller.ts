import { Body, Controller, Post, Get, Param, Patch } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  async create(@Body() dto: CreateCheckoutDto) {
    return this.checkoutService.createCheckout(dto);
  }

  @Get('payment/:id')
  async getPayment(@Param('id') id: string) {
    return this.checkoutService.getPayment(Number(id));
  }

  @Patch('payment/:id/status')
  async updatePaymentStatus(
    @Param('id') id: string,
    @Body() body: { status: 'Pending' | 'Success' | 'Failed' },
  ) {
    return this.checkoutService.updatePaymentStatus(Number(id), body.status);
  }
}
