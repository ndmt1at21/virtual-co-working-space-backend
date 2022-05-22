import { ILogger } from '@src/components/logger/@types/ILogger';
import { Queue } from 'bull';
import { PushTokenRepository } from '@src/components/pushTokens/pushToken.repository';

export class PushNotificationWorker {
	constructor(
		private readonly queue: Queue,
		private readonly pushTokenRepository: PushTokenRepository,
		private readonly logger: ILogger
	) {}

	load() {
		this.onPushNotificationJob();
	}

	private onPushNotificationJob() {
		this.queue.process('push', 10, async job => {
			this.logger.info(`Start sending activation link to email: `);

			this.logger.info(`Activation link sent to email:  successfully`);
		});
	}
}
