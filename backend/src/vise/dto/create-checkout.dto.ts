import { IsString, IsEmail, IsOptional, IsNumber, MinLength } from 'class-validator'

export class CreateCheckoutDto {
  @IsString()
  @MinLength(3)
  name: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(10)
  phone: string

  @IsOptional()
  @IsString()
  company?: string

  @IsString()
  @MinLength(10)
  projectDescription: string

  @IsNumber()
  amount: number

  @IsOptional()
  @IsString()
  cardName?: string

  @IsOptional()
  @IsString()
  cardNumber?: string

  @IsOptional()
  @IsString()
  cardExpiry?: string

  @IsOptional()
  @IsString()
  cardCvc?: string
}
