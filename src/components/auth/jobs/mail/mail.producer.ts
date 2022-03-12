import { UserDto } from '@src/components/users/@types/dto/User.dto';
import { IAuthMailQueueProducer } from './@types/IAuthMailQueueProducer';
import { authMailQueue } from './mail.queue';

export const AuthMailQueueProducer = (): IAuthMailQueueProducer => {
	const addRegisterConfirmationJob = (user: UserDto, activeToken: string) => {
		authMailQueue.add('auth_register_activate', { user, activeToken });
	};

	const addResetPasswordMailJob = (email: string, resetToken: string) => {
		authMailQueue.add('auth_reset_password', {
			email,
			resetToken
		});
	};

	return { addRegisterConfirmationJob, addResetPasswordMailJob };
};
