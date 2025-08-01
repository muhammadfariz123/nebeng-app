// src/auth/dto/register.dto.ts
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class RegisterDto {
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @MinLength(6)
  password: string

  @IsString()
  user_type: 'Superadmin' | 'Admin' | 'Finance' | 'Customer' | 'Driver'
}
