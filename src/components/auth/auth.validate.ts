import { UnauthorizedError } from '@src/utils/appError';
import { compareSync } from 'bcrypt';
import { UserLoginProvider } from '@components/users/@types/UserLoginProvider';
import { UserStatus } from '@components/users/@types/UserStatus';
import { UserRepository } from '@components/users/user.repository';
import { IAuthValidate } from './@types/IAuthValidate';
import { AuthErrorMessages } from './auth.error';

export const AuthValidate = (userRepository: UserRepository): IAuthValidate => {
	const validateUserById = async (id: number): Promise<boolean> => {
		const user = await userRepository.findById(id);

		// check user exists
		if (!user) {
			throw new UnauthorizedError(
				AuthErrorMessages.UNAUTHORIZED_INCORRECT_EMAIL_OR_PASSWORD
			);
		}

		// check user status
		if (user.status === UserStatus.BLOCKED) {
			throw new UnauthorizedError(
				AuthErrorMessages.UNAUTHORIZED_USER_BLOCKED
			);
		}

		// TODO: check time that password was updated

		return true;
	};

	const validateLocalUser = async (
		email: string,
		password: string
	): Promise<boolean> => {
		const user = await userRepository.findUserByEmail(email);

		// check user exists
		if (!user) {
			throw new UnauthorizedError(
				AuthErrorMessages.UNAUTHORIZED_INCORRECT_EMAIL_OR_PASSWORD
			);
		}

		// check login provider
		if (user.provider !== UserLoginProvider.LOCAL) {
			throw new UnauthorizedError(
				AuthErrorMessages.UNAUTHORIZED_INCORRECT_EMAIL_OR_PASSWORD
			);
		}

		// check user status
		if (user.status === UserStatus.BLOCKED) {
			throw new UnauthorizedError(
				AuthErrorMessages.UNAUTHORIZED_USER_BLOCKED
			);
		}

		// TODO: check time that password was updated

		// check password
		if (!compareSync(password, user!.password!)) {
			throw new UnauthorizedError(
				AuthErrorMessages.UNAUTHORIZED_INCORRECT_EMAIL_OR_PASSWORD
			);
		}

		return true;
	};

	return { validateLocalUser, validateUserById };
};
