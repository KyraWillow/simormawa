import { ProgressReportEntity } from '../domain/progress-report.entity';
import { ProgressReportPersistenceModel } from './progress-report.persistence';

export class ProgressReportMapper {
  toDomain(row: ProgressReportPersistenceModel): ProgressReportEntity {
    return ProgressReportEntity.fromPersistence(row.id, {
      workProgramId: row.work_program_id,
      submittedBy: row.submitted_by,
      progressPct: row.progress_pct,
      description: row.description,
      obstacles: row.obstacles ?? undefined,
    });
  }
  toPersistence(e: ProgressReportEntity): ProgressReportPersistenceModel {
    return {
      id: e.id,
      work_program_id: e.workProgramId,
      submitted_by: e.submittedBy,
      progress_pct: e.progressPct,
      description: e.description,
      obstacles: e.obstacles ?? null,
      submitted_at: new Date(),
    };
  }
}
