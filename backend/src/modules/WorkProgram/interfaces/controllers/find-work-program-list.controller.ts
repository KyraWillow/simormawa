import { Controller, Get } from '@nestjs/common';
import { FindListWorkProgramHandler } from '../../application/queries/find-list/find-list-work-program.handler';
import { FindListWorkProgramQuery } from '../../application/queries/find-list/find-list-work-program.query';
import { WorkProgramResponseDto } from '../dtos/work-program.response.dto';

import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../../../auth/infrastructure/roles.guard";
import { Roles } from "../../../auth/infrastructure/roles.decorator";
import { Role } from "../../../user/domain/user.entity";

@Controller('work-programs')
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.BPH, Role.KADIV, Role.PIC_STAFF, Role.SEKRETARIS, Role.ADMIN)
export class FindWorkProgramListController {
  constructor(private readonly handler: FindListWorkProgramHandler) {}

  @Get()
  async findAll() {
    const items = await this.handler.execute(new FindListWorkProgramQuery());
    return items.map((item: any) => new WorkProgramResponseDto(item));
  }
}
