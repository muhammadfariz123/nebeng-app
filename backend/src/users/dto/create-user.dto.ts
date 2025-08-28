import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(['Superadmin','Admin','Finance','Customer','Driver'] as const)
  user_type: 'Superadmin' | 'Admin' | 'Finance' | 'Customer' | 'Driver';

  @IsOptional()
  banned?: boolean;
}
