import { Injectable } from '@nestjs/common';
import { BudgetRepository } from '../../ports/budget.repository.port';
import { FindBudgetByIdQuery } from './find-budget-by-id.query';
import { BudgetNotFoundError } from '../../../domain/budget.errors';

@Injectable()
export class FindBudgetByIdHandler {
  constructor(private readonly repo: BudgetRepository) {}
  async execute(q: FindBudgetByIdQuery) {
    const e = await this.repo.findById(q.id);
    if (!e) throw new BudgetNotFoundError(q.id);
    return e;
  }
}
