// src/popular-destinations/public-popular-destinations.controller.ts
import { Controller, Get } from '@nestjs/common';
import { PopularDestinationsService } from './popular-destinations.service';

@Controller('popular-destinations')
export class PublicPopularDestinationsController {
  constructor(private service: PopularDestinationsService) {}

  @Get()
  async list() {
    return this.service.findAll();
  }
}
