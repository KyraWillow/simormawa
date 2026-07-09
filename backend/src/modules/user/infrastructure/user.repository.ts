import { Inject, Injectable } from '@nestjs/common';
import type { Pool } from 'mariadb';
import { UserEntity } from '../domain/user.entity';
import { UserRepository } from '../application/ports/user.repository.port';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly pool: Pool,
    private readonly mapper: UserMapper,
  ) {}

  async findById(id: string): Promise<UserEntity | null> {
    const conn = await this.pool.getConnection();
    try {
      const rows = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
      if (!rows[0]) return null;
      return this.mapper.toDomain(rows[0]);
    } finally {
      conn.release();
    }
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const conn = await this.pool.getConnection();
    try {
      const rows = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
      if (!rows[0]) return null;
      return this.mapper.toDomain(rows[0]);
    } finally {
      conn.release();
    }
  }

  async findAll(): Promise<UserEntity[]> {
    const conn = await this.pool.getConnection();
    try {
      const rows = await conn.query('SELECT * FROM users ORDER BY created_at DESC');
      return rows.map((row: any) => this.mapper.toDomain(row));
    } finally {
      conn.release();
    }
  }

  async save(user: UserEntity): Promise<UserEntity> {
    const existing = await this.findById(user.id);
    const conn = await this.pool.getConnection();
    try {
      if (existing) {
        await conn.query(
          `UPDATE users SET email = ?, password = ?, name = ?, role = ?, is_active = ?, updated_at = NOW() WHERE id = ?`,
          [
            user.email,
            user.getPasswordForPersistence(),
            user.name,
            user.role,
            user.isActive,
            user.id,
          ],
        );
      } else {
        await conn.query(
          `INSERT INTO users (id, email, password, name, role, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
          [
            user.id,
            user.email,
            user.getPasswordForPersistence(),
            user.name,
            user.role,
            user.isActive,
          ],
        );
      }
      return user;
    } finally {
      conn.release();
    }
  }
}
