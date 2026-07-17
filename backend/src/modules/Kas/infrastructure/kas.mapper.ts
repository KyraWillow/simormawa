import { KasEntity, KasTransactionProps } from '../domain/kas.entity';
import { KasPersistenceModel } from './kas.persistence';

export class KasMapper {
  toDomain(row: KasPersistenceModel, txRows: any[]): KasEntity {
    const transactions: KasTransactionProps[] = txRows.map((r) => ({
      id: r.id,
      type: r.type,
      amount: Number(r.amount),
      description: r.description,
      budgetId: r.budget_id ?? undefined,
      createdBy: r.created_by,
      transactionDate: new Date(r.transaction_date),
    }));
    return KasEntity.fromPersistence(row.id, { balance: Number(row.balance), transactions });
  }
  toPersistence(entity: KasEntity): KasPersistenceModel {
    return { id: entity.id, balance: entity.balance, updated_at: new Date() };
  }
}
