import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PassengerPricingService } from './passenger-pricing.service';

@Controller('superadmin/passenger-pricing')
export class PassengerPricingController {
  constructor(private readonly service: PassengerPricingService) {}

  @Get()
  list() {
    return this.service.list();
  }

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.service.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
