// src/customer/customer.controller.ts
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('customer')
@UseGuards(JwtAuthGuard)
export class CustomerController {
  constructor(private prisma: PrismaService) {}

  @Get('profile')
  async getProfile(@Req() req) {
    const user = await this.prisma.user.findUnique({
      where: { id: req.user.sub },
      select: { id: true, username: true, email: true,  },
    });

    if (!user || req.user.user_type !== 'Customer') {
      return { message: 'Bukan customer', user: null };
    }

    return user;
  }
}
