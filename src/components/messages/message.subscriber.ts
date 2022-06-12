import EventEmitter from 'events';
import { NotificationService } from '../notifications/notification.service';

export const MessageSubscriber = (notificationService: NotificationService) => {
	const eventEmitter = new EventEmitter();

	const listen = () => {
		eventEmitter.on('message:created', async message => {
			await notificationService.createNotification(message);
		});
	};

	return { listen };
};
