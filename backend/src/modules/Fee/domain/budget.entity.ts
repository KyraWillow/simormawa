import { AggregateRoot } from '../../../libs/ddd/aggregate-root.base';

export enum BudgetStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface BudgetItemProps {
  itemName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

export interface BudgetProps {
  workProgramId: string;
  submittedBy: string;
  status: BudgetStatus;
  totalAmount: number;
  items: BudgetItemProps[];
  notes?: string;
}

export class BudgetEntity extends AggregateRoot<BudgetProps> {
  private constructor(props: BudgetProps, id: string) {
    super(props, id);
  }

  static create(id: string, workProgramId: string, submittedBy: string, items: BudgetItemProps[]): BudgetEntity {
    const total = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
    const entity = new BudgetEntity({ workProgramId, submittedBy, status: BudgetStatus.DRAFT, totalAmount: total, items }, id);
    return entity;
  }

  get workProgramId(): string { return this.props.workProgramId; }
  get submittedBy(): string { return this.props.submittedBy; }
  get status(): BudgetStatus { return this.props.status; }
  get totalAmount(): number { return this.props.totalAmount; }
  get items(): BudgetItemProps[] { return this.props.items; }
  get notes(): string | undefined { return this.props.notes; }

  validate(): void {
    if (!this.props.workProgramId) throw new Error('Work program is required');
    if (!this.props.submittedBy) throw new Error('Submitter is required');
    if (!this.props.items || this.props.items.length === 0) throw new Error('At least one budget item is required');
    for (const item of this.props.items) {
      if (!item.itemName) throw new Error('Item name is required');
      if (item.quantity < 1) throw new Error('Quantity must be at least 1');
      if (item.unitPrice < 0) throw new Error('Unit price cannot be negative');
    }
    if (!Object.values(BudgetStatus).includes(this.props.status)) throw new Error('Invalid status');
  }

  submit(notes?: string): void {
    if (this.props.status !== BudgetStatus.DRAFT) throw new Error('Only draft budgets can be submitted');
    this.props.notes = notes;
    this.props.status = BudgetStatus.SUBMITTED;
  }

  approve(notes?: string): void {
    if (this.props.status !== BudgetStatus.SUBMITTED) throw new Error('Only submitted budgets can be approved');
    this.props.notes = notes || this.props.notes;
    this.props.status = BudgetStatus.APPROVED;
  }

  reject(notes?: string): void {
    if (this.props.status !== BudgetStatus.SUBMITTED) throw new Error('Only submitted budgets can be rejected');
    this.props.notes = notes || this.props.notes;
    this.props.status = BudgetStatus.REJECTED;
  }

  static fromPersistence(id: string, props: BudgetProps): BudgetEntity {
    return new BudgetEntity(props, id);
  }
}
