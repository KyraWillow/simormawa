import { EvaluationEntity, EvaluationStatus, EvaluationIndicatorProps } from '../domain/evaluation.entity';
import { EvaluationPersistenceModel, EvaluationIndicatorPersistenceModel } from './evaluation.persistence';

export class EvaluationMapper {
  toDomain(
    row: EvaluationPersistenceModel,
    indicatorRows: EvaluationIndicatorPersistenceModel[],
  ): EvaluationEntity {
    const indicators: EvaluationIndicatorProps[] = indicatorRows.map((r) => ({
      indicatorName: r.indicator_name,
      target: r.target,
      realisasi: r.realisasi,
      score: r.score,
      notes: r.notes ?? undefined,
    }));

    const status = row.status as EvaluationStatus;

    const props = {
      workProgramId: row.work_program_id,
      evaluatedBy: row.evaluated_by,
      kesimpulan: row.kesimpulan ?? undefined,
      rekomendasi: row.rekomendasi ?? undefined,
      status,
      indicators,
    };

    return EvaluationEntity.fromPersistence(row.id, props);
  }

  toPersistence(
    entity: EvaluationEntity,
  ): { evaluation: EvaluationPersistenceModel; indicators: EvaluationIndicatorPersistenceModel[] } {
    const evaluation: EvaluationPersistenceModel = {
      id: entity.id,
      work_program_id: entity.workProgramId,
      evaluated_by: entity.evaluatedBy,
      kesimpulan: entity.kesimpulan ?? null,
      rekomendasi: entity.rekomendasi ?? null,
      status: entity.status,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const indicators: EvaluationIndicatorPersistenceModel[] = entity.indicators.map((ind, i) => ({
      id: `${entity.id}-ind-${i}`,
      evaluation_id: entity.id,
      indicator_name: ind.indicatorName,
      target: ind.target,
      realisasi: ind.realisasi,
      score: ind.score,
      notes: ind.notes ?? null,
    }));

    return { evaluation, indicators };
  }
}
