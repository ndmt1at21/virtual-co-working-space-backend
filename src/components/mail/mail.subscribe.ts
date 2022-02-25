import events from 'events';
import { mailLogger } from '@components/logger';
import { ILogger } from '@components/logger/@types/ILogger';
import { IMailService } from './@types/IMailService';
import { createMailService } from './mail.factory';

const MailSubscriber = (mailService: IMailService, logger: ILogger) => {
	const eventEmitter = new events.EventEmitter();

	eventEmitter.addListener('user registered', user => {});

	eventEmitter.addListener('reset password', ({ email, resetToken }) => {});
};

MailSubscriber(createMailService(), mailLogger);
