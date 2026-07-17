import { ProgressReportEntity } from '../../domain/progress-report.entity';

export abstract class ProgressReportRepository {
  abstract findById(id: string): Promise<ProgressReportEntity | null>;
  abstract findByWorkProgramId(wpId: string): Promise<ProgressReportEntity[]>;
  abstract findAll(): Promise<ProgressReportEntity[]>;
  abstract save(e: ProgressReportEntity): Promise<ProgressReportEntity>;
}
