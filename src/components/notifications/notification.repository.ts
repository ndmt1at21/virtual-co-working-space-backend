import { EntityRepository } from 'typeorm';
import { Notification } from '@src/components/notifications/notification.entity';
import { BaseRepository } from '@src/components/base/BaseRepository';

@EntityRepository(Notification)
export class NotificationRepository extends BaseRepository<Notification> {}
