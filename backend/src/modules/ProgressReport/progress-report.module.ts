import { Module } from '@nestjs/common';
import { ProgressReportRepository } from './application/ports/progress-report.repository.port';
import { ProgressReportRepositoryImpl } from './infrastructure/progress-report.repository';
import { ProgressReportMapper } from './infrastructure/progress-report.mapper';
import { CreateReportService } from './application/commands/create-report/create-report.service';
import { FindReportListHandler } from './application/queries/find-report-list/find-report-list.handler';
import { FindReportByWorkProgramHandler } from './application/queries/find-report-by-work-program/find-report-by-work-program.handler';
import { ReportController } from './interfaces/controllers/report.controller';

@Module({
  controllers: [ReportController],
  providers: [
    CreateReportService, FindReportListHandler, FindReportByWorkProgramHandler,
    ProgressReportMapper,
    { provide: ProgressReportRepository, useClass: ProgressReportRepositoryImpl },
  ],
  exports: [ProgressReportRepository],
})
export class ProgressReportModule {}
