import { EntityRepository } from 'typeorm';
import { BaseRepository } from '@src/components/base/BaseRepository';
import { NotificationObject } from './notificationObject.entity';

@EntityRepository(NotificationObject)
export class NotificationObjectRepository extends BaseRepository<NotificationObject> {}
