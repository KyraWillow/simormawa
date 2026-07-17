import { Controller, Get, Param } from '@nestjs/common';
import { FindByIdWorkProgramHandler } from '../../application/queries/find-by-id/find-by-id-work-program.handler';
import { FindByIdWorkProgramQuery } from '../../application/queries/find-by-id/find-by-id-work-program.query';
import { WorkProgramResponseDto } from '../dtos/work-program.response.dto';

import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../../../auth/infrastructure/roles.guard";
import { Roles } from "../../../auth/infrastructure/roles.decorator";
import { Role } from "../../../user/domain/user.entity";

@Controller('work-programs')
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.BPH, Role.KADIV, Role.PIC_STAFF, Role.SEKRETARIS, Role.ADMIN)
export class FindWorkProgramByIdController {
  constructor(private readonly handler: FindByIdWorkProgramHandler) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    const item = await this.handler.execute(new FindByIdWorkProgramQuery(id));
    return new WorkProgramResponseDto(item);
  }
}
