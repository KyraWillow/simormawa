import { Injectable } from '@nestjs/common';
import { ProgressReportRepository } from '../../ports/progress-report.repository.port';
import { FindReportByWorkProgramQuery } from './find-report-by-work-program.query';

@Injectable()
export class FindReportByWorkProgramHandler {
  constructor(private readonly repo: ProgressReportRepository) {}
  async execute(q: FindReportByWorkProgramQuery) {
    return this.repo.findByWorkProgramId(q.workProgramId);
  }
}
