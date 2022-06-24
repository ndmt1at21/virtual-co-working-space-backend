import EventEmitter from 'events';
import { ILogger } from '../logger/@types/ILogger';
import { EntityTypeAction } from '../notifications/@types/EntityTypeAction';
import { EntityTypeName } from '../notifications/@types/EntityTypeName';
import { NotificationService } from '../notifications/notification.service';
import { PushNotificationService } from '../pushNotification/pushNotification.service';
import { createUserService } from '../users/user.factory';
import { CreatedMessageEventData } from './@types/dto/CreatedMessageEventData';
import { messageEventEmitter } from './message.socketController';

export const MessageSubscriber = (
	notificationService: NotificationService,
	pushNotificationService: PushNotificationService,
	logger: ILogger
) => {
	const userService = createUserService();

	const listen = () => {
		messageEventEmitter.on(
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

				notification.notifierIds.map(async userId => {
					const user = await userService.findUserById(userId);
					pushNotificationService.pushNotification(userId, {
						title: user.name,
						body: message.content!,
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
