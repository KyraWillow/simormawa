import { Injectable } from '@nestjs/common';
import { EvaluationRepository } from '../../ports/evaluation.repository.port';
import { SubmitEvaluationCommand } from './submit-evaluation.command';
import { EvaluationNotFoundError, EvaluationAlreadySubmittedError } from '../../../domain/evaluation.errors';

@Injectable()
export class SubmitEvaluationService {
  constructor(private readonly repo: EvaluationRepository) {}

  async execute(command: SubmitEvaluationCommand): Promise<void> {
    const entity = await this.repo.findById(command.id);
    if (!entity) throw new EvaluationNotFoundError(command.id);
    entity.submit(command.kesimpulan, command.rekomendasi);
    await this.repo.save(entity);
  }
}
