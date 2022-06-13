import EventEmitter from 'events';
import { EntityTypeAction } from '../notifications/@types/EntityTypeAction';
import { EntityTypeName } from '../notifications/@types/EntityTypeName';
import { NotificationService } from '../notifications/notification.service';
import { PushNotificationService } from '../pushNotification/pushNotification.service';
import { CreatedMessageEventData } from './@types/dto/CreatedMessageEventData';

export const MessageSubscriber = (
	notificationService: NotificationService,
	pushNotificationService: PushNotificationService
) => {
	const eventEmitter = new EventEmitter();

	const listen = () => {
		eventEmitter.on(
			'message:created',
			async ({ message, to }: CreatedMessageEventData) => {
				const notification =
					await notificationService.createNotification({
						actorId: message.senderId,
						entity: {
							action: EntityTypeAction.CREATE,
							type: EntityTypeName.MESSAGE,
							entityId: message.id
						},
						notifierIds: to
					});

				notification.notifierIds.map(userId => {
					pushNotificationService.pushNotification(userId, {
						title: 'New Message',
						body: `${message.senderId} sent you a message`,
						data: {
							type: 'message',
							id: message.id
						}
					});
				});
			}
		);
	};

	return { listen };
};
