// src/customer/customer.module.ts
import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [CustomerController],
  providers: [PrismaService],
})
export class CustomerModule {}
