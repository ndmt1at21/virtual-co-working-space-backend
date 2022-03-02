import { Expose } from 'class-transformer';
import { IsDefined, IsPhoneNumber, IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
	@Expose()
	name?: string;

	@IsPhoneNumber()
	@Expose()
	phone?: string;

	@IsUrl()
	@Expose()
	avatar?: string;
}
