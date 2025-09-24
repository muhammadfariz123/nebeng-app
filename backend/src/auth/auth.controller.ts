import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // validasi user menggunakan service lama
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Email atau password salah');
    }

    // 🔑 generate JWT token menggunakan method signToken dari AuthService
    const token = this.authService.signToken({
      sub: user.id,
      email: user.email,
      user_type: user.user_type,
    });

    return {
      message: 'Login berhasil',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        user_type: user.user_type,
      },
      token, // ✅ token JWT ditambahkan ke response
    };
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  }
}
