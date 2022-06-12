import { mapUserToUserOverviewDto } from '../users/user.mapping';
import { NotificationDto } from './@types/Notification.dto';
import { NotificationObjectDto } from './@types/NotificationObject.dto';
import { NotificationObject } from './components/notificationObject/notificationObject.entity';
import { Notification } from './notification.entity';

export const mapNotificationToNotificationDto = (
	notification: Notification
): NotificationDto => {
	const { id, notificationObject, createdAt } = notification;

	return {
		id: id,
		actor: mapUserToUserOverviewDto(notificationObject.actor),
		entity: {
			type: notificationObject.entityType.name,
			action: notificationObject.entityType.action,
			data: notificationObject.dataOfEntity
		},
		createdAt: createdAt
	};
};

export const mapNotificationObjectToNotificationObjectDto = (
	notificationObject: NotificationObject
): NotificationObjectDto => {
	const { id, createdAt, entityType, actor } = notificationObject;

	return {
		id: id,
		actor: mapUserToUserOverviewDto(actor),
		entity: {
			type: entityType.name,
			action: entityType.action,
			data: notificationObject.dataOfEntity
		},
		notifierIds: notificationObject.notifications.map(n => n.notifierId),
		createdAt
	};
};
