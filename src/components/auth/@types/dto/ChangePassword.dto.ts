import { Expose } from 'class-transformer';
import { IsDefined, Matches } from 'class-validator';

export class ChangePasswordDto {
	@Expose()
	@IsDefined()
	oldPassword: string;

	@Expose()
	@IsDefined()
	@Matches(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~.,_=+@#$!%*?&@])[A-Za-z\d`~.,_=+@#$!%*?&@]{8,}$/,
		{
			message: 'password_format_is_invalid'
		}
	)
	newPassword: string;
}
