import { UserDto } from '@src/components/users/@types/dto/User.dto';

export interface IAuthMailQueueProducer {
	addRegisterConfirmationJob(user: UserDto, activeToken: string): void;

	addResetPasswordMailJob(email: string, resetToken: string): void;
}
