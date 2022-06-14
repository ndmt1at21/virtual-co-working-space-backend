import { pushNotificationLogger } from '../logger';
import { createPushTokenRepository } from '../pushTokens/pushToken.factory';
import { PushNotificationService } from './pushNotification.service';

export function createPushNotificationService() {
	const pushTokenRepository = createPushTokenRepository();

	return new PushNotificationService(
		pushNotificationLogger,
		pushTokenRepository
	);
}
