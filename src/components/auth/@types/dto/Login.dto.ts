import { Expose } from 'class-transformer';
import { IsDefined, IsEmail } from 'class-validator';

export class LoginDto {
	@IsDefined()
	@IsEmail()
	@Expose()
	email: string;

	@IsDefined()
	@Expose()
	password: string;
}
