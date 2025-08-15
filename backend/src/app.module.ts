import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module'
import { SuperadminModule } from './superadmin/superadmin.module';
import { UsersModule } from './users/users.module'

@Module({
  imports: [AuthModule, SuperadminModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
