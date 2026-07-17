import { Injectable } from '@nestjs/common';
import { ProgressReportRepository } from '../../ports/progress-report.repository.port';
import { FindReportListQuery } from './find-report-list.query';

@Injectable()
export class FindReportListHandler {
  constructor(private readonly repo: ProgressReportRepository) {}
  async execute(q: FindReportListQuery) {
    return this.repo.findAll();
  }
}
