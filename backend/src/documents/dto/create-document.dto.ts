import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDocumentDto {
  @ApiProperty({ example: 'Estatuto Social AJUCAT' })
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'https://storage.ajucat.org.br/docs/estatuto.pdf' })
  @IsString()
  url: string;

  @ApiProperty({ example: 'estatuto' })
  @IsString()
  category: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mimeType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  fileSize?: number;

  @ApiPropertyOptional({ description: 'ID da role mínima para visualizar' })
  @IsOptional()
  @IsString()
  visibilityRoleId?: string;
}
