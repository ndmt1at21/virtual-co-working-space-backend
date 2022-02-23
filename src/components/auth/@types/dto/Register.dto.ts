import { Expose } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class RegisterDto {
	@IsDefined()
	@Expose()
	name: string;

	@IsDefined()
	@Expose()
	email: string;

	@IsDefined()
	@Expose()
	password: string;

	@IsDefined()
	@Expose()
	passwordConfirm: string;
}
