import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TebenganService } from './tebengan.service';

@Controller('tebengan')
export class TebenganController {
  constructor(private readonly tebenganService: TebenganService) {}

  // ✅ CREATE Tebengan
  @Post()
  async create(
    @Body()
    body: {
      asal: string;
      tujuan: string;
      waktu: Date;
      harga: number;
      type: string;
      driverId: number;
      driverName: string; // ✅ Nama driver
      jumlahPenumpang?: number; // ✅ Tambahan opsional untuk mobil
    },
  ) {
    return this.tebenganService.create(body);
  }

  // ✅ GET ALL Tebengan
  @Get()
  async findAll(@Query('type') type?: string) {
    return this.tebenganService.findAll(type);
  }

  // ✅ GET ONE Tebengan
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tebenganService.findOne(Number(id));
  }
}
