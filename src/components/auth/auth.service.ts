import { UserRepository } from '@components/users/user.repository';
import { IAuthService } from './@types/IAuthService';
import { LoginDto } from './@types/dto/Login.dto';
import { IAuthValidate } from './@types/IAuthValidate';
import { UserLoginProvider } from '@components/users/@types/UserLoginProvider';
import { OAuth2Profile } from './@types/dto/OAuth2Profile';
import { UserDto } from '@components/users/@types/dto/User.dto';
import { UnauthorizedError } from '@src/utils/appError';
import { CreateUserDto } from '../users/@types/dto/CreateUser.dto';
import { ForgotPasswordDto } from './@types/dto/ForgotPassword.dto';
import { ResetPasswordDto } from './@types/dto/ResetPassword.dto';

export const AuthService = (
	userRepository: UserRepository,
	authValidate: IAuthValidate
): IAuthService => {
	const localLogin = async (loginDto: LoginDto): Promise<UserDto> => {
		const { email, password } = loginDto;

		await authValidate.validateLocalUser(email, password);
		const user = await userRepository.findUserByEmail(email);

		return user!;
	};

	const oauth2ProfileFindOrCreate = async (
		profile: OAuth2Profile,
		provider: UserLoginProvider
	): Promise<UserDto> => {
		const { profileId, email } = profile;

		const user = await userRepository.findUserByExternalId(
			profileId,
			provider
		);

		if (user) return user;

		const emailExisted = await userRepository.existsUserByEmail(email);
		if (emailExisted) throw new UnauthorizedError('email existed');

		return await userRepository.save({ ...profile });
	};

	const register = async (createUserDto: CreateUserDto) => {};

	const forgotPassword = async (forgotPasswordDto: ForgotPasswordDto) => {};

	const resetPassword = async (resetPasswordDto: ResetPasswordDto) => {};

	return {
		localLogin,
		oauth2ProfileFindOrCreate,
		register,
		forgotPassword,
		resetPassword
	};
};
