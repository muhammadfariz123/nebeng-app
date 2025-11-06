// src/penumpang/penumpang.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PenumpangService } from './penumpang.service';

@Controller('penumpang')
export class PenumpangController {
  constructor(private readonly penumpangService: PenumpangService) {}

  // 🔹 Endpoint POST /penumpang
  @Post()
  async createPenumpang(@Body() body: any) {
    const { tebenganId, passengers } = body;
    const result = await this.penumpangService.createMany(tebenganId, passengers);
    return { success: true, message: 'Data penumpang berhasil disimpan', result };
  }

  // 🔹 Endpoint GET /penumpang/:tebenganId
  @Get(':tebenganId')
  async getByTebengan(@Param('tebenganId') tebenganId: string) {
    const data = await this.penumpangService.findByTebengan(Number(tebenganId));
    return { success: true, data };
  }
}
