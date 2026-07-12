import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { EvaluationRepository } from '../../ports/evaluation.repository.port';
import { EvaluationEntity } from '../../../domain/evaluation.entity';
import { CreateEvaluationCommand } from './create-evaluation.command';

@Injectable()
export class CreateEvaluationService {
  constructor(private readonly repo: EvaluationRepository) {}

  async execute(command: CreateEvaluationCommand): Promise<string> {
    const id = randomUUID();
    const entity = EvaluationEntity.create(id, command.workProgramId, command.evaluatedBy, command.indicators);
    await this.repo.save(entity);
    return id;
  }
}
