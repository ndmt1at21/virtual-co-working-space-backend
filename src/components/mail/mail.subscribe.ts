import events from 'events';
import path from 'path';
import config from '@src/config';
import { mailLogger } from '@components/logger';
import { ILogger } from '@components/logger/@types/ILogger';
import { IMailService } from './@types/IMailService';
import { createMailService } from './mail.factory';
import { UserDto } from '../users/@types/dto/User.dto';

export const MailSubscriber = (mailService: IMailService, logger: ILogger) => {
	const eventEmitter = new events.EventEmitter();

	eventEmitter.addListener('user registered', async ctx => {
		const user = ctx.user as UserDto;
		const activeToken = ctx.activeToken as string;

		if (!user || !activeToken)
			throw new Error('User or active token is undefined');

		logger.info(`Start sending activation email to ${user.email}`);

		const result = await mailService.sendEmail({
			from: 'register@vispace.tech',
			to: user.email,
			subject: 'Welcome to our app',
			templateUrl: path.resolve(
				'./src/components/mailTemplates/accountActivate.html'
			),
			context: {
				url: `${config.app.SERVER_DOMAIN}/auth/activate/${activeToken}`
			}
		});

		logger.info(`Activation email sent to ${user.email} successfully`);
	});

	eventEmitter.addListener('reset password', async ctx => {
		const email = ctx.email as string;
		const resetToken = ctx.resetToken as string;

		const result = await mailService.sendEmail({
			from: 'register@vispace.tech',
			to: email,
			subject: 'Reset password',
			templateUrl: path.resolve(
				'./src/components/mail/templates/resetPassword.html'
			),
			context: {
				url: `${config.app.SERVER_DOMAIN}/auth/reset/${resetToken}`
			}
		});
	});
};
