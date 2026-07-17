import { BudgetEntity } from '../../domain/budget.entity';
export abstract class BudgetRepository {
  abstract findById(id: string): Promise<BudgetEntity | null>;
  abstract findByWorkProgramId(wpId: string): Promise<BudgetEntity[]>;
  abstract findAll(): Promise<BudgetEntity[]>;
  abstract save(entity: BudgetEntity): Promise<BudgetEntity>;
}
