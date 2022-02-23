import { Expose } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class ResetPasswordDto {
	@IsDefined()
	@Expose()
	resetToken: string;

	@IsDefined()
	@Expose()
	password: string;

	@IsDefined()
	@Expose()
	confirmPassword: string;
}
