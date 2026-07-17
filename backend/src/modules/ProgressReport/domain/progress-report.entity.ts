import { AggregateRoot } from '../../../libs/ddd/aggregate-root.base';

export interface ProgressReportProps {
  workProgramId: string;
  submittedBy: string;
  progressPct: number;
  description: string;
  obstacles?: string;
}

export class ProgressReportEntity extends AggregateRoot<ProgressReportProps> {
  private constructor(p: ProgressReportProps, id: string) { super(p, id); }

  static create(id: string, workProgramId: string, submittedBy: string, progressPct: number, description: string, obstacles?: string) {
    return new ProgressReportEntity({ workProgramId, submittedBy, progressPct, description, obstacles }, id);
  }

  get workProgramId(): string { return this.props.workProgramId; }
  get submittedBy(): string { return this.props.submittedBy; }
  get progressPct(): number { return this.props.progressPct; }
  get description(): string { return this.props.description; }
  get obstacles(): string | undefined { return this.props.obstacles; }

  validate(): void {
    if (!this.props.workProgramId) throw new Error('Work program is required');
    if (!this.props.submittedBy) throw new Error('Submitter is required');
    if (this.props.progressPct < 0 || this.props.progressPct > 100) throw new Error('Progress must be 0-100');
    if (!this.props.description) throw new Error('Description is required');
  }

  static fromPersistence(id: string, p: ProgressReportProps): ProgressReportEntity {
    return new ProgressReportEntity(p, id);
  }
}
