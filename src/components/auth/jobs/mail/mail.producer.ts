import { Queue } from 'bull';
import { UserDto } from '@src/components/users/@types/dto/User.dto';
import { IAuthMailQueueProducer } from '../../@types/IAuthMailQueueProducer';

export const AuthMailQueueProducer = (queue: Queue): IAuthMailQueueProducer => {
	const addRegisterConfirmationJob = (user: UserDto, activeToken: string) => {
		queue.add('auth_register_activate', { user, activeToken });
	};

	const addResetPasswordMailJob = (email: string, resetToken: string) => {
		queue.add('auth_reset_password', {
			email,
			resetToken
		});
	};

	return { addRegisterConfirmationJob, addResetPasswordMailJob };
};
