// src/superadmin/superadmin.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { SuperadminService } from './superadmin.service';

@Controller('superadmin')
export class SuperadminController {
  constructor(private readonly superadminService: SuperadminService) {}

  // === DASHBOARD ===
  @Get('dashboard')
  async getDashboard() {
    return this.superadminService.getDashboard();
  }

  // === TERMINALS ===
  @Get('terminals')
  async getTerminals() {
    return this.superadminService.getTerminals();
  }

  @Post('terminals')
  async createTerminal(@Body() data: any) {
    return this.superadminService.createTerminal(data);
  }

  @Put('terminals/:id')
  async updateTerminal(@Param('id') id: string, @Body() data: any) {
    return this.superadminService.updateTerminal(Number(id), data);
  }

  @Delete('terminals/:id')
  async deleteTerminal(@Param('id') id: string) {
    return this.superadminService.deleteTerminal(Number(id));
  }

  // === WILAYAH ===
  @Get('provinces')
  async getProvinces() {
    return this.superadminService.getProvinces();
  }

  @Get('regencies')
  async getRegencies(@Query('provinceId') provinceId: string) {
    return this.superadminService.getRegencies(Number(provinceId));
  }

  @Get('districts')
  async getDistricts(@Query('regencyId') regencyId: string) {
    return this.superadminService.getDistricts(Number(regencyId));
  }
}
