import { Injectable } from '@nestjs/common';
import { BudgetRepository } from '../../ports/budget.repository.port';
import { FindBudgetListQuery } from './find-budget-list.query';

@Injectable()
export class FindBudgetListHandler {
  constructor(private readonly repo: BudgetRepository) {}
  async execute(q: FindBudgetListQuery) {
    if (q.workProgramId) return this.repo.findByWorkProgramId(q.workProgramId);
    return this.repo.findAll();
  }
}
