import { BudgetItemProps } from '../../../domain/budget.entity';
export class CreateBudgetCommand {
  constructor(
    public readonly workProgramId: string,
    public readonly submittedBy: string,
    public readonly items: BudgetItemProps[],
  ) {}
}
