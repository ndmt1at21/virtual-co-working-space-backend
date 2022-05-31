import { Expose } from 'class-transformer';
import {
	IsDefined,
	IsEmail,
	Length,
	Matches,
	MinLength
} from 'class-validator';

export class RegisterDto {
	@IsDefined()
	@Expose()
	@Length(1, 255)
	name: string;

	@IsDefined()
	@Expose()
	@IsEmail()
	email: string;

	@IsDefined()
	@Expose()
	@MinLength(8, { message: 'Password must have minimum eight characters' })
	@Matches(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~.,_=+@#$!%*?&])[A-Za-z\d`~.,_=+@#$!%*?&]{8,}$/,
		{
			message:
				'Password must have at least one uppercase letter, one lowercase letter, one number and one special character'
		}
	)
	password: string;

	@IsDefined()
	@Expose()
	passwordConfirm: string;
}
