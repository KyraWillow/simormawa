export interface ProgressReportPersistenceModel {
  id: string;
  work_program_id: string;
  submitted_by: string;
  progress_pct: number;
  description: string;
  obstacles: string | null;
  submitted_at: Date;
}
