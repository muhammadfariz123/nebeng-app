// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';     // ✅ import PassportModule
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';          // ✅ import JwtStrategy

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // ✅ tambahkan PassportModule
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yourSecretKey', // tetap gunakan env atau fallback
      signOptions: { expiresIn: '1d' },                  // token berlaku 1 hari
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],                // ✅ tambahkan JwtStrategy
  exports: [PassportModule, JwtModule],                 // opsional: jika mau dipakai di module lain
})
export class AuthModule {}
