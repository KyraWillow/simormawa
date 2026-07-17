import { AggregateRoot } from '../../../libs/ddd/aggregate-root.base';
import { randomUUID } from 'crypto';

export type NotificationType = 'deadline' | 'budget' | 'evaluation' | 'info';

export interface NotificationProps {
  userId: string;
  type: NotificationType;
  title: string;
  message: string | null;
  link: string | null;
  isRead: boolean;
}

export class NotificationEntity extends AggregateRoot<NotificationProps> {
  private constructor(props: NotificationProps, id: string) {
    super(props, id);
  }

  static create(props: { userId: string; type: NotificationType; title: string; message?: string; link?: string }): NotificationEntity {
    return new NotificationEntity(
      {
        userId: props.userId,
        type: props.type,
        title: props.title,
        message: props.message ?? null,
        link: props.link ?? null,
        isRead: false,
      },
      randomUUID(),
    );
  }

  static hydrate(props: NotificationProps, id: string): NotificationEntity {
    return new NotificationEntity(props, id);
  }

  markRead(): void {
    this.props.isRead = true;
  }

  validate(): void {
    if (!this.props.userId) throw new Error('userId is required');
    if (!this.props.title) throw new Error('title is required');
    if (!this.props.type) throw new Error('type is required');
  }
}
