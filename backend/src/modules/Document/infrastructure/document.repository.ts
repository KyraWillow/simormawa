import { Inject, Injectable } from '@nestjs/common';
import type { Pool } from 'mariadb';
import { DocumentRepository } from '../application/ports/document.repository.port';
import { DocumentMapper } from './document.mapper';
import { DocumentEntity } from '../domain/document.entity';

@Injectable()
export class DocumentRepositoryImpl implements DocumentRepository {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly pool: Pool,
    private readonly mapper: DocumentMapper,
  ) {}

  async findByWorkProgramId(wpId: string): Promise<DocumentEntity[]> {
    const conn = await this.pool.getConnection();
    try {
      const rows = await conn.query('SELECT * FROM documents WHERE work_program_id = ? ORDER BY created_at DESC', [wpId]);
      return rows.map((r: any) => this.mapper.toDomain(r));
    } finally {
      conn.release();
    }
  }

  async save(e: DocumentEntity): Promise<DocumentEntity> {
    const conn = await this.pool.getConnection();
    try {
      const p = this.mapper.toPersistence(e);
      await conn.query(
        'INSERT INTO documents (id,work_program_id,uploaded_by,type,file_name,file_path,file_size,created_at) VALUES (?,?,?,?,?,?,?,NOW())',
        [p.id, p.work_program_id, p.uploaded_by, p.type, p.file_name, p.file_path, p.file_size],
      );
      return e;
    } finally {
      conn.release();
    }
  }
}
