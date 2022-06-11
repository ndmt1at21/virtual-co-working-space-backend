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
			message: 'password_format_is_invalid'
		}
	)
	password: string;

	@IsDefined()
	@Expose()
	passwordConfirm: string;
}
