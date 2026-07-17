import { BudgetStatus } from '../../domain/budget.entity';
export class BudgetResponseDto {
  id: string; workProgramId: string; submittedBy: string;
  status: BudgetStatus; totalAmount: number; items: any[]; notes?: string;
  constructor(d: any) {
    this.id = d.id; this.workProgramId = d.workProgramId; this.submittedBy = d.submittedBy;
    this.status = d.status; this.totalAmount = d.totalAmount; this.items = d.items; this.notes = d.notes;
  }
}
