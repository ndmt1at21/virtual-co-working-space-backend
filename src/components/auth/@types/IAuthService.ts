import { LoginDto } from './dto/Login.dto';
import { UserDto } from '@components/users/@types/dto/User.dto';
import { CreateUserDto } from '@src/components/users/@types/dto/CreateUser.dto';
import { CredentialsDto } from './dto/Credentials.dto';
import { ForgotPasswordDto } from './dto/ForgotPassword.dto';
import { LocalRegisterDto } from './dto/LocalRegister.dto';
import { OAuth2ProfileDto } from './dto/OAuth2Profile.dto';
import { ResetPasswordDto } from './dto/ResetPassword.dto';
import { PasswordResetTokenDto } from '../components/passwordResetToken/@types/dto/PasswordResetToken.dto';
import { ChangePasswordDto } from './dto/ChangePassword.dto';
import { CreateUserExternalDto } from '@src/components/users/@types/dto/CreateUserExternal.dto';

export interface IAuthService {
	localLogin: (loginDto: LoginDto) => Promise<[UserDto, CredentialsDto]>;

	externalLogin: (loginDto: CreateUserExternalDto) => Promise<[UserDto, CredentialsDto]>;

	oauth2LoginCallback: (
		profile: OAuth2ProfileDto
	) => Promise<[UserDto, CredentialsDto]>;

	localRegister: (createUserDto: CreateUserDto) => Promise<LocalRegisterDto>;

	refreshAccessToken: (refreshToken: string) => Promise<CredentialsDto>;

	logout: (refreshToken: string) => Promise<void>;

	forgotPassword: (
		forgotPasswordDto: ForgotPasswordDto
	) => Promise<PasswordResetTokenDto>;

	resetPassword: (resetPasswordDto: ResetPasswordDto) => Promise<void>;

	activeNewUser: (token: string) => Promise<void>;

	changePasswordByUserId(
		id: number,
		updatePasswordDto: ChangePasswordDto
	): Promise<void>;
}
