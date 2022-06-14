import { NotificationMessage } from './NotificationMessage';

export interface IPushNotificationService {
	checkPushTokenIsValid(pushToken: string): Promise<void>;

	pushNotification(
		userId: number,
		message: NotificationMessage
	): Promise<void>;
}
