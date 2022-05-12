import { IllegalArgumentError, UnauthorizedError } from '@src/utils/appError';
import { compareSync } from 'bcrypt';
import { UserLoginProvider } from './@types/UserLoginProvider';
import { UserStatus } from '@components/users/@types/UserStatus';
import { UserRepository } from '@components/users/user.repository';
import { IAuthValidate } from './@types/IAuthValidate';
import { AuthErrorMessages } from './auth.error';
import { User } from '../users/user.entity';
import { OAuth2ProfileDto } from './@types/dto/OAuth2Profile.dto';
import { LoginDto } from './@types/dto/Login.dto';
import { ChangePasswordDto } from './@types/dto/ChangePassword.dto';
import { IAuthTokenService } from './components/authToken/@types/IAuthTokenService';

export class AuthValidate implements IAuthValidate {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly authTokenService: IAuthTokenService
	) {}

	validateUserInAccessTokenCanBeAuthenticated = async (
		accessToken: string
	): Promise<User> => {
		await this.authTokenService.validateAccessToken(accessToken);

		const decodedToken = await this.authTokenService.decodedAccessToken(
			accessToken
		);

		const user = await this.userRepository.findById(decodedToken.sub!);

		this.checkUserExists(user);
		this.checkUserActive(user!);
		this.checkUserNotChangedPasswordAfter(user!, decodedToken.iat!);

		return user!;
	};

	validateLocalUserCanLogin = async (
		loginDto: LoginDto
	): Promise<boolean> => {
		const { email, password } = loginDto;

		const user = await this.userRepository.findUserByEmail(email);

		this.checkUserExists(user);
		this.checkLoginProviderMatch(user!, UserLoginProvider.LOCAL);
		this.checkUserActive(user!);
		this.checkPasswordMatch(user!.password!, password);

		return true;
	};

	validateLocalUserCanChangePassword = async (
		userId: number,
		changePasswordDto: ChangePasswordDto
	): Promise<boolean> => {
		const { oldPassword, newPassword } = changePasswordDto;

		this.checkOldPasswordDifferentFromNew(oldPassword, newPassword);

		const user = await this.userRepository.findById(userId);

		this.checkUserExists(user);
		this.checkLoginProviderMatch(user!, UserLoginProvider.LOCAL);
		this.checkUserActive(user!);
		this.checkPasswordMatch(user!.password!, oldPassword);

		return true;
	};

	async validateExternalUserCanLogin(
		profile: OAuth2ProfileDto
	): Promise<boolean> {
		const { email, provider } = profile;

		const user = await this.userRepository.findUserByEmail(email);

		if (user && user.provider === UserLoginProvider.LOCAL) {
			throw new IllegalArgumentError(
				AuthErrorMessages.LOGIN_EXTERNAL_USER_EXISTS_IN_LOCAL
			);
		}

		if (user) {
			this.checkLoginProviderMatch(user, provider);
			this.checkUserActive(user);
		}

		return true;
	}

	async validateUserForgotPassword(email: string) {
		const user = await this.userRepository.findUserByEmail(email);

		this.checkUserExists(user);
		this.checkUserActive(user!);

		return true;
	}

	checkUserExists(user: User | undefined) {
		if (!user) {
			throw new IllegalArgumentError(
				AuthErrorMessages.UNAUTHORIZED_USER_NOT_FOUND
			);
		}
	}

	checkPasswordMatch(hashedPassword: string, password: string) {
		if (!compareSync(password, hashedPassword)) {
			throw new IllegalArgumentError(
				AuthErrorMessages.UNAUTHORIZED_INCORRECT_EMAIL_OR_PASSWORD
			);
		}
	}

	checkLoginProviderMatch(user: User, provider: UserLoginProvider) {
		if (user.provider !== provider) {
			throw new IllegalArgumentError(
				AuthErrorMessages.UNAUTHORIZED_INCORRECT_EMAIL_OR_PASSWORD
			);
		}
	}

	checkUserActive(user: User) {
		if (user.status === UserStatus.BLOCKED) {
			throw new UnauthorizedError(
				AuthErrorMessages.UNAUTHORIZED_USER_BLOCKED
			);
		}
	}

	checkOldPasswordDifferentFromNew(oldPassword: string, newPassword: string) {
		if (oldPassword === newPassword) {
			throw new IllegalArgumentError(
				AuthErrorMessages.PASSWORD_MUST_BE_DIFFERENT_FROM_OLD
			);
		}
	}

	checkUserNotChangedPasswordAfter(user: User, time: number) {
		if (
			user.passwordUpdateAt &&
			user.passwordUpdateAt.getTime() / 1000 > time
		) {
			throw new IllegalArgumentError(
				AuthErrorMessages.PASSWORD_IS_CHANGED_AFTER_IAT_ACCESS_TOKEN
			);
		}
	}
}
