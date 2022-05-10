import { Expose } from 'class-transformer';
import { IsUrl, Length } from 'class-validator';

export class UpdateItemDto {
	@Expose()
	@Length(1, 255)
	name?: string;

	@Expose()
	@IsUrl()
	modelPath?: string;

	@Expose()
	@IsUrl()
	image?: string;

	@Expose()
	@IsUrl()
	categoryId?: number;
}
