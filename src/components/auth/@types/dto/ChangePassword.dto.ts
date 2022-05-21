import { Expose } from 'class-transformer';
import { IsDefined, Matches } from 'class-validator';

export class ChangePasswordDto {
	@Expose()
	@IsDefined()
	oldPassword: string;

	@Expose()
	@IsDefined()
	@Matches(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~.,_=+@$!%*?&@])[A-Za-z\d`~.,_=+@$!%*?&@]{8,}$/,
		{
			message:
				'Password must have at least one uppercase letter, one lowercase letter, one number and one special character'
		}
	)
	newPassword: string;
}
