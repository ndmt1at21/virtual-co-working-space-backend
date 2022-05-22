import firebase from 'firebase-admin';
import { Message } from 'firebase-admin/lib/messaging/messaging-api';
import { IPushNotificationService } from './@types/IPushNotificationService';

export class PushNotificationService implements IPushNotificationService {
	constructor() {}

	async checkPushTokenIsValid(pushToken: string): Promise<void> {
		const testMessage: Message = {
			data: {},
			token: pushToken
		};

		await firebase.messaging().send(testMessage, true);
	}
}
