import { Expose } from 'class-transformer';
import { IsDefined, IsUrl, Length } from 'class-validator';

export class UpdateOfficeDto {
	@Expose()
	@IsDefined()
	@Length(1, 255)
	name: string;

	@Expose()
	@IsUrl()
	avatar?: string;

	@Expose()
	@Length(1, 2000)
	description?: string;
}
