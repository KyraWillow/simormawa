import { Inject, Injectable } from '@nestjs/common';
import { NotificationRepository } from '../application/ports/notification.repository.port';
import { NotificationEntity } from '../domain/notification.entity';
import { NotificationMapper } from './notification.mapper';

@Injectable()
export class NotificationRepositoryImpl extends NotificationRepository {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly pool: any,
    private readonly mapper: NotificationMapper,
  ) {
    super();
  }

  async save(notification: NotificationEntity): Promise<void> {
    const row = this.mapper.toPersistence(notification);
    await this.pool.query(
      `INSERT INTO notifications (id, user_id, type, title, message, link, is_read, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [row.id, row.user_id, row.type, row.title, row.message, row.link, row.is_read, row.created_at],
    );
  }

  async findUnreadByUserId(userId: string): Promise<NotificationEntity[]> {
    const rows = await this.pool.query(
      'SELECT * FROM notifications WHERE user_id = ? AND is_read = FALSE ORDER BY created_at DESC',
      [userId],
    );
    return rows.map((r: any) => this.mapper.toDomain(r));
  }

  async countUnread(userId: string): Promise<number> {
    const rows = await this.pool.query(
      'SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = FALSE',
      [userId],
    );
    return Number(rows[0].count);
  }

  async findAllByUserId(userId: string, limit = 50, offset = 0): Promise<{ data: NotificationEntity[]; total: number }> {
    const countRows = await this.pool.query(
      'SELECT COUNT(*) as count FROM notifications WHERE user_id = ?',
      [userId],
    );
    const total = Number(countRows[0].count);
    const rows = await this.pool.query(
      'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [userId, limit, offset],
    );
    return { data: rows.map((r: any) => this.mapper.toDomain(r)), total };
  }

  async update(notification: NotificationEntity): Promise<void> {
    const props = notification.props;
    await this.pool.query(
      'UPDATE notifications SET is_read = ? WHERE id = ?',
      [props.isRead, notification.id],
    );
  }
}
