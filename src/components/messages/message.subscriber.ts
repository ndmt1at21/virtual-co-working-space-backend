import EventEmitter from 'events';
import { ILogger } from '../logger/@types/ILogger';
import { EntityTypeAction } from '../notifications/@types/EntityTypeAction';
import { EntityTypeName } from '../notifications/@types/EntityTypeName';
import { NotificationService } from '../notifications/notification.service';
import { PushNotificationService } from '../pushNotification/pushNotification.service';
import { CreatedMessageEventData } from './@types/dto/CreatedMessageEventData';

export const MessageSubscriber = (
	notificationService: NotificationService,
	pushNotificationService: PushNotificationService,
	logger: ILogger
) => {
	const eventEmitter = new EventEmitter();

	const listen = () => {
		eventEmitter.on(
			'message:created',
			async ({ message, to }: CreatedMessageEventData) => {
				logger.info(
					`[Subscriber] Received message:created event for message ${message.id}`
				);

				logger.info(
					`[Subscriber] Notification data: ${JSON.stringify({
						actorId: message.senderId,
						entity: {
							action: EntityTypeAction.CREATE,
							type: EntityTypeName.MESSAGE,
							entityId: message.id
						},
						notifierIds: to
					})}`
				);

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
						title: message.content!,
						body: `${message.senderId} sent you a message`,
						data: {
							message
						}
					});
				});

				logger.info(
					`[Subscriber] Sent push notification for message ${message.id}`
				);
			}
		);
	};

	return { listen };
};
