import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { DeleteWorkProgramService } from '../../application/commands/delete-work-program/delete-work-program.service';
import { DeleteWorkProgramCommand } from '../../application/commands/delete-work-program/delete-work-program.command';

import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../../../auth/infrastructure/roles.guard";
import { Roles } from "../../../auth/infrastructure/roles.decorator";
import { Role } from "../../../user/domain/user.entity";

@Controller('work-programs')
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.BPH, Role.KADIV, Role.ADMIN)
export class DeleteWorkProgramController {
  constructor(private readonly service: DeleteWorkProgramService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    await this.service.execute(new DeleteWorkProgramCommand(id));
    return { message: 'Work program deleted' };
  }
}
