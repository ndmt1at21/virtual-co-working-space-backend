import { LoginDto } from './dto/Login.dto';
import { OAuth2ProfileDto } from './dto/OAuth2Profile.dto';

export type IAuthValidate = {
	validateUserCanAccessResourceById: (id: string) => Promise<boolean>;

	validateLocalUserCanLogin: (loginDto: LoginDto) => Promise<boolean>;

	validateExternalUserCanLogin: (
		profile: OAuth2ProfileDto
	) => Promise<boolean>;

	validateUserForgotPassword: (email: string) => Promise<boolean>;
};
