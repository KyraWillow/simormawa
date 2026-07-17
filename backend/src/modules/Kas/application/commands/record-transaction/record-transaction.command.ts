import { TransactionType } from '../../../domain/kas.entity';

export class RecordTransactionCommand {
  constructor(
    public readonly type: TransactionType,
    public readonly amount: number,
    public readonly description: string,
    public readonly createdBy: string,
    public readonly budgetId?: string,
  ) {}
}
