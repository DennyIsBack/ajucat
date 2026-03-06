import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCircularDto {
  @ApiProperty({ example: 'Circular nº 001/2025 - Assembleia Geral' })
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fileUrl?: string;

  @ApiPropertyOptional({ example: '001' })
  @IsOptional()
  @IsString()
  number?: string;

  @ApiPropertyOptional({ example: 2025 })
  @IsOptional()
  @IsNumber()
  year?: number;

  @ApiPropertyOptional({ description: 'ID da role mínima para visualizar' })
  @IsOptional()
  @IsString()
  visibilityRoleId?: string;
}
