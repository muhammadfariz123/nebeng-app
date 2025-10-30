import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // 🔹 Validasi user saat login
  async validateUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Email tidak ditemukan');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Password salah');

    return user;
  }

  // 🔹 Registrasi user baru
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

  // 🔹 Login dan buat token JWT
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Email tidak ditemukan');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('Password salah');

    // ✅ Buat payload token (pakai sub, bukan id)
    const payload = { sub: user.id, username: user.username, role: user.user_type };

    // ✅ Buat token JWT
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login berhasil',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        user_type: user.user_type,
      },
      token, // kirim token ke frontend
    };
  }

  // 🔹 Method tambahan kalau butuh generate token manual
  signToken(payload: { sub: number; email: string; user_type: string }) {
    return this.jwtService.sign(payload);
  }
}
