import { Body, Controller, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { UpdateStatusWorkProgramService } from '../../application/commands/update-status-work-program/update-status-work-program.service';
import { UpdateStatusWorkProgramCommand } from '../../application/commands/update-status-work-program/update-status-work-program.command';
import { WorkProgramStatus } from '../../domain/work-program.entity';

import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../../../auth/infrastructure/roles.guard";
import { Roles } from "../../../auth/infrastructure/roles.decorator";
import { Role } from "../../../user/domain/user.entity";

export class UpdateStatusRequest {
  @IsEnum(WorkProgramStatus)
  @IsNotEmpty()
  status: WorkProgramStatus;
}

@Controller('work-programs')
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.KADIV, Role.PIC_STAFF, Role.ADMIN)
export class UpdateStatusWorkProgramController {
  constructor(private readonly service: UpdateStatusWorkProgramService) {}

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  async updateStatus(@Param('id') id: string, @Body() body: UpdateStatusRequest) {
    await this.service.execute(new UpdateStatusWorkProgramCommand(id, body.status));
    return { message: 'Status updated' };
  }
}
