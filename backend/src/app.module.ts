import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SuperadminModule } from './superadmin/superadmin.module';
import { UsersModule } from './users/users.module';
import { GoodsPricingModule } from './superadmin/goods-pricing.module';
import { SlidersModule } from './sliders/sliders.module';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationsModule } from './superadmin/notifications/notifications.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PopularDestinationsModule } from './superadmin/popular-destinations/popular-destinations.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'), // ✅ pastikan selalu dari root project
      serveRoot: '/uploads',
    }),
    AuthModule,
    SuperadminModule,
    UsersModule,
    GoodsPricingModule,
    SlidersModule,
    PrismaModule,
    PopularDestinationsModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
