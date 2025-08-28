import { IsEmail, IsEnum, IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEnum(['Superadmin','Admin','Finance','Customer','Driver'] as const)
  user_type?: 'Superadmin' | 'Admin' | 'Finance' | 'Customer' | 'Driver';

  @IsOptional()
  @IsBoolean()
  banned?: boolean;
}
