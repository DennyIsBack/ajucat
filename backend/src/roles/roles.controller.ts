import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { Roles } from '../common/decorators/roles.decorator';
import { RoleName } from '@prisma/client';

@ApiTags('Roles')
@ApiBearerAuth()
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @Roles(RoleName.DIRECTOR)
  @ApiOperation({ summary: 'Listar todas as roles' })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @Roles(RoleName.DIRECTOR)
  @ApiOperation({ summary: 'Buscar role por ID' })
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id/permissions')
  @Roles(RoleName.ADMIN)
  @ApiOperation({ summary: 'Atualizar permissões de uma role (apenas ADMIN)' })
  updatePermissions(
    @Param('id') id: string,
    @Body() body: { permissions: Record<string, string[]> },
  ) {
    return this.rolesService.updatePermissions(id, body.permissions);
  }
}
