import { Inject, Injectable } from '@nestjs/common';
import type { Pool } from 'mariadb';
import { WorkProgramRepository } from '../application/ports/work-program.repository.port';
import { WorkProgramMapper } from './work-program.mapper';
import { WorkProgramEntity } from '../domain/work-program.entity';
import { WorkProgramStatus } from '../domain/work-program.entity';

@Injectable()
export class WorkProgramRepositoryImpl implements WorkProgramRepository {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly pool: Pool,
    private readonly mapper: WorkProgramMapper,
  ) {}

  async findById(id: string): Promise<WorkProgramEntity | null> {
    const conn = await this.pool.getConnection();
    try {
      const rows = await conn.query('SELECT * FROM work_programs WHERE id = ?', [id]);
      if (!rows[0]) return null;
      return this.mapper.toDomain(rows[0]);
    } finally {
      conn.release();
    }
  }

  async findByPicId(picId: string): Promise<WorkProgramEntity[]> {
    const conn = await this.pool.getConnection();
    try {
      const rows = await conn.query('SELECT * FROM work_programs WHERE pic_id = ?', [picId]);
      return rows.map((row: any) => this.mapper.toDomain(row));
    } finally {
      conn.release();
    }
  }

  async findAll(): Promise<WorkProgramEntity[]> {
    const conn = await this.pool.getConnection();
    try {
      const rows = await conn.query('SELECT * FROM work_programs ORDER BY created_at DESC');
      return rows.map((row: any) => this.mapper.toDomain(row));
    } finally {
      conn.release();
    }
  }

  async findAllActive(): Promise<WorkProgramEntity[]> {
    const conn = await this.pool.getConnection();
    try {
      const rows = await conn.query('SELECT * FROM work_programs WHERE status != ? ORDER BY created_at DESC', [
        WorkProgramStatus.COMPLETED,
      ]);
      return rows.map((row: any) => this.mapper.toDomain(row));
    } finally {
      conn.release();
    }
  }

  async save(entity: WorkProgramEntity): Promise<WorkProgramEntity> {
    const existing = await this.findById(entity.id);
    const conn = await this.pool.getConnection();
    try {
      if (existing) {
        await conn.query(
          'UPDATE work_programs SET name = ?, description = ?, status = ?, pic_id = ?, deadline = ?, updated_at = NOW() WHERE id = ?',
          [entity.name, entity.description, entity.status, entity.picId, entity.deadline, entity.id],
        );
      } else {
        await conn.query(
          'INSERT INTO work_programs (id, name, description, status, pic_id, deadline, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
          [entity.id, entity.name, entity.description, entity.status, entity.picId, entity.deadline],
        );
      }
      return entity;
    } finally {
      conn.release();
    }
  }

  async delete(id: string): Promise<void> {
    const conn = await this.pool.getConnection();
    try {
      await conn.query('DELETE FROM work_programs WHERE id = ?', [id]);
    } finally {
      conn.release();
    }
  }
}
