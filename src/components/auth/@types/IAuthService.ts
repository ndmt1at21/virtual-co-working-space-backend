import { UserDto } from '@src/components/users/@types/dto/User.dto';
import { UserLoginProvider } from '@src/components/users/@types/UserLoginProvider';
import { LoginDto } from './dto/Login.dto';

export interface IAuthService {
	validateLocalUser: (loginDto: LoginDto) => Promise<UserDto>;

	validateExternalUser: (
		externalId: string,
		provider: UserLoginProvider
	) => Promise<UserDto>;

	register: () => {};

	forgotPassword: () => {};

	resetPassword: () => {};
}
