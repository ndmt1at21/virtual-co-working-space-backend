import { CreateUserDto } from '@components/users/@types/dto/CreateUser.dto';
import { UserDto } from '@components/users/@types/dto/User.dto';
import { UserLoginProvider } from '@components/users/@types/UserLoginProvider';
import { ForgotPasswordDto } from './dto/ForgotPassword.dto';
import { LoginDto } from './dto/Login.dto';
import { OAuth2Profile } from './dto/OAuth2Profile';
import { ResetPasswordDto } from './dto/ResetPassword.dto';

export interface IAuthService {
	localLogin: (loginDto: LoginDto) => Promise<UserDto>;

	oauth2ProfileFindOrCreate: (
		profile: OAuth2Profile,
		provider: UserLoginProvider
	) => Promise<UserDto>;

	register: (createUserDto: CreateUserDto) => {};

	forgotPassword: (forgotPasswordDto: ForgotPasswordDto) => {};

	resetPassword: (resetPasswordDto: ResetPasswordDto) => {};
}
