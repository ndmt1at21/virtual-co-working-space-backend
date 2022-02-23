import { Expose } from 'class-transformer';
import { IsDefined, IsEmail } from 'class-validator';

export class CreateUserDto {
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
