import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // ✅ supaya otomatis tersedia di semua module
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
