import { EvaluationStatus, EvaluationIndicatorProps } from '../../domain/evaluation.entity';

export class EvaluationResponseDto {
  id: string;
  workProgramId: string;
  evaluatedBy: string;
  kesimpulan?: string;
  rekomendasi?: string;
  status: EvaluationStatus;
  indicators: EvaluationIndicatorProps[];

  constructor(data: any) {
    this.id = data.id;
    this.workProgramId = data.workProgramId;
    this.evaluatedBy = data.evaluatedBy;
    this.kesimpulan = data.kesimpulan;
    this.rekomendasi = data.rekomendasi;
    this.status = data.status;
    this.indicators = data.indicators;
  }
}
