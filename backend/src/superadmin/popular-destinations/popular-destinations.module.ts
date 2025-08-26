import { Module } from '@nestjs/common';
import { PopularDestinationsService } from './popular-destinations.service';
import { PopularDestinationsController } from './popular-destinations.controller';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PopularDestinationsController],
  providers: [PopularDestinationsService],
})
export class PopularDestinationsModule {}
