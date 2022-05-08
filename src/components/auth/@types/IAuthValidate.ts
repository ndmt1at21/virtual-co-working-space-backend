import { User } from '@src/components/users/user.entity';
import { ChangePasswordDto } from './dto/ChangePassword.dto';
import { LoginDto } from './dto/Login.dto';
import { OAuth2ProfileDto } from './dto/OAuth2Profile.dto';

export type IAuthValidate = {
	/**
	 * Validate user in access token can be authenticated
	 * and return user object if valid
	 *
	 * */
	validateUserInAccessTokenCanBeAuthenticated(
		accessToken: string
	): Promise<User>;

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
