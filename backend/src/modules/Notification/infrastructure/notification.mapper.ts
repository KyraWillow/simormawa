import { Injectable } from '@nestjs/common';
import { NotificationEntity, NotificationType } from '../domain/notification.entity';
import { NotificationRow } from './notification.persistence';

@Injectable()
export class NotificationMapper {
  toDomain(row: NotificationRow): NotificationEntity {
    return NotificationEntity.hydrate(
      {
        userId: row.user_id,
        type: row.type as NotificationType,
        title: row.title,
        message: row.message,
        link: row.link,
        isRead: Boolean(row.is_read),
      },
      row.id,
    );
  }

  toPersistence(entity: NotificationEntity): NotificationRow {
    const props = entity.props;
    return {
      id: entity.id,
      user_id: props.userId,
      type: props.type,
      title: props.title,
      message: props.message,
      link: props.link,
      is_read: props.isRead,
      created_at: new Date(),
    };
  }
}
