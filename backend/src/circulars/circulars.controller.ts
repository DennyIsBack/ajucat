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
import { CircularsService } from './circulars.service';
import { CreateCircularDto } from './dto/create-circular.dto';
import { UpdateCircularDto } from './dto/update-circular.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RoleName } from '@prisma/client';

@ApiTags('Circulares')
@ApiBearerAuth()
@Controller('circulars')
export class CircularsController {
  constructor(private readonly circularsService: CircularsService) {}

  @Post()
  @Roles(RoleName.DIRECTOR)
  @ApiOperation({ summary: 'Criar circular (DIRECTOR ou superior)' })
  create(@Body() createCircularDto: CreateCircularDto) {
    return this.circularsService.create(createCircularDto);
  }

  @Get()
  @Roles(RoleName.MEMBER)
  @ApiOperation({ summary: 'Listar circulares (membros)' })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('year') year?: string,
  ) {
    return this.circularsService.findAll(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 20,
      year ? parseInt(year) : undefined,
    );
  }

  @Get(':id')
  @Roles(RoleName.MEMBER)
  @ApiOperation({ summary: 'Buscar circular por ID' })
  findOne(@Param('id') id: string) {
    return this.circularsService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleName.DIRECTOR)
  @ApiOperation({ summary: 'Atualizar circular (DIRECTOR ou superior)' })
  update(
    @Param('id') id: string,
    @Body() updateCircularDto: UpdateCircularDto,
  ) {
    return this.circularsService.update(id, updateCircularDto);
  }

  @Delete(':id')
  @Roles(RoleName.ADMIN)
  @ApiOperation({ summary: 'Remover circular (apenas ADMIN)' })
  remove(@Param('id') id: string) {
    return this.circularsService.remove(id);
  }
}
