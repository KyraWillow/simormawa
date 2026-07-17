import { Injectable } from '@nestjs/common';
import { BudgetRepository } from '../../ports/budget.repository.port';
import { SubmitBudgetCommand } from './submit-budget.command';
import { BudgetNotFoundError } from '../../../domain/budget.errors';

@Injectable()
export class SubmitBudgetService {
  constructor(private readonly repo: BudgetRepository) {}
  async execute(cmd: SubmitBudgetCommand): Promise<void> {
    const entity = await this.repo.findById(cmd.id);
    if (!entity) throw new BudgetNotFoundError(cmd.id);
    entity.submit(cmd.notes);
    await this.repo.save(entity);
  }
}
