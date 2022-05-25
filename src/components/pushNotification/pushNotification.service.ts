import fs from 'fs';
import config from '@src/config';
import firebase, { credential } from 'firebase-admin';
import { Message } from 'firebase-admin/lib/messaging/messaging-api';
import { IPushNotificationService } from './@types/IPushNotificationService';
import { ILogger } from '../logger/@types/ILogger';
import { NotificationMessage } from './@types/NotificationMessage';
import { PushTokenRepository } from '../pushTokens/pushToken.repository';
import { PushTokenDevice } from '../pushTokens/@types/PushTokenDevice';

export class PushNotificationService implements IPushNotificationService {
	constructor(
		private readonly logger: ILogger,
		private readonly pushTokenRepository: PushTokenRepository
	) {}

	async initialize() {
		this.logger.info('Start configuring Firebase Admin SDK');

		const credentialsData = credential.cert(
			JSON.parse(
				fs
					.readFileSync(
						config.notification.FIREBASE_APPLICATION_CREDENTIALS
					)
					.toString()
			)
		);

		firebase.initializeApp({
			credential: credentialsData
		});

		this.logger.info('Firebase Admin SDK is configured successfully');
	}

	async checkPushTokenIsValid(pushToken: string): Promise<void> {
		const testMessage: Message = {
			data: {},
			token: pushToken
		};

		await firebase.messaging().send(testMessage, true);
	}

	async pushNotification(
		userId: number,
		message: NotificationMessage
	): Promise<void> {
		const { title, body, data, imageUrl } = message;

		const pushTokens = await this.pushTokenRepository.findTokensByUserId(
			userId
		);

		const pushMessages: Message[] = pushTokens.map((pushToken): Message => {
			return {
				notification: {
					title,
					body,
					imageUrl
				},
				data,
				token: pushToken.token
			};
		});

		const result = await firebase.messaging().sendAll(pushMessages);
		console.log(result);
	}

	async pushNotifications(
		notifications: { userId: number; message: NotificationMessage }[]
	): Promise<void> {
		// const { title, body, data, imageUrl } = notifications;
		// const pushTokens = await this.pushTokenRepository.findTokensByUserId(
		// 	userId
		// );
		// const pushMessages: Message[] = pushTokens.map((pushToken): Message => {
		// 	return {
		// 		notification: {
		// 			title,
		// 			body,
		// 			imageUrl
		// 		},
		// 		data,
		// 		token: pushToken.token
		// 	};
		// });
		// const result = await firebase.messaging().sendAll(pushMessages);
		// console.log(result);
	}
}
