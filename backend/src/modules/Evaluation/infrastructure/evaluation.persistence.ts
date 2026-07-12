export interface EvaluationPersistenceModel {
  id: string;
  work_program_id: string;
  evaluated_by: string;
  kesimpulan: string | null;
  rekomendasi: string | null;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface EvaluationIndicatorPersistenceModel {
  id: string;
  evaluation_id: string;
  indicator_name: string;
  target: string;
  realisasi: string;
  score: number;
  notes: string | null;
}
