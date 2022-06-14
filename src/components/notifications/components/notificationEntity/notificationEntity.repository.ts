import { EntityRepository } from 'typeorm';
import { BaseRepository } from '@src/components/base/BaseRepository';
import { NotificationEntity } from './notificationEntity.entity';

@EntityRepository(NotificationEntity)
export class NotificationEntityRepository extends BaseRepository<NotificationEntity> {}
