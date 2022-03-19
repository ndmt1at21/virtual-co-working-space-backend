import { Expose } from 'class-transformer';
import { IsDefined, Matches } from 'class-validator';

export class ResetPasswordContentDto {
	@IsDefined()
	@Expose()
	@Matches(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~.,_=+@$!%*?&])[A-Za-z\d`~.,_=+@$!%*?&]{8,}$/,
		{
			message:
				'Password must have at least one uppercase letter, one lowercase letter, one number and one special character'
		}
	)
	password: string;

	@IsDefined()
	@Expose()
	confirmPassword: string;
}
