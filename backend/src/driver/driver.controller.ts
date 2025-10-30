// src/driver/driver.controller.ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DriverService } from './driver.service';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  // ✅ Endpoint untuk ambil profil driver dari token
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: any) {
    // Pastikan ambil ID dari "sub" bukan "id"
    const userId = req.user.sub; 
    return this.driverService.findById(userId);
  }
}
