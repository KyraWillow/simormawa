import { Inject, Injectable } from '@nestjs/common';
import type { Pool } from 'mariadb';
import { KasRepository } from '../application/ports/kas.repository.port';
import { KasMapper } from './kas.mapper';
import { KasEntity } from '../domain/kas.entity';

@Injectable()
export class KasRepositoryImpl implements KasRepository {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly pool: Pool,
    private readonly mapper: KasMapper,
  ) {}

  async find(): Promise<KasEntity | null> {
    const conn = await this.pool.getConnection();
    try {
      const rows = await conn.query('SELECT * FROM kas LIMIT 1');
      if (!rows[0]) return null;
      const txRows = await conn.query('SELECT * FROM kas_transactions WHERE kas_id = ? ORDER BY transaction_date DESC', [rows[0].id]);
      return this.mapper.toDomain(rows[0], txRows);
    } finally {
      conn.release();
    }
  }

  async findTransactions(kasId: string): Promise<any[]> {
    const conn = await this.pool.getConnection();
    try {
      return await conn.query('SELECT * FROM kas_transactions WHERE kas_id = ? ORDER BY transaction_date DESC', [kasId]);
    } finally {
      conn.release();
    }
  }

  async save(entity: KasEntity): Promise<KasEntity> {
    const conn = await this.pool.getConnection();
    try {
      const p = this.mapper.toPersistence(entity);
      const existing = await conn.query('SELECT id FROM kas WHERE id = ?', [entity.id]);
      if (existing[0]) {
        await conn.query('UPDATE kas SET balance = ?, updated_at = NOW() WHERE id = ?', [p.balance, entity.id]);
      } else {
        await conn.query('INSERT INTO kas (id, balance, updated_at) VALUES (?, ?, NOW())', [p.id, p.balance]);
      }

      const existingTxs = await conn.query('SELECT id FROM kas_transactions WHERE kas_id = ?', [entity.id]);
      const existingTxIds = new Set(existingTxs.map((r: any) => r.id));
      for (const tx of entity.transactions) {
        if (!existingTxIds.has(tx.id)) {
          await conn.query(
            'INSERT INTO kas_transactions (id, kas_id, budget_id, type, amount, description, transaction_date, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [tx.id, entity.id, tx.budgetId || null, tx.type, tx.amount, tx.description, tx.transactionDate, tx.createdBy]
          );
        }
      }
      return entity;
    } finally {
      conn.release();
    }
  }
}
