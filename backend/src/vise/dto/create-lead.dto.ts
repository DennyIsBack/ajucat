import { IsString, IsEmail, MinLength } from 'class-validator'

export class CreateLeadDto {
  @IsString()
  @MinLength(3)
  name: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(10)
  phone: string

  @IsString()
  @MinLength(10)
  message: string
}
