import { Expose } from 'class-transformer';
import { IsDefined, Matches } from 'class-validator';

export class ResetPasswordContentDto {
	@IsDefined()
	@Expose()
	@Matches(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~.,_=+@#$!%*?&])[A-Za-z\d`~.,_=+#@$!%*?&]{8,}$/,
		{
			message: 'password_format_is_invalid'
		}
	)
	password: string;

	@IsDefined()
	@Expose()
	confirmPassword: string;
}
