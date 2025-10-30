import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TebenganService } from './tebengan.service';
import { TebenganController } from './tebengan.controller';

@Module({
  controllers: [TebenganController],
  providers: [TebenganService, PrismaService],
})
export class TebenganModule {}
