import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt'; // ✅ ditambahkan

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {} // ✅ ditambahkan

  async validateUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;

    return user;
  }

  async registerUser(data: RegisterDto) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email sudah digunakan');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashedPassword,
        user_type: data.user_type,
      },
    });

    return {
      message: 'Registrasi berhasil',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        user_type: user.user_type,
      },
    };
  }

  // ✅ method baru untuk generate JWT
  signToken(payload: { sub: number; email: string; user_type: string }) {
    return this.jwt.sign(payload);
  }
}
