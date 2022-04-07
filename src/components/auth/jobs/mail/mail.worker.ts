import path from 'path';
import config from '@src/config';
import { ILogger } from '@src/components/logger/@types/ILogger';
import { IMailService } from '@src/components/mail/@types/IMailService';
import { UserDto } from '@src/components/users/@types/dto/User.dto';
import { Queue } from 'bull';

export const AuthMailWorker = (
	queue: Queue,
	mailService: IMailService,
	logger: ILogger
) => {
	const load = () => {
		loadRegisterActivationJob();
		loadResetPasswordJob();
	};

	function loadRegisterActivationJob() {
		queue.process('auth_register_activate', 10, async job => {
			const user = job.data.user as UserDto;
			const activeToken = job.data.activeToken as string;

			if (!user || !activeToken)
				throw new Error('User or active token is undefined');

			logger.info(
				`Start sending activation link to email: ${user.email}`
			);

			const result = await mailService.sendMail({
				from: 'ViSpace <noreply@authentication.vispace.tech>',
				to: user.email,
				subject: 'Welcome to our app',
				templateUrl: path.resolve(
					'src/components/mailTemplates/accountActivate.html'
				),
				context: {
					activationUrl: `${config.app.SERVER_DOMAIN}/auth/activate/${activeToken}`,
					receiver: `${user.name}`
				}
			});

			logger.info(
				`Activation link sent to email: ${user.email} successfully`
			);
		});
	}

	function loadResetPasswordJob() {
		queue.process('auth_reset_password', 10, async job => {
			const { data } = job;

			const email = data.email as string;
			const resetToken = data.resetToken as string;

			logger.info(`Start sending reset password link to email: ${email}`);

			const result = await mailService.sendMail({
				from: 'ViSpace <noreply@authentication.vispace.tech>',
				to: email,
				subject: 'Reset password',
				templateUrl: path.resolve(
					'src/components/mailTemplates/resetPassword.html'
				),
				context: {
					resetPasswordUrl: `${config.app.SERVER_DOMAIN}/auth/reset/${resetToken}`
				}
			});

			logger.info(
				`Reset password link sent to email: ${email} successfully`
			);
		});
	}

	return { load };
};
