// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptionsWithoutRequest } from 'passport-jwt';

@Injectable()
// ✅ Tambahkan generic kedua: StrategyOptionsWithoutRequest
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt' // nama strategy opsional
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Pastikan tidak undefined
      secretOrKey: process.env.JWT_SECRET || 'yourSecretKey',
    } as StrategyOptionsWithoutRequest);
  }

  async validate(payload: any) {
    // Data payload akan tersedia di req.user
    return {
      sub: payload.sub,
      email: payload.email,
      user_type: payload.user_type,
    };
  }
}
