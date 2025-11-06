// src/penumpang/penumpang.module.ts
import { Module } from '@nestjs/common';
import { PenumpangService } from './penumpang.service';
import { PenumpangController } from './penumpang.controller';

@Module({
  controllers: [PenumpangController],
  providers: [PenumpangService],
})
export class PenumpangModule {}
