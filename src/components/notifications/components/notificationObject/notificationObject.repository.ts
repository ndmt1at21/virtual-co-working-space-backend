import { EntityRepository } from 'typeorm';
import { BaseRepository } from '@src/components/base/BaseRepository';
import { NotificationObject } from './notificationObject.entity';

@EntityRepository(NotificationObject)
export class NotificationObjectRepository extends BaseRepository<NotificationObject> {
	async findNotificationObjectById(
		id: number
	): Promise<NotificationObject | undefined> {
		return await this.createQueryBuilder('notification_object')
			.innerJoinAndSelect('notification_object.entityType', 'entity_type')
			.innerJoinAndSelect('notification_object.actor', 'actor')
			.innerJoinAndSelect(
				'notification_object.notifications',
				'notification'
			)
			.where('notification_object.id = :id', {
				id
			})
			.getOne();
	}
}
