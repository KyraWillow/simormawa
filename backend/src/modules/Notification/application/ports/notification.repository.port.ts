import { NotificationEntity } from '../../domain/notification.entity';

export abstract class NotificationRepository {
  abstract save(notification: NotificationEntity): Promise<void>;
  abstract findUnreadByUserId(userId: string): Promise<NotificationEntity[]>;
  abstract countUnread(userId: string): Promise<number>;
  abstract findAllByUserId(userId: string, limit?: number, offset?: number): Promise<{ data: NotificationEntity[]; total: number }>;
  abstract update(notification: NotificationEntity): Promise<void>;
}
