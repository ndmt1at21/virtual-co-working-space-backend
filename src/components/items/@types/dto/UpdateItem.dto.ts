import { Expose } from 'class-transformer';
import { IsNumber, IsUrl, Length } from 'class-validator';

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
	@IsNumber()
	categoryId?: number;
}
