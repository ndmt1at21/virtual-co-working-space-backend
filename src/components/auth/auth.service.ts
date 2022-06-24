import { IAuthService } from './@types/IAuthService';
import { LoginDto } from './@types/dto/Login.dto';
import { IAuthValidate } from './@types/IAuthValidate';
import { OAuth2ProfileDto } from './@types/dto/OAuth2Profile.dto';
import { UserDto } from '@components/users/@types/dto/User.dto';
import { ForgotPasswordDto } from './@types/dto/ForgotPassword.dto';
import { ResetPasswordDto } from './@types/dto/ResetPassword.dto';
import { IAuthTokenService } from './components/authToken/@types/IAuthTokenService';
import { CredentialsDto } from './@types/dto/Credentials.dto';
import { IUserService } from '../users/@types/IUserService';
import { CreateUserDto } from '../users/@types/dto/CreateUser.dto';
import { IActiveUserTokenService } from '../activeUserToken/@types/IActiveUserTokenService';
import { LocalRegisterDto } from './@types/dto/LocalRegister.dto';
import { PasswordResetTokenDto } from './components/passwordResetToken/@types/dto/PasswordResetToken.dto';
import { IPasswordResetTokenService } from './components/passwordResetToken/@types/IPasswordService';
import { ChangePasswordDto } from './@types/dto/ChangePassword.dto';
import config from '@src/config';
import { UserStatus } from '../users/@types/UserStatus';
import { IllegalArgumentError } from '@src/utils/appError';
import { AuthErrorMessages } from './auth.error';
import { CreateUserExternalDto } from '../users/@types/dto/CreateUserExternal.dto';

export class AuthService implements IAuthService {
	constructor(
		private readonly userService: IUserService,
		private readonly authTokenService: IAuthTokenService,
		private readonly passwordResetTokenService: IPasswordResetTokenService,
		private readonly activeUserTokenService: IActiveUserTokenService,
		private readonly authValidate: IAuthValidate
	) { }

	localLogin = async (
		loginDto: LoginDto
	): Promise<[UserDto, CredentialsDto]> => {
		await this.authValidate.validateLocalUserCanLogin(loginDto);

		const user = await this.userService.findUserByEmail(loginDto.email);

		const [accessToken, refreshToken] =
			await this.authTokenService.createAccessTokenAndRefreshToken(
				user!.id
			);

		if (user.status === UserStatus.INACTIVE) {
			throw new IllegalArgumentError(
				AuthErrorMessages.UNAUTHORIZED_EMAIL_NOT_VERIFIED
			);
		}

		return [user, { accessToken, refreshToken }];
	};

	externalLogin = async (
		loginDto: CreateUserExternalDto
	): Promise<[UserDto, CredentialsDto]> => {
		const user = await this.userService.findOrCreateUserByExternal(loginDto);

		const [accessToken, refreshToken] =
			await this.authTokenService.createAccessTokenAndRefreshToken(
				user!.id
			);

		if (user.status === UserStatus.INACTIVE) {
			throw new IllegalArgumentError(
				AuthErrorMessages.UNAUTHORIZED_EMAIL_NOT_VERIFIED
			);
		}

		return [user, { accessToken, refreshToken }];
	};

	oauth2LoginCallback = async (
		profile: OAuth2ProfileDto
	): Promise<[UserDto, CredentialsDto]> => {
		await this.authValidate.validateExternalUserCanLogin(profile);

		const user = await this.oauth2ProfileFindOrCreate(profile);

		const [accessToken, refreshToken] =
			await this.authTokenService.createAccessTokenAndRefreshToken(
				user.id
			);

		return [user, { accessToken, refreshToken }];
	};

	localRegister = async (
		createUserDto: CreateUserDto
	): Promise<LocalRegisterDto> => {
		const user = await this.userService.createLocalUser(createUserDto);
		const { token } = await this.activeUserTokenService.createToken(
			user.id,
			config.auth.ACTIVE_USER_TOKEN_LENGTH
		);
		return { user, activeToken: token };
	};

	activeNewUser = async (token: string) => {
		const userId =
			await this.activeUserTokenService.validateAndDeserializeToken(
				token
			);

		await this.userService.activeNewUser(userId);
		await this.activeUserTokenService.deleteToken(token);
	};

	refreshAccessToken = async (
		refreshToken: string
	): Promise<CredentialsDto> => {
		const newCredential =
			await this.authTokenService.renewCredentialByRefreshToken(
				refreshToken
			);

		return newCredential;
	};

	logout = async (refreshToken: string): Promise<void> => {
		await this.authTokenService.deleteRefreshToken(refreshToken);
	};

	forgotPassword = async (
		forgotPasswordDto: ForgotPasswordDto
	): Promise<PasswordResetTokenDto> => {
		const { email } = forgotPasswordDto;

		await this.authValidate.validateUserForgotPassword(email);
		const user = await this.userService.findUserByEmail(email);

		return await this.passwordResetTokenService.createToken(user!.id);
	};

	changePasswordByUserId = async (
		id: number,
		updatePasswordDto: ChangePasswordDto
	): Promise<void> => {
		await this.authValidate.validateLocalUserCanChangePassword(
			id,
			updatePasswordDto
		);

		await this.userService.updatePasswordById(id, {
			password: updatePasswordDto.newPassword,
			confirmPassword: updatePasswordDto.newPassword
		});
	};

	resetPassword = async (
		resetPasswordDto: ResetPasswordDto
	): Promise<void> => {
		const { resetToken, password, confirmPassword } = resetPasswordDto;

		await this.passwordResetTokenService.validateToken(resetToken);

		const resetTokenEntity =
			await this.passwordResetTokenService.findByPlainToken(resetToken);

		const user = await this.userService.findUserById(
			resetTokenEntity!.userId
		);

		await this.userService.updatePasswordById(user.id, {
			password,
			confirmPassword
		});

		await this.passwordResetTokenService.deleteByUserId(user.id);
	};

	async oauth2ProfileFindOrCreate(
		profile: OAuth2ProfileDto
	): Promise<UserDto> {
		const { profileId, email, provider, name, avatar, phone } = profile;

		const user = await this.userService.findOrCreateUserByExternal({
			externalId: profileId,
			email,
			provider,
			name,
			avatar,
			phone
		});

		return user;
	}
}
