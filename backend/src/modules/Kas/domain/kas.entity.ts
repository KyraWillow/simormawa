import { AggregateRoot } from '../../../libs/ddd/aggregate-root.base';

export enum TransactionType {
  PEMASUKAN = 'pemasukan',
  PENGELUARAN = 'pengeluaran',
}

export interface KasTransactionProps {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  budgetId?: string;
  createdBy: string;
  transactionDate: Date;
}

export interface KasProps {
  balance: number;
  transactions: KasTransactionProps[];
}

export class KasEntity extends AggregateRoot<KasProps> {
  private constructor(props: KasProps, id: string) {
    super(props, id);
  }

  static create(id: string): KasEntity {
    return new KasEntity({ balance: 0, transactions: [] }, id);
  }

  get balance(): number { return this.props.balance; }
  get transactions(): KasTransactionProps[] { return this.props.transactions; }

  validate(): void {
    if (this.props.balance < 0) throw new Error('Balance cannot be negative');
  }

  recordTransaction(type: TransactionType, amount: number, description: string, createdBy: string, budgetId?: string): void {
    if (amount <= 0) throw new Error('Amount must be positive');
    const tx: KasTransactionProps = {
      id: this.props.transactions.length.toString(),
      type,
      amount,
      description,
      budgetId,
      createdBy,
      transactionDate: new Date(),
    };
    if (type === TransactionType.PEMASUKAN) {
      this.props.balance += amount;
    } else {
      if (this.props.balance < amount) throw new Error('Insufficient balance');
      this.props.balance -= amount;
    }
    this.props.transactions.push(tx);
  }

  static fromPersistence(id: string, props: KasProps): KasEntity {
    return new KasEntity(props, id);
  }
}
