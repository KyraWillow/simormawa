import { Injectable } from '@nestjs/common';
import { BudgetRepository } from '../../ports/budget.repository.port';
import { BudgetDashboardQuery } from './budget-dashboard.query';
import { BudgetStatus } from '../../../domain/budget.entity';

@Injectable()
export class BudgetDashboardHandler {
  constructor(private readonly repo: BudgetRepository) {}
  async execute(q: BudgetDashboardQuery) {
    const all = await this.repo.findAll();
    return {
      total: all.length,
      totalAmount: all.reduce((s,e) => s + e.totalAmount, 0),
      draft: all.filter(e => e.status === BudgetStatus.DRAFT).length,
      submitted: all.filter(e => e.status === BudgetStatus.SUBMITTED).length,
      approved: all.filter(e => e.status === BudgetStatus.APPROVED).length,
      rejected: all.filter(e => e.status === BudgetStatus.REJECTED).length,
    };
  }
}
