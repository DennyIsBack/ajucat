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
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { JwtPayload } from '../common/decorators/current-user.decorator';
import { RoleName } from '@prisma/client';

@ApiTags('Notícias')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Public()
  @Get('public')
  @ApiOperation({ summary: 'Listar notícias publicadas (público)' })
  findPublished(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.newsService.findPublished(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 10,
    );
  }

  @Public()
  @Get('public/:slug')
  @ApiOperation({ summary: 'Buscar notícia por slug (público)' })
  findBySlug(@Param('slug') slug: string) {
    return this.newsService.findBySlug(slug);
  }

  @Post()
  @Roles(RoleName.DIRECTOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar notícia (DIRECTOR ou superior)' })
  create(
    @Body() createNewsDto: CreateNewsDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.newsService.create(createNewsDto, user.sub);
  }

  @Get()
  @Roles(RoleName.MEMBER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todas as notícias (membros)' })
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.newsService.findAll(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 10,
    );
  }

  @Get(':id')
  @Roles(RoleName.MEMBER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar notícia por ID' })
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleName.DIRECTOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar notícia (DIRECTOR ou superior)' })
  update(
    @Param('id') id: string,
    @Body() updateNewsDto: UpdateNewsDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.newsService.update(id, updateNewsDto, user.sub, user.role);
  }

  @Delete(':id')
  @Roles(RoleName.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover notícia (apenas ADMIN)' })
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}
