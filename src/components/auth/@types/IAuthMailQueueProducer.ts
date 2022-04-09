import { UserDto } from '@src/components/users/@types/dto/User.dto';

export interface IAuthMailQueueProducer {
	addRegisterConfirmationJob(
		user: UserDto,
		activeToken: string,
		clientUrl: string
	): void;

	addResetPasswordMailJob(
		email: string,
		resetToken: string,
		clientUrl: string
	): void;
}
