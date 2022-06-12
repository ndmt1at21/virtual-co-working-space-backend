import { EntityRepository } from 'typeorm';
import { Notification } from '@src/components/notifications/notification.entity';
import { BaseRepository } from '@src/components/base/BaseRepository';

@EntityRepository(Notification)
export class NotificationRepository extends BaseRepository<Notification> {
	async findRecentNotificationsByNotifierId(
		notifier: number
	): Promise<Notification[]> {
		return await this.createQueryBuilder('notification')
			.innerJoinAndSelect(
				'notification.notificationObject',
				'notification_object'
			)
			.innerJoinAndSelect('notification_object.entityType', 'entity_type')
			.innerJoinAndSelect('notification_object.actor', 'actor')
			.where('notification.notifier = :notifier', {
				notifier
			})
			.orderBy('notification.created_at', 'DESC')
			.getMany();
	}
}
