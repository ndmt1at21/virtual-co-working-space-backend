import { ILogger } from '@src/components/logger/@types/ILogger';
import { Queue } from 'bull';
import { IPushNotificationService } from '../@types/IPushNotificationService';

export class PushNotificationWorker {
	constructor(
		private readonly queue: Queue,
		private readonly pushNotificationService: IPushNotificationService,
		private readonly logger: ILogger
	) {}

	load() {
		this.onPushNotificationJob();
	}

	private onPushNotificationJob() {
		this.queue.process('push', 10, async job => {});
	}
}
