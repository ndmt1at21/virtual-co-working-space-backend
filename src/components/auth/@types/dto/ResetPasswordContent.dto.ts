import { Expose } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class ResetPasswordContentDto {
	@IsDefined()
	@Expose()
	password: string;

	@IsDefined()
	@Expose()
	confirmPassword: string;
}
