import { Queue } from 'bull';
import { UserDto } from '@src/components/users/@types/dto/User.dto';
import { IAuthMailQueueProducer } from '../@types/IAuthMailQueueProducer';

export const AuthMailQueueProducer = (queue: Queue): IAuthMailQueueProducer => {
	const addRegisterConfirmationJob = (
		user: UserDto,
		activeToken: string,
		clientUrl: string
	) => {
		queue.add('auth_register_activate', { user, activeToken, clientUrl });
	};

	const addResetPasswordMailJob = (
		email: string,
		resetToken: string,
		clientUrl: string
	) => {
		queue.add('auth_reset_password', {
			email,
			resetToken,
			clientUrl
		});
	};

	return { addRegisterConfirmationJob, addResetPasswordMailJob };
};
