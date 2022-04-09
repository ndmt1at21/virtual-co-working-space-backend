import { IAuthService } from './@types/IAuthService';
import { LoginDto } from './@types/dto/Login.dto';
import { IAuthValidate } from './@types/IAuthValidate';
import { OAuth2ProfileDto } from './@types/dto/OAuth2Profile.dto';
import { UserDto } from '@components/users/@types/dto/User.dto';
import { ForgotPasswordDto } from './@types/dto/ForgotPassword.dto';
import { ResetPasswordDto } from './@types/dto/ResetPassword.dto';
import { IAuthTokenService } from '../authToken/@types/IAuthTokenService';
import { CredentialsDto } from './@types/dto/Credentials.dto';
import { IUserService } from '../users/@types/IUserService';
import { IPasswordResetTokenService } from '../passwordResetToken/@types/IPasswordService';
import { PasswordResetTokenDto } from '../passwordResetToken/@types/dto/PasswordResetToken.dto';
import { CreateUserDto } from '../users/@types/dto/CreateUser.dto';
import { IActiveUserTokenService } from '../activeUserToken/@types/IActiveUserTokenService';
import { LocalRegisterDto } from './@types/dto/LocalRegister.dto';

export const AuthService = (
	userService: IUserService,
	authTokenService: IAuthTokenService,
	passwordResetTokenService: IPasswordResetTokenService,
	activeUserTokenService: IActiveUserTokenService,
	authValidate: IAuthValidate
): IAuthService => {
	const localLogin = async (
		loginDto: LoginDto
	): Promise<[UserDto, CredentialsDto]> => {
		await authValidate.validateLocalUserCanLogin(loginDto);

		const user = await userService.findUserByEmail(loginDto.email);
		const [accessToken, refreshToken] =
			await authTokenService.createAccessTokenAndRefreshToken(user!.id);

		return [user, { accessToken, refreshToken }];
	};

	const oauth2LoginCallback = async (
		profile: OAuth2ProfileDto
	): Promise<[UserDto, CredentialsDto]> => {
		await authValidate.validateExternalUserCanLogin(profile);

		const user = await oauth2ProfileFindOrCreate(profile);
		const [accessToken, refreshToken] =
			await authTokenService.createAccessTokenAndRefreshToken(user.id);

		return [user, { accessToken, refreshToken }];
	};

	const localRegister = async (
		createUserDto: CreateUserDto
	): Promise<LocalRegisterDto> => {
		const user = await userService.createLocalUser(createUserDto);
		const { token } = await activeUserTokenService.createToken(user.id);
		return { user, activeToken: token };
	};

	const activeNewUser = async (userId: number, token: string) => {
		await activeUserTokenService.validateToken(userId, token);
		await userService.activeNewUser(userId);
		await activeUserTokenService.deleteToken(token);
	};

	const refreshAccessToken = async (
		userId: number,
		refreshToken: string
	): Promise<CredentialsDto> => {
		await authTokenService.validateRefreshTokenCanRenewAccessToken(
			userId,
			refreshToken
		);

		await authTokenService.blockRefreshToken(refreshToken);

		const [accessToken, newRefreshToken] =
			await authTokenService.createAccessTokenAndRefreshToken(userId);

		return { accessToken, refreshToken: newRefreshToken };
	};

	const logout = async (refreshToken: string): Promise<void> => {
		await authTokenService.deleteRefreshToken(refreshToken);
	};

	const forgotPassword = async (
		forgotPasswordDto: ForgotPasswordDto
	): Promise<PasswordResetTokenDto> => {
		const { email } = forgotPasswordDto;

		await authValidate.validateUserForgotPassword(email);
		const user = await userService.findUserByEmail(email);

		return await passwordResetTokenService.createToken(user!.id);
	};

	const resetPassword = async (
		resetPasswordDto: ResetPasswordDto
	): Promise<void> => {
		const { resetToken, password, confirmPassword } = resetPasswordDto;

		await passwordResetTokenService.validateToken(resetToken);

		const resetTokenEntity =
			await passwordResetTokenService.findByPlainToken(resetToken);

		const user = await userService.findUserById(resetTokenEntity!.userId);

		await userService.updatePasswordById(user.id, {
			password,
			confirmPassword
		});

		await passwordResetTokenService.deleteByUserId(user.id);
	};

	async function oauth2ProfileFindOrCreate(
		profile: OAuth2ProfileDto
	): Promise<UserDto> {
		const { profileId, email, provider, name, avatar, phone } = profile;

		const user = await userService.findOrCreateUserByExternal({
			externalId: profileId,
			email,
			provider,
			name,
			avatar,
			phone
		});

		return user;
	}

	return {
		localLogin,
		oauth2LoginCallback,
		localRegister,
		refreshAccessToken,
		logout,
		forgotPassword,
		resetPassword,
		activeNewUser
	};
};
