import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../../auth/infrastructure/roles.guard';
import { Roles } from '../../../auth/infrastructure/roles.decorator';
import { Role } from '../../../user/domain/user.entity';
import { LpjHandler } from '../../application/queries/lpj/lpj.handler';

@Controller('work-programs')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class LpjController {
  constructor(private readonly lpjHandler: LpjHandler) {}

  @Get(':id/lpj')
  @Roles(Role.BPH, Role.KADIV, Role.PIC_STAFF, Role.SEKRETARIS, Role.ADMIN)
  async getLpj(@Param('id') id: string) {
    return await this.lpjHandler.execute(id);
  }
}
