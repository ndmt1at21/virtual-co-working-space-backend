import { EntityRepository } from 'typeorm';
import { Notification } from '@src/entities/Notification';
import { BaseRepository } from '../components/base/BaseRepository';

@EntityRepository(Notification)
export class NotificationRepository extends BaseRepository<Notification> {}
