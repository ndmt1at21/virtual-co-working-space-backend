import { EntityRepository, Repository } from 'typeorm';
import { Notification } from '@src/entities/Notification';

@EntityRepository(Notification)
export class NotificationRepository extends Repository<Notification> {}
