import { Inject, Injectable } from '@nestjs/common';
import type { Pool } from 'mariadb';
import { EvaluationRepository } from '../application/ports/evaluation.repository.port';
import { EvaluationMapper } from './evaluation.mapper';
import { EvaluationEntity } from '../domain/evaluation.entity';

@Injectable()
export class EvaluationRepositoryImpl implements EvaluationRepository {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly pool: Pool,
    private readonly mapper: EvaluationMapper,
  ) {}

  async findById(id: string): Promise<EvaluationEntity | null> {
    const conn = await this.pool.getConnection();
    try {
      const rows = await conn.query('SELECT * FROM evaluations WHERE id = ?', [id]);
      if (!rows[0]) return null;
      const indicators = await conn.query('SELECT * FROM evaluation_indicators WHERE evaluation_id = ?', [id]);
      return this.mapper.toDomain(rows[0], indicators);
    } finally {
      conn.release();
    }
  }

  async findByWorkProgramId(workProgramId: string): Promise<EvaluationEntity[]> {
    const conn = await this.pool.getConnection();
    try {
      const rows = await conn.query('SELECT * FROM evaluations WHERE work_program_id = ?', [workProgramId]);
      const result: EvaluationEntity[] = [];
      for (const row of rows) {
        const indicators = await conn.query('SELECT * FROM evaluation_indicators WHERE evaluation_id = ?', [row.id]);
        result.push(this.mapper.toDomain(row, indicators));
      }
      return result;
    } finally {
      conn.release();
    }
  }

  async findAll(): Promise<EvaluationEntity[]> {
    const conn = await this.pool.getConnection();
    try {
      const rows = await conn.query('SELECT * FROM evaluations ORDER BY created_at DESC');
      const result: EvaluationEntity[] = [];
      for (const row of rows) {
        const indicators = await conn.query('SELECT * FROM evaluation_indicators WHERE evaluation_id = ?', [row.id]);
        result.push(this.mapper.toDomain(row, indicators));
      }
      return result;
    } finally {
      conn.release();
    }
  }

  async save(entity: EvaluationEntity): Promise<EvaluationEntity> {
    const existing = await this.findById(entity.id);
    const conn = await this.pool.getConnection();
    try {
      const { evaluation, indicators } = this.mapper.toPersistence(entity);

      if (existing) {
        await conn.query(
          'UPDATE evaluations SET kesimpulan = ?, rekomendasi = ?, status = ?, updated_at = NOW() WHERE id = ?',
          [evaluation.kesimpulan, evaluation.rekomendasi, evaluation.status, entity.id],
        );
        await conn.query('DELETE FROM evaluation_indicators WHERE evaluation_id = ?', [entity.id]);
      } else {
        await conn.query(
          'INSERT INTO evaluations (id, work_program_id, evaluated_by, kesimpulan, rekomendasi, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
          [
            evaluation.id,
            evaluation.work_program_id,
            evaluation.evaluated_by,
            evaluation.kesimpulan,
            evaluation.rekomendasi,
            evaluation.status,
          ],
        );
      }

      for (const ind of indicators) {
        await conn.query(
          'INSERT INTO evaluation_indicators (id, evaluation_id, indicator_name, target, realisasi, score, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [ind.id, ind.evaluation_id, ind.indicator_name, ind.target, ind.realisasi, ind.score, ind.notes],
        );
      }

      return entity;
    } finally {
      conn.release();
    }
  }
}
