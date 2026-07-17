import { BudgetEntity, BudgetStatus, BudgetItemProps } from '../domain/budget.entity';
import { BudgetPersistenceModel, BudgetItemPersistenceModel } from './budget.persistence';

export class BudgetMapper {
  toDomain(row: BudgetPersistenceModel, itemRows: BudgetItemPersistenceModel[]): BudgetEntity {
    const items: BudgetItemProps[] = itemRows.map(r => ({
      itemName: r.item_name, quantity: r.quantity, unit: r.unit,
      unitPrice: r.unit_price,
    }));
    return BudgetEntity.fromPersistence(row.id, {
      workProgramId: row.work_program_id, submittedBy: row.submitted_by,
      status: row.status as BudgetStatus, totalAmount: row.total_amount,
      items, notes: row.notes ?? undefined,
    });
  }
  toPersistence(e: BudgetEntity): { budget: BudgetPersistenceModel; items: BudgetItemPersistenceModel[] } {
    return {
      budget: {
        id: e.id, work_program_id: e.workProgramId, submitted_by: e.submittedBy,
        status: e.status, total_amount: e.totalAmount, notes: e.notes ?? null,
        created_at: new Date(), updated_at: new Date(),
      },
      items: e.items.map((item, i) => ({
        id: e.id + '-item-' + i, budget_id: e.id,
        item_name: item.itemName, quantity: item.quantity,
        unit: item.unit, unit_price: item.unitPrice,
        total_price: item.quantity * item.unitPrice,
      })),
    };
  }
}
