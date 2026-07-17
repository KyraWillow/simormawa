export interface BudgetPersistenceModel {
  id: string; work_program_id: string; submitted_by: string;
  status: string; total_amount: number; notes: string | null;
  created_at: Date; updated_at: Date;
}
export interface BudgetItemPersistenceModel {
  id: string; budget_id: string; item_name: string;
  quantity: number; unit: string; unit_price: number; total_price: number;
}
