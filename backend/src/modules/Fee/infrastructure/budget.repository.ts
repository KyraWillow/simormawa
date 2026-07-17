import { Inject, Injectable } from '@nestjs/common';
import type { Pool } from 'mariadb';
import { BudgetRepository } from '../application/ports/budget.repository.port';
import { BudgetMapper } from './budget.mapper';
import { BudgetEntity } from '../domain/budget.entity';

@Injectable()
export class BudgetRepositoryImpl implements BudgetRepository {
  constructor(@Inject('DATABASE_CONNECTION') private readonly pool: Pool, private readonly mapper: BudgetMapper) {}

  async findById(id: string) {
    const conn = await this.pool.getConnection();
    try {
      const rows = await conn.query('SELECT * FROM budgets WHERE id = ?', [id]);
      if (!rows[0]) return null;
      const items = await conn.query('SELECT * FROM budget_items WHERE budget_id = ?', [id]);
      return this.mapper.toDomain(rows[0], items);
    } finally { conn.release(); }
  }

  async findByWorkProgramId(wpId: string) {
    const conn = await this.pool.getConnection();
    try {
      const rows = await conn.query('SELECT * FROM budgets WHERE work_program_id = ?', [wpId]);
      const result: BudgetEntity[] = [];
      for (const row of rows) {
        const items = await conn.query('SELECT * FROM budget_items WHERE budget_id = ?', [row.id]);
        result.push(this.mapper.toDomain(row, items));
      }
      return result;
    } finally { conn.release(); }
  }

  async findAll() {
    const conn = await this.pool.getConnection();
    try {
      const rows = await conn.query('SELECT * FROM budgets ORDER BY created_at DESC');
      const result: BudgetEntity[] = [];
      for (const row of rows) {
        const items = await conn.query('SELECT * FROM budget_items WHERE budget_id = ?', [row.id]);
        result.push(this.mapper.toDomain(row, items));
      }
      return result;
    } finally { conn.release(); }
  }

  async save(entity: BudgetEntity) {
    const existing = await this.findById(entity.id);
    const conn = await this.pool.getConnection();
    try {
      const { budget, items } = this.mapper.toPersistence(entity);
      if (existing) {
        await conn.query('UPDATE budgets SET status=?, notes=?, updated_at=NOW() WHERE id=?', [budget.status, budget.notes, entity.id]);
        await conn.query('DELETE FROM budget_items WHERE budget_id=?', [entity.id]);
      } else {
        await conn.query('INSERT INTO budgets (id,work_program_id,submitted_by,status,total_amount,notes,created_at,updated_at) VALUES (?,?,?,?,?,?,NOW(),NOW())',
          [budget.id, budget.work_program_id, budget.submitted_by, budget.status, budget.total_amount, budget.notes]);
      }
      for (const item of items) {
        await conn.query('INSERT INTO budget_items (id,budget_id,item_name,quantity,unit,unit_price,total_price) VALUES (?,?,?,?,?,?,?)',
          [item.id, item.budget_id, item.item_name, item.quantity, item.unit, item.unit_price, item.total_price]);
      }
      return entity;
    } finally { conn.release(); }
  }
}
