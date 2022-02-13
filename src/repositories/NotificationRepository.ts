import { EntityRepository } from 'typeorm';
import { Notification } from '@src/entities/Notification';
import { BaseRepository } from './BaseRepository';

@EntityRepository(Notification)
export class NotificationRepository extends BaseRepository<Notification> {}
