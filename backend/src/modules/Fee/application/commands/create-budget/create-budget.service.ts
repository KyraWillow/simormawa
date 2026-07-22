import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { BudgetRepository } from '../../ports/budget.repository.port';
import { BudgetEntity } from '../../../domain/budget.entity';
import { CreateBudgetCommand } from './create-budget.command';

@Injectable()
export class CreateBudgetService {
  constructor(private readonly repo: BudgetRepository) {}
  async execute(cmd: CreateBudgetCommand): Promise<string> {
    const existingBudgets = await this.repo.findByWorkProgramId(cmd.workProgramId);
    let id: string = randomUUID();
    if (existingBudgets.length > 0) {
      id = existingBudgets[0].id;
    }
    const entity = BudgetEntity.create(id, cmd.workProgramId, cmd.submittedBy, cmd.items);
    await this.repo.save(entity);
    return id;
  }
}
