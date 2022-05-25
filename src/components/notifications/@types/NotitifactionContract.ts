import { CreateNotificationDto } from './CreateNotification.dto';

export interface NotificationContract {
	buildNotificationMessage(notification: Notification): Promise<string>;

	createNotification(): Promise<Notification>;
}
