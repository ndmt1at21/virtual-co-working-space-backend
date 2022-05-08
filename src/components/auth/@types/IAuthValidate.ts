import { ChangePasswordDto } from './dto/ChangePassword.dto';
import { LoginDto } from './dto/Login.dto';
import { OAuth2ProfileDto } from './dto/OAuth2Profile.dto';

export type IAuthValidate = {
	validateUserCanAccessResourceById: (id: number) => Promise<boolean>;

	validateLocalUserCanLogin: (loginDto: LoginDto) => Promise<boolean>;

	validateExternalUserCanLogin: (
		profile: OAuth2ProfileDto
	) => Promise<boolean>;

	validateUserForgotPassword: (email: string) => Promise<boolean>;

	validateLocalUserCanChangePassword(
		userId: number,
		changePasswordDto: ChangePasswordDto
	): Promise<boolean>;
};
