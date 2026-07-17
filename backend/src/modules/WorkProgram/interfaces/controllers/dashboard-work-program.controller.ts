import { Controller, Get } from '@nestjs/common';
import { DashboardWorkProgramHandler } from '../../application/queries/dashboard/dashboard-work-program.handler';
import { DashboardWorkProgramQuery } from '../../application/queries/dashboard/dashboard-work-program.query';

import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../../../auth/infrastructure/roles.guard";
import { Roles } from "../../../auth/infrastructure/roles.decorator";
import { Role } from "../../../user/domain/user.entity";

@Controller('work-programs')
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.BPH, Role.KADIV, Role.ADMIN)
export class DashboardWorkProgramController {
  constructor(private readonly handler: DashboardWorkProgramHandler) {}

  @Get('dashboard')
  async dashboard() {
    return this.handler.execute(new DashboardWorkProgramQuery());
  }
}
