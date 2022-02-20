import { UserRepository } from '../users/user.repository';
import { IAuthService } from './@types/IAuthService';
import { LoginDto } from './@types/dto/Login.dto';
import { compareSync } from 'bcrypt';
import { UnauthorizedError } from '@src/utils/appError';
import { AuthError } from './auth.error';
import { IAuthValidate } from './@types/IAuthValidate';
import { UserStatus } from '@src/@types/UserStatus';
import { UserLoginProvider } from '../users/@types/UserLoginProvider';
import { UserDto } from '../users/@types/dto/User.dto';

export const AuthService = (
	userRepository: UserRepository,
	authValidate: IAuthValidate
): IAuthService => {
	const validateLocalUser = async (loginDto: LoginDto): Promise<UserDto> => {
		const { email, password } = loginDto;

		const user = await userRepository.findUserByEmail(email);

		// check user exists
		if (!user) {
			throw new UnauthorizedError(
				AuthError.UNAUTHORIZED_INCORRECT_EMAIL_OR_PASSWORD
			);
		}

		// check login provider
		if (user.provider !== UserLoginProvider.LOCAL) {
			throw new UnauthorizedError(
				AuthError.UNAUTHORIZED_INCORRECT_EMAIL_OR_PASSWORD
			);
		}

		// check user status
		if (user.status === UserStatus.BLOCKED) {
			throw new UnauthorizedError(AuthError.UNAUTHORIZED_USER_BLOCKED);
		}

		// TODO: check time that password was updated

		// check password
		if (!compareSync(password, user!.password!)) {
			throw new UnauthorizedError(
				AuthError.UNAUTHORIZED_INCORRECT_EMAIL_OR_PASSWORD
			);
		}

		return user;
	};

	const validateExternalUser = async (
		externalId: string,
		provider: UserLoginProvider
	): Promise<UserDto> => {
		const user = await userRepository.findUserByExternalId(externalId);

		if (!user) {
			throw new UnauthorizedError(
				AuthError.UNAUTHORIZED_INCORRECT_EXTERNAL
			);
		}

		// check login provider
		if (user.provider === provider) {
			throw new UnauthorizedError(
				AuthError.UNAUTHORIZED_INCORRECT_EXTERNAL
			);
		}

		// check user status
		if (user.status === UserStatus.BLOCKED) {
			throw new UnauthorizedError(AuthError.UNAUTHORIZED_USER_BLOCKED);
		}

		return user;
	};

	const register = async () => {};

	const forgotPassword = async () => {};

	const resetPassword = async () => {};

	return {
		validateLocalUser,
		validateExternalUser,
		register,
		forgotPassword,
		resetPassword
	};
};
