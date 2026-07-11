import { Controller, Get } from '@nestjs/common';
import { DashboardWorkProgramHandler } from '../../application/queries/dashboard/dashboard-work-program.handler';
import { DashboardWorkProgramQuery } from '../../application/queries/dashboard/dashboard-work-program.query';

@Controller('work-programs')
export class DashboardWorkProgramController {
  constructor(private readonly handler: DashboardWorkProgramHandler) {}

  @Get('dashboard')
  async dashboard() {
    return this.handler.execute(new DashboardWorkProgramQuery());
  }
}
