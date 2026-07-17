import { Inject, Injectable } from '@nestjs/common';
import type { Pool } from 'mariadb';
import { ProgressReportRepository } from '../application/ports/progress-report.repository.port';
import { ProgressReportMapper } from './progress-report.mapper';
import { ProgressReportEntity } from '../domain/progress-report.entity';

@Injectable()
export class ProgressReportRepositoryImpl implements ProgressReportRepository {
  constructor(@Inject('DATABASE_CONNECTION') private readonly pool: Pool, private readonly mapper: ProgressReportMapper) {}

  async findById(id: string) {
    const conn = await this.pool.getConnection();
    try {
      const rows = await conn.query('SELECT * FROM progress_reports WHERE id = ?', [id]);
      if (!rows[0]) return null;
      return this.mapper.toDomain(rows[0]);
    } finally { conn.release(); }
  }

  async findByWorkProgramId(wpId: string) {
    const conn = await this.pool.getConnection();
    try {
      const rows = await conn.query('SELECT * FROM progress_reports WHERE work_program_id = ? ORDER BY submitted_at DESC', [wpId]);
      return rows.map((r: any) => this.mapper.toDomain(r));
    } finally { conn.release(); }
  }

  async findAll() {
    const conn = await this.pool.getConnection();
    try {
      const rows = await conn.query('SELECT * FROM progress_reports ORDER BY submitted_at DESC');
      return rows.map((r: any) => this.mapper.toDomain(r));
    } finally { conn.release(); }
  }

  async save(e: ProgressReportEntity) {
    const existing = await this.findById(e.id);
    const conn = await this.pool.getConnection();
    try {
      const p = this.mapper.toPersistence(e);
      if (existing) {
        await conn.query('UPDATE progress_reports SET progress_pct=?, description=?, obstacles=? WHERE id=?', [p.progress_pct, p.description, p.obstacles, e.id]);
      } else {
        await conn.query('INSERT INTO progress_reports (id,work_program_id,submitted_by,progress_pct,description,obstacles,submitted_at) VALUES (?,?,?,?,?,?,NOW())',
          [p.id, p.work_program_id, p.submitted_by, p.progress_pct, p.description, p.obstacles]);
      }
      return e;
    } finally { conn.release(); }
  }
}
