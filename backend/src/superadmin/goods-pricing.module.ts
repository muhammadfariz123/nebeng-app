// src/superadmin/goods-pricing.module.ts
import { Module } from '@nestjs/common';
import { GoodsPricingController } from './goods-pricing.controller';
import { GoodsPricingService } from './goods-pricing.service';

@Module({
  controllers: [GoodsPricingController],
  providers: [GoodsPricingService],
})
export class GoodsPricingModule {}
