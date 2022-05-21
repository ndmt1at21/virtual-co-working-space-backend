import { EntityRepository } from 'typeorm';
import { BaseRepository } from '@src/components/base/BaseRepository';
import { NotificationType } from './notificationType.entity';

@EntityRepository(NotificationType)
export class NotificationTypeRepository extends BaseRepository<NotificationType> {}
