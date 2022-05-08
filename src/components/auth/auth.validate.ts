import { IllegalArgumentError, UnauthorizedError } from '@src/utils/appError';
import { compareSync } from 'bcrypt';
import { UserLoginProvider } from '@src/components/UserLoginProvider';
import { UserStatus } from '@components/users/@types/UserStatus';
import { UserRepository } from '@components/users/user.repository';
import { IAuthValidate } from './@types/IAuthValidate';
import { AuthErrorMessages } from './auth.error';
import { User } from '../users/user.entity';
import { OAuth2ProfileDto } from './@types/dto/OAuth2Profile.dto';
import { LoginDto } from './@types/dto/Login.dto';
import { ChangePasswordDto } from './@types/dto/ChangePassword.dto';

export const AuthValidate = (userRepository: UserRepository): IAuthValidate => {
	const validateUserCanAccessResourceById = async (
		id: number
	): Promise<boolean> => {
		const user = await userRepository.findById(id);

		checkUserExists(user);
		checkUserActive(user!);

		return true;
	};

	const validateLocalUserCanLogin = async (
		loginDto: LoginDto
	): Promise<boolean> => {
		const { email, password } = loginDto;

		const user = await userRepository.findUserByEmail(email);

		checkUserExists(user);
		checkLoginProviderMatch(user!, UserLoginProvider.LOCAL);
		checkUserActive(user!);
		checkPasswordMatch(user!.password, password);

		// TODO: check time that password was updated

		return true;
	};

	const validateLocalUserCanChangePassword = async (
		userId: number,
		changePasswordDto: ChangePasswordDto
	): Promise<boolean> => {
		const { oldPassword, newPassword } = changePasswordDto;

		checkOldPasswordDifferentFromNew(oldPassword, newPassword);

		const user = await userRepository.findById(userId);

		checkUserExists(user);
		checkLoginProviderMatch(user!, UserLoginProvider.LOCAL);
		checkUserActive(user!);
		checkPasswordMatch(user!.password, oldPassword);

		// TODO: check time that password was updated

		return true;
	};

	const validateExternalUserCanLogin = async (
		profile: OAuth2ProfileDto
	): Promise<boolean> => {
		const { email, provider } = profile;

		const user = await userRepository.findUserByEmail(email);

		if (user) {
			checkLoginProviderMatch(user, provider);
			checkUserActive(user);
		}

		return true;
	};

	const validateUserForgotPassword = async (email: string) => {
		const user = await userRepository.findUserByEmail(email);

		checkUserExists(user);
		checkUserActive(user!);

		return true;
	};

	function checkUserExists(user: User | undefined) {
		if (!user) {
			throw new IllegalArgumentError(
				AuthErrorMessages.UNAUTHORIZED_USER_NOT_FOUND
			);
		}
	}

	function checkPasswordMatch(hashedPassword: string, password: string) {
		if (!compareSync(password, hashedPassword)) {
			throw new IllegalArgumentError(
				AuthErrorMessages.UNAUTHORIZED_INCORRECT_EMAIL_OR_PASSWORD
			);
		}
	}

	function checkLoginProviderMatch(user: User, provider: UserLoginProvider) {
		if (user.provider !== provider) {
			throw new IllegalArgumentError(
				AuthErrorMessages.UNAUTHORIZED_INCORRECT_EMAIL_OR_PASSWORD
			);
		}
	}

	function checkUserActive(user: User) {
		if (user.status === UserStatus.BLOCKED) {
			throw new UnauthorizedError(
				AuthErrorMessages.UNAUTHORIZED_USER_BLOCKED
			);
		}
	}

	function checkOldPasswordDifferentFromNew(
		oldPassword: string,
		newPassword: string
	) {
		if (oldPassword === newPassword) {
			throw new IllegalArgumentError(
				AuthErrorMessages.PASSWORD_MUST_BE_DIFFERENT_FROM_OLD
			);
		}
	}

	return {
		validateLocalUserCanLogin,
		validateExternalUserCanLogin,
		validateUserCanAccessResourceById,
		validateUserForgotPassword,
		validateLocalUserCanChangePassword
	};
};
