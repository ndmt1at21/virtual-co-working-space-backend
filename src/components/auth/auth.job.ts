import { authLogger } from '@components/logger';
import { createMailService } from '@components/mail/mail.factory';
import { createAuthMailQueue } from './auth.factory';
import { AuthMailWorker } from './jobs/mail/mail.worker';

export const loadAuthBackgroundJobs = () => {
	const queue = createAuthMailQueue();
	const mailService = createMailService();
	const logger = authLogger;

	AuthMailWorker(queue, mailService, logger);
};
