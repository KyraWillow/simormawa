import { Injectable } from '@nestjs/common';
import { EvaluationRepository } from '../../ports/evaluation.repository.port';
import { FindEvaluationListQuery } from './find-evaluation-list.query';

@Injectable()
export class FindEvaluationListHandler {
  constructor(private readonly repo: EvaluationRepository) {}

  async execute(query: FindEvaluationListQuery) {
    if (query.workProgramId) {
      return this.repo.findByWorkProgramId(query.workProgramId);
    }
    return this.repo.findAll();
  }
}
