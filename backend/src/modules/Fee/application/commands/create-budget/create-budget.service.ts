import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { BudgetRepository } from '../../ports/budget.repository.port';
import { BudgetEntity } from '../../../domain/budget.entity';
import { CreateBudgetCommand } from './create-budget.command';

@Injectable()
export class CreateBudgetService {
  constructor(private readonly repo: BudgetRepository) {}
  async execute(cmd: CreateBudgetCommand): Promise<string> {
    const id = randomUUID();
    const entity = BudgetEntity.create(id, cmd.workProgramId, cmd.submittedBy, cmd.items);
    await this.repo.save(entity);
    return id;
  }
}
