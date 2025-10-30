// src/customer/customer.controller.ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CustomerService } from './customer.service';

@Controller('customer')
@UseGuards(JwtAuthGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // ✅ Ambil profil customer berdasarkan user login
  @Get('profile')
  async getProfile(@Req() req: any) {
    const userId = req.user.sub; // Dapat dari payload JWT
    return this.customerService.findById(userId);
  }
}
