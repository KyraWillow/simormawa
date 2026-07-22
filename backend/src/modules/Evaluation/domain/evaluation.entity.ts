import { AggregateRoot } from '../../../libs/ddd/aggregate-root.base';
import { EvaluationCreatedEvent } from './events/evaluation-created.event';

export enum EvaluationStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
}

export interface EvaluationIndicatorProps {
  indicatorName: string;
  target: string;
  realisasi: string;
  score: number;
  notes?: string;
}

export interface EvaluationProps {
  workProgramId: string;
  evaluatedBy: string;
  kesimpulan?: string;
  rekomendasi?: string;
  status: EvaluationStatus;
  indicators: EvaluationIndicatorProps[];
}

export class EvaluationEntity extends AggregateRoot<EvaluationProps> {
  private constructor(props: EvaluationProps, id: string) {
    super(props, id);
  }

  static create(
    id: string,
    workProgramId: string,
    evaluatedBy: string,
    indicators: EvaluationIndicatorProps[],
  ): EvaluationEntity {
    const entity = new EvaluationEntity(
      { workProgramId, evaluatedBy, status: EvaluationStatus.DRAFT, indicators },
      id,
    );
    entity.addDomainEvent(new EvaluationCreatedEvent(id, { workProgramId, evaluatedBy }));
    return entity;
  }

  get workProgramId(): string {
    return this.props.workProgramId;
  }
  get evaluatedBy(): string {
    return this.props.evaluatedBy;
  }
  get status(): EvaluationStatus {
    return this.props.status;
  }
  get kesimpulan(): string | undefined {
    return this.props.kesimpulan;
  }
  get rekomendasi(): string | undefined {
    return this.props.rekomendasi;
  }
  get indicators(): EvaluationIndicatorProps[] {
    return this.props.indicators;
  }

  validate(): void {
    if (!this.props.workProgramId) throw new Error('Work program ID is required');
    if (!this.props.evaluatedBy) throw new Error('Evaluator is required');
    if (!this.props.indicators || this.props.indicators.length === 0) {
      throw new Error('At least one indicator is required');
    }
    for (const ind of this.props.indicators) {
      if (!ind.indicatorName) throw new Error('Indicator name is required');
      if (ind.score < 1 || ind.score > 5) throw new Error('Score must be between 1 and 5');
    }
    if (!Object.values(EvaluationStatus).includes(this.props.status)) {
      throw new Error('Invalid evaluation status');
    }
  }

  submit(kesimpulan: string, rekomendasi: string): void {
    if (this.props.status === EvaluationStatus.SUBMITTED) {
      throw new Error('Evaluation is already submitted');
    }
    this.props.kesimpulan = kesimpulan;
    this.props.rekomendasi = rekomendasi;
    this.props.status = EvaluationStatus.SUBMITTED;
  }

  updateIndicators(indicators: EvaluationIndicatorProps[]): void {
    this.props.indicators = indicators;
  }

  static fromPersistence(id: string, props: EvaluationProps): EvaluationEntity {
    return new EvaluationEntity(props, id);
  }
}
