import { Injectable } from '@nestjs/common';
import { EvaluationRepository } from '../../ports/evaluation.repository.port';
import { FindEvaluationByIdQuery } from './find-evaluation-by-id.query';
import { EvaluationNotFoundError } from '../../../domain/evaluation.errors';

@Injectable()
export class FindEvaluationByIdHandler {
  constructor(private readonly repo: EvaluationRepository) {}

  async execute(query: FindEvaluationByIdQuery) {
    const entity = await this.repo.findById(query.id);
    if (!entity) throw new EvaluationNotFoundError(query.id);
    return entity;
  }
}
