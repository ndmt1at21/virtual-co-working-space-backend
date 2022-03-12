import path from 'path';
import config from '@src/config';
import { ILogger } from '@src/components/logger/@types/ILogger';
import { IMailService } from '@src/components/mail/@types/IMailService';
import { UserDto } from '@src/components/users/@types/dto/User.dto';
import { authMailQueue } from './mail.queue';

export const AuthMailWorker = (mailService: IMailService, logger: ILogger) => {
	authMailQueue.process('auth_register_activate', 10, async job => {
		const user = job.data.user as UserDto;
		const activeToken = job.data.activeToken as string;

		if (!user || !activeToken)
			throw new Error('User or active token is undefined');

		logger.info(`Start sending activation email to ${user.email}`);

		const result = await mailService.sendEmail({
			from: 'register@vispace.tech',
			to: user.email,
			subject: 'Welcome to our app',
			templateUrl: path.resolve(
				'/src/components/mailTemplates/accountActivate.html'
			),
			context: {
				url: `${config.app.SERVER_DOMAIN}/auth/activate/${activeToken}`
			}
		});

		logger.info(`Activation email sent to ${user.email} successfully`);
	});

	authMailQueue.process('auth_reset_password', 10, async job => {
		const { data } = job;

		const email = data.email as string;
		const resetToken = data.resetToken as string;

		const result = await mailService.sendEmail({
			from: 'register@vispace.tech',
			to: email,
			subject: 'Reset password',
			templateUrl: path.resolve(
				'/src/components/mail/templates/resetPassword.html'
			),
			context: {
				url: `${config.app.SERVER_DOMAIN}/auth/reset/${resetToken}`
			}
		});
	});
};
