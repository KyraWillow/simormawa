import { Module } from '@nestjs/common';
import { BudgetRepository } from './application/ports/budget.repository.port';
import { BudgetRepositoryImpl } from './infrastructure/budget.repository';
import { BudgetMapper } from './infrastructure/budget.mapper';
import { CreateBudgetService } from './application/commands/create-budget/create-budget.service';
import { SubmitBudgetService } from './application/commands/submit-budget/submit-budget.service';
import { ApproveBudgetService } from './application/commands/approve-budget/approve-budget.service';
import { FindBudgetListHandler } from './application/queries/find-budget-list/find-budget-list.handler';
import { FindBudgetByIdHandler } from './application/queries/find-budget-by-id/find-budget-by-id.handler';
import { BudgetDashboardHandler } from './application/queries/budget-dashboard/budget-dashboard.handler';
import { BudgetController } from './interfaces/controllers/budget.controller';

@Module({
  controllers: [BudgetController],
  providers: [
    CreateBudgetService, SubmitBudgetService, ApproveBudgetService,
    FindBudgetListHandler, FindBudgetByIdHandler, BudgetDashboardHandler,
    BudgetMapper,
    { provide: BudgetRepository, useClass: BudgetRepositoryImpl },
  ],
  exports: [BudgetRepository],
})
export class FeeModule {}
