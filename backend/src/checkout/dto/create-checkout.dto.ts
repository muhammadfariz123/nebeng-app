// src/checkout/dto/create-checkout.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCheckoutDto {
  @IsNotEmpty({ message: 'userId wajib diisi' })
  @IsNumber()
  userId: number;

  @IsNotEmpty({ message: 'tebenganId wajib diisi' })
  @IsNumber()
  tebenganId: number;

  @IsNotEmpty({ message: 'totalAmount wajib diisi' })
  @IsNumber()
  totalAmount: number;

  @IsNotEmpty({ message: 'bankName wajib diisi' })
  @IsString()
  bankName: string;
}
