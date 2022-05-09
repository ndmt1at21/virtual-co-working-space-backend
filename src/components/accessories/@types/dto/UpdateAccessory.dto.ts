import { Expose } from 'class-transformer';
import { IsDefined, IsOptional, IsUrl, Length } from 'class-validator';

export class UpdateAccessoryDto {
	@Expose()
	@IsOptional()
	name?: string;

	@Expose()
	@IsUrl()
	@IsOptional()
	path?: string;

	@Expose()
	@Length(1, 255)
	@IsOptional()
	description?: string;
}
