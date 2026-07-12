import { EvaluationEntity } from '../../domain/evaluation.entity';

export abstract class EvaluationRepository {
  abstract findById(id: string): Promise<EvaluationEntity | null>;
  abstract findByWorkProgramId(workProgramId: string): Promise<EvaluationEntity[]>;
  abstract findAll(): Promise<EvaluationEntity[]>;
  abstract save(entity: EvaluationEntity): Promise<EvaluationEntity>;
}
