import { Injectable } from '@nestjs/common';
import { WorkProgramRepository } from '../../ports/work-program.repository.port';
import { DashboardWorkProgramQuery } from './dashboard-work-program.query';

@Injectable()
export class DashboardWorkProgramHandler {
  constructor(private readonly workProgramRepo: WorkProgramRepository) {}

  async execute(query: DashboardWorkProgramQuery) {
    const all = await this.workProgramRepo.findAll();
    const active = await this.workProgramRepo.findAllActive();

    return {
      total: all.length,
      active: active.length,
      completed: all.filter((wp) => wp.status === 'COMPLETED').length,
      onHold: all.filter((wp) => wp.status === 'ON_HOLD').length,
      notStarted: all.filter((wp) => wp.status === 'NOT_STARTED').length,
      inProgress: all.filter((wp) => wp.status === 'IN_PROGRESS').length,
    };
  }
}
