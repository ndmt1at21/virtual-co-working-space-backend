import { Expose } from 'class-transformer';
import { IsUrl, Length } from 'class-validator';

export class UpdateOfficeDto {
	@Expose()
	@Length(1, 255)
	name: string;

	@Expose()
	@IsUrl()
	avatar: string;
}
