import { Body, Controller, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';
import { UpdateWorkProgramService } from '../../application/commands/update-work-program/update-work-program.service';
import { UpdateWorkProgramRequest } from '../dtos/update-work-program.request.dto';
import { UpdateWorkProgramCommand } from '../../application/commands/update-work-program/update-work-program.command';

import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../../../auth/infrastructure/roles.guard";
import { Roles } from "../../../auth/infrastructure/roles.decorator";
import { Role } from "../../../user/domain/user.entity";

@Controller('work-programs')
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.KADIV, Role.ADMIN)
export class UpdateWorkProgramController {
  constructor(private readonly updateWorkProgramService: UpdateWorkProgramService) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() dto: UpdateWorkProgramRequest) {
    await this.updateWorkProgramService.execute(
      new UpdateWorkProgramCommand(id, dto.name, dto.description, dto.picId, new Date(dto.deadline)),
    );
    return { message: 'Work program updated' };
  }
}
