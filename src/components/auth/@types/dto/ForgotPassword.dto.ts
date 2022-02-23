import { Expose } from 'class-transformer';
import { IsDefined, IsEmail } from 'class-validator';
import { AuthErrorMessages } from '../../auth.error';

export class ForgotPasswordDto {
	@IsDefined({ message: AuthErrorMessages.LOGIN_MISSING_EMAIL_PASSWORD })
	@IsEmail()
	@Expose()
	email: string;
}
