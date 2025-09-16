import { Module } from '@nestjs/common';
import { PopularDestinationsService } from './popular-destinations.service';
import { PopularDestinationsController } from './popular-destinations.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { PublicPopularDestinationsController } from './public-popular-destinations.controller';

@Module({
  imports: [PrismaModule],
  controllers: [PopularDestinationsController, PublicPopularDestinationsController,],
  providers: [PopularDestinationsService],
})
export class PopularDestinationsModule {}
