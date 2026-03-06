import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RoleName } from '@prisma/client';

@ApiTags('Documentos')
@ApiBearerAuth()
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @Roles(RoleName.DIRECTOR)
  @ApiOperation({ summary: 'Criar documento (DIRECTOR ou superior)' })
  create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentsService.create(createDocumentDto);
  }

  @Get()
  @Roles(RoleName.MEMBER)
  @ApiOperation({ summary: 'Listar documentos (membros)' })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('category') category?: string,
  ) {
    return this.documentsService.findAll(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 20,
      category,
    );
  }

  @Get('categories')
  @Roles(RoleName.MEMBER)
  @ApiOperation({ summary: 'Listar categorias de documentos' })
  getCategories() {
    return this.documentsService.getCategories();
  }

  @Get(':id')
  @Roles(RoleName.MEMBER)
  @ApiOperation({ summary: 'Buscar documento por ID' })
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleName.DIRECTOR)
  @ApiOperation({ summary: 'Atualizar documento (DIRECTOR ou superior)' })
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentsService.update(id, updateDocumentDto);
  }

  @Delete(':id')
  @Roles(RoleName.ADMIN)
  @ApiOperation({ summary: 'Remover documento (apenas ADMIN)' })
  remove(@Param('id') id: string) {
    return this.documentsService.remove(id);
  }
}
