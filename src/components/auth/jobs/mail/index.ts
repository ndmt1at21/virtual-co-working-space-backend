import { authLogger } from '@src/components/logger';
import { createMailService } from '@src/components/mail/mail.factory';
import { AuthMailWorker } from './mail.worker';

export const loadAuthMailQueue = () => {
	AuthMailWorker(createMailService(), authLogger);
};
