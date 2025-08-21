import { Module } from '@nestjs/common';
import { SuperadminService } from './superadmin.service';
import { SuperadminController } from './superadmin.controller';
import { PassengerPricingService } from './passenger-pricing.service';
import { PassengerPricingController } from './passenger-pricing.controller';

@Module({
  controllers: [SuperadminController, PassengerPricingController],
  providers: [SuperadminService,  PassengerPricingService],
})
export class SuperadminModule {}
